import express from "express";
import isAuth from "../middleware/isAuth.js";
import { addGuest, deleteGuest, getGuests } from "../controllers/guest.controller.js";



const router = express.Router();



router.post("/add", isAuth,addGuest);
router.get("/get",isAuth,getGuests);
router.delete("/delete/:id", isAuth, deleteGuest);

export default router;