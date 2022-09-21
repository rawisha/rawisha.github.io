import React from 'react'
import '../styles/Product.css'
import useGetAll from '../hooks/useGetAll'

export default function Product() {

    const products = useGetAll('products')

  return (
    <div className='productsContainer'>
        <div className='productCardContainer'>
            {products.map(product => (
                <div key={product.id} className='productSingleItemContainer'>
                        <h2 className='cardTitle'>{product.title}</h2>
                        <h3 className='cardSubTitle'>by {product.by}</h3>
                        
                    <div className='imageContainer'>
                        <i id="heart" className='fa-regular fa-heart imagefavoriteIcon' aria-hidden="true"></i>
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
