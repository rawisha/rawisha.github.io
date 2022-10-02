import "../styles/Artistprofile.css"
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'
import useCurrentArtist from "../hooks/useCurrentArtist"
import ArtistProfileTop from "../Components/ArtistProfileTop"


export default function Artistprofile() {

  const artist = useCurrentArtist()
  
  return (
    <div className='artistProfileContainer'>
      <Navbar />
      <ArtistProfileTop artist={artist}/>

        <div className="profileInfoWrapper">
            <div>
                <h1>Status: {artist?.status}</h1>
            </div>
        </div>
       
      <Footer />
    </div>
  )
}
