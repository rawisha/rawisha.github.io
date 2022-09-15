import React from 'react'
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer'
import "../styles/Wishlist.css"

export default function Wishlist() {
  return (
    <div>
        <Navbar />
    <div className="wishlistHeader">
      <h1>Wishlist</h1>
      <div/>
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
      <Footer />
    </div>
    </div>


  )
}
