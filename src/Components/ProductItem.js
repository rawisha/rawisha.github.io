import React from 'react'
import useCurrentUser from '../hooks/useCurrentUser';
import useCurrentArtist from '../hooks/useCurrentArtist';
import { useState, useEffect } from 'react';
import { arrayUnion, arrayRemove, doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase-config';
import "../styles/Product.css"
import { Link } from 'react-router-dom';

export default function ProductItem({prods,cartData}) {
  console.log(cartData)
    const initCart = JSON.parse(localStorage.getItem('cart')) || []
    const user = useCurrentUser()
    const artist = useCurrentArtist()
    const [wish, setWish] = useState(false)
    const [btn, setBtn] = useState(true)
    const [localItem,setLocalitem] = useState(initCart)

    useEffect(() => {
      localStorage.setItem('cart', JSON.stringify(localItem))
   },[localItem])

    const addToWishList = async (product) => {
      
      if(user) {
        const docRef = doc(db, 'users', `${user?.id}`)
        await updateDoc(docRef, {
            wishList: arrayUnion(product)
        })
        setWish(true)
      }else if(!user)
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


    /* HANDLE ADD TO CART --- START HERE */
    const handleAddcart = (e,data) => {
      setLocalitem([...localItem,{prod: data, id:data?.id, cartAmount:1}])
    }



    

  /* HANDLE ADD TO CART --- END HERE */
    
  return (
    
        <div key={prods.id} className='productSingleItemContainer'>
                       <h2 className='cardTitle'>{prods.title}</h2>
                        <h3 className='cardSubTitle'>by {prods.by}</h3>
                        <h3 className='cardSubTitle'><Link to={`/category/`+ prods.categoryHandle}>{prods.categoryHandle[0].toUpperCase() + prods.categoryHandle.substring(1)}</Link></h3>
                        
                        <Link className="linkId" to={'/product/' + prods.id} >
                        <div className='imageContainer'>
                          <img src={prods.imageUrl} alt="bild"></img>
                    </div></Link>
                    <div className='priceContainer'>
                    {wish ? <i  id="heart" onClick={() => removeFromWishList(prods)} className='fa-solid fa-heart imagefavoriteIcon' ></i> : <i onClick={() => addToWishList(prods)} id="heart" className='fa-regular fa-heart imagefavoriteIcon' ></i>}
                        <h2 className='priceText'>{prods.price}$</h2>
                        <i className="fa-solid fa-cart-shopping  addCartIcon"></i>
                        <button className="addToCart" onClick={(e) => handleAddcart(e,prods)}>Add</button>
                    </div>
                </div>
    
  )
}
