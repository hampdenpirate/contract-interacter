// import dependencies 
import React, { useState, useEffect } from 'react'; 
import { toast } from "react-toastify";
import { useRecoilValue } from "recoil";
import { useContract } from "../hooks/contract";
import { useWallet } from "../hooks/wallet";
import { walletState } from "../state/app";
// import components 
import Header from './Header';
import Footer from './Footer';
import { Button } from './Button';

export default function WhitelistingPage() {


    const { connectToMetamask } = useWallet();
    const { whitelistAddress, getContractName, isContractLoaded } = useContract();
    const wallet = useRecoilValue(walletState);
    const [title, setTitle] = useState("");

    // client address 
    // eslint-disable-next-line
    const [clientAddress, setClientAddress] = useState("");
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
        const response = await whitelistAddress(wallet.address);
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
            Input client address here:
            <input type="text" value={clientAddress} onChange={(e) => setClientAddress(e.target.value)}/>
            <Button
             onConnectToMetamask={connectToMetamask}
             onMint={handleWhitelist}
             gemType={clientAddress} // this is the client address   
             isLoading={isAwaitingTxn}
             isDisabled={false}
            />
        </div>
        <Footer/>
        </>
    )
}