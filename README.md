# NFT Collateralization

This project is an extremely simplified dApp that allows users to collateralize and release their NFTs.

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
    npm test
    ```
6. Deploy contracts:
    ```
    npm deploy

    ```
7. Approves the collateral contract to manage the specified token ID (1, hardcoded):
    Copy NFT_CONTRACT_ADDRESS and NFT_COLLATERAL_CONTRACT_ADDRESS from the output of the above command run
    ```
    NFT_CONTRACT_ADDRESS=0x... NFT_COLLATERAL_CONTRACT_ADDRESS=0x... npm run approve
    ```
8. Collateralize the specified token ID (1, hardcoded):
    ```
    NFT_CONTRACT_ADDRESS=0x... NFT_COLLATERAL_CONTRACT_ADDRESS=0x... npm run collateralize
    ```
9. Remove the collateral:
    ```
    NFT_COLLATERAL_CONTRACT_ADDRESS=0x... npm run release
    ```

## License

This project is licensed under the MIT License.