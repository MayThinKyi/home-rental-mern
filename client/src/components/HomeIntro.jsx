import React from 'react'
import { Link } from 'react-router-dom'
const HomeIntro = ({img,text1,title,text2,btnText}) => {
  return (
    <div className='flex flex-wrap md:flex-nowrap items-center justify-center gap-x-10 py-10'>
      <img src={img} className='h-[300px] w-[500px] object-cover' />
      <div className="flex flex-col mt-6 md:mt-0 md:w-[30%]">
        <p className='text-zinc-500 text-[15px] sm:text-md'>{text1}</p>
        <h1 className='font-bold my-3 text-black text-3xl sm:text-4xl'>{title}</h1>
        <p className='text-md sm:text-lg text-zinc-500'>{text2}</p>
        <Link to={text1==='RENT A HOME'? '/search?type=rent':'/search?type=sell'} className='mt-6 bg-zinc-100 text-center  hover:bg-zinc-200 text-zinc-800 text-md py-3 px-5 rounded-lg text-lg font-semibold'>{btnText}</Link>
      </div>
    </div>
  )
}

export default HomeIntro
