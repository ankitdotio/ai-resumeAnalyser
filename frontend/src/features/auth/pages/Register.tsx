import React, { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router'

import { useAuth } from '../hooks/useAuth'

export const Register = () => {

    
    const [userName, setUserName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const {loading,handleRegister} = useAuth()

    const navigate = useNavigate()
  const handleSumbit=async(e:FormEvent<HTMLFormElement>)=>{
          e.preventDefault()
          await handleRegister({userName,email,password})
            navigate("/")
      }

      if(loading){
        return( 
            <main>Loading......</main>
        )
      }
    return (
      <main>
          <div className='form-container'>
              <h1>Register</h1>
              <form onSubmit={handleSumbit}>
                  <div className='input-group'>
                      <label htmlFor='email'>Email</label>
                      <input
                        value={email}
                        onChange={(e)=>{setEmail(e.target.value)}}
                      type='email' id='email' name='email' placeholder='Enter email address'></input>
                      
                  </div>
                  <div className='input-group'>
                      <label htmlFor='userName'>username</label>
                      <input
                      value={userName}
                      onChange={(e)=>setUserName(e.target.value)}
                      type='text' id='userName' name='userName' placeholder='Enter username'></input>
                      
                  </div>
                  <div className='input-group'>
                      <label htmlFor='password'>Password</label>
                      <input 
                      value={password}
                      onChange={(e)=>setPassword(e.target.value)}
                      type='password' id='password' name='password' placeholder='Enter password '></input>
                  </div>
                  <button className='button primary-button'>Register</button>
              </form>
              <p>Already have an account? <Link to={"/login"}>Login</Link></p>
          </div>
      </main>
    )
}
