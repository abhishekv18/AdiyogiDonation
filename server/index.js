import express from "express";// it create a server
import dotenv from "dotenv";// it load environment variables from .env file
import connectDb from "./config/connectDb.js";
import cookieParser from "cookie-parser";
dotenv.config();
import cors from "cors";

import userRouter from "./routes/user.route.js";
import contactRouter from "./routes/conatct.route.js";
import sponserRouter from "./routes/sponser.route.js";
import galleryRouter from "./routes/gallery.route.js";
import paymentRouter from "./routes/payment.route.js";
import guestRouter from "./routes/guest.route.js";
const app = express();


const corsOptions = {
   // origin: ['http://localhost:5173',"https://adiyogi-donation.vercel.app","https://www.adiyogifoundation.org"],
   origin: [
  "http://localhost:5173",
  "https://adiyogi-donation.vercel.app",
  "https://adiyogifoundation.org",
  "https://www.adiyogifoundation.org",
],
    credentials: true,
};


app.use(cors(corsOptions));


app.use(express.json());
app.use(cookieParser());


app.use("/api/user",userRouter);
app.use("/api/contact",contactRouter);
app.use("/api/sponsor",sponserRouter);
app.use("/api/gallery",galleryRouter);
app.use("/api/payment",paymentRouter);
app.use("/api/guest",guestRouter);
const PORT=process.env.PORT || 6000;
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
    connectDb();
});
