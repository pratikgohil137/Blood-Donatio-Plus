const AboutUs = () => {
    console.log("AboutUs component rendered");
    return (
        <div className="about-us-container">
            <h2>About Us</h2>
            <p>
                Welcome to the Blood Donation Platform! Our mission is to connect blood donors with those in need,
                making the process of saving lives easier and more efficient. We believe in the power of community
                and the importance of giving back.
            </p>
            <p>
                Our platform provides information about blood donation eligibility, nearby hospitals, and FAQs to
                help you understand the process better. Whether you're a first-time donor or a regular contributor,
                we're here to support you every step of the way.
            </p>
            <p>
                Together, we can make a difference and save lives. Thank you for being a part of this life-saving journey!
            </p>
            <center>Contact Us</center>
            <h6 className="AboutUs">blooddonation@gmail.com</h6>
            <h6 className="AboutUs">9876543210</h6>
        </div>
    );
};
export default AboutUs