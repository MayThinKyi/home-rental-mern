import { createSlice } from '@reduxjs/toolkit'
export const userSlice = createSlice({
    name: 'user',
    initialState:{
        user:JSON.parse(localStorage.getItem('mern-estate-user'))||[]
    },
    reducers: {
     setUser:(state,action)=>{
        state.user=action.payload
        localStorage.setItem('mern-estate-user',JSON.stringify(action.payload))
     },
     removeUser:(state)=>{
        state.user=[];
        localStorage.removeItem('mern-estate-user')
        localStorage.removeItem('mern-estate-token')
     },
    
    },
  })
  
  export const {setUser ,removeUser} = userSlice.actions
  
  export default userSlice.reducer