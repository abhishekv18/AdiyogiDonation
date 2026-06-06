import { imageUploadUtil } from "../config/cloudinary.js";
import { Donation } from "../models/sponser.model.js";

export const handleImageUpload = async (req, res) => {
  try {
    const b64 = Buffer.from(req.file.buffer).toString("base64");
    const url = `data:${req.file.mimetype};base64,${b64}`;
    const result = await imageUploadUtil(url);

    res.json({
      success: true,
      result,
    });
  } catch (error) {
    console.error("🔴 Upload Error:", error); // ✅ this shows exact issue in terminal

    res.status(500).json({
      success: false,
      message: error.message || "Some error occurred", // ✅ send actual error message
    });
  }
};


export const addImage = async (req, res) => {
  try {
    const { title, imageUrl} = req.body;

    if (!title || !imageUrl ) {
      return res.status(400).json({
        message: "Something is missing",
        success: false,
      });
    }
 const newImage = new Donation({ title, imageUrl });
    await newImage.save();
   



    return res.status(201).json({
      message: "Image posted and subscribers notified",
      success: true,
      newImage,
    });
  } catch (error) {
    console.log("Error posting image or sending mail:", error);
    return res.status(500).json({
      message: "Server error",
      success: false,
    });
  }
};






export const getImages = async (req, res) => {
    try {
        const images = await Donation.find().sort({ createdAt: -1 });
        return res.status(200).json({
            message: "Images fetched successfully",
            success: true,
            images
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
}


export const deleteImage = async (req, res) => {
    try {
        const imageId = req.params.id;
        const image = await Donation.findByIdAndDelete({ _id: imageId });
        if (!image) {
            return res.status(404).json({
                message: "Image not found",
                success: false
            });
        }
        return res.status(200).json({
            message: "Image deleted successfully",
            success: true
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
}
