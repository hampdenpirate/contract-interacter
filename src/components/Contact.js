import React from 'react';
import './styles/contact.css';
import Header from './Header';
import Footer from './Footer';
import contact_us from '../assets/contact_us.jpg';

export default function Contact() {
    return (
        <>
            <Header/>
            <div className='contact-page'>
                <h1>Contact Us</h1>
                <img alt="decor" className="contact-us-img" src={contact_us} />
                <p>
                    Malt, Grain & Cane Pte. Ltd.<br/>
                    Singapore <span role="img" aria-label="singapore">🇸🇬</span> <br/>
                    <br/>
                    Drop us an email @ NFT@MaltGrainCane.com <span role="img" aria-label="space invader">👾</span> <br/>
                    <br/>
                </p>
            </div>
            <Footer/>
        </>
    )
}
