import React from 'react'
import '../styles/Product.css'
import ProductItem from './ProductItem';



export default function Product({prods}) {

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
