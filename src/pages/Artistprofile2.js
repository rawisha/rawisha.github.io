import React from 'react'
import "../styles/Artistprofile.css"
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'
import ArtistProfileTop from '../Components/ArtistProfileTop'
import useCurrentArtist from "../hooks/useCurrentArtist"
import { useEffect, useState } from 'react'
import { collection, query, where, onSnapshot, doc, deleteDoc } from 'firebase/firestore'
import { db } from '../firebase-config'
import { Link } from 'react-router-dom'

export default function Artistprofile() {

  const artist = useCurrentArtist()

  const [products, setProducts] = useState()
  const [output, setOutput] = useState()

  useEffect(() => {
    if(artist) {
      const colRef = collection(db, 'products')
      const q = query(colRef, where('by', '==', artist?.artistName))
      const unsub = onSnapshot(q, snapshot => {
        setProducts(snapshot.docs.map(doc => ({...doc.data(), id: doc.id})))
      })
      return unsub
    }
  }, [artist]) 

  const handleDelete = async (id) => {
    const docRef = doc(db, 'products', id)
    await deleteDoc(docRef)
      .then(() => {
        setOutput('Product deleted')
      })
  }

  return (
    <div className='artistProfileContainer'>
      <Navbar />
      <ArtistProfileTop artist={artist}/>
      <div className="products-container">
        {products?.map(product => (
          <div key={product.id} className='productSingleItemContainer2 productSingleItemContainer'>
            <h2 className='cardTitle'>{product.title}</h2>
            <h3 className='cardSubTitle'><Link to={`/category/`+ product.categoryHandle}>{product.categoryHandle}</Link></h3>
            <Link className="linkId" to={'/product/' + product.id} >
              <div className='imageContainer'>
                <img src={product.imageUrl} alt="bild"></img>
              </div>
            </Link>
            <div className='priceContainer2'>
              <h2 className='priceText2'>{product.price}$</h2>
            </div>
            <div onClick={() => handleDelete(product.id)} className="delete-product">
              <i className="fa-solid fa-times"></i>
            </div>
          </div>
        ))}  
      </div>
        {output && <div className="output">{output}</div>}
      <Footer />
    </div>
  )
}
