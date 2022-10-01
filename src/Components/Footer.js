import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { db } from '../firebase-config'
import React from 'react'
import { useState, useRef } from 'react'
import '../styles/Footer.css'

export default function Footer() {

    const emailRef = useRef()
    const [success, setSuccess] = useState('')
    const [error, setError] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        setError('')
        setSuccess('')
        if(emailRef.current.value === '') return setError('Enter email to subscribe!')
        try {
            const colRef = collection(db, 'newsletter')
            addDoc(colRef, {
                email: emailRef.current.value,
                createdAt: serverTimestamp()
            }).then(() => {
                setSuccess('Success! Thank you for your subscription!')
            })
        }
        catch (err) {
            setError(err)
        }
        emailRef.current.value = ''
    }

    return (
        <div className='footerContainer'>
            <div className='borderSolidLine'></div>
            <div className='newsLetterWrapper'>
                {success && <div className='output success'>{success}</div>}
                {error && <div className='output error'>{error}</div>}
                <form onSubmit={handleSubmit}>
                    <h2 className='newsletterText'>Newsletter</h2>
                    <input className='inputField' ref={emailRef} type="email" placeholder='Your email' />
                    <button className='newsletter-btn'><i className='fa-solid fa-angle-right newsletter-btn-icon'></i></button>
                </form>
            </div>
            <div className='logoWrapper'>
                <h1 id="logoTextFooter">ART<span id="logoText--span">ZY</span></h1>
            </div>

            <div className='linkContainer'>
                <ul>
                    <li><a href="/underconstruction"><h3>Home</h3></a></li>
                    <li><a href="/underconstruction"><h3>Experience</h3></a></li>
                    <li><a href="/underconstruction"><h3>News</h3></a></li>
                    <li><a href="/underconstruction"><h3>About Us</h3></a></li>
                    <li><a href="/underconstruction"><h3>Jobs</h3></a></li>
                    <li><a href="/underconstruction"><h3>Contact</h3></a></li>
                </ul>
            </div>
            <div className='socialsContainer'>
                <ul>
                    <li><a href='https://facebook.com'><i className="fa-brands fa-facebook-f"></i></a></li>
                    <li><a href='https://twitter.com'><i className="fa-brands fa-twitter"></i></a></li>
                    <li><a href='https://instagram.com'><i className="fa-brands fa-instagram"></i></a></li>
                    <li><a href='https://pinterest.com'><i className="fa-brands fa-pinterest"></i></a></li>
                </ul>

            </div>
            <div className='copyright'>
                <h4><i className="fa-regular fa-copyright"></i> Copyright 2022 - Artzy</h4>
            </div>

        </div>
    )
}
