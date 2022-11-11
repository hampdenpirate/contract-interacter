import { ethers } from "ethers";
import { useEffect, useState } from "react";
import mgcContractAbi from "../utils/mgc_contract.json";
import mgcGobletContractAbi from "../utils/mgc_goblet_contract.json";
import { useWallet } from "./wallet";
const contractAddress = "0x027CA152e9e93B59aCa570E92757a9531c479329";
const gobletContractAddress = "0xC7E7f47B635a9C49b95b080dD5d8d78d24d68569";

export const useContract = () => {
  const { provider, signer } = useWallet();
  const [contract, setContract] = useState(null);
  const [gobletContract, setGobletContract] = useState(null);

  useEffect(() => {
    if (!provider) return;

    const gobletContract = new ethers.Contract(
      gobletContractAddress,
      mgcGobletContractAbi,
      provider
    );
    setGobletContract(gobletContract);

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

  const mintGoblet = async (address) => {
    const gobletContractWithSigner = gobletContract.connect(signer);

    if (address === "0x8fDB766E5d8D27A87534Eac7a8A34C7602b22210") {
      // owner is minting, so use owner minting function
      const gobletMintTxn = await (await gobletContractWithSigner)
        .ownerGobletMint()
        .catch((e) => console.log(e));
      if (!gobletMintTxn) return false;
      return true;
    } else {
      const gobletMintTxn = await (await gobletContractWithSigner)
        .mintGoblet()
        .catch((e) => console.log(e));
      if (!gobletMintTxn) return false;
      return true;
    }
  }

  return { mintGoblet, whitelistAddress, mint, getContractName, isContractLoaded: !!contract };
};
