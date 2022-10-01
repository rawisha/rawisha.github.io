import React from 'react'
import useCurrentUser from '../hooks/useCurrentUser';
import useCurrentArtist from '../hooks/useCurrentArtist';
import { useState, useEffect } from 'react';
import { arrayUnion, arrayRemove, doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase-config';
import "../styles/Product.css"
import { Link } from 'react-router-dom';

export default function ProductItem({prods}) {
    const user = useCurrentUser()
    const artist = useCurrentArtist()

    const [wish, setWish] = useState(false)

    const addToWishList = async (product) => {
      setWish(true)
      if(user) {
        const docRef = doc(db, 'users', `${user?.id}`)
        await updateDoc(docRef, {
            wishList: arrayUnion(product)
        })
      }
      if(artist) {
        const docRef = doc(db, 'artists', `${artist?.id}`)
        await updateDoc(docRef, {
            wishList: arrayUnion(product)
        })
      }
    }

    const removeFromWishList = async (product) => {
      setWish(false)
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
      
    useEffect(() => {
      if(user){
        const checkWish = () => {
          const data = user?.wishList?.some(el => el.id === prods.id)
            if(data) setWish(true)
          }
          checkWish()
      }
      if(artist) {
        const checkWish = () => {
          const data = artist?.wishList?.some(el => el.id === prods.id)
            if(data) setWish(true)
          }
          checkWish()
      }
    },[user, prods.id, artist])

  return (
    
        <div key={prods.id} className='productSingleItemContainer'>
                        <Link className="linkId" to={'/product/' + prods.id} ><h2 className='cardTitle'>{prods.title}</h2>
                        <h3 className='cardSubTitle'>by {prods.by}</h3>
                    <div className='imageContainer'>
                        
                        <img src={prods.imageUrl} alt="bild"></img>
                    </div></Link>
                    <div className='priceContainer'>
                    {wish ? <i  id="heart" onClick={() => removeFromWishList(prods)} className='fa-solid fa-heart imagefavoriteIcon' ></i> : <i onClick={() => addToWishList(prods)} id="heart" className='fa-regular fa-heart imagefavoriteIcon' ></i>}
                        <h2 className='priceText'>{prods.price}$</h2>
                        <i className="fa-solid fa-cart-shopping  addCartIcon"></i>
                        <button className="addToCart" >Add</button>
                    </div>
                </div>
    
  )
}
