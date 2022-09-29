import React from 'react'
import Artist from '../Components/Artist'
import Footer from '../Components/Footer'
import Navbar from '../Components/Navbar'
import ProductItem from '../Components/ProductItem'

export default function Searchresult() {
    const items = {
        "categoryHandle": "for_him",
        "description": "desc",
        "imageUrl": "https://firebasestorage.googleapis.com/v0/b/artzy-f21d3.appspot.com/o/products%2Fbild.jpg?alt=media&token=69de473c-f7b4-4b98-b03b-7d1e95e48682",
        "createdAt": {
            "seconds": 1663674782,
            "nanoseconds": 528000000
        },
        "by": "username",
        "price": "129",
        "title": "asd",
        "id": "7lvQ3dw4AYXxbZcjTRb7"
    }
  return (
    <div>
        <Navbar />
        <div className="searchContainer">
        <h1>Search result here</h1>
        <p>Search found 6 hits on "Rawand"</p>
        </div>

        <div className="productWrapper">
        <h1>Products (3)</h1>
        <ProductItem prods={items}/>

        </div>
        
        <div className='articleCardResultContainer'>
        <div className='articleCardResult'>
                <h1>test</h1>
                <img src={items.imageUrl} alt="profile_picture"></img>
            </div>
        </div>
        <Footer />
    </div>
  )
}


