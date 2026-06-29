import React, { useState } from "react";
import  type {FormEvent}  from 'react'
import "../auth.form.scss";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../hooks/useAuth";
export const Login = () => {
    const navigate = useNavigate()
    const {loading,handleLogin}= useAuth()

    const [userName, setUserName] = useState("")
    const [password, setPassword] = useState("")
    
    const handleSubmit=async(e:FormEvent<HTMLFormElement>)=>{

        e.preventDefault()
        await handleLogin({userName,password})
        navigate("/")

    }
    if(loading){
        return(
            <main>
                <h1>Loading.....</h1>
            </main>
        )
    }
  return (
    <main>
        <div className='form-container'>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <div className='input-group'>
                      <label htmlFor='userName'>username</label>
                      <input
                      value={userName} 

                    onChange={(e)=>{setUserName(e.target.value)}}
                      type='text' id='userName' name='userName' placeholder='Enter username'></input>
                      
                  </div>
                <div className='input-group'>
                    <label htmlFor='password'>Password</label>
                    <input
                    value={password}

                    onChange={(e)=>{setPassword(e.target.value)}}
                    type='password' id='password' name='password' placeholder='Enter password '></input>
                </div>
                <button className='button primary-button'>Login</button>
            </form>
            <p>No account yet.. <Link to={"/register"}>Sign Up</Link></p>
        </div>
    </main>
  )
}
