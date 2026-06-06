import express from "express";
import isAuth from "../middleware/isAuth.js";
import { addContact, deleteContact, getContacts } from "../controllers/contact.controller.js";

const contactRouter=express.Router();

contactRouter.post("/register",addContact);
contactRouter.get("/get-contacts",isAuth,getContacts);
contactRouter.delete("/delete-contact/:id",isAuth,deleteContact);


export default contactRouter;