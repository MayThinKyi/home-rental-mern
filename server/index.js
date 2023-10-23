const express=require('express');
const app=express();
const cors=require('cors');
require('dotenv').config();
app.use(express.json())
app.use(cors());
const port=process.env.PORT || 8000;
const db=require('./db/db');
//Auth Router
const authRouter=require('./routes/authRoutes');
app.use('/api/auth',authRouter);
//Listing Router
const listingRouter=require('./routes/listingRoutes');
app.use('/api/listings',listingRouter);
//User Router
const userRouter=require('./routes/userRoutes');
app.use('/api/users/',userRouter)


app.listen(port,()=>{
    console.log('Server is running on port '+port);
})
app.use((err,req,res,next)=>{
    const statusCode=err.statusCode ||500;
    const message=err.message;
    res.send({
        success:false,
        statusCode,
        message
    })
})

