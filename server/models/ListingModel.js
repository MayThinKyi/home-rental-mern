const mongoose=require('mongoose');
const listingSchema=new mongoose.Schema({
    name:{type:String,required:true},
    description:{type:String,required:true},
    address:{type:String,required:true},
    images:{type:Array,default:[]},
    type:{type:String,enum:['sell','rent'],required:true},
    furnished:{type:Boolean,required:true},
    parkingSpot:{type:Boolean,required:true},
    offer:{type:Boolean,required:true},
    beds:{type:Number,required:true},
    baths:{type:Number,required:true},
    floors:{type:Number,required:true},
    sqft:{type:Number,required:true},
    regularPrice:{type:Number,required:true},
    discountedPrice:{type:Number},
    isAvailable:{type:Boolean,required:true},
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'users',
        required:true
    } 
},{timestamps:true,strictQuery:false});

const ListingModel=mongoose.model('listings',listingSchema);
module.exports=ListingModel