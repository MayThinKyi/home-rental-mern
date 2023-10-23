const {verify}=require('jsonwebtoken')
const authMiddleware=(req,res,next)=>{
    const token=req.header('authorization');
    try {
        if(!token) throw new Error('JWT Token must provide!')
        else{
            const match= verify(token,process.env.SECRET_KEY);
            if(!match) throw new Error('JWT Token is invalid!')
            else {
               req.userId=match.userId
              next()
            }
        }
    } catch (error) {
        next(error);
    }

}
module.exports={authMiddleware}