import { useState, useEffect } from 'react'
import { onSnapshot, collection, where, query } from 'firebase/firestore'
import { db } from '../firebase-config'

const useGetArtistById = (id) => {

    const [data, setData] = useState([])

    useEffect(() => {
        const colRef = collection(db, 'artists')
        const q = query(colRef, where('artistName', '==', id)) 
        const unsub = onSnapshot(q, snapshot => {
            setData(snapshot.docs.map(doc => ({...doc.data(), id: doc.id})))
        })
        return unsub
    }, [id])
    
    return data
}

export default useGetArtistById;

