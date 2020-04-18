import Web3 from "web3";
import HeartTokenContract from "../contracts/HeartToken.json";
const web3 = new Web3(window.web3.currentProvider);
const address = "0xC89Ce4735882C9F0f0FE26686c53074E09B0D550";
const ABI = HeartTokenContract.abi;

export default new web3.eth.Contract(ABI, address);
