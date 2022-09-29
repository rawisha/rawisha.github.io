import React from 'react'
import useProductsBy from '../hooks/useProductsBy'

export default function MenuProductItem({ handle }) {

    const products = useProductsBy(handle)

  return (
    <div className='menu-item-products'>
        {products.length > 0 ? <>
            {products[0] ? <div>{products[0]?.title}</div> : null}    
            {products[1] ? <div>{products[1]?.title}</div> : null}    
            {products[2] ? <div>{products[2]?.title}</div> : null}    
            {products[3] ? <div>{products[3]?.title}</div> : null}    
            {products[4] ? <div>{products[4]?.title}</div> : null}    
            {products[5] ? <div>{products[5]?.title}</div> : null}    
            {products[6] ? <div>More...</div> : null}
        </> : <div className='no-products'>Empty...</div>}
        
        {/* { products?.map(product => {
            <div key={product?.id} className="menu-product-list-item">
                <p>{product?.title}</p>
            </div>
        })} */}
    </div>
  )
}
