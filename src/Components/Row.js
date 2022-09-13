import React from 'react';
import '../styles/Row.css';
import bild from '../assets/bild.jpg';
import News from './News';

/* 
TO DO:
Dynamic code
css ?
remove 1 ROW and make it dynamic
more buttons .. design ?

Write js code

*/

export default function Row() {
    return (
        <div className='rowContainer'>
            <div className='titleWrapper'>
                <h2 className='rowTitle'>Explore what you Love..</h2>
            </div>

            <div className='contentWrapper'>
                <div className='pictureContainer'>
                    <img src={bild} alt="Bild alt" />
                    <h2>Clothing</h2>
                </div>
                <div className='pictureContainer'>
                    <img src={bild} alt="Bild alt" />
                    <h2>Ceramic</h2>
                </div>
                <div className='pictureContainer'>
                    <img src={bild} alt="Bild alt" />
                    <h2>Glass</h2>
                </div>
                <div className='pictureContainer'>
                    <img src={bild} alt="Bild alt" />
                    <h2>Painting</h2>
                </div>
            </div>
            <div className='borderSolidLine'></div>
            <div className='titleWrapper'>
                <h2 className='rowTitle'>Find and support artists..</h2>
            </div>

            <div className='contentWrapper'>
                <div className='pictureContainer2'>
                    <h2>Clothing</h2>
                    <img src={bild} alt="Bild alt" />

                </div>
                <div className='pictureContainer2'>
                    <h2>Ceramic</h2>
                    <img src={bild} alt="Bild alt" />

                </div>
                <div className='pictureContainer2'>
                    <h2>Glass</h2>
                    <img src={bild} alt="Bild alt" />

                </div>
                <div className='pictureContainer2'>
                    <h2>Painting</h2>
                    <img src={bild} alt="Bild alt" />

                </div>
            </div>
            <div className='borderSolidLine'></div>
            <div className="newsDiv">
            <News />
            </div>

            
        </div>

    )
}
