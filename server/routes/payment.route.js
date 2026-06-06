import express from "express";
import { createOrder, verifyPayment,getAllDonations } from "../controllers/payment.controller.js";

const paymentRouter = express.Router();

paymentRouter.post("/order", createOrder);
paymentRouter.post("/verify", verifyPayment);
paymentRouter.get("/donors",getAllDonations );  // Add this line

export default paymentRouter;