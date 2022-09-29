import { useState, useEffect } from 'react'
import { collection, doc, updateDoc } from 'firebase/firestore'
import { ref } from 'firebase/storage'
import { db, storage } from '../firebase-config'
import { getDownloadURL, uploadBytes } from 'firebase/storage'

const useChangePic = (artistRef, file) => {

    const [url, setUrl] = useState('')

    useEffect(() => {
        const storageRef = ref(storage, 'profiles/')

        uploadBytes(storageRef, file)
            .then(snapshot => {
                getDownloadURL(snapshot.ref)
                    .then(url => {
                        if (url) {
                            setUrl(url)
                        }
                        console.log(url)
                    })
            })
        
        const docRef = collection(db, 'artists', )
        
        
        
        // const q = query(colRef, where('artistName', '==', artistRef)) 
        // const unsub = onSnapshot(q, snapshot => {
        //     setArtist(snapshot.docs.map(doc => ({...doc.data(), id: doc.id})))
        // })
        // return unsub



    }, [artistRef, file])
    
    return { url }
}

export default useChangePic;

