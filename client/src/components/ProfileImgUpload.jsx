import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { app } from './../firebase';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../store/userSlice';
import axios from 'axios';

const ProfileImgUpload = () => {
    
    const {user}=useSelector((state)=>state.user);
    const dispatch=useDispatch();
    const storage=getStorage(app)
    const updateProfile=async(imgUrl)=>{
        try {
            console.log('img',imgUrl)
         const res=await axios.put('http://localhost:8000/api/users/update-profile',{
            ...user,profilePicture:imgUrl
         },{
           headers:{
             authorization:localStorage.getItem('mern-estate-token')
           }
         })
         const data=await res.data;
         if(data.success) {
           console.log(data);
           dispatch(setUser(data.user))
           toast.success(data.message)
           window.location.reload()
         }else throw new Error(data.message)
        } catch (error) {
           toast.error(error.message)
        }
        
       }
    const uploadImgToFirebase=(f)=>{
        const storageRef = ref(storage,f.name);
const uploadTask = uploadBytesResumable(storageRef, f);
uploadTask.on('state_changed',
  (snapshot) => {
    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    console.log('Upload is ' + progress + '% done');
    switch (snapshot.state) {
      case 'paused':
        console.log('Upload is paused');
        break;
      case 'running':
        console.log('Upload is running');
        break;
    }
  }, 
  (error) => {
    switch (error.code) {
      case 'storage/unauthorized':
        // User doesn't have permission to access the object
        break;
      case 'storage/canceled':
        // User canceled the upload
        break;

      // ...

      case 'storage/unknown':
        // Unknown error occurred, inspect error.serverResponse
        break;
    }
  }, 
  () => {
    // Upload completed successfully, now we can get the download URL
    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
      console.log('File available at', downloadURL);
      updateProfile(downloadURL)


    });
  }
);

        
    }
    const fileHandler=(e)=>{
        let file=e.target.files[0];
        if(file.type?.includes('image/')) {
            uploadImgToFirebase(file)

        }
        else toast.error('Profile image must be an Image type!')
    }
  return (
    <div className="flex gap-x-4 my-10">
        <span>Image upload</span>
        <input onChange={fileHandler} type='file' />
    </div>
  )
}

export default ProfileImgUpload
