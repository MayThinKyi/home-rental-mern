import React,{useEffect, useState} from 'react'
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import ImgUpload from '../../components/ImgUpload';
import { useNavigate } from 'react-router-dom';
import { setLoading } from '../../store/loadingSlice';
const CreateListingPage = () => {
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const {user}=useSelector((state)=>state.user);
  const [form,setForm]=useState({
    name:'',description:'',address:'',type:'sell',isAvailable:true,
    parkingSpot:false,furnished:false,offer:false,
    beds:1,baths:1,floors:1,sqft:1,
    regularPrice:1000,discountedPrice:0,
  });
  const [images,setImages]=useState([])
  const formHandler=(e)=>{
    if(e.target.id==='type') {
      setForm({...form,type:form?.type==='sell' ? 'rent':'sell'})
    }
    else if(e.target.id==='furnished' || e.target.id==='isAvailable' ||e.target.id==='offer'||e.target.id==='parkingSpot'){
      setForm({...form,[e.target.id]:e.target.checked})
    }else {
      setForm({...form,[e.target.id]:e.target.value})
    }
  }
  const submitHandler=async(e)=>{
    e.preventDefault();
    if(!form?.name.trim() ||!form?.description.trim() ||!form?.address.trim()|| images?.length<1){
      toast.error('All fields must be filled!')
    }else{
      try {
        dispatch(setLoading(true))
        const res=await axios.post('http://localhost:8000/api/listings/create-listing',{...form,user:user?._id,images},{
          headers:{
            authorization:localStorage.getItem('mern-estate-token')
          }
        })
        dispatch(setLoading(false))
        const data=await res.data;

        if(!data.success) throw new Error(data.message)
        else{
      console.log(data)
      dispatch(setLoading(false))
          toast.success(data.message)
          navigate('/')
      }
      } catch (error) {
        dispatch(setLoading(false))
        toast.error(error.message)
      }


    }
  }
 useEffect(()=>{
  console.log('images',images)
 },[images])

  return (
    <div className='py-10 px-5 sm:px-20'>
        <h1 className='uppercase text-3xl text-center font-semibold mb-10'>Create Listing</h1>
        <form onSubmit={submitHandler} className='my-10 flex gap-16 flex-wrap lg:flex-nowrap justify-between'>
          <div className='lg:w-[50%]'>
          <div className="mb-5">
            <input placeholder='Name...' id='name' value={form?.name} onChange={formHandler} className='w-full border py-3 px-4 rounded-lg outline-blue-600' />
        </div>
        <div className="mb-5">
          <textarea placeholder='Description...'  id='description' value={form?.description} onChange={formHandler}  className='w-full border py-3 px-4 rounded-lg outline-blue-600' >
          </textarea>
        </div>
        <div className="mb-5">
            <input placeholder='Address...' id='address' value={form?.address} onChange={formHandler} className='w-full border py-3 px-4 rounded-lg outline-blue-600' />
        </div>
        <div className="mb-5 flex items-center gap-x-5">
          <div className="mb-5 flex items-center gap-x-2">
              <input type='checkbox' id='type' checked={form?.type==='sell'} onChange={formHandler} className='w-5 h-5' />
              <span className='text-[16px]'>Sell</span>
          </div>
          <div className="mb-5 flex items-center gap-x-2">
              <input type='checkbox' id='type' checked={form?.type==='rent'} onChange={formHandler} className='w-5 h-5' />
              <span className='text-[16px]'>Rent</span>
          </div>
          <div className="mb-5 flex items-center gap-x-2">
              <input type='checkbox' id='isAvailable' checked={form?.isAvailable} onChange={formHandler} className='w-5 h-5' />
              <span className='text-[16px]'>Is available</span>
          </div>
        </div>
        <div className="mb-5 flex items-center gap-x-5">
          <div className="mb-5 flex items-center gap-x-2">
              <input type='checkbox' checked={form?.parkingSpot} id='parkingSpot' onChange={formHandler} className='w-5 h-5' />
              <span className='text-[16px]'>Parking spot</span>
          </div>
          <div className="mb-5 flex items-center gap-x-2">
              <input type='checkbox' checked={form?.furnished} id='furnished' onChange={formHandler} className='w-5 h-5' />
              <span className='text-[16px]'>Furnished</span>
          </div>
          <div className="mb-5 flex items-center gap-x-2">
              <input type='checkbox' checked={form?.offer}  id='offer' onChange={formHandler} className='w-5 h-5' />
              <span className='text-[16px]'>Offer</span>
          </div>
        </div>
        <div className="mb-5 flex items-center gap-x-10 ">
          <div className="flex items-center gap-x-4">
            <input type='number' min={1} id='beds' value={form?.beds} onChange={formHandler} className='w-[80px] border text-sm py-3 px-2 rounded-lg outline-blue-600' />
            <span>Beds</span>
          </div>
          <div className="flex items-center gap-x-4">
            <input type='number' min={1} id='baths' value={form?.baths} onChange={formHandler} className='w-[80px] border text-sm py-3 px-2 rounded-lg outline-blue-600' />
            <span>Baths</span>
          </div>
         
        </div>
        <div className="mb-5 flex items-center gap-x-10 ">
        <div className="flex items-center gap-x-4">
            <input type='number' min={1} id='floors' value={form?.floors} onChange={formHandler} className='w-[80px] border text-sm py-3 px-2 rounded-lg outline-blue-600' />
            <span>Floors</span>
          </div>
          <div className="flex items-center gap-x-4">
            <input type='number' min={1} id='sqft' value={form?.sqft} onChange={formHandler} className='w-[80px] border text-sm py-3 px-2 rounded-lg outline-blue-600' />
            <span>Sqft</span>
          </div>
        </div>
        <div className="my-5 flex items-center gap-x-5">
            <input type='number' min={1} id='regularPrice' value={form?.regularPrice} onChange={formHandler} className='w-[40%] border py-3 px-4 rounded-lg outline-blue-600' />
            <span>Regular price ($ / Month)</span>
        </div>
       {form?.offer &&  <div className="my-5 flex items-center gap-x-5">
            <input type='number' min={1} id='discountedPrice' value={form?.discountedPrice} onChange={formHandler} className='w-[40%] border py-3 px-4 rounded-lg outline-blue-600' />
            <span>Discounted price ($ / Month)</span>
        </div>}
          </div>
          <div className='g:w-[50%]'>
           <ImgUpload images={images} setImages={setImages} />
            <button  type='submit' className='w-full py-2 rounded-lg text-white text-lg uppercase bg-slate-700 hover:bg-slate-600'>Create Listing</button>


          </div>
        </form>
    </div>
  )
}

export default CreateListingPage
