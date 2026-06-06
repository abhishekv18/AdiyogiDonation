import dotenv from 'dotenv'
dotenv.config();
// crypto verify that razorpay sei payment hui ki nhi

import Razorpay from 'razorpay'

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret:process.env.RAZORPAY_KEY_SECRET,
});

export default razorpay;