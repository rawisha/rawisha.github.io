import React from 'react'
import '../styles/Footer.css'

/*
TO DO: 
Write js code for newsletter
Fix ahref links and tags (Errors thrown out in terminal .. just add Real value to href)
Fix newsletter design (form, field icon) + js
*/

export default function Footer() {
    return (
        <div className='footerContainer'>
            <div className='borderSolidLine'></div>
            <div className='newsLetterWrapper'>
                <h2 className='newsletterText'>Newsletter</h2>
                <input className='inputField' type="text" placeholder='Your email' />
            </div>
            <div className='logoWrapper'>
                <h1 id="logoTextFooter">ART<span id="logoText--span">ZY</span></h1>
            </div>

            <div className='linkContainer'>
                <ul>
                    <li><a href="https://google.com"><h3>Home</h3></a></li>
                    <li><a href="https://google.com"><h3>Experience</h3></a></li>
                    <li><a href="https://google.com"><h3>News</h3></a></li>
                    <li><a href="https://google.com"><h3>About Us</h3></a></li>
                    <li><a href="https://google.com"><h3>Jobs</h3></a></li>
                    <li><a href="https://google.com"><h3>Contact</h3></a></li>
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
