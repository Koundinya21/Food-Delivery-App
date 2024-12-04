import userModel from "../models/userModel.js";

import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import validator from "validator"

//login user

const loginUser=async(req,res)=>{
    const {email,password}=req.body;
    try {
        const user=await userModel.findOne({email})
        if(!user){
            return res.json({success:false,message:"User Doesn't exists"})
        }

        const isMatch=await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.json({success:false,message:"Invalid Credentials"})
        }

        const token=createToken(user._id);
        res.json({success:true,token})

    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
        
        
    }
}

//create Token
const createToken=(id)=>{
    return jwt.sign({id},process.env.JWT_SECRET)
}

//registor user
const registorUser=async(req,res)=>{
    const {name,email,password}=req.body;
    try {
        //checking is user already exits
        const exists=await userModel.findOne({email})
        if(exists){
            return res.json({success:false,message:"User already exists"})
        }
        //validate Email format and strong password
        if (!validator.isEmail(email)) {
            res.json({success:false,message:"Please Enter a Valid Email"})
        }

        if (password.length<8) {
            return res.json({success:false,message:"Please Enter a Strong Password"})
        }

        //hashing the User password
        const salt=await bcrypt.genSalt(10);
        const hashedPassword=await bcrypt.hash(password,salt);

        const newUser=new userModel({
            name:name,
            email:email,
            password:hashedPassword
        })

        const user=await newUser.save();
        const token=createToken(user._id);
        res.json({success:true,token})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"});
        
    }
}

export {loginUser,registorUser}
