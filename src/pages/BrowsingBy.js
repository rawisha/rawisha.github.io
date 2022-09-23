import React from 'react'
import '../styles/Category.css'
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'
import Product from '../Components/Product'


export default function BrowsingBy() {
  return (
    <div>
        <Navbar />
      <div className='categoryContainer'>
        <div className='Title container'>
        <h1 className='categoryTitle'>Category</h1>
        <h2>Browsing by Ceramics</h2>
        </div>
        <div className='categoryView'>
        <Product />
        </div>
        
        
        <div className='FOOTER'>
        <div className='borderSolidLine'></div>
      <Footer />
        </div>
    </div>
    </div>
  )
}
