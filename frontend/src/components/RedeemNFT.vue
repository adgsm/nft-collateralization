<template>
    <div class="redeem-nft">
      <h2>Redeem Your NFT</h2>
      <table>
        <tr>
          <td class="field-title">Collaterated Index</td>
          <td>
            <input type="text" v-model="nftCollateralIndex" placeholder="Enter Collaterated Index" />
          </td>
        </tr>
        <tr>
          <td><strong>Step 3</strong>
            <br /><small>Remove the collateral</small></td>
          <td>
            <button @click="redeem">Redeem</button>
            <br />
            <small id="redeem_status"></small>
          </td>
        </tr>
      </table>
    </div>
  </template>
  
  <script>
  import contract from '../services/contractService';
  
  export default {
    data() {
      return {
        nftCollateralIndex: '',
      };
    },
    methods: {
      async redeem() {
        // Cet requester / signer
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const account = accounts[0];
  
        // Call the release collatertal function
        document.getElementById('redeem_status').innerText = "Pending...";
        try {
          await contract.methods.releaseNFT(this.nftCollateralIndex).send({ from: account });
          document.getElementById('redeem_status').innerText = `NFT redeemed successfully!`;
        } catch (error) {
          document.getElementById('redeem_status').innerText = `Error occured whilst trying to rremove the collateral.`;
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
  