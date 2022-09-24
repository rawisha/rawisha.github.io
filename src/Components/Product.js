import React from 'react'
import '../styles/Product.css'
import useGetAll from '../hooks/useGetAll'
import useAuth from '../hooks/useAuth';
import { arrayUnion, arrayRemove, collection, doc, onSnapshot, query, updateDoc, where } from 'firebase/firestore';
import { db } from '../firebase-config';
import { useState, useEffect } from 'react';
import ProductItem from './ProductItem';


/*
FIX WISHLIST, CHECK WITH DAVID

*/


export default function Product({prods}) {
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

  return (
    <div className='productsContainer'>
        <div className='productCardContainer'>
            {prods.length > 0 ? prods.map(product => (
                <ProductItem prods={product} key={product.id} />
            )): <h2>Ohh noo, No products in here (</h2>}
        </div>
    </div>
  )
}
