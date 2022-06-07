// import dependencies
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useRecoilValue } from "recoil";
import { useContract } from "../hooks/contract";
import { useWallet } from "../hooks/wallet";
import { walletState } from "../state/app";
import truncateEthAddress from "truncate-eth-address";
import { useParams } from "react-router-dom";
import AliceCarousel from "react-alice-carousel";
import 'react-alice-carousel/lib/alice-carousel.css';
// import utils 
import { getGemstoneName } from "../utils/functions";
// import components
import { Button } from "./Button";
import Footer from "./Footer";
import Header from "./Header";
import Lost from './Lost';
// import styles 
import "./styles/index.css";
import "./styles/carousel.css";
// import images 
import Amethyst from "../assets/Stone_Purple.jpg"; // 1
import Sapphire from "../assets/Stone_Blue.jpg"; // 2
import Emerald from "../assets/Stone_Green.jpg"; // 3
import Citrine from "../assets/Stone_Yellow.jpg"; // 4
import Amber from "../assets/Stone_Orange.jpg"; // 5
import Ruby from "../assets/Stone_Red.jpg"; // 6

export const GemPage = () => {
  // grab the gemstone ID to properly render the page
  let params = useParams();
  const gemstoneId = parseInt(params.gemstoneId);
  console.log(gemstoneId)
  let gemInfo = (gemstoneId === 1 ? {
      name: "Amethyst",
      img: Amethyst,
      color: 'purple',
      txt: (<p>An Amethyst gemstone that only exists on the Ethereum blockchain. A commemorative token for the purchase of Malt, Grain & Cane's Curated Range bottlings (Year 2). 
        <br/><br/>
      Upon closer inspection of this gemstone, a Powerful rush of emotions flow through you, leaving you with a bad mixture of melancholy, terrible longing, and nostalgia for a nearly-forgotten someone. The temptation is there, but you resist the Powerful urge to reach back out to them.
      </p>),
      bottling: "Saudade 我紫在乎你 - Irish Whiskey 2002, 18 Years, 50.2%",
      bottle_link: "https://www.maltgraincane.com/Bottles/008B"
    }
    :
    (gemstoneId === 2 ? {
      name: "Sapphire",
      img: Sapphire,
      color: '#243eeb',
      txt: (<p>A Sapphire gemstone that only exists on the Ethereum blockchain. A commerative token for the purchase of Malt, Grain & Cane's Curated Range bottlings (Year 2).
      <br/><br/>
      Upon closer inspection of this gemstone, you suddenly feel as if you are floating down a waterbody, with the delicate scent of peonies surrounding & embracing the Space around you.
      You feel raindrops fall across your face, as your eyes gently close.
      You start to feel the Space around you gradually expand, as your body gently drifts with the flow, into the great Unknown.
      </p>),
      bottling: "Ophelia - Staoisha 2013, 8 Years, 63.5%",
      bottle_link: "https://www.maltgraincane.com/bottles/010"
    }
    :
    (gemstoneId === 3 ? {
      name: "Emerald",
      img: Emerald,
      color: 'green',
      txt: (<p>An Emerald gemstone that only exists on the Ethereum blockchain.
      A commerative token for the purchase of Malt, Grain & Cane's Curated Range bottlings (Year 2).
      <br/><br/>
      Upon closer inspection of this gemstone, you suddenly feel a thrilling rush of energising force pulsating within you. You are reminded of your younger, youthful days,
      as if, for a brief moment in Time, you are youthful as you once were.
      <br/><br/>
      "What a wonderful Time to be alive..."</p>),
      bottling: "Youth 青年 - Clarendon 2010, Jamaican Rum, 11 years, 67.2%",
      bottle_link: "https://www.maltgraincane.com/bottles/011"
    }
    :
    (gemstoneId === 4 ? {
      name: "Citrine",
      img: Citrine,
      color: '#fdb51c',
      txt: (<p></p>),
      bottling: "",
      bottle_link: ""
    }
    :
    (gemstoneId === 5 ? {
      name: "Amber",
      img: Amber,
      color: '#fe5b02',
      txt: (<p>An Amber stone that only exists on the Ethereum blockchain. 
      A commerative token for the purchase of Malt, Grain & Cane's Curated Range bottlings (Year 2).
      <br/><br/>
      Upon closer inspection of this fossilised resin, you are suddenly transported to Japan, during the the early 1980s. 
      You are driving in your Daihatsu, along the coast of Shizuoka Prefecture, on a cool summer evening. With the windows down, you look across the Suruga Bay.
      <br/><br/>
      The Japanese Citypop hit-song, "Remember Me" by Step, is playing on the car radio.
      Your Soul is at peace, as you smile, while you continue your driving journey into the night.</p>),
      bottling: "012: Sunset Boulevard - Secret Orkney 2007, Oloroso Quarter Cask, 15 Years, 65.8%",
      bottle_link: "https://www.maltgraincane.com/bottles/012"
    }
    :
    (gemstoneId === 6 ? {
      name: "Ruby",
      img: Ruby,
      color: 'red',
      txt: (<p></p>),
      bottling: "",
      bottle_link: ""
    }
    :
    {}))))));

  console.log(gemInfo)

  const { connectToMetamask } = useWallet();
  const { mint, getContractName, isContractLoaded } = useContract();
  const wallet = useRecoilValue(walletState);
  const [title, setTitle] = useState("");
  
  // eslint-disable-next-line
  const [isAwaitingTxn, setIsAwaitingTxn] = useState(false);

  useEffect(() => {
    if (wallet.chainId !== 1 && wallet.address) {
      setTitle("Switch to Mainnet");
    } else if (wallet.chainId === 1) {
      isContractLoaded && getContractName().then(() => setTitle("Gemstone Minter"));
    }
    // eslint-disable-next-line
  }, [isContractLoaded, wallet, gemstoneId]);

  const handleMint = async () => {
    setIsAwaitingTxn(true);
    const response = await mint(wallet.address, (gemstoneId - 1));
    if (response) {
      console.log(response);
      toast.success("Mint successful. Might take a while to show on opensea.");
    } else {
      toast.error("Mint failed. Most likely address is not whitelisted. see console for full error");
      console.log(toast.error);
    }
    setIsAwaitingTxn(false);
  };

  const items = [
    (
    <a href='/1'>
      <img className='gemstone-img' src={Amethyst} alt="Amethyst"/>
      <p>Mint Amethyst</p>
    </a>
    ),
    (
    <a href='/2'>
      <img className='gemstone-img' src={Sapphire} alt="Sapphire"/>
      <p>Mint Sapphire</p>
    </a>
    ),
    (
    <a href='/3'>
      <img className='gemstone-img' src={Emerald} alt="Emerald"/>
      <p>Mint Emerald</p>
    </a>
    ),
    (
    <a href='/'>
      <img className='gemstone-img' src={Citrine} alt="Citrine"/>
      {/* <p>Mint Citrine</p> */}
      <p>Coming soon</p>
    </a>
    ),
    (
    <a href='/5'>
      <img className='gemstone-img' src={Amber} alt="Amber"/>
      <p>Mint Amber</p>
    </a>
    ),
    (
    <a href='/'>
      <img className='gemstone-img' src={Ruby} alt="Ruby"/>
      {/* <p>Mint Ruby</p> */}
      <p>Coming soon</p>
    </a>
    )
  ];
  const responsive = {
    0: { items: 1 },
    568: { items: 2 },
    1024: { items: 3 },
  };

  // only allow for id 1 because it's currently the only released version
  if (gemstoneId >= 1 && gemstoneId <=5) {
    return (
      <div className="body-div">
          <Header/>
        <div className="content-wrap">
          <span className="title">{gemInfo.name} {title}</span>
          <div className="gemstone-section">
            <div className="showcase">
              <img alt="gemstone" className="gemstone-img" src={gemInfo.img} />
              <p style={{color: gemInfo.color}}>{gemInfo.name} gemstone #{50 * (gemstoneId - 1) + 1}-{50 * gemstoneId}</p>
            </div>
            <div className="minting-section">
              {gemInfo.txt}
              <br/>
              <p>Bottling: <a style={{color: gemInfo.color}} href={gemInfo.bottle_link}>{gemInfo.bottling}</a></p>
              <Button
                onConnectToMetamask={connectToMetamask}
                onMint={handleMint}
                gemType={getGemstoneName(parseInt(gemstoneId))}
                isLoading={isAwaitingTxn}
                isDisabled={false}
              />
              <span style={{ fontSize: "16px" }}>
                Connected address: {wallet.address ? truncateEthAddress(wallet.address) : "None"}
              </span>
            </div>
          </div>
        </div>
        <div className="other-gemstones-section gemstones-display">
          <h3>Mint More Gemstones</h3>
          <AliceCarousel
              autoPlay
              autoPlayStrategy="default"
              autoPlayInterval={0}
              animationDuration={6000}
              animationEasingFunction="linear"
              animationType="slide"
              infinite
              touchTracking={true}
              disableDotsControls
              disableButtonsControls
              items={items}
              responsive={responsive}
          />
        </div>
        <Footer/>
      </div>
    );
  } else {
    // return 404 page
    return (
      <Lost/>
    );
  }
};


export default GemPage;
