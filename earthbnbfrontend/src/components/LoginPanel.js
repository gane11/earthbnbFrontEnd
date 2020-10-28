import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {login} from '../store/actions/authentication'
import { Redirect } from 'react-router-dom';


const LoginPanel = (props)  => {
  const [email,setEmail] = useState("demo@example.com")
  const [password,setPassword] = useState('password');
  const dispatch = useDispatch()

  const token = useSelector(store => store.authentication.token)

  const handleSubmit = async (e) => {
    e.preventDefault()
    dispatch(login(email,password))
  }
  
  const updateEmail = (e) => {
    setEmail(e.target.value);
  }

  const updatePassword = (e) => {
    setPassword(e.target.value);
  }
  
  if(token) {
    return <Redirect to="/" />
  }
  return (
    <main>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={updateEmail}
        />
        <input 
          type="password"
          placeholder="Password"
          value={password}
          onChange={updatePassword}
        />
        <button type="submit">Login</button>
      </form>
    </main>
  )
}

export default LoginPanel
