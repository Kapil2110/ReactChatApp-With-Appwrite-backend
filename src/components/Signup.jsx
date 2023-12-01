import React, { useState } from 'react'
import {Input, Button, Logo} from './index'
import {useForm} from 'react-hook-form'
import {Link, useNavigate} from 'react-router-dom'
import authService from '../appwrite/Auth'
import {login} from '../store/AuthSlice'
import { useDispatch } from 'react-redux'
import userService from '../appwrite/Users'


function Signup() {
  const [errors, setErrors] = useState("")
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { register, handleSubmit} = useForm()

  const create = async(data) => {
    setErrors("")
    try {
      const userData = await authService.createAccount(data)
      if (userData) {
        const userData = await authService.getCurrentUser()
        if (userData){
          let Name = String(data.name)
          let Email = String(data.email)
          let Status = userData.status 
          let Username = String(data.username)
          const userCreate = await userService.createUser({Name, Email, Status, Username})
          if(userCreate){

            dispatch(login({
              id: userCreate.$id,
              name: userCreate.Name,
              username: userCreate.Username,
              pic: userCreate.Profilepic,
              status: userCreate.Status
            }))
            navigate('/home') 
          }
        }
      }
    } catch (error) {
      setErrors(error.message)
    }
  }


  return (
    <div className='flex  items-center justify-center'>
      <div className=' w-4/5 my-10 shadow-2xl mx-auto rounded-2xl p-6 lg:w-2/5 border border-black/60'>
        <div className='mb-2 flex justify-center'>
          <span className="inline-block w-full max-w-[100px]">
            <Logo />
          </span>
        </div>

        <h2 className=' text-orange-500 text-center font-bold text-2xl leading-tight'>Sign Up to create a account</h2>
        <p className='text-base mt-2 text-center text-black/60'>Already have an account? &nbsp;
          <Link to='/'
          className='font-medium text-primary transition-all duration-200 hover:underline hover:text-orange-500/60'
          >
            Signin
          </Link>
        </p>
        {/* implement code for errors */}
        {errors && <p className="text-red-600 mt-8 text-center">{errors}</p>}

        <form onSubmit={handleSubmit(create)} className='mt-2'>
          <div className='space-y-5'> 

            <Input
            label = 'FullName:'
            placeholder= 'Enter Your Name...'
            {...register('name', {
              required: true,
            })} 
            />

            <Input
            label = "Email:"
            placeholder = "Enter your email.." 
            {...register("email", {
              required: true,
              validate: {
                  matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                  "Email address must be a valid address",
              }
          })}
            />

            <Input
            label = 'Username'
            placeholder = 'Small caps..'
            {...register('username', {
              required: true,
            })} 
            />

            <Input
            label="Password: "
            type="password"
            placeholder="Enter your password"
            {...register("password", {
                required: true,})}
            />

            <Button className='w-full hover:bg-orange-600/60' type='submit'>
              Create Account
            </Button>
          </div>
        </form>

        </div>
    </div>
  )
}

export default Signup