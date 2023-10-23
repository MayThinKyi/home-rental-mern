import React from 'react'
import {IoMdCheckmarkCircle} from 'react-icons/io'
import {FaBed,FaBath} from 'react-icons/fa'
import {BsFillGridFill} from 'react-icons/bs';
import defaultUserProfile from '../images/defaultUser.png'
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import axios from 'axios';
const ListingItem = ({listing}) => {
  const navigate=useNavigate();
  const {user}=useSelector((state)=>state.user);
  const listingDeleteHandler=async()=>{
    try {
      const res=await axios.delete(`https://mern-estate-1vcf.onrender.com/api/listings/${listing?._id}`,{
        headers:{
          authorization:localStorage.getItem('mern-estate-token')
        }
      });
      const data=await res.data;
      if(data.success){
        console.log(data);
        toast.success(data.message);
        navigate('/')
      }else throw new Error(data.message)
    } catch (error) {
      toast.error(error.message)
    }
  }
  return (<div className='flex flex-col'>
    <Link to={`/properties/${listing?._id}`} className='cursor-pointer'>
      <img src={listing?.images[0]} 
      className='w-full h-[250px]  object-center ' />
        <div className=" py-1">
          <div className="flex items-center justify-between">
          <h1 className='text-xl font-semibold mt-3 mb-2 flex items-center gap-x-2'>
            <IoMdCheckmarkCircle color='#48BB78'/>
            <p>${listing?.regularPrice} /monthly</p>
            </h1>
          <img className='w-[40px] h-[40px] border border-slate-300 object-cover rounded-full' 
          src={listing?.user?.profilePicture || defaultUserProfile } />
          </div>
            <h1 className='text-[17px] font-[500]  mb-3'>{listing?.address}</h1>
             <div className="flex items-center gap-x-3 text-[#4299E1]">
             <div className="flex items-center gap-x-2">
                    <FaBed  size={20} />
                    <span>{listing?.beds} beds</span>
                </div> <span>|</span>
                <div className="flex items-center gap-x-2">
                    <FaBath size={20}/>
                    <span>{listing?.baths} baths</span>
                </div><span>|</span>
                <div className="flex items-center gap-x-2">
                <BsFillGridFill size={20}/>
                    <span>{listing?.sqft} sqft</span>
                </div>
             </div>
        </div>
    </Link>
    {window.location.pathname==='/profile' && listing?.user?._id===user?._id &&
              <div className="text-[15px]  flex items-center gap-x-8 mt-2 ">
             <Link to={`/edit-listing/${listing?._id}`} className='text-blue-600 underline'>Edit</Link>
              <h1 onClick={listingDeleteHandler} className='text-red-600 underline'>Delete</h1>
             </div>}
    </div>
  )
}

export default ListingItem
