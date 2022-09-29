import React, { useState } from 'react'
import '../styles/Navbar.css'
import Logo from "../assets/Logo.svg"
import { useEffect } from 'react';
import { db, logout } from '../firebase-config'
import { onSnapshot, collection } from 'firebase/firestore'
import { Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import useCurrentUser from '../hooks/useCurrentUser';
import useCategories from '../hooks/useCategories';
import MenuProductItem from './MenuProductItem';
import useCurrentArtist from '../hooks/useCurrentArtist'


export default function Navbar() {

    const currentUser = useAuth()
    const user = useCurrentUser()
    const artist = useCurrentArtist()

    let wishListCount = user?.wishList.length;
    let cartCount = user?.cart?.length;

    // LOGOUT
    const handleSignOut = () => {
        logout();
    }

    // Category menu
    const categories = useCategories()

    /*backend search*/

        const [value, setValue] = useState("");
        const [results, setResults] = useState([]);
        const [prodResulsts, setProdResolts] = useState([]);

        const onChange = (event) => {
            setValue(event.target.value)
        };

        const onSearch = (searchTerm) => {
            setValue(searchTerm);
            /* console.log("search", searchTerm); */
        };
       
        useEffect(() => {
            onSnapshot(collection(db, 'artists'), snapshot => {
                setResults(snapshot.docs.map(doc => doc.data()
                ))
            })
        }, [])
        useEffect(() => {
            onSnapshot(collection(db, 'products'), snapshot => {
                setProdResolts(snapshot.docs.map(doc => doc.data()
                ))
            })
        }, [])

    return (
        <div className='Navbar'>
            <div className='logoContainer'>
                <Link to="/"> <div className='logoWrapperNav'>
                    <h1 id="logoText">ART<span id="logoText2">ZY</span></h1>
                    <img id="logoText--svg" src={Logo} alt="ARTZY Logo" />
                </div></Link>
                <div className='menuWrapper'>
                    <h1 id='styleSettings' className='category-link'><Link to="/category">Category</Link>
                        <div className="category-menu">
                            <p className='category-menu-title'>Browse Category</p>
                            {categories.map((category) => (
                                <div key={category.id} className="category-menu-item">
                                    <Link to={'/category/' + category.handle}>
                                        <p className='category-menu-item-title'>{category.name}</p>
                                        <i className='fa-solid fa-angle-right'></i>
                                    </Link>
                                    <MenuProductItem handle={category.handle}/>
                                </div>
                            ))}
                        </div>
                    </h1>
                    
                    <Link to="/artist"><h1 id='styleSettings' className='artist-link'>Artist</h1></Link>
                </div>
                <div className='inputWrapper'>
                    <input className='inputField' type="text" placeholder='Sök efter Product eller Artist' onChange={onChange} value={value}/>
                    <button className='button' onClick={() => onSearch(value)}><i className="fa-solid fa-magnifying-glass searchIcon"></i></button>
                </div>
                <div className='customerWrapper'>
                    <Link to="/wishlist"><div className="menu-icon-container"><h1 id='styleSettings'>Wishlist</h1><i className="fa-solid fa-heart"></i><p>({wishListCount ? wishListCount : 0})</p></div></Link>
                    <Link to="/cart"><div className="menu-icon-container"><h1 id='styleSettings'>Cart</h1><i className="fa-solid fa-cart-shopping"></i><p>({cartCount ? cartCount : 0})</p></div></Link>
                    { !currentUser && <Link to="/signin"><div className="menu-icon-container"><h1 className="signX" id='styleSettings'>Sign In</h1><i className="fa-solid fa-user"></i></div></Link>}
                    { currentUser && <Link to="/"><div className="menu-icon-container"><h1 className="signX" id='styleSettings' onClick={handleSignOut}>Sign out</h1><i className="fa-solid fa-user"></i><p>{user?.eMail || artist?.eMail}</p></div></Link>}
                </div>
            </div>
                
            <div className='borderSolidLine'></div>
            <div className='dataResult'>
                {results
            .filter((item) => {
              const searchTerm = value;

              const fullName =  item.artistName ;

              return (
                searchTerm &&
                fullName.startsWith(searchTerm) &&
                fullName !== searchTerm 
              );
            })
            .slice(0, 10)

            .map((item,index) => (

              <div
                onClick={() => onSearch(item.artistName)}
                className="dropdown-row"
                key={index}
              >
                {item.artistName}
              </div>
            ))}
            
                </div>
                <div className='dataResult'>
                    {prodResulsts
                    .filter((item) => {
                        const searchTerm = value;
                        const prodName = item.title;
                        
                        return (
                            searchTerm && 
                            prodName.startsWith(searchTerm) &&
                            prodName !== searchTerm
                        );
                    })
                    .slice(0, 10)
                    .map((item, index) => (
                        <div
                            onClick={() => onSearch(item.title)}
                            className="dropdown-row"
                            key={index}
                        >
                            {item.title}
                        </div>
                    ))
                    }
                </div>
                
        </div>
    )
}
