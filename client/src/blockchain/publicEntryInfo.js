import Web3 from "web3";
import ProxyContract from "../contracts/Proxy.json";
const web3 = new Web3(window.web3.currentProvider);
const address = "0x6eD79Aa1c71FD7BdBC515EfdA3Bd4e26394435cC";
const ABI = ProxyContract.abi;

export default new web3.eth.Contract(ABI, address);
