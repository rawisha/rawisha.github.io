import React from 'react'
import '../styles/Category.css'
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'
import { Link } from 'react-router-dom';
import useCategories from '../hooks/useCategories';

export default function Category() {

  const categories = useCategories()

  return (
    <div>
      <Navbar />
      <div className='categoryContainer'>
        <div className='Title container'>
          <h1 className='categoryTitle'>Category</h1>
        </div>
        <div className='categoryView'>
          {categories.map(category => (
            <div key={category.id} className='categoryItem'>
            <img src={category.imageUrl}  alt="category_picture"></img>
            <h2><Link to="browsingby">{category.name}</Link></h2>
            </div>
          ))}
        </div>
      </div>
      <div className='FOOTER'>
        <div className='borderSolidLine'></div>
        <Footer />
      </div>  
    </div>
  )
}
