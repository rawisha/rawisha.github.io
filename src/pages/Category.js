import React from 'react'
import '../styles/Category.css'
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'
import { Link } from 'react-router-dom';
import bild from "../assets/bild.jpg"
export default function Category() {
  return (
    <div>
      <Navbar />
      <div className='categoryContainer'>
        <div className='Title container'>
        <h1 className='categoryTitle'>Category</h1>
        </div>

        <div className='categoryView'>
        <div className='categoryItem'>
        <img src={bild}  alt="bild"></img>
        <h2> <Link to="browsingby">Ceramics</Link></h2>
        </div>

        <div className='categoryItem'>
        <img src={bild} alt="bild"></img>
        <h2>Product</h2>
        </div>

        <div className='categoryItem'>
        <img src={bild} alt="bild"></img>
        <h2>Product</h2>
        </div>

        <div className='categoryItem'>
        <img src={bild} alt="bild"></img>
        <h2>Product</h2>
        </div>

        <div className='categoryItem'>
        <img src={bild} alt="bild"></img>
        <h2>Product</h2>
        </div>

        <div className='categoryItem'>
        <img src={bild} alt="bild"></img>
        <h2>Product</h2>
        </div>

        <div className='categoryItem'>
        <img src={bild} alt="bild"></img>
        <h2>Product</h2>
        </div>

        <div className='categoryItem'>
        <img src={bild} alt="bild"></img>
        <h2>Product</h2>
        </div>

        <div className='categoryItem'>
        <img src={bild} alt="bild"></img>
        <h2>Product</h2>
        </div>

        <div className='categoryItem'>
        <img src={bild} alt="bild"></img>
        <h2>Product</h2>
        </div>

        <div className='categoryItem'>
        <img src={bild} alt="bild"></img>
        <h2>Product</h2>
        </div>

        <div className='categoryItem'>
        <img src={bild} alt="bild"></img>
        <h2>Product</h2>
        </div>
        
        <div className='categoryItem'>
        <img src={bild} alt="bild"></img>
        <h2>Product</h2>
        </div>

        <div className='categoryItem'>
        <img src={bild} alt="bild"></img>
        <h2>Product</h2>
        </div>

        <div className='categoryItem'>
        <img src={bild} alt="bild"></img>
        <h2>Product</h2>
        </div>

        <div className='categoryItem'>
        <img src={bild} alt="bild"></img>
        <h2>Product</h2>
        </div>
        </div>
        

  
      </div>
        
        <div className='FOOTER'>
        <div className='borderSolidLine'></div>
      <Footer />
        </div>
        
    </div>
  )
}
