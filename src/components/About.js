import React from 'react';
import Header from './Header';
import Footer from './Footer';
import './styles/about.css';
import mgc from '../assets/mgc.png';

export default function About() {
    return (
        <>
        <Header/>
        <div className='about-wrapper'>
            <h1>About MaltGrainCane.Club</h1>
            <div className='about-content'>
                <img src={mgc} alt="mgc"/>
                <p>
                MaltGrainCane.Club is the on-going thought experiment & first foray into Web3.0, for @MaltGrainCane. We aim to merge real world experiences (drams) together with the decentralized capabilities of Web3.0 (NFTs); allowing our consumers to take certain ownership of our branding. 
                <br/><br/>
                With our 2nd Year's releases, we have launched the Curated Range, an artist-led bottling collaboration, of 6 different colours; basing on the primary colours of Red, Yellow & Blue, with the secondary colours of Purple, Green & Orange.
                <br/><br/>
                A premium physical goods bundle of <strong>50 sets</strong> has been created for each bottling; along with this, we are pairing them with a commemorative NFT. Collection of <strong>all 6 unique NFTs</strong>, will unlock the final NFT token; a membership card, which unlocks certain rewards & access.
                <br/><br/>
                A guide to our NFT Roadmap can be found <a href='https://www.maltgraincane.com/NFTRoadMap'>here</a>.
                <br/><br/>
                A guide on how to Mint can be found <a href='https://www.maltgraincane.com/NFTMintGuide'>here</a>.
                <br/><br/>
                Malt, Grain & Cane is an independent spirits bottler based in Singapore, a bustling trading hub for South-East Asia. Established in Fall 2020, it starts with a dream, to bring quality malt, grain and sugar cane-based spirits to Asia Pacific and Oceania.
                <br/><br/>
                Founded by a Singapore-based spirits enthusiast also known as, the <a href='https://www.instagram.com/hampdenpirate/'>@HampdenPirate</a>, who has a penchant for Jamaican Rums, and supported by the numerous friends and inspirations, that he has made along his spiritual journey.
                <br/><br/>
                Our goal is to bring quality spirits at competitive prices to this part of the World. Our pursuit for quality will never cease, for we believe, consumers will be more educated on what a quality spirit is, and will be drawn towards it as the global community grows.
                </p>
            </div>
        </div>
        <Footer/>
        </>
    )
}