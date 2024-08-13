import Web3 from 'web3';

let web3;

if (window.ethereum) {
  web3 = new Web3(window.ethereum);
  window.ethereum.enable();
} else if (window.web3) {
  web3 = new Web3(window.web3.currentProvider);
} else {
  try {
    const provider = `https://mainnet.infura.io/v3/${process.env.INFURA_API_KEY}`
    web3 = new Web3(new Web3.providers.HttpProvider(provider))
  } catch (error) {
    console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
  }
}

export default web3;
