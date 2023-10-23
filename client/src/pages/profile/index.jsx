import React, { useEffect, useState } from 'react'
import defaultUser from '../../images/defaultUser.png'
import { Link, useNavigate } from 'react-router-dom'
import UserListings from '../../components/UserListings'
import ListingItem from '../../components/ListingItem'
import { useDispatch, useSelector } from 'react-redux'
import { removeUser, setUser } from '../../store/userSlice'
import toast from 'react-hot-toast'
import axios from 'axios'
import { setLoading } from '../../store/loadingSlice'
import ProfileImgUpload from '../../components/ProfileImgUpload'

const ProfilePage = () => {
  const {loading}=useSelector(state=>state.loading)
  const {user}=useSelector(state=>state.user)
  const [isProfileEdit,setIsProfileEdit]=useState(false);
  const [profile,setProfile]=useState(null);
  const [userListings,setUserListings]=useState(null);

  const navigate=useNavigate();
 const dispatch=useDispatch();
  const signOutHandler=()=>{
    dispatch(removeUser());
    toast.success('User logout successfully!');
    navigate('/')
  }
  const validateToken=async()=>{
    try {
      const res=await axios.post('https://mern-estate-1vcf.onrender.com/api/auth/validate-token',{},{
        headers:{
          authorization:localStorage.getItem('mern-estate-token')
        }
      })
      const data=await res.data;
      dispatch(setLoading(false))

      if(data.success) {
        console.log(data);
        setProfile(data?.user)
      }else throw new Error(data.message)
    } catch (error) {
        toast.error(error.message)
    }
  }
  const fetchUserListings=async()=>{
    try {
      const res=await axios.get(`https://mern-estate-1vcf.onrender.com/api/listings/users/${user?._id}`,{
        headers:{
          authorization:localStorage.getItem('mern-estate-token')
        }
      });
      const data=await res.data;
      dispatch(setLoading(false))
      if(data.success) {
        console.log(data);
        setUserListings(data?.listings)
      }else throw new Error(data.message)
    } catch (error) {
      toast.error(error.message)
    }
  }
  const profileInputHandler=(e)=>{
    setProfile({...profile,[e.target.id]:e.target.value})
  }
  const updateProfile=async()=>{
   try {
    const res=await axios.put('https://mern-estate-1vcf.onrender.com/api/users/update-profile',profile,{
      headers:{
        authorization:localStorage.getItem('mern-estate-token')
      }
    })
    const data=await res.data;
    if(data.success) {
      console.log(data);
      setIsProfileEdit(false)
      dispatch(setUser(data.user))
      toast.success(data.message)
    }else throw new Error(data.message)
   } catch (error) {
      toast.error(error.message)
   }
   
  }
  useEffect(()=>{
    dispatch(setLoading(true))
    validateToken()
    fetchUserListings();
  },[])
  return (
    <div className='px-10 py-10 flex flex-col items-center justify-center'>
       {loading? <h1>Loading...</h1> :
       <>
        <h1 className='uppercase text-3xl text-center font-semibold mb-10'>Profile</h1>
        <img src={profile?.profilePicture || defaultUser} className='w-[80px] h-[80px] rounded-full border border-slate-300' alt='Default User Profile' />
       <ProfileImgUpload />
        <div className="sm:w-[80%] lg:w-[40%] mx-auto mb-8">
        <div className="mb-5">
            <input disabled={!isProfileEdit} placeholder='Name...' id='name' value={profile?.name}  onChange={profileInputHandler} className='w-full border py-3 px-4 rounded-lg outline-blue-600' />
        </div>
        <div className="mb-5">
            <input disabled={!isProfileEdit} placeholder='Email...' id='email' value={profile?.email} onChange={profileInputHandler} className='w-full border py-3 px-4 rounded-lg outline-blue-600' />
        </div>
       {isProfileEdit ? <button onClick={updateProfile} className='w-full py-2 rounded-lg text-white text-lg uppercase bg-slate-700 hover:bg-slate-600'>Update Profile</button>
        :
        <button onClick={()=>setIsProfileEdit(true)} className='w-full py-2 rounded-lg text-white text-lg uppercase bg-slate-700 hover:bg-slate-600'>Edit Profile</button>
  }
        <Link to={'/create-listing'}>
            <button className='mt-3 mb-10 w-full py-2 rounded-lg text-white text-lg uppercase bg-green-700 hover:bg-green-600'>Create Listing</button>
        </Link>
        <div className="flex items-center justify-between">
        <Link to={'/change-password'} className='ms-4 text-blue-600 underline'>Change Password</Link>
        <p onClick={signOutHandler} className='ms-4 text-blue-600 underline'>Sign Out</p>
        </div>
      </div>
      <UserListings userListings={userListings} />
      
       </>}
    </div>
  )
}

export default ProfilePage
