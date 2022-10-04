import {React,useState,useEffect, useContext} from 'react'
import useCurrentUser from '../hooks/useCurrentUser';
import useCurrentArtist from '../hooks/useCurrentArtist';
import { arrayUnion, arrayRemove, doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase-config';
import '../styles/Productpage.css'
import Navbar from '../Components/Navbar'
import { Link, useParams, } from 'react-router-dom'
import Footer from '../Components/Footer'
import useProductById from '../hooks/useProductById'
import {UserContext} from '../hooks/UserContext'
export default function Productpage() {
  const {cartState,setCartState} = useContext(UserContext)
  const user = useCurrentUser()
  const artist = useCurrentArtist()
  const [wish, setWish] = useState(false)
  const { id } = useParams()
  const product = useProductById(id)
  const [item, setItem] = useState(1);
  const [catHandle,setCategoryHandle] = useState('')

  /* HANDLE WISHLIST -- STARTS HERE*/
  const addToWishList = async (product) => {
      console.log(product)
    if(user) {
      const docRef = doc(db, 'users', `${user?.id}`)
      await updateDoc(docRef, {
          wishList: arrayUnion(product)
      })
      setWish(true)
    }else if(!user && !artist)
    {
      alert("please login to use Wishlist Function")
    }

    if(artist) {
      const docRef = doc(db, 'artists', `${artist?.id}`)
      await updateDoc(docRef, {
          wishList: arrayUnion(product)
      })
      setWish(true)
    }
  }

  const removeFromWishList = async (product) => {
    
    if(user) {
      const docRef = doc(db, 'users', `${user?.id}`)
      await updateDoc(docRef, {
          wishList: arrayRemove(product)
      })
      
      setWish(false)
    }
    if(artist) {
      const docRef = doc(db, 'artists', `${artist?.id}`)
      await updateDoc(docRef, {
          wishList: arrayRemove(product)
      })
      
      setWish(false)
    }

  } 


    
    useEffect(() => {
      if(user){
        const checkWish = () => {
          const data = user?.wishList?.some(el => el.id === product.id)
            if(data) setWish(true)
          }
          checkWish()
      }
      if(artist) {
        const checkWish = () => {
          const data = artist?.wishList?.some(el => el.id === product.id)
            if(data) setWish(true)
          }
          checkWish()
      }
    },[user, product.id, artist])
    
  
  /* HANDLE WISHLIST -- ENDS HERE*/
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
        <Link to={"/category/" + product?.categoryHandle} ><i className='fa-solid fa-long-arrow-left'></i>
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
        <div className='quantityHolder'>{item}</div>
        <button onClick={(e) => handleQuantityPlus(e,item)}>+</button>
        {wish ? <i className="fa-solid fa-heart favHeart" onClick={() => removeFromWishList(product)}></i> : <i className="fa-regular fa-heart favHeart" onClick={() => addToWishList(product)}></i>}
        
        </div>
      
        <CartButton id={product.id} />

        <div className="descInfo">
          <h4>Description:</h4>
          <p>{product?.description}</p>
          <h4 className='designBy'>Category:</h4>
          <p><Link to={'/category/' + product?.categoryHandle}>{catHandle}</Link></p>
          <h4 className='designBy'>Designed By:</h4>
          <p><Link to={'/artist/' + product?.by}>{product?.by}</Link></p>
        </div>
        </div>
        </div>
        
      </div>
      <Footer />
    </>
  )
}
