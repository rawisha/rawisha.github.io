import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Artist from './Components/Artist';
import Cart from "./pages/Cart";
import Login from './pages/Login';
import Wishlist from './pages/Wishlist';
import Category from './pages/Category';
import Signup from './pages/Signup';
import BrowsingBy from './pages/BrowsingBy'
import Pagenotfound from './Components/Pagenotfound';
import Artistprofile from './pages/Artistprofile';
import Artistprofile2 from './pages/Artistprofile2';
import Artistprofile3 from './pages/Artistprofile3';
import Artistprofile4 from './pages/Artistprofile4';
import UnderConstruction from './pages/UnderConstruction'
import ArtistproductPage from './pages/ArtistproductPage';
import Searchresult from './pages/Searchresult';
import Productpage from './pages/Productpage';
import { React, useEffect, useState } from 'react';
import { UserContext } from './hooks/UserContext'
import ProtectedRoutes from './Components/ProtectedRoutes';

function App() {
  const [cartState, setCartState] = useState()

  useEffect(() => {
    const initCart = JSON.parse(localStorage.getItem('cart'))
    if (initCart) {
      setCartState(initCart)
    } else {
      localStorage.setItem('cart', JSON.stringify([]))
    }
  }, [])

  return (
    <div className="App">

      <Router>
        <UserContext.Provider value={{ cartState, setCartState }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/admin" element={<ProtectedRoutes />} />
            <Route path="/product/:id" element={<Productpage />} />
            <Route path="/artist" element={<Artist />} />
            <Route path="/artist/:id" element={<ArtistproductPage />} />
            <Route path="/profile" element={<Artistprofile />} />
            <Route path="/profile/products" element={<Artistprofile2 />} />
            <Route path="/profile/upload" element={<Artistprofile3 />} />
            <Route path="/profile/settings" element={<Artistprofile4 />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/signin" element={<Login />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/category" element={<Category />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/category/:id" element={<BrowsingBy />} />
            <Route path="/underconstruction" element={<UnderConstruction />} />
            <Route path="/query/:id" element={<Searchresult />} />
            <Route path="*" element={<Pagenotfound />} />
          </Routes>
        </UserContext.Provider>
      </Router>

    </div>
  );
}

export default App;
