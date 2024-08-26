<template>
    <div class="collateralize-nft">
      <select v-model="role">
        <option value="borrower">Borrower</option>
        <option value="lender">Lender</option>
      </select>
      <h2 v-if="role == 'borrower'">Collateralize Your NFTs</h2>
      <h2 v-else>Create loans</h2>
      <table>
        <tr v-if="role == 'borrower'">
          <td class="field-title">NFT Contract Address</td>
          <td>
            <input type="text" v-model="nftSampleAddress" placeholder="Enter NFT Contract Address" />
          </td>
        </tr>
        <tr v-if="role == 'borrower'">
          <td>NFT Token ID</td>
          <td>
            <input type="text" v-model="nftToken" placeholder="Enter NFT Token ID" />
          </td>
        </tr>
        <tr v-if="role == 'borrower'">
          <td><strong>Step 1</strong>
            <br /><small>Approve the collateral contract to manage the tokenId</small></td>
          <td>
            <button @click="approve">Approve</button>
            <br />
            <small id="approve_status"></small>
          </td>
        </tr>
        <tr v-if="role == 'lender'">
          <td><strong>Step 1 (optional)</strong>
            <br /><small>Deposit ETH to collateral smart contract</small></td>
          <td>
            &nbsp;
          </td>
        </tr>
        <tr v-if="role == 'lender'">
          <td>Deposit Amount</td>
          <td>
            <input type="text" v-model="depositAmount" placeholder="Enter deposit amount in ETH" />
          </td>
        </tr>
        <tr v-if="role == 'lender'">
          <td>
            &nbsp;
          </td>
          <td>
            <button @click="deposit">Deposit</button>
            <br />
            <small id="deposit_status"></small>
          </td>
        </tr>
        <tr v-if="role == 'lender'">
          <td><strong>Step 2</strong>
            <br /><small>Create loan</small></td>
          <td>
            &nbsp;
          </td>
        </tr>
        <tr v-if="role == 'lender'">
          <td class="field-title">Collateral Index</td>
          <td>
            <input type="text" v-model="nftCollateralIndex" placeholder="Enter Collaterated Index" />
          </td>
        </tr>
        <tr v-if="role == 'lender'">
          <td>Loan Amount</td>
          <td>
            <input type="text" v-model="loanAmount" placeholder="Enter loan amount in ETH" />
          </td>
        </tr>
        <tr v-if="role == 'lender'">
          <td>
            &nbsp;
          </td>
          <td>
            <button @click="createLoan">Create Loan</button>
            <br />
            <small id="create_loan_status"></small>
          </td>
        </tr>
        <tr v-if="role == 'borrower'">
          <td><strong>Step 2</strong>
            <br /><small>Collateralize your NFT (allow loan creation)</small></td>
          <td>
            <button @click="collateralize">Collateralize</button>
            <br />
            <small id="collateralize_status"></small>
          </td>
        </tr>
      </table>
      <h2 v-if="role == 'borrower'">Redeem Your NFT</h2>
      <table v-if="role == 'borrower'">
        <tr>
          <td class="field-title">Collateral Index</td>
          <td>
            <input type="text" v-model="nftCollateralIndex" placeholder="Enter Collateral Index" />
          </td>
        </tr>
        <tr>
          <td><strong>Step 3</strong>
            <br /><small>Remove the collateral (repay loan)</small></td>
          <td>
            <button @click="repayLoan">Repay</button>
            <br />
            <small id="redeem_status"></small>
          </td>
        </tr>
      </table>
      <h2>Collaterals</h2>
      <table>
        <tr>
          <td>No.</td>
          <td>NFT Address</td>
          <td>NFT Token</td>
          <td>Owner</td>
          <td>Amount</td>
          <td>Active</td>
          <td>&nbsp;</td>
        </tr>
        <tr v-for="(collateral, collateralIndex) in collaterals" :key="collateralIndex">
          <td>{{ collateralIndex+1 }}</td>
          <td>{{ collateral.nftContract }}</td>
          <td>{{ collateral.tokenId }}</td>
          <td>{{ collateral.owner }}</td>
          <td>{{ web3.utils.fromWei(collateral.loanAmount, 'ether') }}</td>
          <td>{{ collateral.isLoanActive }}</td>
          <td>
            <button @click="nftCollateralIndex = collateralIndex; nftToken = collateral.tokenId">Select</button>
          </td>
        </tr>
      </table>
    </div>
  </template>
  
  <script>
  import standardERC20ABI from '../assets/standardERC20abi.json';
  import { contracts } from '../services/contractService';
  import web3 from '../services/web3Service';
  
  export default {
    data() {
      return {
        web3: web3,
        role: 'borrower', // 'lender'
        nftToken: 1,
        nftSampleAddress: contracts.nftSampleAddress,
        depositAmount: 0.01,
        nftCollateralIndex: 0,
        collateralCounter: 0,
        collaterals: [],
        loanAmount: 0.01
      };
    },
    watch: {
      async collateralCounter() {
        await this.collateralsList();
      }
    },
    mounted: async function() {
      await this.collateralsList();
    },
    methods: {
    async collateralsList() {
      this.collateralCounter = await contracts.nftCollateral.methods.collateralCounter().call();
      let i = 0;
      let c = [];
      this.collaterals.length = 0;
      while (i < this.collateralCounter) {
        const element = await contracts.nftCollateral.methods.collaterals(i).call();
        c.push(element);
        i++;
      }
      this.collaterals = c.slice();
    },
    async approve() {
        // Get requester / signer
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const account = accounts[0];

        // Create a contract instance
        const nftSample = new web3.eth.Contract(standardERC20ABI, this.nftSampleAddress);

        // Call the approve function to approve the collateral contract to manage the tokenId
        document.getElementById('approve_status').innerText = "Approving...";
        try {
          await nftSample.methods.approve(contracts.nftCollateralAddress, this.nftToken).send({from: account, value: 0});
          document.getElementById('approve_status').innerText = `Contract '${contracts.nftCollateralAddress}' is approved to manage NFT contract '${this.nftSampleAddress}';`
        } catch (error) {
          console.log(error)
          document.getElementById('approve_status').innerText = "Error occured whilst approving collateral contract to manage the tokenId";
        }
    },
    async deposit() {
        // Get requester / signer
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const account = accounts[0];

        // Call the deposit function to deposit ETH to NFTCollateral contract
        document.getElementById('deposit_status').innerText = "Depositing...";
        try {
          const wei = web3.utils.toWei(this.depositAmount, 'ether');
          await contracts.nftCollateral.methods.deposit({ value: wei }).send({from: account, value: wei});
          document.getElementById('deposit_status').innerText = `Successfully deposited ${this.depositAmount} ETH to '${contracts.nftCollateralAddress}'`;
        } catch (error) {
          console.log(error)
          document.getElementById('deposit_status').innerText = "Error occured whilst approving collateral contract to manage the tokenId";
        }
    },
    async collateralize() {
        // Cet requester / signer
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const account = accounts[0];

        // Call the collaterize function
        document.getElementById('collateralize_status').innerText = "Pending...";
        try {
          await contracts.nftCollateral.methods.collateralizeNFT(this.nftSampleAddress, this.nftToken).send({ from: account });
          document.getElementById('collateralize_status').innerText = `NFT '${this.nftSampleAddress}' token ${this.nftToken} collaterated successfully!`;
          this.collateralCounter = 0;
        } catch (error) {
          console.log(error);
          document.getElementById('collateralize_status').innerText = `Error occured whilst trying to collateralize NFT '${this.nftSampleAddress}' token ID ${this.nftToken}`;
        }
      },
      async createLoan() {
        // Get requester / signer
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const account = accounts[0];

        // Call the deposit function to deposit ETH to NFTCollateral contract
        document.getElementById('create_loan_status').innerText = "Creating loan...";
        try {
          const wei = web3.utils.toWei(this.loanAmount, 'ether');
          console.log(this.nftSampleAddress, this.nftToken, this.nftCollateralIndex, wei, account)
          await contracts.nftCollateral.methods.createLoan(this.nftSampleAddress, parseInt(this.nftToken, 10), this.nftCollateralIndex, wei).send({from: account});
          document.getElementById('create_loan_status').innerText = `Successfully created loan of ${this.loanAmount} ETH for '${contracts.nftSampleAddress}'`;
          this.collateralCounter = 0;
        } catch (error) {
          console.log(error)
          document.getElementById('create_loan_status').innerText = "Error occured whilst creating loan";
        }
      },
      async repayLoan() {
          // Get requester / signer
          const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
          const account = accounts[0];
    
          // Call the release collatertal function
          document.getElementById('redeem_status').innerText = "Pending...";
          try {
            const wei = this.collaterals[this.nftCollateralIndex].loanAmount;
            await contracts.nftCollateral.methods.repayLoan(this.nftCollateralIndex).send({ from: account, value: wei });
            document.getElementById('redeem_status').innerText = `NFT redeemed successfully!`;
            this.collateralCounter = 0;
          } catch (error) {
            console.log(error);
            document.getElementById('redeem_status').innerText = `Error occured whilst trying to repay the loan and remove collateral.`;
          }
        },
      },
    };
  </script>
  
  <style>
  /* Add your styles here */
  select {
    float: right;
  }
  table > tr > td {
    padding: .25rem;
  }
  .field-title {
    min-width: 25rem;
  }
  </style>
  