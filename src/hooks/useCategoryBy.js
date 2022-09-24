import { useState, useEffect } from 'react'
import { onSnapshot, collection, where, query } from 'firebase/firestore'
import { db } from '../firebase-config'

const useCategoryBy = (categoryRef) => {

    const [data, setData] = useState([])

    useEffect(() => {
        const colRef = collection(db, 'categories')
        const q = query(colRef, where('handle', '==', categoryRef)) 
        const unsub = onSnapshot(q, snapshot => {
            setData(snapshot.docs.map(doc => ({...doc.data(), id: doc.id})))
        })
        return unsub
    }, [categoryRef])
    
    return data
}

export default useCategoryBy;

