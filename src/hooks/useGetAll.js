import { useState, useEffect } from 'react'
import { onSnapshot, collection } from 'firebase/firestore'
import { db } from '../firebase-config'

const useGetAll = (collectionRef) => {

    const [data, setData] = useState([])

    useEffect(() => {
        onSnapshot(collection(db, collectionRef), snapshot => {
            setData(snapshot.docs.map(doc => ({...doc.data(), id: doc.id})))
        } )
    }, [collectionRef])
    
    return data
}

export default useGetAll;

