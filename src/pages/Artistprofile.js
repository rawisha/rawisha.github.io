import "../styles/Artistprofile.css"
import bannerImg from '../assets/banner.png'
import bild from '../assets/bild.jpg'
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'
import UploadProfilePic from '../Components/UploadProfilePic'
import useCurrentArtist from "../hooks/useCurrentArtist"

export default function Artistprofile() {

  const artist = useCurrentArtist()
  
  return (

    <div className='artistProfileContainer'>
      <Navbar />
        <div className="bannerContainer">
          <img src={bannerImg} alt="banner-bild"></img>
        </div>
        
        <div className="profileContainer">
          
          <UploadProfilePic />
          <div className="profileDetails">
            <h1>{artist?.artistName} (status: {artist?.status})</h1>
            <ul>
              <li>Your Bio</li>
              <li>Your Products</li>
              <li>Upload Product</li>
              <li>Your History</li>
            </ul>
          </div> 
        </div>
        <div className="profileInfoWrapper">
        <div className="profileInfo">
            <h1>Artist name</h1>
           

            <div className="profileInfoBio">
              <img src={bild} alt="profile-bild2"></img>
              
              <div className="artistInfo">
              <h1>Pipilotti Rist Takes Risks for Art</h1>
              <p>Pipilotti Rist is famous for merging world cultures and self-discovery through her thought-provoking work, 
                was that the driving force in picking her for this project? All exhibitions hosted at the National Museum of Qatar strive to speak to our communities through relevant and engaging topics. When working with any artist – local, regional, or internationally celebrated artists – it can often be challenging to find a balance between integrating a local specific narrative alongside an artist's predefined meaning and messaging behind their artworks. 
                In this case, the collaboration was almost effortless, as Pipilotti and her team were keen on ensuring her art installation spoke to the people living in the hosting country
                 not only did Pipilotti want the big picture story attached to the exhibition to resonate with our audiences, but she even regularly consulted and reconfigured the sound installation to ensure that it was also linked to our messaging.  </p>
              </div>
              
            </div>
          </div>
        </div>
       
      <Footer />
    </div>
  )
}
