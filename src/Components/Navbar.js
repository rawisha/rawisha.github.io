import React, { useState } from 'react'
import '../styles/Navbar.css'
import Logo from "../assets/Logo.svg"
import MenuIcon from "../assets/menu-Icon.svg"
import { useEffect } from 'react';
import { db, logout } from '../firebase-config'
import { onSnapshot, collection } from 'firebase/firestore'
import { Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import useCurrentUser from '../hooks/useCurrentUser';


export default function Navbar() {

    const currentUser = useAuth()
    const user = useCurrentUser()

    let wishListCount = user?.wishList.length;
    let cartCount = user?.cart?.length;

    // LOGOUT
    const handleSignOut = () => {
        logout();
    }
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
                    <h1 id="logoText">ART<span id="logoText--span">ZY</span></h1>
                    <img id="logoText--svg" src={Logo} alt="ARTZY Logo" />
                </div></Link>
                <div className='menuWrapper'>
                    <Link to="/category"><h1 id='styleSettings'>Category</h1></Link>
                    <img src={MenuIcon} alt="Icon Menu" />
                    <Link to="/artist"><h1 id='styleSettings'>Artist</h1></Link>
                </div>
                <div className='inputWrapper'>
                    <input className='inputField' type="text" placeholder='Sök efter Product eller Artist' onChange={onChange} value={value}/>
                    <button className='button' onClick={() => onSearch(value)}><i className="fa-solid fa-magnifying-glass searchIcon"></i></button>
                </div>
                <div className='customerWrapper'>
                    <Link to="/wishlist"><h1 id='styleSettings'>Wishlist<i className="fa-solid fa-heart"></i></h1><p>({wishListCount ? wishListCount : 0})</p></Link>
                    <Link to="/cart"><h1 id='styleSettings'>Cart<i className="fa-solid fa-cart-shopping"></i></h1><p>({cartCount ? cartCount : 0})</p></Link>
                    { !currentUser && <Link to="/signin"><h1 className="signX" id='styleSettings'>Sign In<i className="fa-solid fa-user"></i></h1></Link>}
                    { currentUser && <Link to="/"><h1 className="signX" id='styleSettings' onClick={handleSignOut}>Sign out<i className="fa-solid fa-user"></i></h1></Link>}
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
                onClick={() => onSearch(item.artistname)}
                className="dropdown-row"
                key={index}
              >
                {item.artistname}
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
                    .map((item) => (
                        <div
                            onClick={() => onSearch(item.title)}
                            className="dropdown-row"
                            key={item.title}
                        >
                            {item.title}
                        </div>
                    ))
                    }
                </div>
                
        </div>
    )
}
