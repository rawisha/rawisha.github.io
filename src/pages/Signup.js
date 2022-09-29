
import React from 'react'
import Navbar from '../Components/Navbar'
import "../styles/Signup.css"
import Footer from '../Components/Footer'

import { signup, db, emailVerification, storage} from '../firebase-config'
import { useRef, useState } from 'react'
import { doc , setDoc, serverTimestamp,collection,addDoc} from 'firebase/firestore'
import { ref, uploadBytesResumable, getDownloadURL} from "firebase/storage"
import { useNavigate } from 'react-router-dom'


export default function Signup() {

  const navigate = useNavigate();

  

  const [loading, setLoading] = useState(false);
  const [checked, setChecked] = useState(false);
  const [urls, setUrls] = useState([]);
  const [images, setImages] = useState([]);
  const [progress, setProgress] = useState(0);
  const [hideElements, setHideElements] = useState(true)
  /* const [title, setTitle] = useState(''); */
  /* const [error, setError] = useState(null) */

  const emailRef = useRef();
  const passwordRef = useRef();
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const userNameRef = useRef();
  const artistNameRef = useRef();
  const textAreaTextRef = useRef();
  const descriptionRef = useRef();
  const titleRef = useRef();
  const priceRef = useRef();
  
  function generateUUIDUsingMathRandom() { 
    var d = new Date().getTime();//Timestamp
    var d2 = (performance && performance.now && (performance.now()*1000)) || 0;//Time in microseconds since page-load or 0 if unsupported
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16;//random number between 0 and 16
        if(d > 0){//Use timestamp until depleted
            r = (d + r)%16 | 0;
            d = Math.floor(d/16);
        } else {//Use microseconds since page-load if supported
            r = (d2 + r)%16 | 0;
            d2 = Math.floor(d2/16);
        }
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
}

const saveProducts = (urls) => {
  const colRef = collection(db, 'test-products')
  addDoc(colRef, {
    title: titleRef.current.value, 
    description: descriptionRef.current.value,
    imageUrl: urls,
    price: priceRef.current.value,
    by: artistNameRef.current.value,
    createdAt: serverTimestamp(),
  }).then(res => {
    console.log(res.id)
  }).catch(err => console.log(err.code))
} 
  

  const handleChange = (e) => {
    e.preventDefault()
    for (let i = 0; i < e.target.files.length; i++) {
      const newImage = e.target.files[i];
      newImage["id"] = generateUUIDUsingMathRandom();
      setImages((prevState) => [...prevState, newImage]);
    }
  };

  const handleUpload = async () => {
    const promises = [];
    images.map((image) => {
      const storageRef = ref(storage,`artist application/${ generateUUIDUsingMathRandom() +'__' +image.name}`);
      const uploadTask = uploadBytesResumable(storageRef, image);
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
          await getDownloadURL(uploadTask.snapshot.ref)
            .then((urls) => {
            setUrls((prevState) => [...prevState, urls]);
            saveProducts(urls);
            });
        }
      );
    });
    Promise.all(promises)
      .then(() => console.log("Allt uppladdat!"))
      .then(() => alert("Tack för din registrering!"))
      .then(() => navigate("/"))
      .catch((err) => console.log(err));
  };
  console.log("images: ", images);
  console.log("urls: ", urls);
  

  function showApplicationArtist(){
    setChecked((checked) => !checked);
    setHideElements((hideElements) => !hideElements);
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
        saveProducts(urls);
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
        <h1 style={{ display: hideElements ? "block" : "none" }}>Register</h1>
        <h1 style={{ display: checked ? "block" : "none" }} >Artist Application</h1>
        <p style={{ display: checked ? "block" : "none" }}>Let us know more about you, please upload 3 pictures of your work and tell us about yourself</p>
         <div className="checkboxDiv">
        <input type ="checkbox" id="checkbox" style={{ display: hideElements ? "block" : "none" }} onClick={showApplicationArtist}></input>
        <p style={{ display: hideElements ? "block" : "none" }} id="checkboxParagraph">Artist application? Check this box to apply</p>
      </div>
      
        <input type= "text" ref ={firstNameRef} placeholder="First Name" required></input>
        <input type= "text" ref ={lastNameRef} placeholder="Last Name" required></input>
        <input type= "text" ref ={artistNameRef} style={{ display: checked ? "block" : "none" }} placeholder="Artist Name" required></input>
        <input type= "text" ref ={userNameRef} style={{ display: hideElements ? "block" : "none" }}placeholder="Username" required></input>
        <input type = "email" ref = { emailRef }placeholder="Email" required ></input>
        <input type = "password" ref= { passwordRef } placeholder="Password (8 Digits)" minLength="8" required></input>
        <button disabled = {loading} style={{ display: hideElements ? "block" : "none" }}onClick={handleSignupUser}><h2>Create</h2></button>
        <p style={{ display: hideElements ? "block" : "none" }}>{progress} % done</p>

      
      
      <div style={{ display: checked ? "block" : "none" }} className="applicationDiv">
        <br></br>
        <br></br>
        <br></br>
        <div className='fileUploads'>
        <section>
          <input type="text" ref = {titleRef} id="title" name="title" placeholder=" Title" required></input>
          <input type="text" ref = {descriptionRef} id="description" name="description" placeholder="Description " required></input>
          <input type="number" ref = {priceRef} id="price" name="price" placeholder="Price " required></input>
          <input type="file" accept='image/*'  onChange={handleChange} />
      </section><section>
          <input type="text" ref = {titleRef} id="title" name="title" placeholder=" Title" required></input>
          <input type="text" ref = {descriptionRef} id="description" name="description" placeholder="Description " required></input>
          <input type="number" id="price" name="price" placeholder="Price " required></input>
          <input type="file" accept='image/*' onChange={handleChange} />
      </section><section>
          <input type="text" ref = {titleRef} id="title" name="title" placeholder=" Title" required></input>
          <input type="text" ref = {descriptionRef} id="description" name="description" placeholder="Description " required></input>
          <input type="number" ref = {priceRef} id="price" name="price" placeholder="Price " required></input>
          <input type="file" accept='image/*' onChange={handleChange} />
      </section>
      </div>
      



          <div className="uploadForm"> 

           <textarea ref={textAreaTextRef} cols="80" rows="15" placeholder='About you and your work'></textarea>
          <button disabled = {loading} onClick={ () => { handleSignupArtist(); handleUpload();} } ><h2>Register</h2></button>
          <p>{progress} % done</p>
            </div>
          </div>   
          </div>     
        
    
    
      <Footer />
    
    </div>
  )
}
