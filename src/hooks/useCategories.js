import { useState, useEffect } from 'react'
import { onSnapshot, collection, where, orderBy, query } from 'firebase/firestore'
import { db } from '../firebase-config'

const useCategories = () => {

    const [data, setData] = useState([])

    useEffect(() => {
        const colRef = collection(db, 'categories')
        const q = query(colRef, orderBy('name')) 
        const unsub = onSnapshot(q, snapshot => {
            setData(snapshot.docs.map(doc => ({...doc.data(), id: doc.id})))
        })
        return unsub
    }, [])
    
    return data
}

export default useCategories;

