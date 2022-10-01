import { useState, useEffect } from 'react'
import { onSnapshot, doc } from 'firebase/firestore'
import { db } from '../firebase-config'

const useProductById = (id) => {

    const [data, setData] = useState([])

    useEffect(() => {
        const docRef = doc(db, 'products', id)
        const unsub = onSnapshot(docRef, doc => {
            setData(({...doc.data(), id: doc.id}))
        })
        return unsub
    }, [id])
    
    return data
}

export default useProductById;

