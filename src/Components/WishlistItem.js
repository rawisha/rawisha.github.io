import React,{useContext} from 'react'
import useCurrentUser from '../hooks/useCurrentUser';
import useCurrentArtist from '../hooks/useCurrentArtist';
import { arrayRemove, doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase-config';
import {UserContext} from '../hooks/UserContext'
export default function WishlistItem({prod}) {
  const {cartState,setCartState} = useContext(UserContext)
    const user = useCurrentUser()
    const artist = useCurrentArtist()
  
      const removeFromWishList = async (product) => {
      if(user) {
        const docRef = doc(db, 'users', `${user?.id}`)
        await updateDoc(docRef, {
            wishList: arrayRemove(product)
        })
      }
      if(artist) {
        const docRef = doc(db, 'artists', `${artist?.id}`)
        await updateDoc(docRef, {
            wishList: arrayRemove(product)
        })
      }
    }
    
    const isInCart = (id) => {
      const index = cartState.findIndex(f => id === f.id)
      return (index === -1) ? false : true
    }

    const handleAddcart = (e,data) => {
      if(!isInCart(data.id)){
        e.preventDefault()
      setCartState([...cartState,{prod: data, id:data?.id, cartAmount:1}])
      addToLDB(data)
      }else{
        removeFromWishList(data)
      }
    }
  
    const addToLDB = (data) => {
      const db = JSON.parse(localStorage.getItem('cart'))
      db.push({prod: data, id:data?.id, cartAmount:1})
      localStorage.setItem('cart', JSON.stringify(db))
      removeFromWishList(data)
    }

  return (
    <div>
        <div className='product'>
            <div className='productImage'>
            <img src={prod.imageUrl} alt="bild"></img>
            
            <div className='productInfo'>
              <h2>Product: {prod.title}</h2>
              <p id="prodNr">Prod nr: 428539</p>
              
              <h2 id="artistInfo">Artist: {prod.by}</h2>
              
            </div>
            <h2 className='productColor'>Color: Black</h2>
          
            <div className='productPrice'>
              <h2>{prod.price} USD</h2>
            </div>
            <div className='adddelButton' >
            <button id="addButton" onClick={(e) => handleAddcart(e,prod)}>Add<i className="fa-solid fa-cart-shopping  addCartIconWishlist"></i></button>
            <button onClick={() => removeFromWishList(prod)} id="delButton">Delete</button>
            </div>
            </div>
            </div>
    </div>
  )
}
