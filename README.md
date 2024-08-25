# NFT Collateralization

This project is an simplified dApp that allows users to collateralize their NFTs, take and repay loans.

## Project Structure

- **contracts/**: Contains the Solidity smart contracts.
- **scripts/**: Scripts to deploy and interact with the smart contracts.
- **test/**: Test files for smart contracts.

## Prerequisites

- Node.js
- Hardhat

## Setup

1. Clone the repository:

   ```
   bash
   git clone https://github.com/adgsm/nft-collateralization.git
   cd nft-collateralization
   ```
2. Install dependencies:
    ```
    npm install
    ```
3. Start hardhat node:
    ```
    npx hardhat node
    ```
4. Compile the contracts:
    ```
    npx hardhat compile
    ```
5. Run tests:
    ```
    npm run test
    ```

    Expected output:

        > nft-collateralization@1.0.0 test
        > npx hardhat test

        NFTCollateral
            ✔ should create a loan successfully
            ✔ should fail to create a loan if contract has insufficient balance
            ✔ should allow repayment of the loan and release the NFT
            ✔ should fail to repay the loan with insufficient funds
            ✔ should only allow the loan creator to create loans
            ✔ should not allow repayment if there is no active loan


        6 passing (568ms)

6. Deploy contracts:
    ```
    npm run deploy

    ```
    Expected output:

        > nft-collateralization@1.0.0 deploy
        > npx hardhat run scripts/deploy.js --network localhost

        NFTSample deployed to: 0x9A676e781A523b5d0C0e43731313A708CB607508
        NFTCollateral deployed to: 0x959922bE3CAee4b8Cd9a407cc3ac1C251C2007B1

7. Set environment vcartiables using outputs of the previous command:
    Copy NFT_CONTRACT_ADDRESS and NFT_COLLATERAL_CONTRACT_ADDRESS from the output of the above command run
    ```
    export NFT_CONTRACT_ADDRESS={NFTSample address from above output}
    export NFT_COLLATERAL_CONTRACT_ADDRESS={NFTCollateral address from above output}

    ```
8. Deposit some ETH to the collateral contract (5 ETH, hardcoded):
    ```
    npm run deposit
    ```
9. Set approval for the NFT collateral contract to manage the NFT sample contract:
    ```
    npm run approve
    ```
10. Collateralize the specified NFT token ID (1, hardcoded):
    ```
    npm run collateralize
    ```
11. Create loan for the collateral:
    ```
    npm run create-loan
    ```
12. Repay loan for the collateral:
    ```
    npm run repay-loan
    ```

## License

This project is licensed under the MIT License.