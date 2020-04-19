import Web3 from "web3";
import LoanDBContract from "../contracts/LoanDB.json";
const web3 = new Web3(window.web3.currentProvider);
const address = "0xb09bCc172050fBd4562da8b229Cf3E45Dc3045A6";
const ABI = LoanDBContract.abi;

export default new web3.eth.Contract(ABI, address);
