import React from 'react'
import Footer from '../Components/Footer'
import Navbar from '../Components/Navbar'
import '../styles/Cart.css'
import '../styles/PendingOrder.css'
import Logo from "../assets/Logo.svg"
import { Link } from 'react-router-dom'
import { useState,useEffect,useContext } from 'react'
import useCurrentUser from '../hooks/useCurrentUser'
import useCurrentArtist from '../hooks/useCurrentArtist'
import Visa from '../assets/visa-logo.png'
import Mastercard from '../assets/Mastercard.png'
import Paypal from '../assets/paypal.png'
import ApplePay from '../assets/ApplePay.png'
import ShortUniqueId from 'short-unique-id';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { db } from '../firebase-config'
import {UserContext} from '../hooks/UserContext'
import { FaTimes } from 'react-icons/fa'

export default function Cart() {
  const {cartState,setCartState} = useContext(UserContext)
  const user = useCurrentUser()
  const artist = useCurrentArtist()

  const [checkOne, setCheckOne] = useState(true)
  const [checkTwo, setCheckTwo] = useState(false)
  const [checkThree, setCheckThree] = useState(false)
  const [checkKiss, setCheckKiss] = useState(false)
  
  const [error, setError] = useState('')

  const [name, setName] = useState('')
  const [address, setAddress] = useState('')
  const [addressTwo, setAddressTwo] = useState('')
  const [city, setCity] = useState('')
  const [zip, setZip] = useState('')
  const [country, setCountry] = useState('')
  
  const countryList = ['Sweden', 'Denmark', 'Norway', 'Finland', 'UK', 'USA']

  const [cardOwner, setCardOwner] = useState('')
  const [cardNumber, setCardNumber] = useState('')
  const [expiryMonth, setExpiryMonth] = useState('')
  const [expiryYear, setExpiryYear] = useState('')
  const [CVV, setCVV] = useState('')

  const [email, setEmail] = useState('')
  const [feedback, setFeedback] = useState('')
  const [orderID, setOrderID] = useState('')

  const [pendingOrder, setPendingOrder] = useState(false)
  const [success, setSuccess] = useState(false)

  useEffect( () => {
    if(user) setName( user ? user?.firstName + ' ' + user?.lastName : '')
    if(artist) setName( artist ? artist?.firstName + ' ' + artist?.lastName : '')
  }, [user, artist])

  const handleIncrease = ({id}) => {
    if(id){
      const index = cartState.findIndex(f => f.id === id)
    const data = localStorage.getItem('cart')
    if(data !=null){
      let newData = JSON.parse(data)
      newData[index].cartAmount = cartState[index].cartAmount + 1
      localStorage.setItem('cart', JSON.stringify(newData));
      setCartState(newData)
    }
    }
    return 
    
  }

  const handleDecrease = ({id}) => {
    const index = cartState.findIndex(f => f.id === id)
    const data = localStorage.getItem('cart')
    if(data !=null){
      let newData = JSON.parse(data)
      newData[index].cartAmount = cartState[index].cartAmount - 1
      if(newData[index].cartAmount === 0) return
      localStorage.setItem('cart', JSON.stringify(newData));
      setCartState(newData)
    }
  }

  const handleDelete = ({id}) => {
    const newCart = cartState.filter(f => id !== f.id)
    localStorage.setItem('cart', JSON.stringify(newCart));
    setCartState([...newCart])
  }

  /* ----- Checkout ----- */
  const getOrderId = () => {
    const uid = new ShortUniqueId()
    const id = uid.stamp(16).slice(0,8).toUpperCase()
    return id
  }

  const handleCheckoutZero = (e) => {
    e.preventDefault()
    setCheckOne(true)
    setCheckTwo(false)
    setCheckThree(false)
  }
  
  const handleCheckoutOne = (e) => {
    e.preventDefault()
    if(!name) return setError('Please fill in your name') 
    if(!address) return setError('Please fill in adress') 
    if(!city) return setError('Please fill in city') 
    if(!zip) return setError('Please fill in zip') 
    if(!country) return setError('Please select country') 
    setCheckOne(false)
    setCheckTwo(true)
    setCheckThree(false)
    setError('')
  }
  
  const handleCheckoutTwo = async (e) => {
    e.preventDefault()
    if(!cardOwner) return setError('Please fill in cardowner')
    if(!cardOwner) return setError('Please fill in cardnumber')
    if(!expiryMonth || !expiryYear) return setError('Please fill in expiry')
    if(!CVV) return setError('Please fill in CVV')
    setCheckTwo(false)
    setCheckThree(true)
    setOrderID(getOrderId())
    setError('')
  }
  
  const handleCheckoutThree = async (e) => {
    e.preventDefault()
    if(!email) return setError('Please enter email')

    const orderCart = JSON.parse(localStorage.getItem('cart'))

    const getCreatedAtString = () => {
      const addZero = (number) => {
          if(String(number).length < 2) {
              number = '0' + number
          }
          return number
      }
      const date = new Date()
      const Y = date.getFullYear()
      const M = date.getMonth()
      const D = date.getDate()
      const time = Y + '-' + addZero(M) + '-' + addZero(D)
      return time
    }
  
    const time = getCreatedAtString()

    const orderDetails = {
      name: name,
      address : address,
      addressTwo : addressTwo,
      city: city,
      zip: zip,
      country: country,
      cardOwner: cardOwner,
      cardNumber: cardNumber,
      expiryMonth: expiryMonth,
      expiryYear: expiryYear,
      CVV: CVV,
      email: email,
      feedback: feedback,
      orderID: orderID,
      date: time
    }

    handleOrder(orderCart, orderDetails, orderID)
    setCheckThree(false)
    setPendingOrder(true)
    setError('')
  }
  
  /* ----- Place order ----- */
  const handleOrder = async (orderCart, orderDetails, orderID) => {    
    const total = cartState?.reduce((total, item)=>total+(item.prod.price*item.cartAmount),0)
    const colRef = collection(db, 'orders')
    await addDoc(colRef, {
      orderCart: orderCart,
      orderDetails: orderDetails,
      orderID: orderID,
      total: total, 
      status: 'pending',
      createdAt: serverTimestamp()
    }).then(() => {
      setTimeout(() => {
        setPendingOrder(false)
        setSuccess(true)
        setCartState([])
        localStorage.setItem('cart', JSON.stringify([]))
      }, 3000)
    })
    setCheckKiss(true)
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
            
            {cartState?.length <= 0 ? <div><h2 style={{display:"flex",justifyContent:'center'}}>Your Cart is Empty</h2></div> : cartState?.map(item => (
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
                    <div className="add"><button onClick={() => handleIncrease(item)}>+</button></div>
                    <div className="sub"><button onClick={() => handleDecrease(item)}>-</button></div>
                    </div>
                </div>
                <div className="list-item-price">
                    <p>Price: {item?.prod?.price} $</p>
                </div>
                <div className="list-item-remove">
                    <FaTimes onClick={() => handleDelete(item)}/>
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
                <p className='total-price'>Subtotal: {cartState && cartState?.reduce((total, item)=>total+(item.prod.price*item.cartAmount),0)} $</p>
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
                <option value="">--Select Country--</option>
                {countryList.map(country => (
                  <option key={country} value={country}>{country}</option>
                ))}
              </select>
            </form>
            {error && <div className='checkout-error'>{error}</div>}
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
              <div className="card-type">
                <img src={Visa} alt="visa" />
                <img src={Mastercard} alt="mastercard" />
                <img src={Paypal} alt="paypal" />
                <img src={ApplePay} alt="applepay" />
              </div>
              <label htmlFor='card-owner'>Card Owner</label>
              <input type="text" name="card-owner" placeholder="Firstname Lastname" onChange={(e) => setCardOwner(e.target.value)} value={cardOwner}/>
              <label htmlFor='card-number'>Card Number</label>
              <input onChange={(e) => setCardNumber(e.target.value)} value={cardNumber} type="text" name="card-number" placeholder='xxxx - xxxx - xxxx - xxxx'/>
              <div className="card-details">
                <div className="card-expiry-container">
                  <label>Expiry Date</label>
                  <div className="card-expiry">
                    <input onChange={(e) => setExpiryMonth(e.target.value)} value={expiryMonth} type="number" className='expiry-month' placeholder='MM'/>
                    <span className='card-expiry-divider'>/</span>
                    <input onChange={(e) => setExpiryYear(e.target.value)} value={expiryYear} type="number" className='expiry-year' placeholder='YY'/>
                  </div>
                </div>
                <div className="card-cvv">
                  <label>CVV</label>
                  <input onChange={(e) => setCVV(e.target.value)} value={CVV} type="number" placeholder='***'/>
                </div>
              </div>
            </form>
            {error && <div className='checkout-error'>{error}</div>}
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
              <input type="text" disabled={true} value={orderID}/>
              <label>Anything we should know?</label>
              <textarea onChange={(e) => setFeedback(e.target.value)} cols="30" rows="10"></textarea>
            </form>
            {error && <div className='checkout-error'>{error}</div>}
            <button onClick={handleCheckoutThree} className="order-btn">Place order and mail my reciept</button>
          </div>}
          {pendingOrder && <div className='pending-order'>
            <div className="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
          </div>}
          {success && <></>}
          {checkKiss && <div className="kiss">&#128536;</div>}
        </div>
      </div>

      <Footer />
    </>
  )
}