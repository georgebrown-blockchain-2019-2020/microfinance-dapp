import Web3 from "web3";
import LoanDBContract from "../contracts/LoanDB.json";
const web3 = new Web3(window.web3.currentProvider);
const address = "0x0CFD270A03C7A29611e16956551D2Fbd3b5326d7";
const ABI = LoanDBContract.abi;

export default new web3.eth.Contract(ABI, address);
