import React from 'react'
import '../styles/Productpage.css'
import bild from '../assets/bild.jpg'
import Navbar from '../Components/Navbar'
import { Link } from 'react-router-dom'
import Footer from '../Components/Footer'
export default function Productpage() {
  return (
    <>
    <Navbar />
      <div className="productPage--Container">
        
        
        <div className="backlinkContainer">
        <Link to="/" ><i className='fa-solid fa-long-arrow-left'></i>
        <p>Back to Category</p></Link>
        </div>
        
        <div className="middleContainer">
        <div className="imgContainer">
        <img src={bild} alt="productshit"></img>
        </div>
        
        <div className="prodDetailContainer">

        
        <div className="princenTitle">
        <h1>Coffe Cup With Saucer - Misty Grey/Smokey blue</h1>
        <p>340 USD</p>
        </div>

        <div className="qantityWish">
        <button>-</button>
        <input type="number" placeholder="1"></input>
        <button>+</button>
        <i class="fa-regular fa-heart favHeart"></i>
        </div>
      
        <button className="addToCart--prodPage">Add to Cart</button>

        <div className="descInfo">
          <h4>Description:</h4>
          <p>Coffee cup with saucer. Designed by Anita Le Grelle. The collection of plates, saucers and bowls is made of stoneware.</p>
          <h4 className='designBy'>Designed By:</h4>
          <p>David Ravelli</p>
        </div>
        </div>
        </div>
        
      </div>
      <Footer />
    </>
  )
}
