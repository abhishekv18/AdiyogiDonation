import mongoose from "mongoose";

const donationSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    imageUrl:{
        type:String, 
        required: true,
    },  
    },
{timestamps:true});
export const Donation = mongoose.model('Donation', donationSchema);
