import React from 'react'
import '../styles/Artist.css'
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'
import bild from '../assets/bild.jpg'
export default function Artist() {
  return (
    <div>
        <Navbar />
        <div className='artistContainer'>
            <h1>Featured artist of the week</h1>
            
            <div className='artistCardContainer'>
                <h2 id="artistTitle">Pipilotti Rist</h2>
                <img src={bild}></img>
            </div>

            <div className='artistSearchContainer'>
                <h1>Artists</h1>
                <form>
                    <button type="submit">Search</button>
                    <input type="search" placeholder='Search by artist...'></input>
                </form>
                
                
                <h2>Find artist by name</h2>
                <div className='alphabeticButtonContainer'>
                <button className='alphabeticButton'>A</button>
                <button className='alphabeticButton'>B</button>
                <button className='alphabeticButton'>C</button>
                <button className='alphabeticButton'>D</button>
                <button className='alphabeticButton'>E</button>
                <button className='alphabeticButton'>F</button>
                <button className='alphabeticButton'>G</button>
                <button className='alphabeticButton'>H</button>
                <button className='alphabeticButton'>I</button>
                <button className='alphabeticButton'>J</button>
                <button className='alphabeticButton'>K</button>
                <button className='alphabeticButton'>L</button>
                <button className='alphabeticButton'>M</button>
                <button className='alphabeticButton'>N</button>
                <button className='alphabeticButton'>O</button>
                <button className='alphabeticButton'>P</button>
                <button className='alphabeticButton'>Q</button>
                <button className='alphabeticButton'>R</button>
                <button className='alphabeticButton'>S</button>
                <button className='alphabeticButton'>T</button>
                <button className='alphabeticButton'>U</button>
                <button className='alphabeticButton'>V</button>
                <button className='alphabeticButton'>W</button>
                <button className='alphabeticButton'>X</button>
                <button className='alphabeticButton'>Y</button>
                <button className='alphabeticButton'>Z</button>
                </div>
                
            </div>
            <div className='resultContainer'>
                <h3 className='resultTile'> Search found X hits on "Rawand"</h3>
                
            <div className='articleCardResultContainer'>
                <div className='articleCardResult'>
                    <h2>Painting</h2>
                    <img src={bild} alt="Bild alt" />
                </div>
                <div className='articleCardResult'>
                    <h2>Painting</h2>
                    <img src={bild} alt="Bild alt" />
                </div>
                <div className='articleCardResult'>
                    <h2>Painting</h2>
                    <img src={bild} alt="Bild alt" />
                </div>
                <div className='articleCardResult'>
                    <h2>Painting</h2>
                    <img src={bild} alt="Bild alt" />
                </div>
                <div className='articleCardResult'>
                    <h2>Painting</h2>
                    <img src={bild} alt="Bild alt" />
                </div>
                <div className='articleCardResult'>
                    <h2>Painting</h2>
                    <img src={bild} alt="Bild alt" />
                </div>
                <div className='articleCardResult'>
                    <h2>Painting</h2>
                    <img src={bild} alt="Bild alt" />
                </div>
                <div className='articleCardResult'>
                    <h2>Painting</h2>
                    <img src={bild} alt="Bild alt" />
                </div>
              
                
            
            </div>

            </div>
            <div className='borderSolidLine'></div>
            <Footer />
        </div>


        
    </div>
  )
}
