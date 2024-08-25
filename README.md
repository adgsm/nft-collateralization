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

6. Create ```.env``` file in project root:

    ```
    cp .env.example .env
    nano .env
    ```
    Set your INFURA_PROJECT_ID, PRIVATE_KEY_OWNER, and PRIVATE_KEY_ADDR1
    ```
    INFURA_PROJECT_ID=
    PRIVATE_KEY_OWNER=
    PRIVATE_KEY_ADDR1=
    ```

7. Deploy contracts:

    Dev environment (localhost)
    ```
    npm run deploy:dev

    ```
    Test environment (sepolia, linea-sepolia)
    ```
    npm run deploy:test

    ```
    Expected output:

        > nft-collateralization@1.0.0 deploy
        > npx hardhat run scripts/deploy.js --network localhost

        NFTSample deployed to: 0x9A676e781A523b5d0C0e43731313A708CB607508
        NFTCollateral deployed to: 0x959922bE3CAee4b8Cd9a407cc3ac1C251C2007B1

8. Set environment vcartiables using outputs of the previous command:
    Copy NFT_CONTRACT_ADDRESS and NFT_COLLATERAL_CONTRACT_ADDRESS from the output of the above command run
    ```
    export NFT_CONTRACT_ADDRESS={NFTSample address from above output}
    export NFT_COLLATERAL_CONTRACT_ADDRESS={NFTCollateral address from above output}

    ```

9. Deposit some ETH to the collateral contract (0.01 ETH, hardcoded):

    Dev environment (localhost)
    ```
    npm run deposit:dev
    ```
    Test environment (sepolia, linea-sepolia)
    ```
    npm run deposit:test
    ```

10. Set approval for the NFT collateral contract to manage the NFT sample contract:

    Dev environment (localhost)
    ```
    npm run approve:dev
    ```
    Test environment (sepolia, linea-sepolia)
    ```
    npm run approve:test
    ```

11. Collateralize the specified NFT token ID (1, hardcoded):

    Dev environment (localhost)
    ```
    npm run collateralize:dev
    ```
    Test environment (sepolia, linea-sepolia)
    ```
    npm run collateralize:test
    ```

12. Create loan for the collateral:

    Dev environment (localhost)
    ```
    npm run create-loan:dev
    ```
    Test environment (sepolia, linea-sepolia)
    ```
    npm run create-loan:test
    ```

13. Repay loan for the collateral:

    Dev environment (localhost)
    ```
    npm run repay-loan:dev
    ```
    Test environment (sepolia, linea-sepolia)
    ```
    npm run repay-loan:test
    ```

## License

This project is licensed under the MIT License.