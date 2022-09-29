import React from 'react'
import useCurrentUser from '../hooks/useCurrentUser';
import { useState, useEffect } from 'react';
import { arrayUnion, arrayRemove, doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase-config';
import "../styles/Product.css"

export default function ProductItem({prods}) {
    const user = useCurrentUser()
    const [wish, setWish] = useState(false)
      console.log(prods);
      // add try/catch
      const addToWishList = async (product) => {
        setWish(true)
        const docRef = doc(db, 'users', `${user?.id}`)
        await updateDoc(docRef, {
            wishList: arrayUnion(product)
        })
      }

      // add try/catch
      const removeFromWishList = (product) => {
        setWish(false)
        const docRef = doc(db, 'users', `${user?.id}`)
        updateDoc(docRef, {
            wishList: arrayRemove(product)
        })
      }
      
      useEffect(() => {
        if(user){
          const checkWish = () => {
            const data = user.wishList.some(el => el.id === prods.id)
             if(data) setWish(true)
           }
           checkWish()
        }
      },[user,prods.id])

  return (
    
        <div key={prods.id} className='productSingleItemContainer'>
                        <h2 className='cardTitle'>{prods.title}</h2>
                        <h3 className='cardSubTitle'>by {prods.by}</h3>
                        
                    <div className='imageContainer'>
                        {wish ? <i  id="heart" onClick={() => removeFromWishList(prods)} className='fa-solid fa-heart imagefavoriteIcon' ></i> : <i onClick={() => addToWishList(prods)} id="heart" className='fa-regular fa-heart imagefavoriteIcon' ></i>}
                        
                        <img src={prods.imageUrl} alt="bild"></img>
                    </div>
                    <div className='priceContainer'>
                        <h2 className='priceText'>{prods.price}$</h2>
                        <i className="fa-solid fa-cart-shopping  addCartIcon"></i>
                        <button className="addToCart" >Add</button>
                    </div>
                </div>
    
  )
}
