import React from 'react'
import '../styles/CategorysingleItem.css'
export default function CategorysingleItem({categoryName,imgUrl}) {
  return (
    <div className="categorysingle--Container">
        <div className='categorysingle--Wrapper'>
            <img src={imgUrl} alt="Bild alt" />
            <h2>{categoryName}</h2>
        </div>
    </div>
  )
}
