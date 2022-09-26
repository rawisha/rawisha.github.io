import React from 'react'
import Footer from '../Components/Footer'
import Navbar from '../Components/Navbar'
import '../styles/Cart.css'
import Logo from "../assets/Logo.svg"
import { Link } from 'react-router-dom'
import CartListItem from '../Components/CartListItem'


export default function Cart() {
  return (
    <>
      <Navbar />

      <div className="cart-wrapper">

        <div className="cart-main-container">
          <div className="cart-main-header">
            <img src={Logo} alt="logo" className='cart-logo'/>
            <h1>Your Shopping Cart</h1>
          </div>
          <div className="cart-main">
            <ul className="cart-main-list">
              <CartListItem />
            </ul>
            <div className="cart-main-bottom">
              <div className="cart-main-back">
                <Link to="/" ><i className='fa-solid fa-arrow-left'></i>
                <p>Back to shop</p></Link>
              </div>
              <div className="cart-main-total-price">
                <p className='total-price'>Subtotal: 236 $</p>
              </div>
            </div>
          </div>
        </div>

        <div className="cart-checkout">
          <div className="cart-checkout-1">
            <h1>checkout</h1>
            <button>Next step</button>
          </div>
        </div>

      </div>

      <Footer />
    </>
  )
}
