import React from 'react'
import Navbar from '../Components/Navbar'
import "../styles/Login.css"
import Footer from '../Components/Footer'

export default function Login() {
  return (
    <div>
      <Navbar />
  
      <div className="loginForm">
        <h1>Sign In</h1>
        <input placeholder="Username"></input>
        <input placeholder="Password"></input>
        <button><h2>Login</h2></button>
        <p>Not a Member? </p><a>Sign Up!</a>
        </div>
        <Footer />
    </div>
  )
}
