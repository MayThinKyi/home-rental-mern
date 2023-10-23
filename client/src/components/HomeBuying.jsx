import axios from 'axios';
import React, { useEffect, useState } from 'react'
import ListingItem from './ListingItem';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from '../store/loadingSlice';
import PropertyGridLoading from './loading/PropertyGridLoading';

const HomeBuying = () => {
    const {loading}=useSelector((state)=>state.loading);
    const dispatch=useDispatch();
    const [listings,setListings]=useState([]);
    const fetchListings=async()=>{
        try {
            const res=await axios.get('http://localhost:8000/api/listings/search?type=sell&limit=6')
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
    <>{loading? <PropertyGridLoading/> :
    <div className="w-full   grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10  py-20 ">
        {listings?.map((item)=>{
            return <ListingItem key={item?._id} listing={item} />
        })}
    </div>}
    </>
  )
}

export default HomeBuying
