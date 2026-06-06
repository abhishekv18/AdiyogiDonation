import { Payment } from "../models/payment.model.js";
import razorpay from "../services/razorpay.service.js";
import crypto from 'crypto';

export const createOrder = async (req, res) => {
  try {
    const { amount, donorName, phoneNumber, email } = req.body;
    
    // Validate required fields
    if (!amount || !donorName || !phoneNumber || !email) {
      return res.status(400).json({ 
        message: "Please provide all required fields" 
      });
    }

    const options = {
      amount: amount * 100, // Convert to paisa
      currency: 'INR',
      receipt: `donation_${Date.now()}`
    };

    const order = await razorpay.orders.create(options);

    const newPayment = await Payment.create({
      donorName,
      phoneNumber,
      amount,
      razorpayOrderId: order.id,
      status: 'created',
      email
    });

    return res.json({
      success: true,
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      payment: newPayment
    });

  } catch (error) {
    console.error('Create order error:', error);
    return res.status(500).json({ message: "Failed to create order" });
  }
};

export const verifyPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    // Verify signature
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest('hex');

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({ message: "Invalid payment signature" });
    }

    // Find payment by order ID
    const payment = await Payment.findOne({
      razorpayOrderId: razorpay_order_id
    });

    if (!payment) {
      return res.status(404).json({ message: "Payment not found" });
    }

    if (payment.status === 'paid') {
      return res.json({ message: "Payment already processed" });
    }

    // Update payment status
    payment.status = 'paid';
    payment.razorpayPaymentId = razorpay_payment_id;
    await payment.save();

    res.json({
      success: true,
      message: "Thank you for your donation! Payment verified successfully",
      payment: {
        donorName: payment.donorName,
        amount: payment.amount,
        email: payment.email,
        status: payment.status,
        razorpayPaymentId: payment.razorpayPaymentId
      }
    });

  } catch (error) {
    console.error('Verify payment error:', error);
    return res.status(500).json({ message: "Failed to verify payment" });
  }
};

// Optional: Get all donations (for admin panel)
export const getAllDonations = async (req, res) => {
  try {
    const donations = await Payment.find({ status: 'paid' })
      .sort({ createdAt: -1 });
    
    res.json({
      success: true,
      donations
    });
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch donations" });
  }
};