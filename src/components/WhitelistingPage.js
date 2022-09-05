// import dependencies 
import React, { useState, useEffect } from 'react'; 
import { toast } from "react-toastify";
import { useRecoilValue } from "recoil";
import { useContract } from "../hooks/contract";
import { useWallet } from "../hooks/wallet";
import { walletState } from "../state/app";
import truncateEthAddress from 'truncate-eth-address';
// import components 
import Header from './Header';
import Footer from './Footer';
import { Button } from './Button';
// import styles 
import './styles/whitelist.css';

export default function WhitelistingPage() {


    const { connectToMetamask } = useWallet();
    const { whitelistAddress, getContractName, isContractLoaded } = useContract();
    const wallet = useRecoilValue(walletState);
    const [title, setTitle] = useState("");

    // client address 
    // eslint-disable-next-line
    const [clientAddress, setClientAddress] = useState("");
    // eslint-disable-next-line
    const [gemType, setGemType] = useState(0);
    // eslint-disable-next-line
    const [isAwaitingTxn, setIsAwaitingTxn] = useState(false);


    useEffect(() => {
        if (wallet.chainId !== 1 && wallet.address) {
          setTitle("Switch to Mainnet");
        } else if (wallet.chainId === 1) {
          isContractLoaded && getContractName().then(() => setTitle("Gemstone Minter"));
        }
        // eslint-disable-next-line
      }, [isContractLoaded, wallet]);
    
      const handleWhitelist = async () => {
        setIsAwaitingTxn(true);
        const response = await whitelistAddress(clientAddress, gemType);
        if (response) {
          console.log(response);
          toast.success("Success! Address is whitelisted!");
        } else {
          toast.error("Whitelist failed. Make sure to use deployer account. see console for full error");
          console.log(toast.error);
        }
        setIsAwaitingTxn(false);
      };

    console.log(title)
    return (
        <>
        <Header/>
        <div className='whitelisting-main'>
            <div>
                Input client address here:
                <br/><br/>
                <input placeholder='Enter address' type="text" value={clientAddress} onChange={(e) => setClientAddress(e.target.value)}/>
                <br/>
                <br/>
                <label id="gem-label" >Gem Type: </label><input min='0' max='5' placeholder='Enter gemstone type' type="number" value={gemType} onChange={(e) => setGemType(e.target.value)}/>
                <br/>
                <Button
                onConnectToMetamask={connectToMetamask}
                onMint={handleWhitelist}
                gemType={`${truncateEthAddress(clientAddress)} for gem ${gemType}`} // this is the client address & gem type 
                isLoading={isAwaitingTxn}
                isDisabled={false}
                loadingMessage="Whitelisting"
                buttonMessage="Whitelist"
                />
                <br/>
                <span style={{ fontSize: "16px" }}>
                    Connected address: {wallet.address ? truncateEthAddress(wallet.address) : "None"}
                </span>
                <br/>
                <br/>
                <span>Gem Selected: {
                    Number(gemType) === 0 ? "Amethyst" : Number(gemType) === 1 ? "Sapphire" : Number(gemType) === 2 ? "Emerald" : Number(gemType) === 3 ? "Citrine" : Number(gemType) === 4 ? "Amber" : Number(gemType) === 5 ? "Ruby" : "None"
                }</span>
                <br/>
                <br/>
                <strong>Make sure address is correct, operation is irreversible</strong>
            </div>
        </div>
        <Footer/>
        </>
    )
}