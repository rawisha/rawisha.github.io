import "../styles/Artistprofile.css"
import bannerImg from '../assets/banner.png'
import UploadProfilePic from '../Components/UploadProfilePic'
import { Link } from "react-router-dom"

export default function ArtistProfileTop({artist}) {
  return (
    <>
    <div className="bannerContainer">
          <img src={bannerImg} alt="banner-bild"></img>
        </div>
        <div className="profileContainer">
          <UploadProfilePic />
          <div className="profileDetails">
            <h1>{artist?.artistName}</h1>
            <ul>
              <li><Link to={'/profile'} >Your Bio</Link></li>
              <li><Link to={'/profile/products'} >Your Products</Link></li>
              <li><Link to={'/profile/upload'} >Upload Product</Link></li>
              <li><Link to={'/profile/settings'} >Your Settings</Link></li>
            </ul>
          </div> 
        </div>
    </>
    )
}
