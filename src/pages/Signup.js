import React from 'react'
import Navbar from '../Components/Navbar'
import "../styles/Signup.css"
import Footer from '../Components/Footer'

import { signup, db, emailVerification,storage } from '../firebase-config'
import { useRef, useState } from 'react'
import { doc , setDoc, serverTimestamp} from 'firebase/firestore'
import { ref,uploadBytesResumable } from "firebase/storage"


export default function Signup() {

  const emailRef = useRef();
  const passwordRef = useRef();
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const userNameRef = useRef();
  const artistNameRef = useRef();
  const textAreaTextRef = useRef();

  const [loading, setLoading] = useState(false);
  const [checked, setChecked] = useState(false);
  const [urls, setUrls] = useState([])
  // State to store uploaded file
  const [images, setImages] = useState([]);
  const [progress, setProgress] = useState(0);
  

  const handleChange = (e) => {
    
    for (let i = 0; i < e.target.files.length; i++) {
      const newImage = e.target.files[i];
      newImage["id"] = Math.random();
      setImages((prevState) => [...prevState, newImage]);
    }
  };

  const handleUpload = () => {
    const promises = [];
    images.map((image) => {
      const uploadTask = storage.ref(`testing/${image.name}`).put(image);
      promises.push(uploadTask);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setProgress(progress);
        },
        (error) => {
          console.log(error);
        },
        async () => {
          await storage
            .ref("testing")
            .child(image.name)
            .getDownloadURL()
            .then((urls) => {
              setUrls((prevState) => [...prevState, urls]);
            });
        }
      );
    });

    Promise.all(promises)
      .then(() => alert("All images uploaded"))
      .catch((err) => console.log(err));
  };

  console.log("images: ", images);
  console.log("urls", urls);

  function showApplicationArtist(){
    setChecked((checked) => !checked);
  }
  

  async function handleSignupUser(){
    setLoading(true);
    try{
      await signup(emailRef.current.value, passwordRef.current.value).then (cred =>{
        setDoc(doc(db, "users", cred.user.uid), {
          firstName : firstNameRef.current.value,
          lastName : lastNameRef.current.value,
          userName : userNameRef.current.value,
          eMail : emailRef.current.value,
          wishList: [],
          timestamp : serverTimestamp()
          
        })
        emailVerification();
      })
    } catch (error){
      console.log(error);
    }
    setLoading(false);
  }

  async function handleSignupArtist(){
    setLoading(true);
    try{
      await signup(emailRef.current.value, passwordRef.current.value).then (cred =>{
        setDoc(doc(db, "artists", cred.user.uid), {
          firstName : firstNameRef.current.value,
          lastName : lastNameRef.current.value,
          artistName : artistNameRef.current.value,
          eMail : emailRef.current.value,
          bio: textAreaTextRef.current.value,
          timestamp : serverTimestamp() 
        })
        emailVerification();
      })
    } catch (error){
      console.error(error);
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
        <button disabled = {loading} /* onClick={handleSignupUser} */><h2>Create</h2></button>
        
      <div className="checkboxDiv">
        <input type ="checkbox" id="checkbox" onClick={showApplicationArtist}></input>
        <p id="checkboxParagraph">Artist application? Check this box to apply</p>
      </div>
      
      <div style={{ display: checked ? "block" : "none" }} className="applicationDiv">
          <div className="signupForm">
          <h1>Artist Application</h1>
          <p>Let us know more about you, please upload pictures of your work and tell us about yourself</p>
          <input type= "text" ref ={firstNameRef} placeholder="First Name"></input>
          <input type= "text" ref ={lastNameRef} placeholder="Last Name"></input>
          <input type= "text" ref ={artistNameRef} placeholder="Artist Name"></input>
          <input type = "email" ref = { emailRef }placeholder="Email" required></input>
          <input type = "password" ref= { passwordRef } placeholder="Password (8 Digits)" minLength="8" required></input>
          <div className="uploadForm"> 
        <input type="file" accept='image/*' onClick={handleChange} multiple/>
        
        <button onClick={handleUpload}><h3>Upload to Firebase</h3></button>
        <p>{/* {percent} */} % done</p>
        <h2>Uploading done {/* {progress} */}%</h2>
        <textarea ref={textAreaTextRef} cols="80" rows="15" placeholder='About you and your work'></textarea>
        <button disabled = {loading} ><h3>Register and upload images</h3></button>


            </div>
          </div>        
        </div>
    </div>
    
      <Footer />
    
    </div>
  )
}