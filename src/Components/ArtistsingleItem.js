import React from 'react'
import bild from '../assets/bild.jpg';
import '../styles/Artistsingleitem.css'

export default function ({artistname,imgUrl}) {

  return (
    <div className="artistsingle--Container">
        <div className='aristsingle--Wrapper'>
            <h2>{artistname}</h2>
            <img src={imgUrl} alt="Bild alt" />
        </div>
    </div>
  )
}
