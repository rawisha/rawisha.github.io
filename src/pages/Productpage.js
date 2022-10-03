import {React,useState,useEffect, useContext} from 'react'
import '../styles/Productpage.css'
import Navbar from '../Components/Navbar'
import { Link, useParams, } from 'react-router-dom'
import Footer from '../Components/Footer'
import useProductById from '../hooks/useProductById'
import {UserContext} from '../hooks/UserContext'
export default function Productpage() {
  const {cartState,setCartState} = useContext(UserContext)
  const { id } = useParams()
  const product = useProductById(id)
  const [item, setItem] = useState(1);
  const [catHandle,setCategoryHandle] = useState('')
  const [btn, setBtn] = useState(true)


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
    setCartState([...cartState,{prod: product, id:product?.id, cartAmount:item}])
    setBtn(false)
    addToLDB(data)
  }

  const addToLDB = (data) => {
    const db = JSON.parse(localStorage.getItem('cart'))
    db.push({prod: data, id:data?.id, cartAmount:item})
    localStorage.setItem('cart', JSON.stringify(db))
  }
 /* Handle quantity -- ENDS HERE*/

 const isInCart = (id) => {
  if ( ! id ) return false
  
  const index = cartState.findIndex(f => id === f.id)
  return (index === -1) ? false : true
  
}

 const CartButton = ({id}) => {
  if (isInCart(id)) {
    return <button onClick={(e) => handleAddcart(e,product)} disabled className="addToCart--prodPage">Added to Cart</button>
  }
  
  return <button onClick={(e) => handleAddcart(e,product)} className="addToCart--prodPage">Add to Cart</button>
  
}

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
      
        <CartButton id={product.id} />

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
