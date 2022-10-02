import React from 'react'
import Footer from '../Components/Footer'
import Navbar from '../Components/Navbar'
import '../styles/Cart.css'
import Logo from "../assets/Logo.svg"
import { Link } from 'react-router-dom'
import CartListItem from '../Components/CartListItem'
import { useState,useEffect } from 'react'
import useCurrentUser from '../hooks/useCurrentUser'


export default function Cart() {

  const user = useCurrentUser()
  const initCart = JSON.parse(localStorage.getItem('cart')) || []
  const [newAmount,setNewAmount] = useState()
  const [cart,setCart] = useState(initCart)
  const [checkOne, setCheckOne] = useState(true)
  const [checkTwo, setCheckTwo] = useState(false)
  const [checkThree, setCheckThree] = useState(false)
  const [checkKiss, setCheckKiss] = useState(false)
  
  const [name, setName] = useState('')
  const [address, setAddress] = useState('')
  const [addressTwo, setAddressTwo] = useState('')
  const [city, setCity] = useState('')
  const [zip, setZip] = useState('')
  const [country, setCountry] = useState('')

  const [cardOwner, setCardOwner] = useState('')

  const [email, setEmail] = useState('')
  const [orderID, setOrderID] = useState('')

  useEffect( () => {
    if(user) {
      setName( user ? user?.firstName + ' ' + user?.lastName : '')
    }
  },[user])

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart))
    
},[cart,newAmount])

  const handleIncrease = (e,item) => {
    e.preventDefault()
    const index = cart.findIndex(f => f.id === item.id)
    const data = localStorage.getItem('cart')
    if(data !=null){
      let newData = JSON.parse(data)
      newData[index].cartAmount = cart[index].cartAmount + 1
      localStorage.setItem('cart', JSON.stringify(newData));
      setCart(newData)
    }
  }


  const handleDecrease = (e,item) => {
    e.preventDefault()
    const index = cart.findIndex(f => f.id === item.id)
    const data = localStorage.getItem('cart')
    if(data !=null){
      let newData = JSON.parse(data)
      newData[index].cartAmount = newData[index].cartAmount - 1
      if(newData[index].cartAmount === 0) return
      localStorage.setItem('cart', JSON.stringify(newData));
      setCart(newData)
      
    }
    
  }

  const handleCheckoutZero = (e) => {
    e.preventDefault()
    setCheckOne(true)
    setCheckTwo(false)
    setCheckThree(false)
  }
  
  const handleCheckoutOne = (e) => {
    e.preventDefault()
    setCheckOne(false)
    setCheckTwo(true)
    setCheckThree(false)
  }
  
  const handleCheckoutTwo = (e) => {
    e.preventDefault()
    setCheckTwo(false)
    setCheckThree(true)
    setOrderID(123456789)
  }
  
  const handleCheckoutThree = (e) => {
    e.preventDefault()
    setCheckThree(false)
    setCheckKiss(true)
  }

  const handleDelete = (e,item) => {
    e.preventDefault()
    const newCart = cart.filter(f => item.id !== f.id)
    setCart([...newCart])
    console.log('deleted' + item.id)
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
            {cart?.map(item => (
                <li className="cart-main-list-item" key={item?.id}>
                <div className="list-item-img">
                    <img src={item?.prod?.imageUrl} alt="cart-list-item" />
                </div>
                <div className="list-item-details">
                    <p className='list-item-title'>Product: {item?.prod?.title}</p>
                    <span className='list-item-product-number'>Prod nr: 70332</span>
                    <p className='list-item-artist'>Made by: {item?.prod?.by}</p>
                </div>
                <div className="list-item-color">
                    <p>Color: Black</p>
                </div>
                <div className="list-item-amount-container">
                    <div className="list-item-amount"><p>{item?.cartAmount}</p></div>
                    <div className="list-item-change-amount">
                    <div className="add"><button onClick={(e) => handleIncrease(e,item)}>+</button></div>
                    <div className="sub"><button onClick={(e) => handleDecrease(e,item)}>-</button></div>
                    </div>
                </div>
                <div className="list-item-price">
                    <p>Price: {item?.prod?.price} $</p>
                </div>
                <div className="list-item-remove">
                    <i className='fa-solid fa-plus' onClick={(e) => handleDelete(e,item)}></i>
                </div>
            </li>
              ))}
            </ul>
            <div className="cart-main-bottom">
              <div className="cart-main-back">
                <Link to="/" ><i className='fa-solid fa-arrow-left'></i>
                <p>Back to shop</p></Link>
              </div>
              <div className="cart-main-total-price">
                <p className='total-price'>Subtotal: {cart.reduce((total, item)=>total+(item?.prod?.price*item?.cartAmount),0)} $</p>
              </div>
            </div>
          </div>
        </div>

        <div className="cart-checkout">
        {/* Checkout 1 */}
          {checkOne && <div className="cart-checkout-1">
            <div className="side-menu-buttons">
              <span className='span-1'></span>
              <span className='span-2'></span>
              <span className='span-3'></span>
            </div>
            <form>
              <h2 className='form-title'>Shipping Details</h2>
              <label htmlFor='full-name'>Full Name</label>
              <input type="text" name="full-name" onChange={(e) => setName(e.target.value)} value={name}/>
              <label>Address Line 1</label>
              <input type="text" onChange={(e) => setAddress(e.target.value)} value={address}/>
              <label>Address Line 2 (Optional)</label>
              <input type="text" onChange={(e) => setAddressTwo(e.target.value)} value={addressTwo}/>
              <div className="city-details">
                <div className="city">
                  <label>City</label>
                  <input type="text" onChange={(e) => setCity(e.target.value)} value={city}/>
                </div>
                <div className="zip">
                  <span className='city-divider'>/</span>
                  <label>Zip</label>
                  <input type="number" onChange={(e) => setZip(e.target.value)} value={zip}/>
                </div>
              </div>
              <label htmlFor='country'>Country</label>
              <select type="select" name="country" placeholder='select country' onChange={(e) => setCountry(e.target.value)} value={country}>
                <option value="Sweden">Sweden</option>
              </select>
            </form>
            <button onClick={handleCheckoutOne}>Next step</button>
          </div>}
          {/* Checkout 2 */}
          {checkTwo && <div className="cart-checkout-2">
            <div className="side-menu-buttons">
              <span className='span-1'></span>
              <span className='span-2'></span>
              <span className='span-3'></span>
            </div>
            <form>
              <i onClick={handleCheckoutZero} className='fa-solid fa-long-arrow-alt-left arrow-back'></i>
              <h2 className='form-title'>Card Details</h2>
              <label htmlFor='card-owner'>Card Owner</label>
              <input type="text" name="card-owner" onChange={(e) => setCardOwner(e.target.value)} value={cardOwner}/>
              <label htmlFor='card-number'>Card Number</label>
              <input type="text" name="card-number" placeholder='xxxx - xxxx - xxxx - xxxx'/>
              <div className="card-type">
                {/* <img src="" alt="" /> */}
              </div>
              <div className="card-details">
                <div className="card-expiry-container">
                  <label>Expiry Date</label>
                  <div className="card-expiry">
                    <input type="number" className='expiry-month' placeholder='MM'/>
                    <span className='card-expiry-divider'>/</span>
                    <input type="number" className='expiry-year' placeholder='YY'/>
                  </div>
                </div>
                <div className="card-cvv">
                  <label>CVV</label>
                  <input type="number" placeholder='***'/>
                </div>
              </div>
            </form>
            <button onClick={handleCheckoutTwo}>Checkout</button>
          </div>}
          {/* Checkout 3 */}
          {checkThree && <div className="cart-checkout-3">
            <div className="side-menu-buttons">
              <span className='span-1'></span>
              <span className='span-2'></span>
              <span className='span-3'></span>
            </div>
            <form>
              <i onClick={handleCheckoutOne} className='fa-solid fa-long-arrow-alt-left arrow-back'></i>
              <h2 className='form-title'>Thank you {name}</h2>
              <label>E-mail for reciept</label>
              <input type="email" onChange={(e) => setEmail(e.target.value)} value={email}/>
              <label>Order ID</label>
              <input type="text" disabled="true" value={orderID}/>
              <label>Anything we should know?</label>
              <textarea  cols="30" rows="10"></textarea>
            </form>
            <button onClick={handleCheckoutThree}>Send reciept</button>
          </div>}
          {checkKiss && <div className="kiss">&#128536;</div>}
        </div>

      </div>

      <Footer />
    </>
  )
}
