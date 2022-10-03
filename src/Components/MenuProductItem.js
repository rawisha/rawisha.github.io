import React from 'react'
import { Link } from 'react-router-dom'
import useProductsBy from '../hooks/useProductsByCategory'

export default function MenuProductItem({ handle }) {

    const products = useProductsBy(handle)

  return (
    <div className='menu-item-products'>
        { products.length > 0 ? <>
        { products?.slice(0, 10).map(product => (
            <Link to={'/product/' + product?.id} key={product?.id} ><div className="menu-product-list-item">
                <p>{product?.title}</p>
            </div></Link>
        ))} 
        { products.length > 10 ? <div className='menu-product-list-item'><Link to={'/category/' + handle}>More...</Link></div>: null}
        </> : <Link to={'/category/' + handle} ><div className="menu-product-list-item empty"><p>Empty...</p></div></Link>}
    </div>
  )
}
