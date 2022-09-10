import React from 'react'
import '../styles/Category.css'
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'
import Product from '../Components/Product'
export default function Category() {
  return (
    <div>
      <Navbar />
      <div className='categoryContainer'>
        <div className='Title container'>
        <h1 className='categoryTitle'>Ceramics</h1>
        <h2 className='categorySubTitle'>Browsing by category "Ceramics"</h2>
        </div>

        <div className='productView'>
        <Product />
        </div>
        

  
      </div>
        
        <div className='borderSolidLine'></div>
      <Footer />
    </div>
  )
}
