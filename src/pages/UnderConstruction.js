import React from 'react'
import Navbar from '../Components/Navbar'
import "../styles/Underconstruction.css"
import Footer from '../Components/Footer'
import { Link } from 'react-router-dom'

export default function UnderConstruction() {
  return (
    <div>
        <Navbar />
        <div className="underConstructionAnchor">
        <h1 className="underConstructionh1">This page is under construction. Coming soon...</h1>
        <Link to="/">Return Home</Link>
        </div>
        <div>
            <Footer />
        </div>
    </div>
  )
}
