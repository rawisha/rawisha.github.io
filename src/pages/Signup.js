import React from 'react'
import Navbar from '../Components/Navbar'
import "../styles/Signup.css"
import Footer from '../Components/Footer'
import { signup, db, emailVerification } from '../firebase-config'
import { useRef, useState } from 'react'
import { doc , setDoc, serverTimestamp } from 'firebase/firestore'
import UploadProductForm from '../Components/UploadProductForm'
import useCurrentUser from '../hooks/useCurrentUser'
import useCurrentArtist from '../hooks/useCurrentArtist'
import successImg from '../assets/success.png'
import { Link } from 'react-router-dom'


export default function Signup() {

  const currentUser = useCurrentUser()
  const currentArtist = useCurrentArtist()
  
  const [loading, setLoading] = useState(false);
  const [checked, setChecked] = useState(false);
  const [hideElements, setHideElements] = useState(true)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const artistNameRef = useRef();
  const textAreaTextRef = useRef();

  const [artist, setArtist] = useState('')
  const [upload, setUpload] = useState(false)
  const [uploadReady, setUploadReady] = useState(false)

  function showApplicationArtist(){
    setChecked((checked) => !checked);
    setHideElements((hideElements) => !hideElements);
  }

  async function handleSignupUser(){
    if(firstNameRef.current.value === '') return setError('Please fill in all fields')
    if(lastNameRef.current.value === '') return setError('Please fill in all fields')
    if(emailRef.current.value === '') return setError('Please fill in all fields')
    if(passwordRef.current.value === '') return setError('Please fill in all fields')
    setLoading(true);
    try{
      await signup(emailRef.current.value, passwordRef.current.value).then (cred =>{
        setDoc(doc(db, "users", cred.user.uid), {
          firstName : firstNameRef.current.value,
          lastName : lastNameRef.current.value,
          eMail : emailRef.current.value,
          wishList: [],
          cart: [],
          timestamp : serverTimestamp()
        })
        emailVerification();
      })
    } catch (error){
      setError(error)
    }
    setLoading(false);
    setSuccess(true)
  }

  async function handleSignupArtist(){
    if(!uploadReady) return setError('Please fill in all fields')
    if(firstNameRef.current.value === '') return setError('Please fill in all fields')
    if(lastNameRef.current.value === '') return setError('Please fill in all fields')
    if(artistNameRef.current.value === '') return setError('Please fill in all fields')
    if(emailRef.current.value === '') return setError('Please fill in all fields')
    if(passwordRef.current.value === '') return setError('Please fill in all fields')
    if(textAreaTextRef.current.value === '') return setError('Please fill in all fields')
    setLoading(true);
    try{
      await signup(emailRef.current.value, passwordRef.current.value).then (cred =>{
        setDoc(doc(db, "artists", cred.user.uid), {
          firstName : firstNameRef.current.value,
          lastName : lastNameRef.current.value,
          artistName : artistNameRef.current.value,
          eMail : emailRef.current.value,
          bio: textAreaTextRef.current.value,
          profilePic: 'https://firebasestorage.googleapis.com/v0/b/artzy-f21d3.appspot.com/o/profiles%2Fprofile_unknown.jpg?alt=media&token=ca8d2384-4d57-46f9-97b2-a915b9658577',
          status: 'pending',
          timestamp : serverTimestamp() 
        })
        emailVerification();
        setUpload(true)
      })
    } catch (error){
      setError(error)
    }
    setLoading(false);
    setSuccess(true)
  }
  

  return (
    <>
      <Navbar />
      {success ? 
      <div className='success-welcome-container'>
        <h1>Welcome {currentUser?.firstName || currentArtist?.firstName}!</h1>
        <img src={successImg} alt="success" />
        <h2>A verificationlink is sent to your e-mail</h2>
        <Link to="/">Go to Home</Link>
      </div> :
      <div className="signupForm">
        <h1 style={{ display: hideElements ? "block" : "none" }}>Register</h1>
        <h1 style={{ display: checked ? "block" : "none" }} >Artist Application</h1>
        <div className="checkboxDiv">
          <input type ="checkbox" id="checkbox" onClick={showApplicationArtist}></input>
          <p id="checkboxParagraph">Artist application? Check this box to apply</p>
        </div>
      
        <input type= "text" ref ={firstNameRef} placeholder="First Name" required></input>
        <input type= "text" ref ={lastNameRef} placeholder="Last Name" required></input>
        <input type= "text" ref ={artistNameRef} onChange={(e) => setArtist(e.target.value.trim())} style={{ display: checked ? "block" : "none" }} placeholder="Artist Name" required></input>
        <input type = "email" ref = { emailRef }placeholder="Email" required ></input>
        <input type = "password" ref= { passwordRef } placeholder="Password (8 Digits)" minLength="8" required></input>
        {error && !checked && <p className='error'>{error}</p>}
        <button disabled = {loading} style={{ display: hideElements ? "block" : "none" }}onClick={handleSignupUser}><h2>Create</h2></button>
      
        <div style={{ display: checked ? "block" : "none" }} className="applicationDiv">
        <p className="tell-us-more" style={{ display: checked ? "block" : "none" }}>Let us know more about you, please upload 3 pictures of your work and tell us about yourself</p>
          <div className='fileUploads'>
            <UploadProductForm upload={upload} artist={artist} setUploadReady={setUploadReady}/>
            <UploadProductForm upload={upload} artist={artist} setUploadReady={setUploadReady}/>
            <UploadProductForm upload={upload} artist={artist} setUploadReady={setUploadReady}/>
          </div>
          <div className="uploadForm"> 
            <textarea ref={textAreaTextRef} cols="80" rows="15" placeholder='About you and your work'></textarea>
            {error && <p className='error'>{error}</p>}
            <button disabled = {loading} onClick={ () => { handleSignupArtist() } } ><h2>Register</h2></button>
          </div>
        </div>   
      </div>}    
      <Footer />
    </>
  )
}
