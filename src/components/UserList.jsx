import React, { useState } from 'react'
import {Container, Logo, Search} from './index'
import imgs from '../assets/kapiltrns1.png'
import {Link, useNavigate} from 'react-router-dom'
import { useSelector } from 'react-redux'
import {BsPersonFillAdd} from 'react-icons/bs'

const  UserList = ({ onUserClicks}) => {
  const listUser = useSelector(state => state.users)
  const [usersData, setUsersData] = useState([])
  const navigate = useNavigate()

  const handleUserClick = (user) => {
    setUsersData(user)
  }

  const onProfileClick = () => {
    navigate('/UserProfile')
  }

  const onSearch = () => {
    navigate('/search')
  }



  if(listUser) {
    return (
      <div className='h-auto md:w-2/5 lg:w-1/4 '>
        <Container >
          <div className='bg-orange-400 rounded-xl flex justify-between h-20 my-2 px-3 items-center'>
              <div>
                <Logo />
              </div>
  
              <div className='flex gap-3'>
                <div className='bg-white rounded-full p-1' onClick={onSearch}>
                  <BsPersonFillAdd
                  className='rounded-full w-8 h-8 text-orange-600' />
                </div>
                <div className='bg-white rounded-full p-1' onClick={onProfileClick}>
                  <img src={imgs} alt=""
                  className='rounded-full w-8 h-8' />
                </div>
              </div>
          </div>
          
            {listUser && listUser.map((user) => (
              <Link to='/messages'>
                <div key={user.id} className='flex gap-4 px-3 p-2  shadow-md ' onClick={() => onUserClicks(user)}>
                    <div className=''>
                      <img className='w-16 h-20 rounded-full' src={user.pic} alt="" />
                    </div>
  
  
                    <div className='p-3 items-center'>
                      <h1 className='text-xl font-bold'>{user.name}</h1>
                      <span className='text-lg font-semibold'>{user.msg}</span>
                    </div> 
                </div>
              </Link>
            )).reverse()}
          
        </Container>
      </div>
    )
  }else {
    return (
      <>
        <div className='bg-orange-500 flex justify-between h-20 my-2 px-3 items-center'>
                <div>
                  <Logo />
                </div>
    
                <div className='flex gap-3'>
                  <div className='bg-white rounded-full p-1' onClick={onSearch}>
                    <BsPersonFillAdd
                    className='rounded-full w-8 h-8' />
                  </div>
                  <div className='bg-white rounded-full p-1' onClick={onProfileClick}>
                    <img src={imgs} alt=""
                    className='rounded-full w-8 h-8' />
                  </div>
                </div>
            </div>
        <h1>Loading</h1>
      </>
    )
  }
  
}

export default UserList