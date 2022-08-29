import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { walletState } from "../state/app";
import "./styles/components/button.css";

export const Button = (props) => {
  const wallet = useRecoilValue(walletState);
  const [message, setMessage] = useState("Connect to wallet");

  useEffect(() => {
    wallet.address && props && setMessage(`Whitelist ${props.gemType}`);
  }, [wallet.address, props]);

  const handleClick = () => {
    if (wallet.address) {
      props.onMint();
    } else {
      props.onConnectToMetamask();
    }
  };

  return (
    <button className="button" onClick={handleClick} disabled={props.isDisabled}>
      {props.isLoading ? (
        props.loadingMessage ? props.loadingMessage : "Minting"
      ) : message}
    </button>
  );
};
