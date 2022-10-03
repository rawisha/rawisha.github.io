import Navbar from "../Components/Navbar"
import Footer from "../Components/Footer"
import '../styles/Admin.css'
import useGetAll from '../hooks/useGetAll'
import { collection, doc, getDocs, query, setDoc, updateDoc, where } from "firebase/firestore"
import { db } from '../firebase-config'
import useFeaturedArtist from "../hooks/useFeaturedArtist"
import { useEffect, useState } from "react"
import { FaCheckCircle, FaExpeditedssl, FaEye, FaFileInvoice, FaTimes, FaTruck } from 'react-icons/fa'

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
    const ordersFromDB = useGetAll('orders')
    const orders = ordersFromDB.filter(order => order.status === 'on-hold' || order.status === 'transporting' || order.status === 'delivered')
    const pendingOrders = ordersFromDB.filter(order => order.status === 'pending')

    const [selected, setSelected] = useState()

    const amountOfProductsInOrder = (order) => {
        let amount = 0;
        order.orderCart.forEach(cart => {
            amount = amount + cart.cartAmount
        })
        return amount
    }

    const setOrderStatus = async (id, status) => {
        const docRef = await doc(db, 'orders', id)
        updateDoc(docRef, {
            status: status
        })
    }

    const handleHoldOrder = (id) => setOrderStatus(id, 'on-hold')     
    const handleTransportOrder = (id) => setOrderStatus(id, 'transporting')
    const handleDeviveredOrder = (id) => setOrderStatus(id, 'delivered')

    const handleSelected = (order) => {
        setSelected(order)
    }

    const handleClose = () => {
        setSelected(null)
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
                    {pendingOrders?.map((order) => (
                    <tr key={order?.id}>
                        <td>{order?.orderID}</td>
                        <td>{order?.orderDetails?.date}</td>
                        <td>{amountOfProductsInOrder(order)}</td>
                        <td>{order?.total} $</td>
                        <td>{order?.status}</td>
                        <td className="action-cell">
                            <FaExpeditedssl onClick={() => handleHoldOrder(order.id)}/>
                            <FaTruck onClick={() => handleTransportOrder(order.id)}/>
                            <FaCheckCircle onClick={() => handleDeviveredOrder(order.id)}/>
                        </td>
                        <td>
                            <FaFileInvoice onClick={() => handleSelected(order)}/>
                        </td>
                    </tr>
                    ))}
                    {orders?.map((order) => (
                    <tr key={order?.id}>
                        <td>{order?.orderID}</td>
                        <td>{order?.orderDetails?.date}</td>
                        <td>{amountOfProductsInOrder(order)}</td>
                        <td>{order?.total} $</td>
                        <td>{order?.status}</td>
                        <td className="action-cell">
                            <FaExpeditedssl onClick={() => handleHoldOrder(order.id)}/>
                            <FaTruck onClick={() => handleTransportOrder(order.id)}/>
                            <FaCheckCircle onClick={() => handleDeviveredOrder(order.id)}/>
                        </td>
                        <td>
                            <FaFileInvoice onClick={() => handleSelected(order)}/>
                        </td>
                    </tr>
                    ))}
                </tbody>
            </table>

            {selected && <div className="specification">
                <h1>Specification</h1>
                <FaTimes className="close-btn" onClick={handleClose}/>
                <h2>OrderID: {selected.orderID}</h2>
                <div className="order-specifications">
                    <div className="customer-info">
                        <h3>Customer Information</h3>
                        <p><span>Name:</span> {selected.orderDetails.name}</p>
                        <p><span>Adress:</span> {selected.orderDetails.address}</p>
                        <p><span>Adress:</span> {selected.orderDetails.addressTwo}</p>
                        <p><span>City:</span> {selected.orderDetails.city}</p>
                        <p><span>Zip:</span> {selected.orderDetails.zip}</p>
                        <p><span>Country:</span> {selected.orderDetails.country}</p>
                    </div>
                    <div className="card-information">
                        <h3>Payment Details</h3>
                        <p><span>Card Holder:</span> {selected.orderDetails.cardOwner}</p>
                        <p><span>Card Number:</span> {'****-****-****-' + selected.orderDetails.cardNumber.slice(12, 4)}</p>
                        <p><span>Total:</span> {selected.total} $</p>
                        <h3 className="contact-details">Contact</h3>
                        <p><span>Email:</span> {selected.orderDetails.email}</p>
                    </div>
                </div>
                <div className="order-feedback">
                    <h3>Message from customer</h3>
                    <p>{selected.orderDetails.feedback ? selected.orderDetails.feedback : 'No message'}</p>

                </div>
                <table className="order-table-specifictation">
                    <tbody>
                        <tr>
                            <th>Product</th>
                            <th>Category</th>
                            <th>By Artist</th>
                            <th>Quantity</th>
                            <th>Price</th>
                        </tr>
                        {selected?.orderCart?.map(item => (
                            <tr key={item?.id}>
                            <td>{item?.prod?.title}</td>
                            <td>{item?.prod?.categoryHandle}</td>
                            <td>{item?.prod?.by}</td>
                            <td>{item?.cartAmount}</td>
                            <td>{item?.prod?.price} $</td>
                        </tr>
                        ))}
                    </tbody>
                </table>
            </div>}

        </div>

        <Footer />
    </>
  )
}
