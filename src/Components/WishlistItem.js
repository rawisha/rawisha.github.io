import React from 'react'
import useAuth from '../hooks/useAuth';
import { arrayUnion, arrayRemove, collection, doc, onSnapshot, query, updateDoc, where } from 'firebase/firestore';
import { db } from '../firebase-config';
import { useState, useEffect } from 'react';

export default function WishlistItem({prod}) {
    const currentUser = useAuth()
    const [user, setUser] = useState(null)   
    
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
  
      const removeFromWishList = (product) => {
        const docRef = doc(db, 'users', `${user?.id}`)
        updateDoc(docRef, {
            wishList: arrayRemove(product)
        })
      }

  return (
    <div>
        <div className='product'>
            <div className='productImage'>
            <img src={prod.imageUrl} alt="bild"></img>
            
            <div className='productInfo'>
              <h2>Product: {prod.title}</h2>
              <p id="prodNr">Prod nr: 428539</p>
              
              <h2 id="artistInfo">Arist: {prod.by}</h2>
              
            </div>
            <h2 className='productColor'>Color: Black</h2>
          
            <div className='productPrice'>
              <h2>{prod.price} USD</h2>
            </div>
            <div className='adddelButton'>
            <button id="addButton">Add</button>
            <button onClick={() => removeFromWishList(prod)} id="delButton">Delete</button>
            </div>
            </div>
            </div>
    </div>
  )
}
