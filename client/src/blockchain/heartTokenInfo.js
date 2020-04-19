import Web3 from "web3";
import HeartTokenContract from "../contracts/HeartToken.json";
const web3 = new Web3(window.web3.currentProvider);
const address = "0xFC628dd79137395F3C9744e33b1c5DE554D94882";
const ABI = HeartTokenContract.abi;

export default new web3.eth.Contract(ABI, address);
