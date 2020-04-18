import Web3 from "web3";
import WalletContract from "../contracts/Wallet.json";
const web3 = new Web3(window.web3.currentProvider);
const address = "0xD833215cBcc3f914bD1C9ece3EE7BF8B14f841bb";
const ABI = WalletContract.abi;

export default new web3.eth.Contract(ABI, address);
