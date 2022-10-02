import "../styles/Artistprofile.css"
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'
import ProductUpload from '../Components/ProductUpload'
import useCurrentArtist from "../hooks/useCurrentArtist"
import ArtistProfileTop from "../Components/ArtistProfileTop"


export default function Artistprofile() {

  const artist = useCurrentArtist()
  
  return (

    <div className='artistProfileContainer'>
      <Navbar />
      <ArtistProfileTop artist={artist}/>

        <div className="profileInfoWrapper">
            <ProductUpload artist={artist}/>
        </div>
       
      <Footer />
    </div>
  )
}
