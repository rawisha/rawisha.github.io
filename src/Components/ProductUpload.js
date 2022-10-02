import { useState, useEffect } from 'react'
import useCategories from '../hooks/useCategories'
import '../styles/ProductUpload.css'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { db, storage } from '../firebase-config'
import { v4 as uuid } from 'uuid'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import successImg from '../assets/success.png'
import { Link } from 'react-router-dom'

export default function ProductUpload({ artist }) {

    const categories = useCategories()

    const [file, setFile] = useState(null);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState(0);
    const [price, setPrice] = useState(0);
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(false)
    const [uploadReady, setUploadReady] = useState(false)

    const types = ['image/png', 'image/jpeg'];
  
    const handleFile = (e) => {
      let selected = e.target.files[0];
      if (selected && types.includes(selected.type)) {
        setFile(selected);
        setError('');
      } else {
        setFile(null);
        setError('Please select an image file (png or jpg)');
      }
    };

    const saveProduct = (url) => {
        const colRef = collection(db, 'products')
          addDoc(colRef, {
            title: title, 
            description: description,
            imageUrl: url,
            price: price,
            by: artist.artistName,
            categoryHandle: category,
            status: 'approved',
            createdAt: serverTimestamp()
          }).then(() => {
            setSuccess(true)
          }).catch(err => console.log(err.code))
      }
  
      useEffect(() => {
          if(file && title && description && price && category) {
              setUploadReady(true)
          }
      }, [file, title, description, price, category])
  
      const handleSubmit = (e) => {
        e.preventDefault()
        setError(null)
        if (!file) setError('Please select a file')
        if (!category) setError('Please select a category')
        if (!price) setError('Please enter a price')
        if (!description) setError('Please give a description')
        if (!title) setError('Please fill in a title')
        
        const imageRef = ref(storage, `products/${uuid() + '-' + file.name}`)
        uploadBytes(imageRef, file).then((snapshot) => {
          getDownloadURL(snapshot.ref).then(url => {
            saveProduct(url)
          })
        })
      }


  return (
    <div className="uploadContainer">
        <h1>Upload Your Product</h1>

        {success ? 
        <>
            <div className='success-container'>
                <h2>Image uploaded</h2>
                <img className="success-img" src={successImg} alt="Success" />  
            </div>
            <div><Link to='/profile/products'>Go to Products</Link></div>
        </> :
        <form className="formContainer">

            <div className="formData">
                <div className="formTitle">
                <input onChange={(e) => setTitle(e.target.value)} type="text" name="title" placeholder="Title"></input>
                <p>Please include keywords and colors</p>
                <div className="formDescription">
                <textarea onChange={(e) => setDescription(e.target.value)} placeholder='About your product...'></textarea>
                </div>
                </div>
                <div className="formImage">
                <h2>Upload Image</h2>
                <div className="uploadedImages">
                <label className="upload-btn">
                    <span>+</span>
                    <input type="file" onChange={handleFile} />
                </label>
                </div>
                { !error && file && <div>{ file.name }</div> }
                </div>
                <div className="formCatandPriceContainer">
                <h2>Category and Prices</h2>
                <div className="formCPDetails">
                <div className="formCat">
                <label htmlFor="category">Select Category</label>
                <select onChange={(e) => setCategory(e.target.value)} name="categories">
                    <option value="">--Category--</option>
                    {categories.map(category => (
                        <option key={category.id} value={category.handle}>{category.name}</option>
                    ))}
                </select>
                </div>
                <div className="formPrice">
                <label htmlFor="price">Product Price</label>
                    <input onChange={(e) => setPrice(e.target.value)} type="number" htmlFor="price" name="price" placeholder="Price"></input>
                </div>
                </div>
                <div className="output">
                    { error && <div className="error">{ error }</div>}
                </div>
                </div>
                <button onClick={handleSubmit} id='uploadButton'>Upload</button>
            </div>
        </form>}
    </div>
  )
}
