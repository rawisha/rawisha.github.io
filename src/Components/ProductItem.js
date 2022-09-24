import React from 'react'
import useAuth from '../hooks/useAuth';
import { useState, useEffect } from 'react';
import { arrayUnion, arrayRemove, collection, doc, onSnapshot, query, updateDoc, where } from 'firebase/firestore';
import { db } from '../firebase-config';
import "../styles/Product.css"

export default function ProductItem({prods}) {
    const currentUser = useAuth()
    const [user, setUser] = useState(null)
    const [isWishlist, setIsWishList] = useState(false)
    
    useEffect(() => {
        if (currentUser) {
          const userEmail = currentUser.email
          const colRef = collection(db, 'users')
          const q = query(colRef, where('eMail', '==', userEmail))
          const unsub = onSnapshot(q, (snapshot) => {
            snapshot.docs.forEach(doc => {
              setUser({...doc.data(), id: doc.id})
            })
          })
          return unsub
        }
      }, [currentUser])
      

   

      // add try/catch
      const addToWishList = async (product) => {
        setIsWishList(!isWishlist)
        
        const docRef = doc(db, 'users', user.id)
        await updateDoc(docRef, {
            wishList: arrayUnion(product)
        })
        console.log(product + ' added')
      }

      // add try/catch
      const removeFromWishList = (product) => {
        
        setIsWishList(!isWishlist)
        const docRef = doc(db, 'users', user.id)
        updateDoc(docRef, {
            wishList: arrayRemove(product)
        })
        console.log(product + ' removed')
      }

     // useEffect(() => {
        
    //    if(user) user.wishList.find(prods => console.log(prods)) ? setIsWishList(!isWishlist) : setIsWishList(isWishlist)
     // }, [user])

  return (
    
        <div key={prods.id} className='productSingleItemContainer'>
                        <h2 className='cardTitle'>{prods.title}</h2>
                        <h3 className='cardSubTitle'>by {prods.by}</h3>
                        
                    <div className='imageContainer'>
                        {isWishlist ? <i  id="heart" onClick={() => removeFromWishList(prods)} className='fa-solid fa-heart imagefavoriteIcon' ></i> : <i onClick={() => addToWishList(prods)} id="heart" className='fa-regular fa-heart imagefavoriteIcon' ></i>}
                        
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
