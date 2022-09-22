import { onAuthStateChanged } from "firebase/auth";
import { auth } from '../firebase-config'
import { useState, useEffect } from 'react'

export default function useAuth() {
    const [currentUser, setCurrentUser] = useState()

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, user => setCurrentUser(user))
        return unsub
    }, [])

    return currentUser
}