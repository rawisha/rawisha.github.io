import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer'
import "../styles/Wishlist.css"
import useAuth from '../hooks/useAuth';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { db } from '../firebase-config';
import { useState, useEffect } from 'react';
import bild from "../assets/bild.jpg"
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

  return (
    <>
      <Navbar />
      <div className="wishlistHeader">
        <h1>Wishlist</h1>
      <div/>
      
        <div className='wishlistWrapper'>
          <div className="wishlistContainer">

            <div className='product'>
            <div className='productImage'>
            <img src={bild} alt="bild"></img>
            
            <div className='productInfo'>
              <h2>Product: Wait Here
              <p id="prodNr">Prod nr: 428539</p>
              
              <h2 id="artistInfo">Arist: Stefan Marxx</h2>
              </h2>
              
            </div>
            <h2 className='productColor'>Color: Black</h2>
          
            <div className='productPrice'>
              <h2>129.00 USD</h2>
            </div>
            <div className='adddelButton'>
            <button id="addButton">Add</button>
            <button id="delButton">Delete</button>
            </div>
            </div>
            </div>
            <div className='product'>
            <div className='productImage'>
            <img src={bild} alt="bild"></img>
            
            <div className='productInfo'>
              <h2>Product: Wait Here
              <p id="prodNr">Prod nr: 428539</p>
              
              <h2 id="artistInfo">Arist: Stefan Marxx</h2>
              </h2>
              
            </div>
            <h2 className='productColor'>Color: Black</h2>
          
            <div className='productPrice'>
              <h2>129.00 USD</h2>
            </div>
            <div className='adddelButton'>
            <button id="addButton">Add</button>
            <button id="delButton">Delete</button>
            </div>
            </div>
            </div>
            <div className='product'>
            <div className='productImage'>
            <img src={bild} alt="bild"></img>
            
            <div className='productInfo'>
              <h2>Product: Wait Here
              <p id="prodNr">Prod nr: 428539</p>
              
              <h2 id="artistInfo">Arist: Stefan Marxx</h2>
              </h2>
              
            </div>
            <h2 className='productColor'>Color: Black</h2>
          
            <div className='productPrice'>
              <h2>129.00 USD</h2>
            </div>
            <div className='adddelButton'>
            <button id="addButton">Add</button>
            <button id="delButton">Delete</button>
            </div>
            </div>
            </div>
            <div className='product'>
            <div className='productImage'>
            <img src={bild} alt="bild"></img>
            
            <div className='productInfo'>
              <h2>Product: Wait Here
              <p id="prodNr">Prod nr: 428539</p>
              
              <h2 id="artistInfo">Arist: Stefan Marxx</h2>
              </h2>
              
            </div>
            <h2 className='productColor'>Color: Black</h2>
          
            <div className='productPrice'>
              <h2>129.00 USD</h2>
            </div>
            <div className='adddelButton'>
            <button id="addButton">Add</button>
            <button id="delButton">Delete</button>
            </div>
            </div>
            </div>
            <div className='product'>
            <div className='productImage'>
            <img src={bild} alt="bild"></img>
            
            <div className='productInfo'>
              <h2>Product: Wait Here
              <p id="prodNr">Prod nr: 428539</p>
              
              <h2 id="artistInfo">Arist: Stefan Marxx</h2>
              </h2>
              
            </div>
            <h2 className='productColor'>Color: Black</h2>
          
            <div className='productPrice'>
              <h2>129.00 USD</h2>
            </div>
            <div className='adddelButton'>
            <button id="addButton">Add</button>
            <button id="delButton">Delete</button>
            </div>
            </div>
            </div>
            <div className='product'>
            <div className='productImage'>
            <img src={bild} alt="bild"></img>
            
            <div className='productInfo'>
              <h2>Product: Wait Here
              <p id="prodNr">Prod nr: 428539</p>
              
              <h2 id="artistInfo">Arist: Stefan Marxx</h2>
              </h2>
              
            </div>
            <h2 className='productColor'>Color: Black</h2>
          
            <div className='productPrice'>
              <h2>129.00 USD</h2>
            </div>
            <div className='adddelButton'>
            <button id="addButton">Add</button>
            <button id="delButton">Delete</button>
            </div>
            </div>
            </div>
            <div className='product'>
            <div className='productImage'>
            <img src={bild} alt="bild"></img>
            
            <div className='productInfo'>
              <h2>Product: Wait Here
              <p id="prodNr">Prod nr: 428539</p>
              
              <h2 id="artistInfo">Arist: Stefan Marxx</h2>
              </h2>
              
            </div>
            <h2 className='productColor'>Color: Black</h2>
          
            <div className='productPrice'>
              <h2>129.00 USD</h2>
            </div>
            <div className='adddelButton'>
            <button id="addButton">Add</button>
            <button id="delButton">Delete</button>
            </div>
            </div>
            </div>
            <div className='product'>
            <div className='productImage'>
            <img src={bild} alt="bild"></img>
            
            <div className='productInfo'>
              <h2>Product: Wait Here
              <p id="prodNr">Prod nr: 428539</p>
              
              <h2 id="artistInfo">Arist: Stefan Marxx</h2>
              </h2>
              
            </div>
            <h2 className='productColor'>Color: Black</h2>
          
            <div className='productPrice'>
              <h2>129.00 USD</h2>
            </div>
            <div className='adddelButton'>
            <button id="addButton">Add</button>
            <button id="delButton">Delete</button>
            </div>
            </div>
            </div>
            <div className='product'>
            <div className='productImage'>
            <img src={bild} alt="bild"></img>
            
            <div className='productInfo'>
              <h2>Product: Wait Here
              <p id="prodNr">Prod nr: 428539</p>
              
              <h2 id="artistInfo">Arist: Stefan Marxx</h2>
              </h2>
              
            </div>
            <h2 className='productColor'>Color: Black</h2>
          
            <div className='productPrice'>
              <h2>129.00 USD</h2>
            </div>
            <div className='adddelButton'>
            <button id="addButton">Add</button>
            <button id="delButton">Delete</button>
            </div>
            </div>
            </div>
            <div className='product'>
            <div className='productImage'>
            <img src={bild} alt="bild"></img>
            
            <div className='productInfo'>
              <h2>Product: Wait Here
              <p id="prodNr">Prod nr: 428539</p>
              
              <h2 id="artistInfo">Arist: Stefan Marxx</h2>
              </h2>
              
            </div>
            <h2 className='productColor'>Color: Black</h2>
          
            <div className='productPrice'>
              <h2>129.00 USD</h2>
            </div>
            <div className='adddelButton'>
            <button id="addButton">Add</button>
            <button id="delButton">Delete</button>
            </div>
            </div>
            </div>
            <div className='product'>
            <div className='productImage'>
            <img src={bild} alt="bild"></img>
            
            <div className='productInfo'>
              <h2>Product: Wait Here
              <p id="prodNr">Prod nr: 428539</p>
              
              <h2 id="artistInfo">Arist: Stefan Marxx</h2>
              </h2>
              
            </div>
            <h2 className='productColor'>Color: Black</h2>
          
            <div className='productPrice'>
              <h2>129.00 USD</h2>
            </div>
            <div className='adddelButton'>
            <button id="addButton">Add</button>
            <button id="delButton">Delete</button>
            </div>
            </div>
            </div>
          </div>
        </div>
 
      <Footer />

      </div>
    </>


  )
}
