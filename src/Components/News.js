import React from 'react'
import bild from "../assets/bild.jpg";
import "../styles/News.css"

export default function News() {
  return (
    <div className="newsDiv">
      <h1 id="newsTitle">News</h1>
      
      <div className='newsImage'>
      <img src={bild} alt="Bild News"/>
      <div className='newsContent'>
      <h2>Pipilotti Rist Takes Risks for Art</h2>
      <p> Pipilotti Rist is famous for merging world cultures and self-discovery through her thought-provoking work, was that the driving force in picking her for this project? All exhibitions hosted at the National Museum of Qatar strive to speak to our communities through relevant and engaging topics. When working with any artist – local, regional, or internationally celebrated artists – it can often be challenging to find a balance between integrating a local specific narrative alongside an artist's predefined meaning and messaging behind their artworks. In this case, the collaboration was almost effortless, as Pipilotti and her team were keen on ensuring her art installation spoke to the people living in the hosting country – not only did Pipilotti want the big picture story attached to the exhibition to resonate with our audiences, but she even regularly consulted and reconfigured the sound installation to ensure that it was also linked to our messaging.</p>
      </div>
      </div>
    </div>
    
  )
}
