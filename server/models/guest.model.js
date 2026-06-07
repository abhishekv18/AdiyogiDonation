// import mongoose from "mongoose";

// const bhandaraSchema = new mongoose.Schema({
//     name: {
//         type: String,
//         required:true
//     },
//     phone: {
//         type: Number,
//         required:true,
//         unique:true
//     },
//     location:{
//         type:String,
//         required:true,
//     },  
//     },
// {timestamps:true});
// export const Bhandara = mongoose.model('Bhandara', bhandaraSchema);\


import mongoose from "mongoose";

const bhandaraSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    location: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);


bhandaraSchema.index({ name: 1 });
bhandaraSchema.index({ createdAt: -1 });

export const Bhandara = mongoose.model("Bhandara", bhandaraSchema);