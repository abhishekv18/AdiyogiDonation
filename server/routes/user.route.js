import express from "express";
import isAuth from "../middleware/isAuth.js";
import { adminRegister, deleteUser, getAllUsers, getCurrentUser, login, logout, register } from "../controllers/user.controller.js";

const userRouter=express.Router();

userRouter.post("/register",register);
userRouter.post("/admin-register",isAuth,adminRegister);
userRouter.post("/login",login);
userRouter.post("/logout",logout);
userRouter.get("/current-user",isAuth,getCurrentUser)
userRouter.get("/get-user",isAuth,getAllUsers);
userRouter.delete("/delete-user/:id",isAuth,deleteUser);


export default userRouter;