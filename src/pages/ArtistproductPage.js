import React from 'react'
import Footer from '../Components/Footer'
import Navbar from '../Components/Navbar'
import "../styles/AristproductPage.css"
import { useParams } from 'react-router-dom'
import useProductsByArtist from '../hooks/useProductsByArtist'
import useGetArtistById from '../hooks/useArtistById'
import ProductItem from '../Components/ProductItem'

export default function ArtistproductPage() {

    const { id } = useParams()
    const artistContainer = useGetArtistById(id)
    const artist = artistContainer[0]
    const products = useProductsByArtist(id)

  return (
    <div>
        <Navbar />
        <div className="productPageContainer">
        <div className="profileInfoWrapper">
            <div className="profileInfo">
                <h1>{artist?.artistName}</h1>
                <div className="profileInfoBio">
                <img src={artist?.profilePic} alt="profile_pic"></img>
                    <div className="artistInfo">
                    <h1>Artist bio</h1>
                    <p>{artist?.bio}</p>
                    </div>
                </div>
            </div>
        </div>

        <div className="productWrapper">
            <h1>Artworks for Sale by {artist?.artistName}</h1>
            
            <div className="productContainer">
                {products?.map(product => (
                    <ProductItem prods={product} key={product?.id} />
                ))}
            </div>

        </div>


        {/* <div className="productWrapper">
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
            </div> */}
        </div>
        <Footer />
    </div>
  )
}
