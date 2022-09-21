import React from 'react'
import Navbar from '../Components/Navbar'
import "../styles/Signup.css"
import Footer from '../Components/Footer'

import { signup, db, emailVerification } from '../firebase-config'
import { useRef, useState } from 'react'
import { doc , setDoc, serverTimestamp} from 'firebase/firestore'

export default function Signup() {

  const [loading, setLoading] = useState(false);

  const emailRef = useRef();
  const passwordRef = useRef();
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const userNameRef = useRef();
  

  async function handleSignup(){
    setLoading(true);
    try{
      await signup(emailRef.current.value, passwordRef.current.value).then (cred =>{
        setDoc(doc(db, "users", cred.user.uid), {
          firstName : firstNameRef.current.value,
          lastName : lastNameRef.current.value,
          userName : userNameRef.current.value,
          eMail : emailRef.current.value,
          timestamp : serverTimestamp()
          
        })
        emailVerification();
      })
    } catch (error){
      console.log(error);
    }
    setLoading(false);
  }

  return (
    <div>
      <Navbar />
  
      <div className="signupForm">
        <h1>Register</h1>
        <input type= "text" ref ={firstNameRef} placeholder="First Name"></input>
        <input type= "text" ref ={lastNameRef} placeholder="Last Name"></input>
        <input type= "text" ref ={userNameRef} placeholder="Username"></input>
        <input type = "email" ref = { emailRef }placeholder="Email" required></input>
        <input type = "password" ref= { passwordRef } placeholder="Password (8 Digits)" minLength="8" required></input>
        {/* <label><input type="checkbox"></input>Artist Application? Check this box to apply</label>  */}
        <button disabled = {loading} onClick={handleSignup}>Create</button>
        </div>
        
        <Footer />
    </div>
  )
}