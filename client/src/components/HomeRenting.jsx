import axios from 'axios';
import React, { useEffect, useState } from 'react'
import ListingItem from './ListingItem';
import PropertyGridLoading from './loading/PropertyGridLoading';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from '../store/loadingSlice';

const HomeRenting = () => {
    const dispatch=useDispatch();
    const {loading}=useSelector((state)=>state.loading);
    const [listings,setListings]=useState([]);
    const fetchListings=async()=>{
        try {
            const res=await axios.get('https://mern-estate-1vcf.onrender.com/api/listings/search?type=rent&limit=6')
            const data=await res.data;
            dispatch(setLoading(false))
            if(data.success) setListings(data.listings);
            else throw new Error(data.message)
        } catch (error) {
            console.log(error.message)
        }
    }
    useEffect(()=>{
        dispatch(setLoading(true))
        fetchListings()
    },[])
  return (
    <>
    {loading ? 
    <PropertyGridLoading/> :
    <div className="w-full  grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10 py-20 ">
        {listings?.map((item)=>{
            return <ListingItem key={item?._id} listing={item} />
        })}
    </div> }
    </>
  )
}

export default HomeRenting
