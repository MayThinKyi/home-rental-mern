import { Menu, Transition } from '@headlessui/react'
import { Fragment, useEffect, useRef, useState } from 'react'
import {FiMenu} from 'react-icons/fi'
import {FcHome,FcSearch} from 'react-icons/fc';
import {TbBuildingEstate} from 'react-icons/tb';
import {FaUserAlt} from 'react-icons/fa'
import {MdOutlineRealEstateAgent} from 'react-icons/md'
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
export default function Header() {
  const {user}=useSelector((state)=>state.user)
  const nav=[
    {icon:<FcHome/>,title:'Home',link:'/'},
    {icon:<FcSearch/>,title:'Search',link:'/search'},
    {icon:<TbBuildingEstate/>,title:'Buy Property',link:'/search?type=sell'},
    {icon:<MdOutlineRealEstateAgent/>,title:'Rent Property',link:'/search?type=rent'},

  ]
  return (
    <div className="flex py-5 px-10 border-b border-blue-200 z-[999999]">
      <div>
        <Link to={'/'} className='text-3xl font-bold text-blue-400'>Home</Link>
      </div>
      <div className="fixed top-4 right-10 text-right">
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="rounded-md  border p-3 font-medium text-slate-800 hover:bg-[#EDF2F7] hover:bg-opacity-30 focus:outline-blue-600 focus-visible:ring-2 ">
             <FiMenu size={20}/>
           
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className=" py-2 ">
              {nav?.map((item,key)=>{
                return  <Menu.Item key={key}>
                {({ active }) => (
                  <Link to={item?.link} 
                    className={`${
                      active ? 'bg-[#EDF2F7] text-slate-800' : 'text-slate-800'
                    } group flex w-full items-center px-4  py-3 text-sm `}
                  >
                    <div className="mr-4 h-5 w-5 text-2xl">
                    {item?.icon}
                    </div>
                  <p className='text-[15px]'>{item?.title}</p>
                  </Link>
                )}
              </Menu.Item>
              })}
              {user?.name ? <>
                <Menu.Item>
                {({ active }) => (
                  <Link to={'/profile'} 
                    className={`${
                      active ? 'bg-[#EDF2F7] text-slate-800' : 'text-slate-800'
                    } group flex w-full items-center px-4  py-3 text-sm `}
                  >
                    <div className="mr-4 h-5 w-5 text-xl">
                    <FaUserAlt/>
                    </div>
                  <p className='text-[15px]'>Profile</p>
                  </Link>
                )}
              </Menu.Item> 
              </>:<Menu.Item>
                {({ active }) => (
                  <Link to={'/sign-in'} 
                    className={`${
                      active ? 'bg-[#EDF2F7] text-slate-800' : 'text-slate-800'
                    } group flex w-full items-center px-4  py-3 text-sm `}
                  >
                    <div className="mr-4 h-5 w-5 text-xl">
                    <FaUserAlt/>
                    </div>
                  <p className='text-[15px]'>Sign in</p>
                  </Link>
                )}
              </Menu.Item>}
             
              
            </div>
           
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
    </div>
  )
}


  