import React from 'react'

const ScreenLoading = () => {
  return (
    <div className=' fixed w-screen h-screen bg-black bg-opacity-60 z-[9999]'>
        <div className='w-10 h-10 border-[4px] absolute top-[45%] left-[45%] animate-spin border-t-transparent border-white rounded-full'></div>
    </div>
  )
}

export default ScreenLoading
