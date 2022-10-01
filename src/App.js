import './App.css';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';
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
import UnderConstruction from './pages/UnderConstruction'
import ArtistproductPage from './pages/ArtistproductPage';
import Searchresult from './pages/Searchresult';
import ArtistsingleItem from './Components/ArtistsingleItem';
import Productpage from './pages/Productpage';

function App() {
  return (
    <div className="App">
      
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product" element={<ArtistproductPage />} />
          <Route path="/product2" element={<Productpage />} />
          <Route path="/artist" element={<Artist />} />
          <Route path="/profile" element={<Artistprofile />} />
          <Route path="/artist3" element={<Artistprofile2/>} />
          <Route path="/artist4" element={<ArtistsingleItem/>} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/signin" element={<Login />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/category" element={<Category />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/category/:id" element={<BrowsingBy />} />
          <Route path="/underconstruction" element={<UnderConstruction />} />
          <Route path="*" element={<Pagenotfound />} />
          <Route path="/query:id" element={<Searchresult />} />
        </Routes>
      </Router>

    </div>
  );
}

export default App;
