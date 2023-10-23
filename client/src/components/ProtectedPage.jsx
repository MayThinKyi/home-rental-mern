import React, { useEffect } from 'react'
import axios from 'axios'
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
const ProtectedPage = ({children}) => {
  const navigate=useNavigate();
  const validateToken=async()=>{
   try {
     const res=await axios.post('https://mern-estate-1vcf.onrender.com/api/auth/validate-token',{},{
       headers:{
         authorization:localStorage.getItem('mern-estate-token')
       }
     });
     const data=await res.data;
     if(data.success) console.log(data)
     else{
      navigate('/sign-in')
      throw new Error(data.message)
    }
   } catch (error) {
    toast.error(error.message)
   }
  }
  useEffect(()=>{
    validateToken()
  },[])
  return (
    <div>
      {children}
    </div>
  )
}

export default ProtectedPage
