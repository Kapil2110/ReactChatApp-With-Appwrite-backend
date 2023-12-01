import React, { useState } from 'react'
import {Input, Button, Logo} from './index'
import userService from '../appwrite/Users'
import { useDispatch } from 'react-redux'
import { storeUser } from '../store/AuthSlice'
import { useNavigate, Link} from 'react-router-dom'
import {TiArrowBack} from 'react-icons/ti'

function Search() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [Username, setUserName] = useState('')
  const [user, setUser] = useState([{
    id: '',
    name: '',
    username: '',
    pic: '',
    status: false,
  }])

  const searchUser = async (Username) => {
    const userinfo = await userService.getUser({Username})
    if(userinfo) {
      setUser({
        id: userinfo.documents[0].$id,
        name: userinfo.documents[0].Name,
        username: userinfo.documents[0].Username,
        pic: userinfo.documents[0].Profilepic,
        status: userinfo.documents[0].Status
      })
    }
    setUserName('')
  }

  const addUser = (user) => {
    if(user) {
      dispatch(storeUser(user))
      navigate('/home')
    }
  }

  

  return (
    <div className='flex justify-center items-center'>
      <div className='w-5/6 h-screen px-2 py-5 border shadow-xl rounded-b-3xl '>
        <div className='mb-5'>
          <span className='float-left text-5xl my-auto flex justify-center items-center'>
            <Link to = '/home'><TiArrowBack /></Link>
          </span>
          <Logo />
        </div>
        <div className='flex justify-around gap-4 '>
          <div className='w-5/6 flex justify-center'>
            <Input
            className = ''
            placeholder = 'Search User...' 
            value = {Username}
            onChange = {(e) => setUserName(e.target.value)}
            />
            <Button className='h-10'
            onClick={() => searchUser(Username)}
            >Search</Button>
          </div>
        </div>

        <div className=' mt-5 px-5'>
          <div className='flex gap-3'>

            <div className='bg-white rounded-full p-1'>
              <img src={user.pic} alt="" 
              className='rounded-full w-8 h-8'/>
            </div>

            <div className='text-lg font-bold '>
            <h1 onClick={() => addUser(user)}>{user.username}</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Search