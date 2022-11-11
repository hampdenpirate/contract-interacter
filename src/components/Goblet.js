// import dependencies
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useRecoilValue } from "recoil";
import { useContract } from "../hooks/contract";
import { useWallet } from "../hooks/wallet";
import { walletState } from "../state/app";
import truncateEthAddress from "truncate-eth-address";
import 'react-alice-carousel/lib/alice-carousel.css';
// import components
import { Button } from "./Button";
import Footer from "./Footer";
import Header from "./Header";
// import styles 
import "./styles/index.css";
import "./styles/carousel.css";
import "./styles/goblet.css";
// import images
import GOBLET_2022 from "../assets/GOBLET_2022.jpeg";

export const Goblet = () => { 

    const { connectToMetamask } = useWallet();
    const { mintGoblet, getContractName, isContractLoaded } = useContract();
    const wallet = useRecoilValue(walletState);
    
    // eslint-disable-next-line
    const [isAwaitingTxn, setIsAwaitingTxn] = useState(false);
    const [title, setTitle] = useState("");

    useEffect(() => {
        if (wallet.chainId !== 1 && wallet.address) {
          setTitle("Switch to Mainnet");
        } else if (wallet.chainId === 1) {
          isContractLoaded && getContractName().then(() => setTitle("Infinity Goblet"));
        }
        // eslint-disable-next-line
    }, [isContractLoaded, wallet]);

    const handleMint = async () => {
        setIsAwaitingTxn(true);
        const response = await mintGoblet(wallet.address);
        if (response) {
            console.log(response);
            toast.success("Mint successful. Might take a while to show on opensea");
        } else {
            toast.error("Mint failed. Most likely you do not have all gemstones.");
        }
        setIsAwaitingTxn(false);
    }

    return (
        <div className="body-div">
            <Header/>
            <div className="content-wrap goblet-content-wrap">
                <span className="title">{title}</span>
                <div className="gemstone-section">
                    <div className="showcase">
                    <img alt="gemstone" className="gemstone-img" src={GOBLET_2022} />
                    </div>
                    <div className="minting-section">
                    A gem-studded goblet that only exists on the Ethereum blockchain. A VIP membership token for the purchase of all 6 bottles from Malt, Grain & Cane's Curated Range bottlings (Year 2). 
                    <br/>
                    
                    <Button
                        onConnectToMetamask={connectToMetamask}
                        onMint={handleMint}
                        gemType={"Goblet"}
                        isLoading={isAwaitingTxn}
                        isDisabled={false}
                    />
                    <span style={{ fontSize: "16px" }}>
                        Connected address: {wallet.address ? truncateEthAddress(wallet.address) : "None"}
                    </span>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    )
}

export default Goblet;