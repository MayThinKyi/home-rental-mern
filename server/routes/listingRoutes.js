const express=require('express');
const { createListing, deleteListing, updateListing, searchListings, getListingById, getListingsByUserId } = require('../controllers/listingController');
const { authMiddleware } = require('../middleware/authMiddleware');
const router=express.Router();
router.get('/search',searchListings);
router.get('/:listingId',getListingById)

router.post('/create-listing',authMiddleware,createListing)
router.delete('/:listingId',authMiddleware,deleteListing)
router.put('/:listingId',authMiddleware,updateListing);
router.get('/users/:userId',authMiddleware,getListingsByUserId)
module.exports=router;