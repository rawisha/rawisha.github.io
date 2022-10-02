import {React, useState, useEffect} from 'react'

const CartListItem = ({items,initCart}) => {
    const [cart,setCart] = useState(initCart)

    const handleDelete = (e,item) => {
        e.preventDefault()
        const newCart = cart.filter(f => item.id !== f.id)
        setCart([...newCart])
        console.log('deleted' + item.id)
    }

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart))
        
    },[cart])
    
    return ( 
        <>
        {items ? <li className="cart-main-list-item">
        <div className="list-item-img">
            <img src={items?.prod.imageUrl} alt="cart-list-item" />
        </div>
        <div className="list-item-details">
            <p className='list-item-title'>Product: {items?.prod.title}</p>
            <span className='list-item-product-number'>Prod nr: 70332</span>
            <p className='list-item-artist'>Made by: {items?.prod.by}</p>
        </div>
        <div className="list-item-color">
            <p>Color: Black</p>
        </div>
        <div className="list-item-amount-container">
            <div className="list-item-amount"><p>{items?.cartAmount}</p></div>
            <div className="list-item-change-amount">
            <div className="add"><button>+</button></div>
            <div className="sub"><button>-</button></div>
            </div>
        </div>
        <div className="list-item-price">
            <p>Price: {items?.prod.price} $</p>
        </div>
        <div className="list-item-remove">
            <i className='fa-solid fa-plus' onClick={(e) => handleDelete(e,items)}></i>
        </div>
    </li> : <p>Nothing here</p>}
    </>
     );
}
 
export default CartListItem;