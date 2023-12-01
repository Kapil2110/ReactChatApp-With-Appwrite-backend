import { useState } from 'react'
import {Input, Button, Logo} from './index'
import {useForm} from 'react-hook-form'
import {Link, useNavigate} from 'react-router-dom'
import authService from '../appwrite/Auth'
import userService from '../appwrite/Users'
import {login as authLogin} from '../store/AuthSlice'
import { useDispatch } from 'react-redux'

function Login() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [errors, setErrors] = useState("")
  const {register, handleSubmit} = useForm()

  const login = async(data) => {
    setErrors("")
    try {
      const session = await authService.login(data)
      if (session) {
        const Username = String(data.username)
        const Status = await userService.updateStatus({Username}, true)
        if (Status) {
        }
        const userinfo = await userService.getUser({Username})
        if(userinfo) {
          dispatch(authLogin({
            id: userinfo.documents[0].$id,
            name: userinfo.documents[0].Name,
            username: userinfo.documents[0].Username,
            pic: userinfo.documents[0].Profilepic,
            status: userinfo.documents[0].Status
          }))
          navigate('/home')
          
        }
        
      }
    } catch (error) {
      setErrors(error.message)
    }
  }
  
  
  return (
    
    <div className='flex  items-center justify-center'>
      <div className=' w-4/5 my-16 shadow-2xl shadow-slate-700/60 mx-auto rounded-2xl p-6 lg:w-2/5 border border-black/60'>
        <div className='mb-2 flex justify-center'>
          <span className="inline-block w-full max-w-[100px]">
            <Logo />
          </span>
        </div>

        <h2 className=' text-orange-500 text-center font-bold text-2xl leading-tight'>Sign in to your account</h2>
        <p className='text-base mt-2 text-center text-black/60'> Don&apos;t have any account?&nbsp;
          <Link to='/signup'
          className='font-medium text-primary transition-all duration-200 hover:underline hover:text-orange-500/60'
          >
            Sign Up
          </Link>
        </p>
        {/* implement code for errors */}
        {errors && <p className="text-red-600 mt-8 text-center">{errors}</p>}

        <form onSubmit={handleSubmit(login)} className='mt-2'>
          <div className='space-y-5'> 
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
              Login 
            </Button>
          </div>
        </form>

        </div>
    </div>
  )
}

export default Login