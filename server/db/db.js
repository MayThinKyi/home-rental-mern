const mongoose=require('mongoose');
const dbUrl=process.env.DB_URL;
mongoose.connect(dbUrl);
mongoose.set('strictQuery',false);
const connection=mongoose.connection;
connection.on('connected',()=>{
    console.log('Database connected successfully!')
})
connection.on('error',()=>{
    console.log('Database connection fail!')
})