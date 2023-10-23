import axios from 'axios';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { BsFillGridFill } from 'react-icons/bs';
import { FaBath, FaBed, FaParking } from 'react-icons/fa';
import { useParams } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';
import {GiSofa} from 'react-icons/gi';
import defaultUser from '../../images/defaultUser.png'
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import ContactLandloard from '../../components/ContactLandloard';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from '../../store/loadingSlice';
import PropertyLoading from '../../components/loading/PropertyLoading';

const PropertyPage = () => {
  const dispatch=useDispatch();
  const {loading}=useSelector((state)=>state.loading);
    const {propertyId}=useParams();
    const [property,setProperty]=useState([]);
    const fetchProperty=async()=>{
      try {
        const res=await axios.get(`https://mern-estate-1vcf.onrender.com/api/listings/${propertyId}`);
        const data=await res.data;
        dispatch(setLoading(false))

        if(!data.success) throw new Error(data.message)
        else {
      console.log(data);
      setProperty(data?.listing)
    }
      } catch (error) {
        toast.error(error.message)
      }
    }
    useEffect(()=>{
      dispatch(setLoading(true))
      fetchProperty()
    },[propertyId])
  return (
    <div className='px-5 sm:px-10 py-10'>
      
       {loading ? <PropertyLoading/> :
       <>
       <Swiper
        pagination={{
          type: 'progressbar',
        }}
        navigation={true}
        modules={[Pagination, Navigation]}
        className="mySwiper"
      >
        {property?.images?.map((img,index)=>{
          return  <SwiperSlide key={index} className='h-[350px] sm:h-[400px] md:h-[450px]'>
            <img src={img} className='w-full h-full object-cover xl:object-contain' />
          </SwiperSlide>

        })}
      </Swiper>
      <div className="mt-10 mb-5 flex items-center justify-between">
        <div className="flex flex-col gap-y-5">
          <div className="flex items-center gap-x-5">
          <h1 className='font-semibold text-slate-900 text-xl'>$ {property?.regularPrice} / monthly</h1>
          {property?.type==='sell' ? <button className='mt-1 py-1 px-5 text-sm shadow-md rounded-lg bg-red-600 text-white'>For Sell</button>
           :<button className='mt-1 py-1 px-5 text-sm shadow-md rounded-lg bg-green-600 text-white'>For Rent</button>}
          </div>
        <div className="flex flex-wrap items-center gap-3 text-[#4299E1]">
             <div className="flex items-center gap-x-2">
                    <FaBed  size={20} />
                    <span>{property?.beds} beds</span>
                </div> <span>|</span>
                <div className="flex items-center gap-x-2">
                    <FaBath size={20}/>
                    <span>{property?.baths} baths</span>
                </div><span>|</span>
                <div className="flex items-center gap-x-2">
                <BsFillGridFill size={20}/>
                    <span>{property?.sqft} sqft</span>
                </div>
        </div>
        </div>
        <img className='w-[50px] h-[50px] border rounded-full' src={property?.user?.profilePicture || defaultUser} />
      </div>
      <h1 className='font-semibold text-slate-900 my-6 text-xl'>{property?.name} </h1>
      <p className='text-zinc-600 tracking-wider leading-7'>{property?.description}</p>
      <div className="mt-8 flex items-center flex-wrap gap-5 sm:gap-x-10 text-[#418ecd] font-[500] text-md">
        <div className="flex items-center gap-x-2">
          <FaBed/> <span>{property?.beds} beds</span>
        </div>
        <div className="flex items-center gap-x-2">
          <FaBath/> <span>{property?.baths} baths</span>
        </div>
        <div className="flex items-center gap-x-2">
          <FaParking/> <span>{property?.parkingSpot ? 'Parking' : 'No Parking'} </span>
        </div>
        <div className="flex items-center gap-x-2">
          <GiSofa/> <span>{property?.furnished ? 'Furnished' : 'No furnished'} </span>
        </div>
      </div>
      <ContactLandloard _id={property?.user?._id} seller={property?.user?.name} name={property?.name} email={property?.user?.email} />
       </>}
    </div>
  )
}

export default PropertyPage
