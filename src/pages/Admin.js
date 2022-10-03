import Navbar from "../Components/Navbar"
import Footer from "../Components/Footer"
import '../styles/Admin.css'
import useGetAll from '../hooks/useGetAll'
import { collection, doc, getDocs, query, setDoc, updateDoc, where } from "firebase/firestore"
import { db } from '../firebase-config'
import useFeaturedArtist from "../hooks/useFeaturedArtist"
import { useEffect, useState } from "react"
import { FaCheckCircle, FaExpeditedssl, FaEye, FaFileInvoice, FaTruck } from 'react-icons/fa'

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


    // Featured Artist
    const [featured, setFeatured] = useState()
    const currentFeatured = useFeaturedArtist()

    const setFeaturedArtist = async (artist) => {
        setFeatured(artist)
        const docRef = doc(db, 'featured', 'featuredArtist')
        await setDoc(docRef, {
            featuredArtist: artist
        }).then(() => {
            setFeatured(artist)
        })
    }

    useEffect(() => {
        setFeatured(currentFeatured?.featuredArtist)
    }, [currentFeatured])

    // Orders
    const orders = useGetAll('orders')
    const [selected, setSelected] = useState()

    const amountOfProductsInOrder = (order) => {
        let amount = 0;
        order.orderCart.forEach(cart => {
            amount = amount + cart.cartAmount
        })
        return amount
    }

    const handleHoldOrder = () => {

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
                        <th>Applied At</th>
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
            <table className="artists-table-members">
                <tbody>
                    <tr>
                        <th>Name</th>
                        <th>Member Since</th>
                        <th>Items Sold</th>
                        <th>Status</th>
                        <th>Action</th>
                        <th>Featured</th>
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
                        <td className="featured-radio"><input onChange={(e) => setFeaturedArtist(artist)} checked={featured?.id === artist?.id ? true : false} type="radio" name="featured"/></td>
                    </tr>
                    ))}
                </tbody>
            </table>
            
            <h1>Orders</h1>
            <table className="orders-table">
                <tbody>
                    <tr>
                        <th>OrderID</th>
                        <th>Date</th>
                        <th>Products</th>
                        <th>Amount</th>
                        <th>Status</th>
                        <th>Action</th>
                        <th><FaEye /></th>
                    </tr>
                    {orders?.map((order) => (
                    <tr key={order?.id}>
                        <td>{order?.orderID}</td>
                        <td>{order?.orderDetails?.date}</td>
                        <td>{amountOfProductsInOrder(order)}</td>
                        <td>{order?.total} $</td>
                        <td>{order?.status}</td>
                        <td className="action-cell">
                            <FaExpeditedssl onClick={() => handleHoldOrder(order.id)}/>
                            <FaTruck />
                            <FaCheckCircle />
                        </td>
                        <td>
                            <FaFileInvoice />
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
