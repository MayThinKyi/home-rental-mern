import React, { useEffect, useState } from 'react'
import SearchFilter from '../../components/SearchFilter'
import axios from 'axios'
import {  useSearchParams } from 'react-router-dom';
import PropertyGridLoading from '../../components/loading/PropertyGridLoading';
import ListingItem from '../../components/ListingItem';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from '../../store/loadingSlice';
import notFound from '../../images/notFound.svg'
const SearchPage = () => {
  const dispatch=useDispatch();
  const {loading}=useSelector((state)=>state.loading);
  const [filteredListings,setFilteredListings]=useState([])
    ///search?purpose=sell&price=500000to800000&sort=price-asc&area=300to800&floors=2&baths=2&furnished=true
   //purpose,price,sort,area,floors,baths,furnished
    const [searchParams]=useSearchParams();
    const type=searchParams.get('type') ||''
    const price=searchParams.get('price') ||''
    const sort=searchParams.get('sort') ||''
    const area=searchParams.get('area') ||''
    const floors=searchParams.get('floors') ||''
    const baths=searchParams.get('baths') ||''
    const furnished=searchParams.get('furnished') ||''
    const fetchAllListings=async()=>{
      const res=await axios.get('https://mern-estate-1vcf.onrender.com/api/listings/search');
      const data=await res.data;
      dispatch(setLoading(false))

      setFilteredListings(data?.listings)
    }
    const filterListings=async()=>{
      const res=await axios.get(`https://mern-estate-1vcf.onrender.com/api/listings/search?type=${type}&price=${price}&sort=${sort}&area=${area}&floors=${floors}&baths=${baths}&furnished=${furnished}`);
      const data=await res.data;
      dispatch(setLoading(false))

      console.log(res.data)
      setFilteredListings(data?.listings)
    }
    useEffect(()=>{
      dispatch(setLoading(true))
      if(!searchParams) fetchAllListings()
      else filterListings();
    },[searchParams])
  return (
    <>
    <SearchFilter/>
    <div className='px-5 sm:px-10  py-20'>
    {loading ? 
    <PropertyGridLoading/> :
    filteredListings?.length>0 ? <div className="w-full  grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10 ">
    {filteredListings?.map((item)=>{
        return <ListingItem key={item?._id} listing={item} />
    })}
</div> : <div className='flex flex-col items-center gap-y-5'>
<img src={notFound} className='' />
<h1 className='font-semibold text-2xl'>No Result Found...</h1>
</div>
    }
    </div>
    </>
  )
}

export default SearchPage
