import React from 'react'
import '../styles/Navbar.css'
import Logo from "../assets/Logo.svg"
import MenuIcon from "../assets/menu-Icon.svg"


/* 
TO DO:
-Fix css, icons
-Fix search field + code and inline icon
-Fix meny + links
-Add buttons
-Write JS code
-Fix line 37 add to search field 

*/


export default function Navbar() {

    return (
        <div className='Navbar'>
            <div className='logoContainer'>
                <div className='logoWrapperNav'>
                    <h1 id="logoText">ART<span id="logoText--span">ZY</span></h1>
                    <img id="logoText--svg" src={Logo} alt="ARTZY Logo" />
                </div>
                <div className='menuWrapper'>
                    <h1 id='styleSettings'><a href='/category'>Category</a></h1>
                    <img src={MenuIcon} alt="Icon Menu" />
                    <h1 id='styleSettings'><a href='/artist'>Artist</a></h1>
                </div>
                <div className='inputWrapper'>

                    <input className='inputField' type="text" placeholder='Sök efter Product eller Artist' />
                    {/*<div><i className="fa-light fa-magnifying-glass"></i></div>*/}
                </div>
                <div className='customerWrapper'>
                    <h1 id='styleSettings'><a href='/wishlist'>Wishlist</a> <i className="fa-solid fa-heart"></i></h1>
                    <h1 id='styleSettings'><a href='/cart'>Cart</a> <i className="fa-solid fa-cart-shopping"></i></h1>
                    <h1 id='styleSettings'><a href='/signin'>Sign In</a> <i className="fa-solid fa-user"></i></h1>
                </div>
            </div>

            <div className='borderSolidLine'></div>

        </div>
    )
}
