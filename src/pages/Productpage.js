import {React,useState,useEffect} from 'react'
import '../styles/Productpage.css'
import Navbar from '../Components/Navbar'
import { Link, useParams, } from 'react-router-dom'
import Footer from '../Components/Footer'
import useProductById from '../hooks/useProductById'

export default function Productpage() {

  const { id } = useParams()
  const initCart = JSON.parse(localStorage.getItem('cart')) || []
  const product = useProductById(id)
  const [item, setItem] = useState(1);
  const [localItem,setLocalitem] = useState(initCart)
  const [catHandle,setCategoryHandle] = useState('')
  const [btn, setBtn] = useState(true)
  const [count,setCount] = useState(0)


  useEffect(() => {
    if(product.categoryHandle) {
      setCategoryHandle(product.categoryHandle[0].toUpperCase() + product.categoryHandle.substring(1))
    }
  },[product])

   /* Handle quantity -- Starts HERE*/
  const handleQuantityMinus = (e,item) => {
    e.preventDefault()
    if(item === 1) return
    setItem(item - 1)
   }

  const handleQuantityPlus = (e,item) => {
    e.preventDefault()
    setItem(item + 1)
   }

  const handleAddcart = (e,data) => {
    e.preventDefault()
    setLocalitem([...localItem,{prod: product, id:product?.id, cartAmount:item}])
    setBtn(false)

  }
 /* Handle quantity -- ENDS HERE*/

  useEffect(() => {
     localStorage.setItem('cart', JSON.stringify(localItem))
  },[localItem])

  useEffect(() => {
   setCount(localItem.length)
 },[localItem,count])
 

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
        <button onClick={(e) => handleQuantityMinus(e,item)}>-</button>
        <input type="text" pattern="\d*" minLength="1" placeholder={item} value={item}></input>
        <button onClick={(e) => handleQuantityPlus(e,item)}>+</button>
        <i className="fa-regular fa-heart favHeart"></i>
        </div>
      
        <button onClick={(e) => handleAddcart(e,product?.id)} className="addToCart--prodPage">{btn ? 'Add to Cart' : 'Added to Cart'}</button>

        <div className="descInfo">
          <h4>Description:</h4>
          <p>{product?.description}</p>
          <h4 className='designBy'>Category:</h4>
          <p><Link to={'/category/' + product?.categoryHandle}>{catHandle}</Link></p>
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
