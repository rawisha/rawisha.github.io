import React from 'react'
import bild from '../assets/Bug.png'
import Footer from './Footer'
import Navbar from './Navbar'
import { Link } from 'react-router-dom';
export default function Pagenotfound() {
  return (
    <>
    <Navbar />
    <div className='pageError'>
      
        <img src={bild} alt="page-not-found"></img>
        <h1>404</h1>
        <h1>Error 404 Page not Found</h1>

        <Link to="/"><h1><span style={{color: "#202020"}}>Return</span> <span style={{color: "#c2872d"}}>Home</span></h1></Link>
        
    </div>
    <Footer  />
    </>
  )
}
