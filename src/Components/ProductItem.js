import React from 'react'
import useAuth from '../hooks/useAuth';
import { useState, useEffect } from 'react';
import { arrayUnion, arrayRemove, collection, doc, onSnapshot, query, updateDoc, where } from 'firebase/firestore';
import { db } from '../firebase-config';
import "../styles/Product.css"

export default function ProductItem({prods}) {
    const currentUser = useAuth()
    const [user, setUser] = useState(null)
    const [wish, setWish] = useState(false)
  
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
