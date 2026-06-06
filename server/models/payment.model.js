import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
  donorName: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  razorpayOrderId: {
    type: String,
    required: true
  },
  razorpayPaymentId: String,
  status: {
    type: String,
    enum: ['created', 'paid', 'failed'],
    default: 'created'
  }
}, { timestamps: true });

export const Payment = mongoose.model('Payment', paymentSchema);