/* eslint-disable no-unsafe-optional-chaining */
import React,{useState} from 'react'
import { toast } from 'react-hot-toast';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { app } from '../firebase';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from '../store/loadingSlice';

const ImgUpload = ({images,setImages}) => {
    const storage = getStorage(app);
    const [files,setFiles]=useState([]);
    const uploadImageToFirebase=(file)=>{
        const storageRef = ref(storage, '/' + file.name);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on('state_changed',(snapshot) => { }, 
  (error) => {
    switch (error.code) {
      case 'storage/unauthorized':
        break;
      case 'storage/canceled':
        break;
      case 'storage/unknown':
        break;
    }
  }, 
  () => {
    // Upload completed successfully, now we can get the download URL
    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
      console.log('File available at', downloadURL);
      setImages((images)=>[...images,downloadURL]);
    });
  }
);

    } 
    const uploadFilesHandler=()=>{

       if(files?.length>6) toast.error('Images must not be greater than 6!')
       else{
        files?.map((f)=>{
            if(!f?.type?.includes('image/')) toast.error('All images ust be Image type only!')
            else  {
               uploadImageToFirebase(f);
            }
        }) 

    }
        

    };
    const fileHandler=(e)=>{
        setFiles(Array.from(e.target.files));
        setImages([]);
    }
    const deleteImgHandler=(src)=>{
      let imgArray=images;
      imgArray=imgArray.filter((i)=>i!==src);
      setImages([...imgArray])
    }
    
  return (
    <div className="mb-5">
    <p className='mb-3'><span className='font-semibold'>Images:</span> The first image will be the cover (max 6)</p>
    <div className="flex items-center gap-x-5">
    <input type='file'   onChange={fileHandler}  multiple={true} className='w-full border py-3 px-4 rounded-lg outline-blue-600' />
    <button disabled={files?.length==images?.length} onClick={uploadFilesHandler} type='button' className={`w-[150px] py-2 rounded-lg text-zinc-600 text-[16px] uppercase border border-green-700 
    ${files?.length==images?.length ? 'bg-slate-400 ':''} `}>Upload</button>
    </div>
    <h1 className='font-[500] my-3'>Images:</h1>
    {images?.map((i,key)=>{
        return <div key={key} className="flex items-center mb-2">
          <img className='h-[60px] w-[60px] object-cover' src={i}  />
          <button type='button' onClick={()=>deleteImgHandler(i)} className='text-red-600 text-md hover:underline py-2 px-5 rounded-lg '>Delete</button>
        </div>
    })}
  </div>
  )
}

export default ImgUpload
