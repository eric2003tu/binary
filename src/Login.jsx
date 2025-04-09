import React,{useEffect, useState} from 'react'
import './App.css'
import cover from './image.png'
import { Eye, EyeOff,Mail, User } from "lucide-react";
import { IoMdEyeOff } from "react-icons/io";
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [email,setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [disabled, setDisabled] = useState(true)
    const [signUpError, setSignUpError] = useState('')
    const [errorColor, setErrorColor] = useState('red')
    const navigate = useNavigate();
  
    useEffect(function(){
      const strongPass = (!/[a-z]/.test(password) || !/[A-Z]/.test(password) || !/[0-9]/.test(password) || !/^[a-zA-Z0-9]/.test(password) )
      if(!email || !password || strongPass ){
        setDisabled(true)
      }
      else{
        setDisabled(false)
      }
    },[email,password,disabled])
  
    const handleSignup = function(event){
      event.preventDefault()
      fetch('https://employee-management-app-ghrg.onrender.com/api/user/login',{
        method: 'POST',
        headers:{
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          email: email,
          password: password,
        })
      })
      .then(function(response){
        if(!response.ok){
          if(response.status === 404){
            setSignUpError('Bad request, check your inputs')
            setErrorColor('red')
            setTimeout(function(){
              setSignUpError('')
            },4000)
            throw new Error('Bad request,check your inputs')
          }
          else if(response.status === 500){
            setSignUpError('Internal server Error')
            setErrorColor('red')
            setTimeout(function(){
              setSignUpError('')
            },4000)
            throw new Error('Internal server error')
  
          }
          else if(response.status === 400){
            setSignUpError('Invalid inputs')
            setErrorColor('red')
            setTimeout(function(){
              setSignUpError('')
            },4000)
            throw new Error('Invalid inputs')
          }
          else{
            setSignUpError('another error occured'+ response.status)
            setErrorColor('red')
            setTimeout(function(){
              setSignUpError('')
            },4000)
            throw new Error('another error occured'+ response.status)
          }
        }
        return response.json()
      })
      .then(function(data){
        if(data){
          setSignUpError('User was successfully logged in')
          setErrorColor('green')
          setTimeout(function(){
            setSignUpError('')
            navigate('/dashboard')
          },4000)
          return
        }
        else{
          setSignUpError('User not found')
          setErrorColor('red')
          setTimeout(function(){
            setSignUpError('')
          },4000)
          return
        }
      })
      .catch(function(error){
        console.error('Failed to login the user, check your internet connections: ',error)
        setSignUpError('Failed to login the user, check your internet connections')
        setErrorColor('red')
        setTimeout(function(){
          setSignUpError('')
        },4000)
      })
    }
  
    return (
      <div className='grid sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 h-screen w-full right-0 top-0'>
        <div className=' hidden sm:hidden md:hidden lg:flex w-full h-full bg-center bg-cover align-text-bottom' style={{backgroundImage: `url(${cover})`}}>
          <div className=' text-center pl-[70px] mt-[70%] flex-col'>
            <p className='text-white text-start text-[24px]'>
              No Hazzles
            </p>
            <p className='text-white text-start text-[20px]'>Lorem ipsum dolo sit amet, consecteur<br/> adipiscing elit,sed do eiusmod</p>
  
          </div>
        </div>
        <div className='w-full bg-[#f5f5f5] h-full p-[30px]  pb-[10px] flex flex-col'>
          <h1 className='text-center text-blue-950 text-[27px] font-bold'>Login with your existing account</h1>
          <p className='text-center text-[18px]'>not yet registered? <a onClick={function(){
            navigate('/')
          }} className='text-[#42bf15] cursor-pointer hover:text-[19px]'>register </a> </p>
          <form className='self-center w-full h-fit flex flex-col gap-4 rounded-[5px] shadow-[1px_2px_6px_gray] mt-[14px] pl-[50px] pr-[50px] p-[10px] sm:p-[50px] md:p-[50px] lg:p-[20px] bg-[white]' onSubmit={handleSignup}>
            <h1 style={{color: errorColor}}>{signUpError}</h1>
            <div className='w-full grid sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-3'>
            </div>
            <div className='relative'>
            <label htmlFor='email' className=' text-gray-600'>Email address</label>
            <input type='email' name='email' placeholder='Your email address' value={email} onChange={function(e){
              setEmail(e.target.value)
            }} className='w-full border-b border-gray-400  p-[10px] rounded-[3px] bg-gray-100/50 text-blue-950 focus:border-b placeholder:text-gray-400'/>
            <button type="button" className="absolute right-3 top-2/3 transform -translate-y-1/2 text-sm text-gray-600" >
              <Mail/>
             </button>
            </div>
            <div className="relative">
            <label htmlFor='Password' className=' text-gray-600'>Password</label>
            <input type={showPassword ? "text" : "password"} name='password' value={password} onChange={function(e){
              setPassword(e.target.value)
            }} placeholder='Enter your password' className='w-full border-b border-gray-400  p-[10px] rounded-[3px] bg-gray-100/50 text-blue-950 focus:border-b placeholder:text-gray-400 focus:ring-blue-500'/>
            <button type="button" className= "absolute right-3 top-2/3 transform -translate-y-1/2 text-sm text-gray-600"
            onClick={() => setShowPassword(!showPassword)}>
              {(!showPassword || !password) ? <EyeOff/> : <Eye/>}
             </button>
            </div>
            <button type='submit' disabled={disabled} className={disabled ? 'self-end text-center text-white bg-gray-300 pl-[20px] pr-[20px] p-[10px] text-[25px] rounded-[10px] cursor-not-allowed' 
                : 'self-end cursor-pointer text-center text-white bg-[#42bf15] pl-[20px] pr-[20px] p-[10px] text-[25px] rounded-[10px]'}>
                    Login
                    </button>
          </form>
          <footer className='grid sm:grid-cols-1 md:flex-col-1  lg:grid-cols-2  bottom-0 right-0 w-full  p-[5px] text-gray-700  mt-[45px]'>
            <p className='text-gray-500'>By signing up, you agree to our <a className='text-[#42bf15]'>Terms </a> and <a className='text-[#42bf15]'>Privacy Policy</a></p>
            <p className='text-gray-500 sm:text-start md:text-start lg:text-end'>2019 Tinylabs. All rights reserved</p>
          </footer>
        </div>
      </div>
    )
  }

export default Login
