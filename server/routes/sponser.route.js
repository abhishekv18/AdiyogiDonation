import express from "express";
import isAuth from "../middleware/isAuth.js";

import { upload } from "../config/cloudinary.js";
import { addImage, deleteImage, getImages,} from "../controllers/sponser.controller.js";
import { handleImageUpload } from "../controllers/gallery.controller.js";

const router = express.Router();


router.post("/upload-image",upload.single("my_file"), isAuth, handleImageUpload);
router.post("/add", isAuth, addImage);
router.get("/get", getImages);
router.delete("/delete/:id", isAuth, deleteImage);

export default router;