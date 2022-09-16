import React from 'react'
import "../styles/Wishlist.css"

import bild from "../assets/bild.jpg"

export default function Wishlist() {
  return (
    <div className='wishlistContainer'>

        <h1>Wishlist</h1>

        <div className='wishlistProductWrapper'>
          
          <div>
            <img id='thumbnail' src={bild} alt="product "></img>
          </div>
          <div>
            <h3>Product: Wait here</h3>
            <p>Prod nr: 428539</p>
            <h3>Artist: Stefan Marxx</h3>
          </div>
          <div>
            <h3>Color: Black</h3>
          </div>
          <div>
            <p>2</p>
            <button>+</button>
            <button>-</button>
          </div>
          <div>
            <h3>129.00 USD</h3>
          </div>
          <div>
            <button>Add</button>
          </div>
          <div>
            <button>X</button>
          </div>
        </div>
    </div>
  )
}
