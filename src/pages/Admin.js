import Navbar from "../Components/Navbar"
import Footer from "../Components/Footer"
import '../styles/Admin.css'
import useGetAll from '../hooks/useGetAll'
import { collection, doc, getDocs, query, updateDoc, where } from "firebase/firestore"
import { db } from '../firebase-config'

export default function Admin() {

    const artists = useGetAll('artists')
    const pendingArtists = artists.filter(artist => artist.status === 'pending')
    const activeArtists = artists.filter(artist => artist.status === 'approved' || artist.status === 'rejected')

    const setStatus = async (artistName, status) => {
        const snapshot = await getDocs(query(collection(db, 'products'), where('by', '==', artistName)));
        snapshot.forEach(document => {
            const docRef = doc(db, 'products', document.id)
            updateDoc(docRef, {
                status: status
            })
        })
    }
    
    const handleReject = async (id, artistName) => {
        const docRef = doc(db, 'artists', id)
        await updateDoc(docRef, {
            status: 'rejected'
        })
        await setStatus(artistName, 'rejected')
        
    }

    const handleApprove = async (id, artistName) => {
        const docRef = doc(db, 'artists', id)
        await updateDoc(docRef, {
            status: 'approved'
        })
        await setStatus(artistName, 'approved')
    }

  return (
    <>
        <Navbar />

        <div className="admin-container">
            
            <h1>Pending Requests</h1>
            <table className="artists-table-pending">
                <tbody>
                    <tr>
                        <th>Name</th>
                        <th>Member Since</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                    {pendingArtists?.map(artist => (
                    <tr key={artist?.id}>
                        <td>{artist?.artistName}</td>
                        <td>{artist?.createdAt}</td>
                        <td>{artist?.status}</td>
                        <td className="action-cell">
                            <i onClick={() => handleReject(artist.id, artist.artistName)} className="fa-solid fa-ban"></i>
                            <i onClick={() => handleApprove(artist.id, artist.artistName)} className="fa-solid fa-check"></i>
                        </td>
                    </tr>
                    ))}
                </tbody>
            </table>
            
            <h1>Members</h1>
            <table className="artists-table">
                <tbody>
                    <tr>
                        <th>Name</th>
                        <th>Member Since</th>
                        <th>Items Sold</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                    {activeArtists?.map(artist => (
                    <tr key={artist?.id}>
                        <td>{artist?.artistName}</td>
                        <td>{artist?.createdAt}</td>
                        <td>{artist?.itemsSold}</td>
                        <td>{artist?.status}</td>
                        <td className="action-cell">
                            <i onClick={() => handleReject(artist.id, artist.artistName)} className="fa-solid fa-ban"></i>
                            <i onClick={() => handleApprove(artist.id, artist.artistName)} className="fa-solid fa-check"></i>
                        </td>
                    </tr>
                    ))}
                </tbody>
            </table>

        </div>

        <Footer />
    </>
  )
}
