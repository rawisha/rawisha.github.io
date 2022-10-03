import React from 'react'
import Navbar from '../Components/Navbar'
import "../styles/Login.css"
import Footer from '../Components/Footer'
import { login,resetPassword} from '../firebase-config'
import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Login() {

  const navigate = useNavigate()

  const [clicked, setClicked] = useState(false);
  const [hideElements, setHideElements] = useState(true)
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  const emailRef = useRef();
  const emailResetRef = useRef();

  const passwordRef = useRef();

  function showReset(){
    setClicked((clicked) => !clicked);
    setHideElements((hideElements) => !hideElements);
  }

  const backHome = ()=>{
    setTimeout(() => {
      showReset()
      setError("")
      emailResetRef.current.value = ""
    }, 6000)
  } 
  

  const handleReset = async () => {
    setError('')
    setLoading(true);
    try {
      await resetPassword(emailResetRef.current.value)
      setSuccess("Reset mail sent! Follow the link and reset your password. You'll be shortly resend back to home.")
      setTimeout(() => {
        navigate('/')
      }, 4000)
    } catch (error) {
      console.log(error.code);
      if(error.code === 'auth/invalid-email') return setError ("Account doesn't exist! You'll be shortly resend back to sign in.");
      if(error.code === 'auth/user-not-found') return setError ("Account doesn't exist! You'll be shortly resend back to sign in");
      setError(error)
    }
    setLoading(false);
  }

  const handleLogin = async () => {
    setError('')
    setLoading(true);
    
    try{
      await login(emailRef.current.value, passwordRef.current.value)
      setSuccess('')
      setTimeout(() => {
        navigate('/')
      }, 300)
    } catch (err) {
      console.log(err.code);
      if(err.code === 'auth/wrong-password') return setError ("Wrong password! Try again.");
      if(err.code === 'auth/user-not-found') return setError ("Account doesn't exist! Please sign up.");
      if(err.code === 'auth/invalid-email') return setError ("Invalid mail! Try with another mail adress");
      setError('Login failed, try again!')
      emailRef.current.value = '';
      passwordRef.current.value = '';
    }
    setLoading(false);
  }
  
  return (
    <div>
      <Navbar />
        <div className="loginFormContainer">
          <form className="loginForm">
          <h1 style={{ display: hideElements ? "block" : "none" }}>Sign in</h1>
          <h1 style={{ display: clicked ? "block" : "none" }} >Reset Password</h1>
          <div className="output">
              {error && <div className="errorLogin" style={{ display: clicked ? "block" : "none" }}>{error}</div>}
              {success && <div className='success'>{success}</div>}
          </div>
            <input type="email" placeholder="Email" ref={emailRef}style={{ display: hideElements ? "block" : "none" }} required></input>
            <input type="email" placeholder="Email" ref={emailResetRef} style={{ display: clicked ? "block" : "none" }}required></input>

            <input type="password" placeholder="Password" ref={passwordRef} style={{ display: hideElements ? "block" : "none" }}required></input>
            <p className="reset" onClick={showReset} style={{ display: hideElements ? "block" : "none" }}><b>Reset Password?</b></p>
            <p className="resetBack" onClick={showReset} style={{ display: clicked ? "block" : "none" }}><b>&#x2190; Back</b></p>

            <button disabled={loading} onClick={ () => { handleReset(); backHome() } } style={{ display: clicked ? "block" : "none" }}><h2>Reset Password</h2></button>

            <button disabled={loading} onClick={handleLogin} style={{ display: hideElements ? "block" : "none" }}><h2>Login</h2></button>
            <p>Not a Member?  <a href="/signup">Sign Up!</a></p>
            
          </form>
        </div>
        <Footer />
    </div>
  )
}
