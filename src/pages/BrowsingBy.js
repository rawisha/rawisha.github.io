import React from 'react'
import '../styles/Category.css'
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'
import Product from '../Components/Product'
import useProductsBy from '../hooks/useProductsByCategory'
import useCategoryBy from '../hooks/useCategoryBy'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'

export default function BrowsingBy() {
  let {id} = useParams();
  const products = useProductsBy(id)
  const category = useCategoryBy(id)
  return (
    <div>
        <Navbar />
      <div className='categoryContainer'>
        <div className='Title container'>
        
        <Link to="/category"><h1 className='categoryTitle'><i className="fa-solid fa-arrow-left arrow-back"></i>Categories</h1></Link>
        <h2>Browsing by {category[0]?.name}</h2>
        </div>
        <div className='categoryView'>
        <Product prods = {products}/>
        </div>

        <Footer />
        
      </div>  
    </div>
  )
}
