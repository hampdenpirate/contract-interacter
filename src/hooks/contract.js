import { ethers } from "ethers";
import { useEffect, useState } from "react";
import mgcContractAbi from "../utils/mgc_contract.json";
import { useWallet } from "./wallet";
const contractAddress = "0x027CA152e9e93B59aCa570E92757a9531c479329";

export const useContract = () => {
  const { provider, signer } = useWallet();
  const [contract, setContract] = useState(null);
  useEffect(() => {
    if (!provider) return;
    const contract = new ethers.Contract(
      contractAddress,
      mgcContractAbi,
      provider
    );
    setContract(contract);
  }, [provider]);
  const getContractName = async () => (contract ? await contract.name() : "");
  
  const mint = async (address, gemId) => {
    const contractWithSigner = contract.connect(signer);
    const mintTxn = await (await contractWithSigner)
      .whitelistMint(address, gemId)
      .catch((e) => console.log(e));
    if (!mintTxn) return false;
    return true;
  };

  const whitelistAddress = async (address, gemType) => {
    const contractWithSigner = contract.connect(signer)
    const whitelistTxn = await (await contractWithSigner)
      .addAddressToWhitelist(address, gemType)
      .catch((e) => {
        console.log(e)
      });
    if (!whitelistTxn) return false;
    return true;
  }


  return { whitelistAddress, mint, getContractName, isContractLoaded: !!contract };
};
