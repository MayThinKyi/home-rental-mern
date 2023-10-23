const express=require('express');
const { updateUserProfile, updateUserPassword } = require('../controllers/userController');
const { authMiddleware } = require('../middleware/authMiddleware');
const router=express.Router();
router.put('/update-profile',authMiddleware,updateUserProfile)
router.put('/update-password',authMiddleware,updateUserPassword)
module.exports=router;