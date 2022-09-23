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
function App() {
  return (
    <div className="App">
      
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/artist" element={<Artist />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/signin" element={<Login />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/category" element={<Category />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/category/browsingby" element={<BrowsingBy />} />
        </Routes>
      </Router>

    </div>
  );
}

export default App;
