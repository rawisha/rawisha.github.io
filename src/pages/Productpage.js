import React from 'react'
import '../styles/Productpage.css'
import Navbar from '../Components/Navbar'
import { Link, useParams } from 'react-router-dom'
import Footer from '../Components/Footer'
import useProductById from '../hooks/useProductById'
export default function Productpage() {

  const { id } = useParams()
  const product = useProductById(id)

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
        <img src={product?.imageUrl} alt="product_img"></img>
        </div>
        
        <div className="prodDetailContainer">

        
        <div className="princenTitle">
        <h1>{product?.title}</h1>
        <p>{product?.price} USD</p>
        </div>

        <div className="qantityWish">
        <button>-</button>
        <input type="number" placeholder="1"></input>
        <button>+</button>
        <i className="fa-regular fa-heart favHeart"></i>
        </div>
      
        <button className="addToCart--prodPage">Add to Cart</button>

        <div className="descInfo">
          <h4>Description:</h4>
          <p>{product?.description}</p>
          <h4 className='designBy'>Designed By:</h4>
          <p>{product?.by}</p>
        </div>
        </div>
        </div>
        
      </div>
      <Footer />
    </>
  )
}
