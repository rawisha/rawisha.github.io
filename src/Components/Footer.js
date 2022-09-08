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
            <div className='newsLetterWrapper'>
                <h2 className='newsletterText'>Newsletter</h2>
                <input className='inputField' type="text" placeholder='Your email' />
            </div>
            <div className='logoWrapper'>
                <h1 id="logoTextFooter">ART<span id="logoText--span">ZY</span></h1>
            </div>

            <div className='linkContainer'>
                <ul>
                    <li><a href="#"><h3>Home</h3></a></li>
                    <li><a href="#"><h3>Experince</h3></a></li>
                    <li><a href="#"><h3>News</h3></a></li>
                    <li><a href="#"><h3>About Us</h3></a></li>
                    <li><a href="#"><h3>Jobs</h3></a></li>
                    <li><a href="#"><h3>Contact</h3></a></li>
                </ul>
            </div>
            <div className='socialsContainer'>
                <ul>
                    <li><i class="fa-brands fa-facebook-f"></i></li>
                    <li><i class="fa-brands fa-twitter"></i></li>
                    <li><i class="fa-brands fa-instagram"></i></li>
                </ul>

            </div>
            <div className='copyright'>
                <h4><i class="fa-regular fa-copyright"></i> Copyright 2022 - Artzy</h4>
            </div>
        </div>
    )
}
