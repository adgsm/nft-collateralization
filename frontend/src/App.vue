<template>
  <div id="app" class="main-container">
    <h1>NFT Collateralization</h1>
    <CollateralizeNFT />
    <p />
    <RedeemNFT />
  </div>
</template>

<script>
import CollateralizeNFT from './components/CollateralizeNFT.vue';
import RedeemNFT from './components/RedeemNFT.vue';

export default {
  components: {
    CollateralizeNFT,
    RedeemNFT,
  },
};
</script>

<style>
@import 'bootstrap/dist/css/bootstrap.min.css';

/* Add additional global styles here */
.main-container {
  margin: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
}
</style>
