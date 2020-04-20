import Web3 from "web3";
import ProxyContract from "../contracts/Proxy.json";
const web3 = new Web3(window.web3.currentProvider);
const address = "0xCfEB869F69431e42cdB54A4F4f105C19C080A601";
const ABI = ProxyContract.abi;

export default new web3.eth.Contract(ABI, address);
