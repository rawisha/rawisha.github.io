import React from 'react'
import Navbar from '../Components/Navbar'
import "../styles/Login.css"
import Footer from '../Components/Footer'
import { login } from '../firebase-config'
import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Login() {

  const navigate = useNavigate()

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const emailRef = useRef();
  const passwordRef = useRef();

  const handleLogin = async () => {
    setError('')
    setLoading(true);
    
    try{
      await login(emailRef.current.value, passwordRef.current.value)
      setSuccess('You are now logged in')
      setTimeout(() => {
        navigate('/')
      }, 200)
    } catch (err) {
      setError('Login failed, try again!')
      emailRef.current.value = ''
      passwordRef.current.value = ''
    }
    setLoading(false);
  }
  
  return (
    <div>
      <Navbar />
        <div className="loginFormContainer">
          <form className="loginForm">
            <h1>Sign In</h1>
            <input type="email" placeholder="Email" ref={emailRef}></input>
            <input type="password" placeholder="Password" ref={passwordRef}></input>
            <div className="output">
              {error && <div className="error">{error}</div>}
              {success && <div className='success'>{success}</div>}
            </div>
            <button disabled={loading} onClick={handleLogin}><h2>Login</h2></button>
            <p>Not a Member? </p><a href="/signup">Sign Up!</a>
          </form>
        </div>
        <Footer />
    </div>
  )
}
