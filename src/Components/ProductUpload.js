import React from 'react'
import '../styles/ProductUpload.css'
import bild from '../assets/bild.jpg'
export default function ProductUpload() {
  return (
    <div className="uploadContainer">
        <h1>Upload Your Product</h1>

        <form className="formContainer">

            <div className="formData">
                <div className="formTitle">
                <input type="text" name="title" placeholder="Title"></input>
                <p>Please include keywords and colors</p>
                <div className="formDescription">
                <textarea placeholder='About your product...'></textarea>
                </div>
                </div>
                <div className="formImage">
                <h2>Upload Images</h2>
                <div class="uploadedImages">
                <img src={bild} alt="uploaded-bild"></img>
                <img src={bild} alt="uploaded-bild"></img>
                <img src={bild} alt="uploaded-bild"></img>
                <button>+</button>
                </div>
                </div>
                <div className="formCatandPriceContainer">
                <h2>Category and Prices</h2>
                <div className="formCPDetails">
                <div className="formCat">
                <label for="category">Select Category</label>
                <select for="category" name="categories">
                    <option>Artwork</option>
                    <option>For Her</option>
                    <option>For Him</option>
                </select>
                </div>
                <div className="formPrice">
                <label for="price">Product Price</label>
                    <input type="number" for="price" name="price" placeholder="Price"></input>
                </div>
                </div>
                
                </div>
                <button id='uploadButton'>Upload</button>
            </div>
        </form>
    </div>
  )
}
