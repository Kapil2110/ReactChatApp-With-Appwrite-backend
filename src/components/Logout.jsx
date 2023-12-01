import React from 'react'
import {logout as authLogout} from '../store/AuthSlice'
import authService from '../appwrite/Auth'
import setStatus from '../appwrite/Users'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function Logout() {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const Username = useSelector(state => state.userData[1].username)
  console.log("user logout username", Username)

  const logoutHandler = async () => {
    try {
      const updateStatus = await setStatus.updateStatus({Username}, false)
      if (updateStatus) {
        authService.logout().then(() => {
          dispatch(authLogout())
        })
        navigate('/')
      }
    } catch (error) {
      console.log('Chatter error:: in logout handler', error)
    }
  }
  return (
    <button onClick={logoutHandler}>Logout</button>
  )
}

export default Logout