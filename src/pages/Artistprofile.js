import "../styles/Artistprofile.css"
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'
import useCurrentArtist from "../hooks/useCurrentArtist"
import ArtistProfileTop from "../Components/ArtistProfileTop"
import { useState } from "react"
import { doc, updateDoc } from "firebase/firestore"
import { db } from '../firebase-config'

export default function Artistprofile() {

  const artist = useCurrentArtist()
  
  const [edit, setEdit] = useState(false)
  const [bio, setBio] = useState()

  const handleSave = async () => {
    const docRef = doc(db, 'artists', artist?.id)
    await updateDoc(docRef, {
      bio: bio
    })
    setEdit(false)
  }

  return (
    <div className='artistProfileContainer'>
      <Navbar />
      <ArtistProfileTop artist={artist}/>
      <div className="profileInfoWrapper">
        <div className="profileInfo">
          <h1>{artist?.firstName} {artist?.lastName}</h1>
          <div className="profileInfoBio">
            <img src={artist?.profilePic} alt="profile_pic"></img>
            <div className="artistInfo">
              <h1>Biography</h1>
              <i onClick={() => setEdit(!edit)} className="fa-solid fa-pencil-alt edit-icon"></i>
              {!edit ? <p>{artist?.bio}</p> : 
              <>
              <textarea className="edit-bio" onChange={(e) => setBio(e.target.value)}>{artist?.bio}</textarea>
              <div className="action-btns">
                <button onClick={() => setEdit(!edit)}>Discard</button>
                <button onClick={handleSave}>Save Changes</button>
              </div>
              </>}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
