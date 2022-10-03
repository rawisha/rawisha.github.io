import {useState} from "react"
import { arrayUnion, arrayRemove, doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase-config';
import useCurrentUser from '../hooks/useCurrentUser'
import useCurrentArtist from '../hooks/useCurrentArtist'

export default function HandleWL(product) {
    const artist = useCurrentArtist
    const [wishState,setWishState] = useState(false)
    const user = useCurrentUser
    return (
    async function removeFromWishList (products) {
        console.log(product)
        
        console.log(user)
        
        if(user) {
            const docRef = doc(db, 'users', `${user?.id}`)
            await updateDoc(docRef, {
                wishList: arrayRemove(product)
            })
            setWishState(false)
          }
          if(artist) {
            const docRef = doc(db, 'artists', `${artist?.id}`)
            await updateDoc(docRef, {
                wishList: arrayRemove(product)
            })
            setWishState(false)
            }
        } 
        )

} 