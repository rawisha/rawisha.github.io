import React from 'react'
import '../styles/Artist.css'
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'
import bild from '../assets/bild.jpg'
import { collection, onSnapshot } from 'firebase/firestore'
import { db } from '../firebase-config'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

export default function Artist() {

    const [artists, setArtists] = useState(null)
    const [results, setResults] = useState(null)
    const [searchTerm, setSearchTerm] = useState('')
    
    useEffect(() => {
        const unsub = onSnapshot(collection(db, 'artists'), snapshot => {
            setArtists(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id})))
        })
        return unsub
    }, [])
    
    const handleClick = (e) => {
        const searchHandle = String(e.target.innerText)
        setSearchTerm(searchHandle)
        setResults(artists.filter(artist => artist.artistName.startsWith(searchHandle.toLowerCase()) || artist.artistName.startsWith(searchHandle.toUpperCase())))
    }

    const convertString = (str) => {
        const newString = str.charAt(0).toUpperCase() + str.slice(1)
        return newString
    }

    const handleSearch = (e) => {
        if (!e.target.value) {
            setResults(null)
            setSearchTerm(null)
            return 
        }
        const searchHandle = String(e.target.value)
        const searchHandleUppercase = convertString(searchHandle)
        setResults(artists.filter(artist => String(artist.artistName).startsWith(searchHandle) || String(artist.artistName).startsWith(searchHandleUppercase) || String(artist.artistName).startsWith(searchHandle.toLowerCase())))
        setSearchTerm(searchHandle)
    }

    return (
    <>
        <Navbar />
        <div className='artistContainer'>
            <h1>Featured artist of the week</h1>
            <div className='artistCardContainer'>
                <h2 id="artistTitle">Pipilotti Rist</h2>
                <img src={bild} alt="profile_picture"></img>
            </div>

            <div className='artistSearchContainer'>
                <h1>Artists</h1>
                <form>
                    <button type="submit">Search</button>
                    <input onChange={handleSearch} type="search" placeholder='Search by artist...'></input>
                </form>
                
                <h2>Find artist by name</h2>
                <div className='alphabeticButtonContainer'>
                <button onClick={handleClick} className='alphabeticButton'>A</button>
                <button onClick={handleClick} className='alphabeticButton'>B</button>
                <button onClick={handleClick} className='alphabeticButton'>C</button>
                <button onClick={handleClick} className='alphabeticButton'>D</button>
                <button onClick={handleClick} className='alphabeticButton'>E</button>
                <button onClick={handleClick} className='alphabeticButton'>F</button>
                <button onClick={handleClick} className='alphabeticButton'>G</button>
                <button onClick={handleClick} className='alphabeticButton'>H</button>
                <button onClick={handleClick} className='alphabeticButton'>I</button>
                <button onClick={handleClick} className='alphabeticButton'>J</button>
                <button onClick={handleClick} className='alphabeticButton'>K</button>
                <button onClick={handleClick} className='alphabeticButton'>L</button>
                <button onClick={handleClick} className='alphabeticButton'>M</button>
                <button onClick={handleClick} className='alphabeticButton'>N</button>
                <button onClick={handleClick} className='alphabeticButton'>O</button>
                <button onClick={handleClick} className='alphabeticButton'>P</button>
                <button onClick={handleClick} className='alphabeticButton'>Q</button>
                <button onClick={handleClick} className='alphabeticButton'>R</button>
                <button onClick={handleClick} className='alphabeticButton'>S</button>
                <button onClick={handleClick} className='alphabeticButton'>T</button>
                <button onClick={handleClick} className='alphabeticButton'>U</button>
                <button onClick={handleClick} className='alphabeticButton'>V</button>
                <button onClick={handleClick} className='alphabeticButton'>W</button>
                <button onClick={handleClick} className='alphabeticButton'>X</button>
                <button onClick={handleClick} className='alphabeticButton'>Y</button>
                <button onClick={handleClick} className='alphabeticButton'>Z</button>
                </div>
                
            </div>
            <div className='resultContainer'>
                {results && <h3 className='resultTile'> Search found {results?.length} hits on "{searchTerm}"</h3>}
                
                <div className='articleCardResultContainer'>

                    {results && results.map(artist => (
                        <div key={artist.id} className='articleCardResult'>
                            <h2>{artist.artistName}</h2>
                            <img src={artist.profilePic} alt="profile_picture" />
                        </div>
                    ))}

                </div>
            </div>
            <Footer />
        </div>
    </>
  )
}
