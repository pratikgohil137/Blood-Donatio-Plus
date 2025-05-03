const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// User Model
const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  mobile: { type: String, required: true },
  tokens: [{ token: { type: String, required: true } }],
  resetToken: { type: String },
  resetTokenExpiry: { type: Date },
  // isAdmin: { type: Boolean, default: false }, 
});

// Hash password before saving
UserSchema.pre('save', async function (next) {
  const user = this;
  console.log('Pre-save hook triggered');
  
  if (user.isModified('password')) {
    console.log('Password was modified, hashing new password');
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    console.log('Password hashed successfully');
  } else {
    console.log('Password was not modified, skipping hash');
  }
  next();
});

// Generate JWT token
UserSchema.methods.generateAuthToken = async function () {
  const token = jwt.sign({ _id: this._id.toString() }, 'secretkey', { expiresIn: '1h' });
  this.tokens = this.tokens.concat({ token });
  await this.save();
  return token;
};

const User = mongoose.model('User', UserSchema);

// Donor Model
const DonorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  bloodGroup: { type: String, required: true },
  lastDonationDate: { type: Date },
  contact: { type: String, required: true },
});

const Donor = mongoose.model('Donor', DonorSchema);

// Hospital Model
const HospitalSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  phone: { type: String, required: true },
  district: { type: String, required: true },
  state: { type: String, required: true },
  verified: { type: Boolean, default: false }, // Add this field
});

const Hospital = mongoose.model('Hospital', HospitalSchema);

module.exports = { User, Donor, Hospital };