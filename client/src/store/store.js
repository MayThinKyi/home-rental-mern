import { configureStore } from '@reduxjs/toolkit'
import loadingReducer from './loadingSlice'
import userReducer from './userSlice'
export const store = configureStore({
  reducer: {
    loading:loadingReducer,
    user:userReducer,
  },
})