require("dotenv").config();

const JWT_SECRET = "kumawat8619";
const RAZORPAY_KEY_ID = process.env.RAZORPAY_KEY_ID;
const RAZORPAY_KEY_SECRET = process.env.RAZORPAY_KEY_SECRET;

module.exports = {
    JWT_SECRET,
    RAZORPAY_KEY_ID,
    RAZORPAY_KEY_SECRET,
}

   