import Web3 from "web3";
import WalletContract from "../contracts/Wallet.json";
const web3 = new Web3(window.web3.currentProvider);
const address = "0x5f8e26fAcC23FA4cbd87b8d9Dbbd33D5047abDE1";
const ABI = WalletContract.abi;

export default new web3.eth.Contract(ABI, address);
