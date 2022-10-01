import React, { useEffect, useState } from "react";
import { v4 as uuid } from 'uuid'
import useCurrentArtist from '../hooks/useCurrentArtist'
import { doc, updateDoc } from 'firebase/firestore'
import { ref } from 'firebase/storage'
import { db, storage } from '../firebase-config'
import { getDownloadURL, uploadBytes } from 'firebase/storage'
import '../styles/Artistprofile.css'

const UploadAndDisplayImage = () => {
  const artist = useCurrentArtist()
  const [error, setError] = useState('')
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    if(artist) { setSelectedImage(artist.profilePic)}
  }, [artist])

  const types = ['image/png', 'image/jpeg'];

  const handleProfilePic = (e) => {
    const file = e.target.files[0]
    if (file && types.includes(file.type)) {
      setError('')
      const storageRef = ref(storage, `profiles/${uuid() + '-' + file.name}`)
      const docRef = doc(db, 'artists', artist.id)  
      uploadBytes(storageRef, file)
      .then(snapshot => {
        getDownloadURL(snapshot.ref)
        .then(url => {
          if (url) {
            updateDoc(docRef, { 
              profilePic: url
            })
          }
        })
      })
    } else {
      setError('Please upload an image file')
      return
    }
  }

  return (
    <>
      {selectedImage && (
        <div className="profile-pic">
          <img alt="Not Found" width={"250px"} src={(selectedImage)} />
        <label><i className="fa-solid fa-pencil-alt"></i>
          <input
            type="file"
            name="myImage"
            onChange={handleProfilePic}
          />
        </label>
      {error && <div className="profile-pic-error">{error}</div>}
      </div>
      )}
    </>
  );
};

export default UploadAndDisplayImage;