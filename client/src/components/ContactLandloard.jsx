import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ContactLandloard = ({_id,seller,name,email}) => {
    const [isContactOpen,setIsContactOpen]=useState(false);
    const [message,setMessage]=useState('');
    const {user}=useSelector((state)=>state.user);
  return (
    <div className='my-10'>
     {_id!==user?._id && <>
      {user?.name ? 
     <div className='sm:w-[80%] md:w-[60%] xl:w-[40%]'>
        {isContactOpen ? <><h1 className='text-slate-800 font-[500] mb-2 text-lg'>Contact {seller} for {name}</h1> 
     <textarea rows={5} value={message} onChange={(e)=>setMessage(e.target.value)} placeholder='Send message...'  className='text-[15px] p-3 w-full my-4 border border-slate-300 rounded-lg outline-blue-600'></textarea>
     <Link to={`mailto:${email}?subject=Regarding ${name}&body=${message}`} className="w-full bg-slate-600 hover:bg-slate-500 border tracking-wide font-[500] uppercase text-white py-4 px-5 rounded-lg">
        Send Message
     </Link></> : 
     <button onClick={()=>setIsContactOpen(true)} className="w-full bg-slate-600 hover:bg-slate-500 border tracking-wide font-[500] uppercase text-white py-4 px-5 rounded-lg">
        Contact Landloard
     </button> }
     
     </div> : <h1 className=' text-lg tracking-wider'>Please <Link to={'/sign-in'} className='text-blue-600 underline'>Sign in</Link> first to contact Landloard!</h1>}

     </>}
    </div>
  )
}

export default ContactLandloard
