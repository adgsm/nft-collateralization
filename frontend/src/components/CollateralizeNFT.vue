<template>
    <div class="collateralize-nft">
      <h2>Collateralize Your NFT</h2>
      <table>
        <tr>
          <td class="field-title">NFT Contract Address</td>
          <td>
            <input type="text" v-model="nftContractAddress" placeholder="Enter NFT Contract Address" />
          </td>
        </tr>
        <tr>
          <td>NFT Token ID</td>
          <td>
            <input type="text" v-model="nftToken" placeholder="Enter NFT Token ID" />
          </td>
        </tr>
        <tr>
          <td><strong>Step 1</strong>
            <br /><small>Approve the collateral contract to manage the tokenId</small></td>
          <td>
            <button @click="approve">Approve</button>
            <br />
            <small id="approve_status"></small>
          </td>
        </tr>
        <tr>
          <td><strong>Step 2</strong>
            <br /><small>Collateralize your NFT</small></td>
          <td>
            <button @click="collateralize">Collateralize</button>
            <br />
            <small id="collateralize_status"></small>
          </td>
        </tr>
      </table>
    </div>
  </template>
  
  <script>
  import nftContractABI from '../assets/standardERC20abi.json';
  import contract from '../services/contractService';
  import web3 from '../services/web3Service';
  
  export default {
    data() {
      return {
        nftToken: '',
        nftContractAddress: ''
      };
    },
    methods: {
    async approve() {
        // Create a contract instance
        const nftContract = new web3.eth.Contract(nftContractABI, this.nftContractAddress);

        // Call the approve function to approve the collateral contract to manage the tokenId
        document.getElementById('approve_status').innerText = "Approving...";
        try {
          await nftContract.methods.approve('0xd9145CCE52D386f254917e481eB44e9943F39138', 1);
          document.getElementById('approve_status').innerText = `Contract '0xd9145CCE52D386f254917e481eB44e9943F39138' is approved to manage token ID ${this.nftToken} of NFT contract '${this.nftContractAddress}';`
        } catch (error) {
          document.getElementById('approve_status').innerText = "Error occured whilst approving collateral contract to manage the tokenId";
        }
    },
    async collateralize() {
        // Cet requester / signer
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const account = accounts[0];

        // Call the collaterize function
        document.getElementById('collateralize_status').innerText = "Pending...";
        try {
          await contract.methods.collateralizeNFT(this.nftContractAddress, this.nftToken, 1).send({ from: account });
          document.getElementById('collateralize_status').innerText = `NFT '${this.nftContractAddress}' token ${this.nftToken} collaterated successfully!`;
        } catch (error) {
          document.getElementById('collateralize_status').innerText = `Error occured whilst trying to collateralize NFT '${this.nftContractAddress}' token ID ${this.nftToken}`;
        }
      },
    },
  };
  </script>
  
  <style>
  /* Add your styles here */
  .field-title {
    min-width: 25rem;
  }
  </style>
  