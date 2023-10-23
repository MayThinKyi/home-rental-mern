import axios from 'axios';
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import { setUser } from '../../store/userSlice';

const ChangePasswordPage = () => {
  const dispatch=useDispatch();
  const navigate=useNavigate();
   const [passwordForm,setPasswordForm]=useState({
    oldPassword:'',newPassword:''
   })
   const formHandler=(e)=>{
    setPasswordForm({...passwordForm,[e.target.id]:e.target.value})
   }
   const submitHandler=async(e)=>{
    e.preventDefault();
    if( passwordForm.oldPassword.trim() && passwordForm.newPassword.trim() ){
      try {
        const res=await axios.put('http://localhost:8000/api/users/update-password',passwordForm,{
            headers:{
                authorization:localStorage.getItem('mern-estate-token')
            }
        });
        const data=await res.data;
        if(data.success)  {
          toast.success(data.message)
         
          navigate('/profile')
        }
        else throw new Error(data.message)
      } catch (error) {
        toast.error(error.message)
      }
      
    }else toast.error('You must fill all Fields!')
    
   }
  return (
    <div className='px-10 py-20 '>
      <h1 className='uppercase text-3xl text-center font-semibold mb-10'>Change Password</h1>
      <form onSubmit={submitHandler} className="sm:w-[80%] lg:w-[40%] mx-auto mb-8">
        <div className="mb-5">
            <input  type='password' placeholder='Old Password...' id='oldPassword' value={passwordForm?.oldPassword} onChange={formHandler} className='w-full border py-3 px-4 rounded-lg outline-blue-600' />
        </div>
        <div className="mb-5">
            <input type='password' placeholder='New Password...' id='newPassword' value={passwordForm?.newPassword} onChange={formHandler} className='w-full border py-3 px-4 rounded-lg outline-blue-600' />
        </div>
        <button type='submit' className='w-full py-2 rounded-lg text-white text-lg uppercase bg-slate-700 hover:bg-slate-600'>Update Password</button>
      </form>
      <p className='text-center'>Go to <Link to={'/profile'} className='ms-1 text-lg text-blue-600 underline'>profile</Link></p>
    </div>
  )
}

export default ChangePasswordPage
