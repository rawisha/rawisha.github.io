import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer'
import "../styles/Wishlist.css"
import useAuth from '../hooks/useAuth';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { db } from '../firebase-config';
import { useState, useEffect } from 'react';

export default function Wishlist() {

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

  console.log(user?.wishList)

  return (
    <>
      <Navbar />
      <div className="wishlistHeader">
        <h1>Wishlist</h1>
      <div/>
      { currentUser && <>
        <div className='current-user-email'>{currentUser.email}</div> 
        <div className='wishlistWrapper'>
          <div className="wishlistContainer">
              <ul>
                <li>Product: Color: Artist: Prod nr: 428539 129 USD <button>Add</button></li>
                <li>Product: Color: Artist: Prod nr: 428539 129 USD <button>Add</button></li>
                <li>Product: Color: Artist: Prod nr: 428539 129 USD <button>Add</button></li>
                <li>Product: Color: Artist: Prod nr: 428539 129 USD <button>Add</button></li>
                <li>Product: Color: Artist: Prod nr: 428539 129 USD <button>Add</button></li>
                <li>Product: Color: Artist: Prod nr: 428539 129 USD <button>Add</button></li>
              </ul>
          </div>
        </div>
      </>}
      {!currentUser && <div>Please <a href="/signin">sign in</a> to use wishlist!</div>}
      
      <Footer />

      </div>
    </>


  )
}
