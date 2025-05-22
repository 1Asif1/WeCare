import Web3 from "web3";
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "./abi";

export const getWeb3 = async () => {
  if (window.ethereum) {
    const web3 = new Web3(window.ethereum);
    await window.ethereum.request({ method: "eth_requestAccounts" });
    return web3;
  }
  throw new Error("Please install MetaMask");
};

export const getContract = async () => {
  const web3 = await getWeb3();
  const contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);
  const accounts = await web3.eth.getAccounts();
  return { web3, contract, accounts };
};
