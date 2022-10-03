import useCurrentArtist from '../hooks/useCurrentArtist';
import Admin from '../pages/Admin';
import Login from '../pages/Login';
function ProtectedRoutes() {
    const user = useCurrentArtist()
  return user ? <Admin /> : <Login />
  
}

export default ProtectedRoutes
