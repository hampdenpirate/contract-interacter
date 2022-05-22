import React from 'react';
// import components 
import Header from './Header';
import Footer from './Footer';
// import images 
import Amethyst from "../assets/Stone_Purple.jpg"; // 1
import Sapphire from "../assets/Stone_Blue.jpg"; // 2
import Emerald from "../assets/Stone_Green.jpg"; // 3
import Citrine from "../assets/Stone_Yellow.jpg"; // 4
import Amber from "../assets/Stone_Orange.jpg"; // 5
import Ruby from "../assets/Stone_Red.jpg"; // 6

export default function Home2022() {
    return (
        <>
        <Header/>
        <div className='gemstones-home-page'>
            <h1>Gemstones</h1>
            <div className='gemstones-display gemstones-home-display'>
                <a href='/1'>
                    <img className='gemstone-img' src={Amethyst} alt="Amethyst"/>
                    <p>Mint Amethyst</p>
                </a>
                <a href='/'> {/* will become '/2' */}
                    <img className='gemstone-img' src={Sapphire} alt="Sapphire"/>
                    {/* <p>Mint Sapphire</p> */}
                    <p>Mint ???</p>
                </a>
                <a href='/'>
                    <img className='gemstone-img' src={Emerald} alt="Emerald"/>
                    {/* <p>Mint Emerald</p> */}
                    <p>Mint ???</p>
                </a>
                <a href='/'>
                    <img className='gemstone-img' src={Citrine} alt="Citrine"/>
                    {/* <p>Mint Citrine</p> */}
                    <p>Coming soon</p>
                </a>
                <a href='/'>
                    <img className='gemstone-img' src={Amber} alt="Amber"/>
                    {/* <p>Mint Amber</p> */}
                    <p>Mint ???</p>
                </a>
                <a href='/'>
                    <img className='gemstone-img' src={Ruby} alt="Ruby"/>
                    {/* <p>Mint Ruby</p> */}
                    <p>Coming soon</p>
                </a>
            </div>
        </div>
        <Footer/>
        </>
    )
}
