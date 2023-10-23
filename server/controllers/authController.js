const UserModel = require("../models/UserModel");
const bcrypt=require('bcrypt');
const {sign}=require('jsonwebtoken');
const register=async(req,res,next)=>{
    const {name,email,password}=req.body;
    try {
      const user=await UserModel.findOne({email});
      if(user)  throw new Error('Email already exist!');
      else {
        const hash=await bcrypt.hash(password,10);
        const newUser=new UserModel({
            name,email,password:hash
        });
        await newUser.save();
        res.send({
            success:true,
            message:'User registered successfully!'
        })
      }
    } catch (error) {
            next(error)
    }
}
const login=async(req,res,next)=>{
    const {email,password}=req.body;
    try {
        const user=await UserModel.findOne({email});
        if (!user) throw new Error("Email doesn't exist!")
        else {
        const match=await bcrypt.compare(password,user?.password);
        if(!match) throw new Error('Password is not credential!')
        else {
            const token= sign({userId:user?._id},process.env.SECRET_KEY);;
            const {password,__v,...rest}=user._doc
           res.send({
            success:true,
            message:'User logged in successfully!',
            user:rest,
            token
           })
        }
        
        }
    } catch (error) {
        next(error)
    }
}
const validateToken=async(req,res,next)=>{
    try {
       const userId=req.userId;
       let user=await UserModel.findById(userId);
       const {password,__v,...rest}=user._doc
       res.send({
        success:true,
        user:rest
       })
    } catch (error) {
        next(error)
    }
}

module.exports={register,login,validateToken}