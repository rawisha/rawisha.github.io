import Bild from '../assets/bild.jpg'

const CartListItem = () => {
    return ( 
        <li className="cart-main-list-item">
            <div className="list-item-img">
                <img src={Bild} alt="cart-list-item" />
            </div>
            <div className="list-item-details">
                <p className='list-item-title'>Product: title</p>
                <span className='list-item-product-number'>Prod nr: 70332</span>
                <p className='list-item-artist'>Made by: artist</p>
            </div>
            <div className="list-item-color">
                <p>Color: Black</p>
            </div>
            <div className="list-item-amount-container">
                <div className="list-item-amount"><p>1</p></div>
                <div className="list-item-change-amount">
                <div className="add"><button>+</button></div>
                <div className="sub"><button>-</button></div>
                </div>
            </div>
            <div className="list-item-price">
                <p>Price: 230 $</p>
            </div>
            <div className="list-item-remove">
                <i className='fa-solid fa-plus'></i>
            </div>
        </li>
     );
}
 
export default CartListItem;