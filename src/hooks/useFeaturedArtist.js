import { useState, useEffect } from 'react'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../firebase-config'

const useFeaturedArtist = () => {

    const [data, setData] = useState([])

    useEffect(() => {
        const docRef = doc(db, 'featured', 'featuredArtist')
        getDoc(docRef)
            .then(doc => {
                setData({...doc.data()})
            })
    }, [])
    
    return data
}

export default useFeaturedArtist;

