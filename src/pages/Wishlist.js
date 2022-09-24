import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer'
import "../styles/Wishlist.css"
import useAuth from '../hooks/useAuth';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { db } from '../firebase-config';
import { useState, useEffect } from 'react';
import WishlistItem from '../Components/WishlistItem'


export default function Wishlist() {

  const currentUser = useAuth()
  const [user, setUser] = useState(null)
  const [prods, setProds] = useState([])
  

  useEffect(() => {
    if (currentUser) {
      const userEmail = currentUser.email
      const colRef = collection(db, 'users')
      const q = query(colRef, where('eMail', '==', userEmail))
      const unsub = onSnapshot(q, (snapshot) => {
        snapshot.docs.forEach(doc => {
          setUser({...doc.data(), id: doc.id})
        })
        //setUser(currentUser)
      })
      return unsub
    }
  }, [currentUser])

    useEffect(() => {
      if(user !==  null){
        setProds(user.wishList)
      }
    },[user])

  return (
    <>
      <Navbar />
      <div className="wishlistHeader">
        <h1>Wishlist</h1>
      <div/>
        <div className='wishlistWrapper'>
          <div className="wishlistContainer">
          {prods.length > 0 ? prods.map(product => (
                <WishlistItem prod={product} key={product.id} />
            )): <h2>Ohh no... nothing here </h2>}
          </div>
        </div>
      </div>
      <Footer />
    </>


  )
}
