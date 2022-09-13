import React from 'react'
import Navbar from '../Components/Navbar'
import "../styles/Signup.css"
import Footer from '../Components/Footer'

export default function Signup() {
  return (
    <div>
      <Navbar />
  
      <div className="signupForm">
        <h1>Register</h1>
        <input placeholder="Full Name"></input>
        <input placeholder="Username"></input>
        <input placeholder="Password (8 Digits)"></input>
        <input placeholder="Email"></input>
        <button>Create</button>
       
        </div>
        <Footer />
    </div>
  )
}