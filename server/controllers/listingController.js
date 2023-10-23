const ListingModel = require("../models/ListingModel")

const createListing=async(req,res,next)=>{
    try {
        const newListing=new ListingModel(req.body);
        await newListing.save();
        return res.send({
            success:true,
            message:"Listing created successfully!"
        })
    } catch (error) {
        next(error)
    }
}

const deleteListing=async(req,res,next)=>{
    const listingId=req.params.listingId
    try {
        const listing=await ListingModel.findById(listingId);
        if(!listing) throw new Error('Listing Id doesnt exist!')
        else{
            await ListingModel.findByIdAndRemove(listingId);
            return res.send({
                success:true,
                message:'Listing deleted successfully!'
            })}
    } catch (error) {
        next(error)
    }
}
const updateListing=async(req,res,next)=>{
    const listingId=req.params.listingId;
    try {
        const listing=await ListingModel.findById(listingId);
        if(!listing) throw new Error('Listing Id doesnt exist!');
        else{
            await ListingModel.findByIdAndUpdate(listingId,req.body,{new:true});
            return res.send({
                success:true,
                message:'Listing updated successfully!'
            })
        }
    } catch (error) {
        next(error)
    }
}
const searchListings=async(req,res,next)=>{
   // /search?purpose=sell&price=500000to800000&sort=price-asc&area=300to800&floors=2&baths=2&furnished=true
    let {type,price,sort,area,floors,baths,furnished,limit} =req.query;
    let filter={};
    if(type==='sell') filter.type=type;
    if(type==='rent') filter.type=type;
    if(price){
        const [minPrice,maxPrice]=price.split('to');
        filter.regularPrice={$gte:Number(minPrice),$lte:Number(maxPrice)};
    }
    if(area){
        const [minArea,maxArea]=area.split('to');
        filter.sqft={$gte:Number(minArea),$lte:Number(maxArea)}
    }
    if(floors) filter.floors=Number(floors)
    if(baths) filter.baths=Number(baths)
    if(furnished==='true') filter.furnished=true
    if(furnished==='false') filter.furnished=false
    try {
        let listings;
        listings=await ListingModel.find(filter).populate('user').limit(limit)

       if(sort) {
        let [field,order]=sort.split('-');
        field=field==='price' ? 'regularPrice':'createdAt';
        order=order==='asc'?1:-1;
        let sortParams={[field]:order}
        listings=await ListingModel.find(filter).populate('user').sort(sortParams).limit(limit)
    }
        return res.send({
            success:true,
           results:listings.length,
            listings
        })
    } catch (error) {
        next(error)
    }
}
const getListingById=async(req,res,next)=>{
    const listingId=req.params.listingId;
    try {
        const listing=await ListingModel.findById(listingId).populate('user'); 
        if(!listing) throw new Error('Property ID doesnt exist!')
        else {
   return res.send({
        success:true,
        listing,
    })}
    } catch (error) {
        next(error)
    }
}
const getListingsByUserId=async(req,res,next)=>{
    const userId=req.params.userId;
    try {
       const listings=await ListingModel.find({user:userId}).populate('user');
       return res.send({
        success:true,
        results:listings?.length,
        listings
       }) 
    } catch (error) {
        next(error)
    }
}

module.exports={createListing,deleteListing,
    updateListing,searchListings,getListingById,getListingsByUserId}