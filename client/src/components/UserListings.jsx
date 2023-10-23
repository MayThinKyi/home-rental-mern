import axios from 'axios';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from '../store/loadingSlice';
import PropertyGridLoading from './loading/PropertyGridLoading';
import ListingItem from './ListingItem';

const UserListings = ({userListings}) => {
  return (
    <div className='mx-auto my-4'>
    
        <h1 className='uppercase text-xl text-center font-semibold mb-10'>Your Listings</h1>
        <div className="w-full   grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10  py-20 ">
        {userListings?.length>0  ? userListings?.map((item)=>{
            return <ListingItem key={item?._id} listing={item} />
        }) :<h1  className='text-xl text-center font-[500]'>You have no listings...</h1>}
    
    </div></div>
  )
}

export default UserListings
