import { useState, useEffect } from 'react'
import { onSnapshot, collection, where, query } from 'firebase/firestore'
import { db } from '../firebase-config'

const useProductsByArtist = (artistRef) => {

    const [data, setData] = useState([])

    useEffect(() => {
        const colRef = collection(db, 'products')
        const q = query(colRef, where('by', '==', artistRef)) 
        const unsub = onSnapshot(q, snapshot => {
            setData(snapshot.docs.map(doc => ({...doc.data(), id: doc.id})))
        })
        return unsub
    }, [artistRef])
    
    return data
}

export default useProductsByArtist;

