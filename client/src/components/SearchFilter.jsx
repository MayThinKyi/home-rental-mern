import React, { useState } from 'react'
import {BiFilter} from 'react-icons/bi'
import { useSearchParams } from 'react-router-dom';

const SearchFilter = () => {
    const [params,setParams]=useState({});
    const [searchParams,setSearchParams]=useSearchParams()
    const filterHandler=(e)=>{
            setParams({...params,[e.target.id]:e.target.value})
        setSearchParams({...params,[e.target.id]:e.target.value})
    }
    const clearFilter=()=>{
        setParams({});
        setSearchParams({})
        window.location.reload()

    }
  return (
    <div className='mx-auto bg-[#EDF2F7]  py-5 px-2 sm:px-10'>
      <h1 className='font-semibold mb-8 text-2xl text-center flex items-center justify-center gap-x-5'>Search Property By Filters <span ><BiFilter/></span></h1>
        <div className="flex text-[15px] items-center justify-center gap-x-10 gap-y-5 flex-wrap">
            <select id='type' onChange={filterHandler} className='border py-2 px-4 rounded-lg outline-blue-600'>
                <option value="">Type</option>
                <option value="sell">Sell</option>
                <option value="rent">Rent</option>
            </select>
            <select id='price' onChange={filterHandler} className='border py-2 px-4 rounded-lg outline-blue-600'>
                <option value="">Price ($)</option>
                <option value="5000to15000">5000 - 15000</option>
                <option value="15000to30000">15000 - 30000</option>
                <option value="30000to45000">30000 - 45000</option>
                <option value="45000to80000">45000 - 80000</option>
                <option value="80000to100000">80000 - 100000</option>
                <option value="100000to300000">100000 - 300000</option>
                <option value="300000to800000">300000 - 800000</option>
                <option value="800000to1000000">800000 - 1000000</option>
            </select>
            <select id='sort' onChange={filterHandler} className='border py-2 px-4 rounded-lg outline-blue-600'>
                <option value="">Sort</option>
                <option value="price-asc">Lowest Price</option>
                <option value="price-desc">Highest Price</option>
                <option value="date-desc">Latest</option>
                <option value="date-asc">Oldest </option>
            </select>
            <select id='area' onChange={filterHandler} className='border py-2 px-4 rounded-lg outline-blue-600'>
                <option value="">Max Area (Sqft)</option>
                <option value="200to300">200 - 300</option>
                <option value="300to800">300 - 800</option>
                <option value="800to2000">800 - 2000</option>
                <option value="2000to5000">2000 - 5000 </option>
            </select>
            <select id='floors' onChange={filterHandler} className='border py-2 px-4 rounded-lg outline-blue-600'>
                <option value="">Floors</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4 </option>
                <option value="5">5 </option>
                <option value="6">6 </option>
            </select>
            <select id='baths' onChange={filterHandler} className='border py-2 px-4 rounded-lg outline-blue-600'>
                <option value="">Baths</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4 </option>
                <option value="5">5 </option>
            </select>
            <select id='furnished' onChange={filterHandler} className='border py-2 px-4 rounded-lg outline-blue-600'>
                <option value="">Furnished Type</option>
                <option value="true">Furnished</option>
                <option value="false">No furnished</option>
            </select>
            <button onClick={clearFilter} className='border py-2 px-5 font-[500] rounded-lg bg-white'>Clear Filter</button>
        </div>
    </div>
  )
}

export default SearchFilter
