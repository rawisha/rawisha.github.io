import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/Artistsingleitem.css'

export default function Artistsingleitem ({artistname,imgUrl}) {

  return (
    <div className="artistsingle--Container">
        <Link to={'/artist/' + artistname} ><div className='aristsingle--Wrapper'>
            <h2>{artistname}</h2>
            <img src={imgUrl} alt="Bild alt" />
        </div></Link>
    </div>
  )
}
