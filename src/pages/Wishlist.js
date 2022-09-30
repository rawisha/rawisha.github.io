import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer'
import "../styles/Wishlist.css"
import { useState, useEffect } from 'react';
import WishlistItem from '../Components/WishlistItem'
import useCurrentUser from '../hooks/useCurrentUser';
import useCurrentArtist from '../hooks/useCurrentArtist';
import { useNavigate } from 'react-router-dom';


export default function Wishlist() {
  const navigate = useNavigate()
  const currentUser = useCurrentUser()
  const currentArtist = useCurrentArtist()

  const [user, setUser] = useState(null)
  const [prods, setProds] = useState([])
  const [delay, setDelay] = useState(false)
  
  useEffect(() => {
    if(currentArtist) return setUser(currentArtist)
    if(currentUser) return setUser(currentUser)
    setTimeout(() => {
      setDelay(true)
    }, 2000)
    if(!currentArtist && !currentUser && delay)
    setTimeout(() => {
      navigate('/signin')
    }, 1000)
  }, [currentUser, currentArtist, delay, navigate])
  

  useEffect(() => {
    if(user !==  null){
      setProds(user?.wishList)
    }
  },[user])

  return (
    <>
      <Navbar />
      {currentArtist || currentUser ? 
      <div className="wishlistHeader">
        <h1>Wishlist</h1>
      <div/>
        <div className='wishlistWrapper'>
          <div className="wishlistContainer">
          {prods?.length > 0 ? prods.map(product => (
                <WishlistItem prod={product} key={product.id} />
            )): <h2>Wishlist is empty...</h2>}
          </div>
        </div>
      </div> :
      <div className='wishlist-no-user'>
        <h1>Please sign in to use Wishlist!</h1>
        <h2>You are being redirected</h2>
      </div> }
      <Footer />
    </>


  )
}
