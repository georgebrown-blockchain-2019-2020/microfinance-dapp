import Web3 from "web3";
import MicroFinance from "../contracts/MicroFinance.json";
const web3 = new Web3(window.web3.currentProvider);
const address = "0xe78A0F7E598Cc8b0Bb87894B0F60dD2a88d6a8Ab"; // Contract Address
const ABI = MicroFinance.abi; // Contract ABI

//Web3 connect contract based on ABI and Address
export default new web3.eth.Contract(ABI, address);
