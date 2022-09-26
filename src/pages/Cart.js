import React from 'react'
import Footer from '../Components/Footer'
import Navbar from '../Components/Navbar'
import '../styles/Cart.css'
import Logo from "../assets/Logo.svg"
import { Link } from 'react-router-dom'
import CartListItem from '../Components/CartListItem'
import { useState } from 'react'


export default function Cart() {

  const [checkOne, setCheckOne] = useState(true)
  const [checkTwo, setCheckTwo] = useState(false)
  const [checkThree, setCheckThree] = useState(false)
  
  const [name, setName] = useState()


  const handleCheckoutOne = (e) => {
    e.preventDefault()
    setCheckOne(false)
    setCheckTwo(true)
  }
  
  const handleCheckoutTwo = (e) => {
    e.preventDefault()
    setCheckTwo(false)
    setCheckThree(true)
  }
  
  const handleCheckoutThree = (e) => {
    e.preventDefault()
    setCheckThree(false)
  }

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
              <CartListItem />
              <CartListItem />
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

        {/* Checkout */}
        <div className="cart-checkout">
          {checkOne && <div className="cart-checkout-1">
            <div className="side-menu-buttons">
              <span className='span-1'></span>
              <span className='span-2'></span>
              <span className='span-3'></span>
            </div>
            <form>
              <h2 className='form-title'>Shipping Details</h2>
              <label htmlFor='full-name'>Full Name</label>
              <input type="text" name="full-name" onChange={(e) => setName(e.target.value)}/>
              <label>Address Line 1</label>
              <input type="text" />
              <label>Address Line 2 (Optional)</label>
              <input type="text" />
              <div className="city-details">
                <div className="city">
                  <label>City</label>
                  <input type="text" />
                </div>
                <div className="zip">
                  <span className='city-divider'>/</span>
                  <label>Zip</label>
                  <input type="number" />
                </div>
              </div>
              <label htmlFor='country'>Country</label>
              <select type="select" name="country" placeholder='select country'>
                <option value="Sweden">Sweden</option>
              </select>
            </form>
            <button onClick={handleCheckoutOne}>Next step</button>
          </div>}
          {checkTwo && <div className="cart-checkout-2">
            <div className="side-menu-buttons">
              <span className='span-1'></span>
              <span className='span-2'></span>
              <span className='span-3'></span>
            </div>
            <form>
              <h2 className='form-title'>Card Details</h2>
              <label htmlFor='card-number'>Cardnumber</label>
              <input type="text" name="card-number"/>
              <div className="card-type">
                {/* <img src="" alt="" /> */}
              </div>
              <div className="card-details">
                <div className="card-expiry">
                  <label>Expiry Date</label>
                  <input type="number" className='expiry-month'/>
                  <input type="number" className='expiry-year' />
                </div>
                <div className="card-cvv">
                  <span className='card-expiry-divider'>/</span>
                  <label>CVV</label>
                  <input type="number" />
                </div>
              </div>
            </form>
            <button onClick={handleCheckoutTwo}>Checkout</button>
          </div>}
          {checkThree && <div className="cart-checkout-3">
            <div className="side-menu-buttons">
              <span className='span-1'></span>
              <span className='span-2'></span>
              <span className='span-3'></span>
            </div>
            <form>
              <h2 className='form-title'>Thank you {name}</h2>
              <label htmlFor='card-number'>Cardnumber</label>
              <input type="text" name="full-name" onChange={(e) => setName(e.target.value)}/>
              <label>Address Line 1</label>
              <input type="text" />
              <label>Address Line 2 (Optional)</label>
              <input type="text" />
              <div className="city-details">
                <div className="city">
                  <label>City</label>
                  <input type="text" />
                </div>
                <div className="zip">
                  <span className='city-divider'>/</span>
                  <label>Zip</label>
                  <input type="number" />
                </div>
              </div>
              <label htmlFor='country'>Country</label>
              <select type="select" name="country" placeholder='select country'>
                <option value="Sweden">Sweden</option>
              </select>
            </form>
            <button onClick={handleCheckoutThree}>Checkout</button>
          </div>}
        </div>

      </div>

      <Footer />
    </>
  )
}
