const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const cors = require('cors'); // Import the cors package
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const bcrypt = require('bcryptjs'); // Import bcrypt for password hashing
const { User, Donor, Hospital } = require('./model');
const sgMail = require('@sendgrid/mail'); // Import SendGrid Mail
const app = express();
const port = 3000;

app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173', // Replace with your frontend's URL
})); // Enable CORS for all routes

// Set your SendGrid API key
sgMail.setApiKey('YOUR_SENDGRID_API_KEY'); // Replace with your SendGrid API key

// Connect to MongoDB
const connectDB = async () => {
  await mongoose.connect('mongodb+srv://pratik13705:P0zbpdV5fVvrN82O@blood-donation.n7r7xng.mongodb.net/?retryWrites=true&w=majority&appName=Blood-Donation');
  console.log('Database connected');
};
connectDB();

const adminAuth = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const decoded = jwt.verify(token, 'secretkey');
    const user = await User.findOne({ _id: decoded._id, 'tokens.token': token });

    if (!user || !user.isAdmin) {
      throw new Error('Access denied');
    }

    req.user = user;
    req.token = token;
    next();
  } catch (error) {
    res.status(403).send({ error: 'Access denied' });
  }
};

// Authentication middleware
const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const decoded = jwt.verify(token, 'secretkey');
    const user = await User.findOne({ _id: decoded._id, 'tokens.token': token });

    if (!user) throw new Error('Authentication failed');
    req.user = user;
    req.token = token;
    next();
  } catch (error) {
    res.status(401).send({ error: 'Please authenticate' });
  }
};

// User APIs
app.post('/users', async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});

app.get('/users', auth, async (req, res) => {
  const users = await User.find();
  res.send(users);
});

app.post('/register', async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    const token = await user.generateAuthToken();
    res.status(201).send({ user, token });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log('1. Login attempt - Email:', email);
    console.log('2. Password length:', password.length);

    const user = await User.findOne({ email });
    if (!user) {
      console.log('3. User not found with email:', email);
      throw new Error('Invalid email or password');
    }

    console.log('4. User found, stored password hash:', user.password);
    
    const isMatch = await bcrypt.compare(password, user.password);
    console.log('5. Password comparison result:', isMatch);
    
    if (!isMatch) {
      console.log('6. Password mismatch for user:', email);
      throw new Error('Invalid email or password');
    }

    console.log('7. Login successful for user:', email);
    const token = await user.generateAuthToken();
    
    res.send({ 
      user, 
      token,
      status: 'success' 
    });
  } catch (error) {
    console.error('8. Login error:', error.message);
    res.status(400).send({ 
      error: error.message,
      status: 'fail' 
    });
  }
});

app.post('/logout', async (req, res) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const user = await User.findOne({ 'tokens.token': token });
    if (!user) throw new Error('Authentication failed');

    user.tokens = user.tokens.filter((t) => t.token !== token);
    await user.save();
    res.send({ message: 'Logged out successfully' });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

// Forgot Password API
app.post('/forgot-password', async (req, res) => {
  try {
    const { email } = req.body;
    console.log('Received email:', email);

    const user = await User.findOne({ email });
    if (!user) {
      console.log('User not found');
      return res.status(404).send({ error: 'User not found', status: 'fail' });
    }

    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetTokenExpiry = Date.now() + 3600000; // Token valid for 1 hour

    user.resetToken = resetToken;
    user.resetTokenExpiry = resetTokenExpiry;
    await user.save();
    console.log('Reset token saved:', resetToken);

    const resetLink = `http://localhost:5173/reset-password/${resetToken}`;

    // Configure Nodemailer with more detailed settings
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: 'pratik13705@gmail.com',
        pass: 'yqyv kxtb nrpg vwiq'
      },
      tls: {
        rejectUnauthorized: false
      },
      debug: true,
      logger: true
    });

    // Verify connection configuration
    try {
      await transporter.verify();
      console.log('SMTP connection verified successfully');
    } catch (error) {
      console.error('SMTP Verification Error:', error);
      return res.status(500).send({ 
        error: 'Email server connection failed', 
        details: error.message,
        status: 'fail' 
      });
    }

    const mailOptions = {
      from: {
        name: 'Blood Donation System',
        address: 'pratik13705@gmail.com'
      },
      to: user.email,
      subject: 'Password Reset Request - Blood Donation System',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #d32f2f;">Password Reset Request</h2>
          <p>Hello,</p>
          <p>We received a request to reset your password for the Blood Donation System. Click the button below to reset your password:</p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${resetLink}" 
               style="background-color: #d32f2f; 
                      color: white; 
                      padding: 12px 24px; 
                      text-decoration: none; 
                      border-radius: 5px;
                      display: inline-block;">
              Reset Password
            </a>
          </div>
          <p>If you didn't request this password reset, please ignore this email or contact support if you have concerns.</p>
          <p>This link will expire in 1 hour for security reasons.</p>
          <hr style="border: 1px solid #eee; margin: 20px 0;">
          <p style="color: #666; font-size: 12px;">
            This is an automated message, please do not reply to this email.
          </p>
        </div>
      `,
    };

    try {
      const info = await transporter.sendMail(mailOptions);
      console.log('Email sent successfully. Message ID:', info.messageId);
      res.send({ 
        message: 'Password reset link sent to your email', 
        status: 'success',
        messageId: info.messageId 
      });
    } catch (error) {
      console.error('Email sending error:', {
        message: error.message,
        code: error.code,
        command: error.command
      });
      res.status(500).send({ 
        error: 'Failed to send email. Please try again later.',
        details: error.message,
        status: 'fail'
      });
    }
  } catch (error) {
    console.error('Error in /forgot-password:', error);
    res.status(500).send({ 
      error: 'Something went wrong', 
      details: error.message,
      status: 'fail' 
    });
  }
});

// Reset Password API
app.post('/reset-password/:token', async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    console.log('1. Reset password request received for token:', token);
    console.log('2. New password length:', password.length);

    const user = await User.findOne({
      resetToken: token,
      resetTokenExpiry: { $gt: Date.now() }
    });

    if (!user) {
      console.log('3. No user found with valid reset token');
      return res.status(400).send({ 
        error: 'Invalid or expired token. Please request a new password reset.',
        status: 'fail' 
      });
    }

    console.log('4. Found user:', user.email);
    
    // Store the old password hash for comparison
    const oldPasswordHash = user.password;
    
    // Update password
    user.password = password;
    user.resetToken = undefined;
    user.resetTokenExpiry = undefined;

    // Save user and get updated document
    const savedUser = await user.save();
    
    console.log('5. Password update complete');
    console.log('6. Old password hash:', oldPasswordHash);
    console.log('7. New password hash:', savedUser.password);

    // Verify the new password works
    const verificationTest = await bcrypt.compare(password, savedUser.password);
    console.log('8. Password verification test:', verificationTest);

    // Send confirmation email
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: 'pratik13705@gmail.com',
        pass: 'yqyv kxtb nrpg vwiq'
      }
    });

    const mailOptions = {
      from: {
        name: 'Blood Donation System',
        address: 'pratik13705@gmail.com'
      },
      to: user.email,
      subject: 'Password Reset Successful - Blood Donation System',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #d32f2f;">Password Reset Successful</h2>
          <p>Hello,</p>
          <p>Your password has been successfully reset. You can now log in with your new password.</p>
          <p>If you did not make this change, please contact support immediately.</p>
          <hr style="border: 1px solid #eee; margin: 20px 0;">
          <p style="color: #666; font-size: 12px;">
            This is an automated message, please do not reply to this email.
          </p>
        </div>
      `
    };

    try {
      await transporter.sendMail(mailOptions);
      console.log('9. Confirmation email sent');
    } catch (error) {
      console.error('10. Error sending confirmation email:', error);
    }

    res.send({ 
      message: 'Password reset successful. You can now login with your new password.',
      status: 'success' 
    });
  } catch (error) {
    console.error('Error in password reset:', error);
    res.status(500).send({ 
      error: 'Something went wrong during password reset',
      details: error.message,
      status: 'fail'
    });
  }
});

// Donor APIs
app.post('/donors', async (req, res) => {
  try {
    const donor = new Donor(req.body);
    await donor.save();
    res.status(201).send(donor);
  } catch (error) {
    res.status(400).send(error);
  }
});

app.get('/donors', async (req, res) => {
  const donors = await Donor.find();
  res.send(donors);
});

// Hospital APIs
app.post('/hospitals', async (req, res) => {
  try {
    const hospital = new Hospital(req.body);
    await hospital.save();
    res.status(201).send(hospital);
  } catch (error) {
    res.status(400).send(error);
  }
});

app.get('/hospitals', async (req, res) => {
  const hospitals = await Hospital.find();
  res.send(hospitals);
});

app.post('/verify-hospital/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const hospital = await Hospital.findById(id);

    if (!hospital) {
      return res.status(404).send({ error: 'Hospital not found' });
    }

    hospital.verified = true; // Mark the hospital as verified
    await hospital.save();

    res.send({ message: 'Hospital verified successfully' });
  } catch (error) {
    console.error('Error verifying hospital:', error);
    res.status(500).send({ error: 'Something went wrong' });
  }
});

app.post('/organization-login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const hospital = await Hospital.findOne({ email });

    if (!hospital) {
      return res.status(404).send({ error: 'Organization not found' });
    }

    const isMatch = await bcrypt.compare(password, hospital.password);
    if (!isMatch) {
      return res.status(400).send({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: hospital._id }, 'secretkey', { expiresIn: '1h' });
    res.send({ message: 'Login successful', token });
  } catch (error) {
    console.error('Error in organization login:', error);
    res.status(500).send({ error: 'Something went wrong' });
  }
});

// app.get('/admin-dashboard', adminAuth, (req, res) => {
//   res.send({ message: 'Welcome to the Admin Dashboard' });
// });

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});