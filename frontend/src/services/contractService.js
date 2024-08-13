import web3 from './web3Service';
import ContractABI from './contractABI.json';

const contractAddress = '0xd9145CCE52D386f254917e481eB44e9943F39138';

const contract = new web3.eth.Contract(ContractABI, contractAddress);

export default contract;
