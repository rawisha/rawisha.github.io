import React, { useState } from 'react'
import '../styles/Navbar.css'
import Logo from "../assets/Logo.svg"
import MenuIcon from "../assets/menu-Icon.svg"
import { useEffect } from 'react';
import { db, logout } from '../firebase-config'
import { onSnapshot, collection } from 'firebase/firestore'
import { Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';


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

    const currentUser = useAuth()

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
                    <h1 id='styleSettings'><a href='/category'>Category</a></h1>
                    <img src={MenuIcon} alt="Icon Menu" />
                    <h1 id='styleSettings'><a href='/artist'>Artist</a></h1>
                </div>
                <div className='inputWrapper'>
                    <input className='inputField' type="text" placeholder='Sök efter Product eller Artist' 
                    onChange={onChange} value={value}
                    />
                    <button className='button' onClick={() => onSearch(value)}><i className="fa-solid fa-magnifying-glass searchIcon"></i></button>
                   {/**/}
                    {/*<div><i className="fa-light fa-magnifying-glass"></i></div>*/}
                    
                </div>
                
                <div className='customerWrapper'>
                    <h1 id='styleSettings'><a href='/wishlist'>Wishlist</a> <i className="fa-solid fa-heart"></i></h1>
                    <h1 id='styleSettings'><a href='/cart'>Cart</a> <i className="fa-solid fa-cart-shopping"></i></h1>
                    { !currentUser && <h1 id='styleSettings'><a href='/signin'>Sign In</a> <i className="fa-solid fa-user"></i></h1>}
                    { currentUser && <h1 id='styleSettings' onClick={handleSignOut}><a href='/'>Sign out</a><i className="fa-solid fa-user"></i></h1>}
                </div>
                
            </div>
                
            <div className='borderSolidLine'></div>
            <div className='dataResult'>
                {results
            .filter((item) => {
              const searchTerm = value;
              const fullName = item.artistName;

              return (
                searchTerm &&
                fullName.startsWith(searchTerm) &&
                fullName !== searchTerm
              );
            })
            .slice(0, 10)
            .map((item, index) => (
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
