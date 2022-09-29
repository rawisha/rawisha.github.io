import React from 'react'
import "../styles/Artistprofile.css"
import bannerImg from '../assets/banner.png'
import bild from '../assets/bild.jpg'
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'
import ProductUpload from '../Components/ProductUpload'
export default function Artistprofile() {
  return (
    <div className='artistProfileContainer'>
      <Navbar />
        <div className="bannerContainer">
          <img src={bannerImg} alt="banner-bild"></img>
        </div>
        
        <div className="profileContainer">
          <img src={bild} alt="profile-bild"></img>
          <div className="profileDetails">
            <h1>Artist Name</h1>
            <ul>
              <li>Your Bio</li>
              <li>Your Products</li>
              <li>Upload Product</li>
              <li>Your History</li>
            </ul>
          </div> 
        </div>
        <div className="profileInfoWrapper">
        <ProductUpload />
        </div>
       
      <Footer />
    </div>
  )
}
