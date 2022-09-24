import React from 'react'
import '../styles/Category.css'
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'
import { Link } from 'react-router-dom';
import useCategories from '../hooks/useCategories';
import BrowsingBy from './BrowsingBy';

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
              
            <Link to={category.handle}><img src={category.imageUrl}  alt="category_picture"></img>
            <h2>{category.name}</h2></Link>
            </div>
          ))}
        </div>

      </div>
      <Footer />
      
    </div>
  )
}
