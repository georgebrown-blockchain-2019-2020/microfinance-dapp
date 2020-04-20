import Web3 from "web3";
import LoanDBContract from "../contracts/LoanDB.json";
const web3 = new Web3(window.web3.currentProvider);
const address = "0x254dffcd3277C0b1660F6d42EFbB754edaBAbC2B";
const ABI = LoanDBContract.abi;

export default new web3.eth.Contract(ABI, address);
