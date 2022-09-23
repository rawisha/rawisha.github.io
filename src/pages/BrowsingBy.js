import React from 'react'
import '../styles/Category.css'
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'
import Product from '../Components/Product'
import useProductsBy from '../hooks/useProductsBy'
import { useParams } from 'react-router-dom'

export default function BrowsingBy() {
  let {id} = useParams();


  const products = useProductsBy(id)

  console.log(products)



  return (
    <div>
        <Navbar />
      <div className='categoryContainer'>
        <div className='Title container'>
        <h1 className='categoryTitle'>Category</h1>
        <h2>Browsing by {id}</h2>
        </div>
        <div className='categoryView'>
        <Product prods = {products}/>
        </div>

        <div className='FOOTER'>
        <div className='borderSolidLine'>
        <Footer />
        </div>
        
      </div>  
    </div>
    </div>
  )
}
