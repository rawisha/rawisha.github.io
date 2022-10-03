import '../styles/Navbar.css'
import Logo from "../assets/Logo.svg"
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db, logout } from '../firebase-config'
import { onSnapshot, collection, query, where } from 'firebase/firestore'
import { Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import useCurrentUser from '../hooks/useCurrentUser';
import useCategories from '../hooks/useCategories';
import MenuProductItem from './MenuProductItem';
import useCurrentArtist from '../hooks/useCurrentArtist'
import { FaUserCog } from 'react-icons/fa';


export default function Navbar() {
    
    const navigate = useNavigate()
    const initCart = JSON.parse(localStorage.getItem('cart'))
    const currentUser = useAuth()
    const user = useCurrentUser()
    const artist = useCurrentArtist()
    let wishListCount = user?.wishList.length || artist?.wishList?.length;
    let cartCount = user?.cart?.length || artist?.cart?.length || initCart?.length;

    // LOGOUT
    const handleSignOut = () => {
        logout();
        navigate('/')
    }

    // Category menu
    const categories = useCategories()

    /*backend search*/
    const [value, setValue] = useState("");
    const [products, setProducts] = useState([]);
    const [productResults, setProductResults] = useState([]);
    const [artists, setArtists] = useState(null);
    const [artistResults, setArtistResults] = useState(null);
   
    useEffect(() => {
        const q = query(collection(db, 'products'), where('status', '==', 'approved'))
        const unsub = onSnapshot(q, snapshot => {
            setProducts(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id})))
        })
        return unsub
    }, [])
    useEffect(() => {
        const q = query(collection(db, 'artists'), where('status', '==', 'approved'))
        const unsub = onSnapshot(q, snapshot => {
            setArtists(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id})))
        })
        return unsub
    }, [])

    const convertToUppercase = (str) => {
        const newString = str.charAt(0).toUpperCase() + str.slice(1)
        return newString
    }

    useEffect(() => {
        if (value) {
            const newValue = convertToUppercase(value)
            const productResults = products.filter(prod => String(prod.title).startsWith(value) || String(prod.title).startsWith(value.toLowerCase()) || String(prod.title).startsWith(newValue))
            setProductResults(productResults)
            const artistResults = artists.filter(artist => String(artist.artistName).startsWith(value) || String(artist.artistName).startsWith(value.toLowerCase()) || String(artist.artistName).startsWith(newValue))
            setArtistResults(artistResults)
        }
    }, [value, products, artists])

    window.onclick = () => { setValue('') }
    window.onkeydown = (e) => { if(e.key === 'Escape') setValue('') }

    return (
        <div className='Navbar'>
            <Link className="admin-link" to="/admin"><FaUserCog className='admin-icon'/></Link>
            {artist && <>
                <div className="profile-settings-icon-container">
                <Link to="/profile"><i className='fa-solid fa-gear profile-settings-icon'></i></Link>
                    <div className='profile-link-text'>My Profile</div>
                </div>
            </>}
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
                                    <Link className="category-menu-item-link" to={'/category/' + category.handle}>
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
                    <input className='inputField' type="text" placeholder='Search products or artists' onChange={(e) => setValue(e.target.value)} value={value}/>
                    <i className="fa-solid fa-magnifying-glass searchIcon"></i>
                    {value && <div className="search-results">
                        <div className="product-results" >
                            <p>Top results for products: ({productResults?.length})</p>
                            {productResults && productResults.slice(0,10).map(product => (
                                <Link key={product.id} to={'/product/' + product.id}><div>{product.title}</div></Link>
                            ))}
                            {productResults?.length > 0 ? null : <p>No results...</p>}
                        </div>
                        <div className="artist-results">
                            <p>Top results for artists: ({artistResults?.length})</p>
                            {artistResults && artistResults.slice(0,10).map(artist => (
                                <Link key={artist.id} to={'/artist/' + artist.artistName}><div>{artist.artistName}</div></Link>
                            ))}
                            {artistResults?.length > 0 ? null : <p>No results...</p>}
                        </div>
                    </div>}
                </div>
                <div className='customerWrapper'>
                    <Link to="/wishlist"><div className="menu-icon-container"><h1 id='styleSettings'>Wishlist</h1><i className="fa-solid fa-heart"></i><p>({wishListCount ? wishListCount : 0})</p></div></Link>
                    <Link to="/cart"><div className="menu-icon-container"><h1 id='styleSettings'>Cart</h1><i className="fa-solid fa-cart-shopping"></i><p>({cartCount ? cartCount : 0})</p></div></Link>
                    { !currentUser && <Link to="/signin"><div className="menu-icon-container"><h1 className="signX" id='styleSettings'>Sign In</h1><i className="fa-solid fa-user"></i><p>&nbsp;</p></div></Link>}
                    { currentUser && <Link to="/"><div className="menu-icon-container"><h1 className="signX" id='styleSettings' onClick={handleSignOut}>Sign out</h1><i className="fa-solid fa-user"></i><p>{user?.eMail || artist?.eMail}</p></div></Link>}
                </div>
                
            </div>
            <div className='borderSolidLine'></div>
        </div>
    )
}
