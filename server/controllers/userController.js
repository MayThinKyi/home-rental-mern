const UserModel = require("../models/UserModel");
const bcrypt=require('bcrypt');
const updateUserProfile=async(req,res,next)=>{
    const {_id,name,email,profilePicture}=req.body;
    try {
       const updatedUser= await UserModel.findByIdAndUpdate(_id,req.body,{new:true});
        return res.send({
            success:true,
            message:'Profile updated successfully!',
            user:updatedUser
        })
    } catch (error) {
        next(error)
    }
}
const updateUserPassword=async(req,res,next)=>{
    const {oldPassword,newPassword}=req.body;
    try {
      const user=await UserModel.findById(req.userId);
      const dbHashPassword=user?.password;
      const match=await bcrypt.compare(oldPassword,dbHashPassword);
      if(match){
        const newHashPassword=await bcrypt.hash(newPassword,10);
        await UserModel.findByIdAndUpdate(req.userId,{password:newHashPassword},{new:true});
        return res.send({
            success:true,
            message:'Password updated successfully!'
        })
      }else throw new Error('Old password is not credential!');
    } catch (error) {
        next(error)
    }
}
module.exports={updateUserProfile,updateUserPassword}