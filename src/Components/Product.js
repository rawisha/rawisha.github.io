import React from 'react'
import '../styles/Product.css'
import useGetAll from '../hooks/useGetAll'
import useAuth from '../hooks/useAuth';
import { arrayUnion, arrayRemove, collection, doc, onSnapshot, query, updateDoc, where } from 'firebase/firestore';
import { db } from '../firebase-config';
import { useState, useEffect } from 'react';

export default function Product() {

    const products = useGetAll('products')

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

    const addToWishList = (id) => {
        const docRef = doc(db, 'users', user.id)
        updateDoc(docRef, {
            wishList: arrayUnion(id)
        })
        console.log(id + ' added')
    }

    const removeFromWishList = (id) => {
        const docRef = doc(db, 'users', user.id)
        updateDoc(docRef, {
            wishList: arrayRemove(id)
        })
        console.log(id + ' removed')
    }

    const [checkList, setCheckList] = useState(null)

    const checkIfIsInWishList = (id) => {
        const docRef = doc(db, 'users', user.id)
        const unsub = onSnapshot(docRef, doc => {
            setCheckList(doc.data().wishList)
            console.log(checkList)
            return unsub
        })
        const isIncluded = checkList.includes(id)
        return isIncluded
    }

    console.log('balls')

  return (
    <div className='productsContainer'>
        <div className='productCardContainer'>
            {products.map(product => (
                <div key={product.id} className='productSingleItemContainer'>
                        <h2 className='cardTitle'>{product.title}</h2>
                        <h3 className='cardSubTitle'>by {product.by}</h3>
                        
                    <div className='imageContainer'>
                        {/* {checkIfIsInWishList(product.id) && 
                        <i onClick={() => removeFromWishList(product.id)} id="heart" className='fa-solid fa-heart imagefavoriteIcon' aria-hidden="true"></i>
                        } */}
                        <i onClick={() => addToWishList(product.id)} id="heart" className='fa-regular fa-heart imagefavoriteIcon' aria-hidden="true"></i>
                        <img src={product.imageUrl} alt="bild"></img>
                    </div>
                    <div className='priceContainer'>
                        <h2 className='priceText'>{product.price}$</h2>
                        <i className="fa-solid fa-cart-shopping  addCartIcon"></i>
                        <button className="addToCart" >Add</button>
                    </div>
                </div>
            ))}
        </div>
    </div>
  )
}
