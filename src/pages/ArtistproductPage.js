import React from 'react'
import Footer from '../Components/Footer'
import Navbar from '../Components/Navbar'
import "../styles/AristproductPage.css"
import bild from '../assets/bild.jpg'

export default function ArtistproductPage() {
  return (
    <div>
        <Navbar />
        <div className="productPageContainer">
        <div className="profileInfoWrapper">
            <div className="profileInfo">
                <h1>Artist name</h1>
                <div className="profileInfoBio">
                <img src={bild} alt="profile-bild2"></img>
                    <div className="artistInfo">
                    <h1>Pipilotti Rist Takes Risks for Art</h1>
                    <p>Pipilotti Rist is famous for merging world cultures and self-discovery through her thought-provoking work, 
                    was that the driving force in picking her for this project? All exhibitions hosted at the National Museum of Qatar strive to speak to our communities through relevant and engaging topics. When working with any artist – local, regional, or internationally celebrated artists – it can often be challenging to find a balance between integrating a local specific narrative alongside an artist's predefined meaning and messaging behind their artworks. 
                    In this case, the collaboration was almost effortless, as Pipilotti and her team were keen on ensuring her art installation spoke to the people living in the hosting country
                    not only did Pipilotti want the big picture story attached to the exhibition to resonate with our audiences, but she even regularly consulted and reconfigured the sound installation to ensure that it was also linked to our messaging.  </p>
                    </div>
              
                </div>
            </div>
        </div>

        <div className="productWrapper">
            <h1>Artworks for Sale by Artist Name </h1>
            <div className="productContainer">
                <div  className='productSingleItemContainer'>
                        <h2 className='cardTitle'>title</h2>
                        <h3 className='cardSubTitle'>by artist name</h3>
                        
                    <div className='imageContainer'>
                        <i  id="heart" className='fa-solid fa-heart imagefavoriteIcon' ></i>
                        
                        <img src={bild} alt="bild"></img>
                    </div>
                    <div className='priceContainer'>
                        <h2 className='priceText'>200 $</h2>
                        <i className="fa-solid fa-cart-shopping  addCartIcon"></i>
                        <button className="addToCart" >Add</button>
                    </div>
                </div>
                <div  className='productSingleItemContainer'>
                        <h2 className='cardTitle'>title</h2>
                        <h3 className='cardSubTitle'>by artist name</h3>
                        
                    <div className='imageContainer'>
                        <i  id="heart" className='fa-solid fa-heart imagefavoriteIcon' ></i>
                        
                        <img src={bild} alt="bild"></img>
                    </div>
                    <div className='priceContainer'>
                        <h2 className='priceText'>200 $</h2>
                        <i className="fa-solid fa-cart-shopping  addCartIcon"></i>
                        <button className="addToCart" >Add</button>
                    </div>
                </div>
                <div  className='productSingleItemContainer'>
                        <h2 className='cardTitle'>title</h2>
                        <h3 className='cardSubTitle'>by artist name</h3>
                        
                    <div className='imageContainer'>
                        <i  id="heart" className='fa-solid fa-heart imagefavoriteIcon' ></i>
                        
                        <img src={bild} alt="bild"></img>
                    </div>
                    <div className='priceContainer'>
                        <h2 className='priceText'>200 $</h2>
                        <i className="fa-solid fa-cart-shopping  addCartIcon"></i>
                        <button className="addToCart" >Add</button>
                    </div>
                </div>
                </div>
        </div>
        <div className="productWrapper">
            <h1>Print and Support by Arist name </h1>
            <h2>Select your favorite art by Artist name</h2>
            <div className="productContainer">
                <div  className='productSingleItemContainer'>
                        <h2 className='cardTitle'>title</h2>
                        <h3 className='cardSubTitle'>by artist name</h3>
                        
                    <div className='imageContainer'>
                        
                        
                        <img src={bild} alt="bild"></img>
                    </div>
                   
                </div>
                <div  className='productSingleItemContainer'>
                        <h2 className='cardTitle'>title</h2>
                        <h3 className='cardSubTitle'>by artist name</h3>
                        
                    <div className='imageContainer'>
                        
                        
                        <img src={bild} alt="bild"></img>
                    </div>
                    
                </div>
                <div  className='productSingleItemContainer'>
                        <h2 className='cardTitle'>title</h2>
                        <h3 className='cardSubTitle'>by artist name</h3>
                        
                    <div className='imageContainer'>
                        
                        
                        <img src={bild} alt="bild"></img>
                    </div>
                    
                </div>
                </div>
        </div>
 <div className="productWrapper">
            <h3>Select the following merch you would like to add the print to</h3>
            <div className="productContainer">
                <div  className='productSingleItemContainer'>
                  
                        
                    <div className='imageContainer'>
                        
                        
                        <img src={bild} alt="bild"></img>
                          </div>
                          
                          <div className='priceContainer2'>
                        <h2 className='priceText2'>200 $</h2>
                    
                    </div>
                   
                </div>
                <div  className='productSingleItemContainer'>
                  
                        
                    <div className='imageContainer'>
                        
                        
                        <img src={bild} alt="bild"></img>
                    </div>
                       <div className='priceContainer2'>
                        <h2 className='priceText2'>200 $</h2>
                    
                    </div>
                </div>
                <div  className='productSingleItemContainer'>
                  
                        
                    <div className='imageContainer'>
                        
                        
                        <img src={bild} alt="bild"></img>
                    </div>
                       <div className='priceContainer2'>
                        <h2 className='priceText2'>200 $</h2>
                    
                    </div>
                </div>
                </div>
              </div>
              <div className="productWrapper">
            <h3>Select the following merch you would like to add the print to</h3>
            <div className="productContainer">
                
                <div  className='productSingleItemContainer'>
                  
                        
                    <div className='imageContainer'>
                        
                        
                        <img src={bild} alt="bild"></img>
                    </div>
                       <div className='priceContainer2'>
                        <h2 className='priceText2'>200 $</h2>
                     <i className="fa-solid fa-cart-shopping  addCartIcon2"></i>
                        <button className="addToCart2" >Add</button>
                    </div>
                </div>
                </div>
        </div>
        </div>
        <Footer />
    </div>
  )
}
