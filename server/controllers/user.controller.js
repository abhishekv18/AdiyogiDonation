import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import { getToken } from "../config/token.js";
export const register = async(req,res)=>{
    try {
        const{email,password}=req.body;


        if ( !email || !password ) {
            return res.status(400).json({
                message: "Something is missing",
                success: false
            });
        };
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                message: "Invalid email format",
                success: false
            });
        }
        const user = await User.findOne({email});
        if(user){ 
            return res.status(400).json({
                message:"Admin already exists",
                success: false,
            });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({email,password:hashedPassword});
        await newUser.save();
        return res.status(201).json({
            message:"Admin registered successfully",
            success:true
        });

    } catch (error) {
         console.log(error);
    }
}


export const adminRegister = async(req,res)=>{
    try {
        const{email,password}=req.body;


        if ( !email || !password ) {
            return res.status(400).json({
                message: "Something is missing",
                success: false
            });
        };
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                message: "Invalid email format",
                success: false
            });
        }
        const user = await User.findOne({email});
        if(user){
            return res.status(400).json({
                message:"Admin already exists",
                success: false,
            });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({email,password:hashedPassword});
        await newUser.save();
        return res.status(201).json({
            message:"Admin registered successfully",
            success:true,
            newUser
        });

    } catch (error) {
         console.log(error);
    }
}


export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Something is missing",
        success: false
      });
    }

    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "User not found",
        success: false,
      });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({
        message: "Incorrect email or password.",
        success: false,
      });
    }

        let token=await getToken(user._id);
        res.cookie("token",token,{
            // http:true,
            // //httpOnly:true,
            // secure:false,
            // sameSite:"strict",
            // maxAge:7*24*60*60*1000
              httpOnly:true,
            secure:true,
            sameSite:"none",
            maxAge:7*24*60*60*1000
        });
        return res.status(200).json({message:"Login successful",user: {
                _id: user._id,
                name: user.name,
                email: user.email,
            }});

  } catch (error) {
    console.log("Login Error:", error);
    return res.status(500).json({
      message: "Something went wrong",
      success: false
    });
  }
};



// export const logout=async(req,res)=>{
//     try {
//         await res.clearCookie("token",{
//               httpOnly:true,
//             secure:true,
//             sameSite:"none",
//         }); 
//         return res.status(200).json({message:"Logout successful"});
//     } catch (error) {
//         res.status(500).json({message:"Something went wrong",error: error.message})
//     }
// }


// export const getCurrentUser=async(req,res)=>{
//     try {
//         const userId=req.userId;
//         const user=await User.findById(userId);
//         if(!user){
//             return res.status(404).json({message:"User not found"});
//         }
//         return res.status(200).json({
//             user: {
//                 _id: user._id,
//                 name: user.name,
//                 email: user.email,
//             }
//         });
//     } catch (error) {
//         return res.status(500).json({message:"Internal server error"});
//     }
// }
export const logout = async (req, res) => {
    try {
        res.clearCookie("token",{
            httpOnly: true,
            secure: true,
            sameSite: "none",
        });
        return res.status(200).json({ message: "Logout successful" });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong", error: error.message });
    }
}
export const getCurrentUser = async(req,res)=>{
    try {

        if(!req.userId){
            return res.status(200).json({
                user:null
            });
        }

        const user = await User.findById(req.userId);

        return res.status(200).json({
           user: {
                _id: user._id,
                name: user.name,
                email: user.email,
            }
        });

    } catch(error){
        return res.status(500).json({
            message:"Internal server error"
        });
    }
}

export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({}).sort({ createdAt: -1 });
        res.status(200).json({ 
            message:"User fetched successfully",
            success:true,
            users
         });
    } catch (error) {
        console.log(error);
    }
}

export const deleteUser = async (req, res) => {
    try {   
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json({ 
            message:"User deleted successfully",
            success:true
         });
    } catch (error) {
        console.log(error);
    }
}










