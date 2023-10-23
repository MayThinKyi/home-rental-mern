import axios from 'axios';
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import { setUser } from '../../store/userSlice';

const SignInPage = () => {
  const dispatch=useDispatch();
  const navigate=useNavigate();
   const [loginForm,setLoginForm]=useState({
    email:'',password:''
   })
   const formHandler=(e)=>{
    setLoginForm({...loginForm,[e.target.id]:e.target.value})
   }
   const submitHandler=async(e)=>{
    e.preventDefault();
    if( loginForm.email.trim() && loginForm.password.trim() ){
      try {
        const res=await axios.post('https://mern-estate-1vcf.onrender.com/api/auth/login',loginForm);
        const data=await res.data;
        if(data.success)  {
          toast.success(data.message)
          dispatch(setUser(data?.user))
          localStorage.setItem('mern-estate-token',data?.token)
          navigate('/')
        }
        else throw new Error(data.message)
      } catch (error) {
        toast.error(error.message)
      }
      
    }else toast.error('You must fill all Fields!')
    
   }
  return (
    <div className='px-10 py-20 '>
      <h1 className='uppercase text-3xl text-center font-semibold mb-10'>Sign In</h1>
      <form onSubmit={submitHandler} className="sm:w-[80%] lg:w-[40%] mx-auto mb-8">
        <div className="mb-5">
            <input placeholder='Email...' id='email' value={loginForm?.email} onChange={formHandler} className='w-full border py-3 px-4 rounded-lg outline-blue-600' />
        </div>
        <div className="mb-5">
            <input type='password' placeholder='Password...' id='password' value={loginForm?.password} onChange={formHandler} className='w-full border py-3 px-4 rounded-lg outline-blue-600' />
        </div>
        <button type='submit' className='w-full py-2 rounded-lg text-white text-lg uppercase bg-slate-700 hover:bg-slate-600'>Sign In</button>
      </form>
      <p className='text-center'>Dont Have an account? <Link to={'/sign-up'} className='ms-4 text-blue-600 underline'>Sign up</Link></p>
    </div>
  )
}

export default SignInPage
