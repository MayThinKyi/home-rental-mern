import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
import toast from 'react-hot-toast';
const SignUpPage = () => {
  const navigate=useNavigate();
   const [registerForm,setRegisterForm]=useState({
    name:'',email:'',password:''
   })
   const formHandler=(e)=>{
    setRegisterForm({...registerForm,[e.target.id]:e.target.value})
   }
   const submitHandler=async(e)=>{
    e.preventDefault();
    if(registerForm.name.trim() && registerForm.email.trim() && registerForm.password.trim() ){
      try {
        const res=await axios.post('http://localhost:8000/api/auth/register',registerForm);
        const data=await res.data;
        if(data.success)  {
          toast.success(data.message)
          navigate('/sign-in')
        }
        else throw new Error(data.message)
      } catch (error) {
        toast.error(error.message)
      }
    }else{
      toast.error('You must fill all fields!')
    }
    
   }
  return (
    <div className='px-10 py-20 '>
      <h1 className='uppercase text-3xl text-center font-semibold mb-10'>Sign Up</h1>
      <form onSubmit={submitHandler} className="sm:w-[80%] lg:w-[40%] mx-auto mb-8">
        <div className="mb-5">
            <input placeholder='Name...' id='name' value={registerForm?.name} onChange={formHandler}  className='w-full border py-3 px-4 rounded-lg outline-blue-600' />
        </div>
        <div className="mb-5">
            <input placeholder='Email...' id='email' value={registerForm?.email} onChange={formHandler}  className='w-full border py-3 px-4 rounded-lg outline-blue-600' />
        </div>
        <div className="mb-5">
            <input type='password'  placeholder='Password...' id='password' value={registerForm?.password} onChange={formHandler} className='w-full border py-3 px-4 rounded-lg outline-blue-600' />
        </div>
        <button type='submit' className='w-full py-2 rounded-lg text-white text-lg uppercase bg-slate-700 hover:bg-slate-600'>Sign Up</button>
      </form>
      <p className='text-center'>Have an account? <Link to={'/sign-in'} className='ms-4 text-blue-600 underline'>Sign in</Link></p>
    </div>
  )
}

export default SignUpPage
