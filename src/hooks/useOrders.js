import { useState, useEffect } from 'react'
import { getDocs, collection } from 'firebase/firestore'
import { db } from '../firebase-config'


// använd ej!! 

const useOrders = () => {

    const [data, setData] = useState([])

    useEffect(() => {

        const getData = async () => {
            const snapshot = await getDocs(collection(db, 'orders'))
            setData(snapshot.docs.map(doc => ({...doc.data(), id: doc.id})))
        }
        getData()
    }, [])

    return data
}

export default useOrders;

