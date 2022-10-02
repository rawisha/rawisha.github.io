import React, { useState } from 'react';
import '../styles/UploadProductForm.css'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { db, storage } from '../firebase-config'
import { v4 as uuid } from 'uuid'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import useCategories from '../hooks/useCategories';
import { useEffect } from 'react';
import successImg from '../assets/success.png'

const UploadProductForm = ({ upload, artist, setUploadReady }) => {

    const categories = useCategories()

    const [file, setFile] = useState(null);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState(0);
    const [category, setCategory] = useState(0);
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(false)
  
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
          by: artist,
          categoryHandle: category,
          status: 'pending',
          createdAt: serverTimestamp()
        }).then(res => {
          setSuccess(true)
        }).catch(err => console.log(err.code))
    }

    useEffect(() => {
        if(file && title && description && price && category) {
            setUploadReady(true)
        }
    }, [file, title, description, price, category, setUploadReady])

    const handleSubmit = () => {
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
    
    useEffect(() => {
      if (upload) {
        handleSubmit()
      }
    }, [upload])

    return ( 
        <>
            {success ? 
            <div className='success-container'>
                <h2>Image uploaded</h2>
                <img className="success-img" src={successImg} alt="Success" />  
            </div> :
            <form className='upload-form'>
                <label className="title">
                    <span>Title</span>
                    <input type="text" onChange={(e) => setTitle(e.target.value)}/>
                </label>
                <label className="description">
                    <span>Description</span>
                    <textarea onChange={(e) => setDescription(e.target.value)}/>
                </label>
                <label className="price">
                    <span>Price</span>
                    <input type="number" onChange={(e) => setPrice(e.target.value)}/>
                </label>
                <select name="category-select" onChange={(e) => setCategory(e.target.value)}>
                    <option value="">--Select Category--</option>
                    {categories.map(category => (
                    <option key={category.id} value={category.handle}>{category.name}</option>
                    ))}
                </select>
                <label className="upload-btn">
                    <span>+</span>
                    <input type="file" onChange={handleFile} />
                </label>
                <div className="output">
                    { error && <div className="error">{ error }</div>}
                    { !error && file && <div>{ file.name }</div> }
                </div>
            </form>}
        </>
     );
}
 
export default UploadProductForm;