import React from 'react'
import {Logout, Logo} from './index'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import {TiArrowBack} from 'react-icons/ti'
import {BiLogOutCircle} from 'react-icons/bi'

function LoginUserProfile() {
  const users = useSelector(state =>state.userData[1]) 
  return (
    <>
    <div className=''>

      <div className='mb-5'>
        <span className='float-left text-5xl my-auto flex justify-center items-center'>
          <Link to = '/home'><TiArrowBack /></Link>
        </span>
        <Logo />
      </div>
        <div className='absolute bg-slate-600/60 w-full h-44 flex justify-center  px-10 mx-auto shadow-2xl rounded-b-2xl'>
          <img src={users.pic} alt="" />
        </div>
        <div className='bg-white w-32 h-32 flex justify-center mx-auto shadow-md rounded-full relative mt-28 '>
          <img src="" alt="" />
        </div>
        <div className=' mt-5 px-5'>
          <div className=' px-5 flex justify-center'>
            <h1 className='font-medium text-xl border-l border-black/40 px-3'>{users.name}</h1>
          </div>
          <div className='font-medium border-l border-black/40 mt-1 px-5'>
            <span className='float-right opacity-50'>@username</span>
            <h1>{users.username}</h1>
          </div>

        </div>
      <div className='flex absolute inset-x-0 bottom-3  px-2 gap-2'>
      <BiLogOutCircle className='py-auto'/><Logout />
      </div>
    </div>
    </>
    
  )
}

export default LoginUserProfile