const hre = require("hardhat");

/**
 * Asynchronous function that interacts with NFT contracts to approve a collateral contract to manage a specific token ID.
 * Retrieves NFT contract addresses from environment variables and signs the transaction using the deployer's signer.
 * Approves the collateral contract to manage the specified token ID by calling the approve function of the NFT contract.
 * Logs the approval status after the transaction is successfully mined.
 */
async function main() {
    const nftSampleAddress = process.env.NFT_CONTRACT_ADDRESS;
    const nftCollateralAddress = process.env.NFT_COLLATERAL_CONTRACT_ADDRESS;

    const [deployer] = await hre.ethers.getSigners();
    const nftSample = await hre.ethers.getContractAt("NFTSample", nftSampleAddress);
    const nftCollateral = await hre.ethers.getContractAt("NFTCollateral", nftCollateralAddress);

    // Create a contract instance for the NFT contract
    const nftContractABI = [
        "function approve(address to, uint256 tokenId) public"
    ];
    const nftContract = new hre.ethers.Contract(nftSample.address, nftContractABI, deployer);

    // Call the approve function to approve the collateral contract to manage the tokenId
    const transaction = await nftContract.approve(nftCollateral.address, 1);

    // Wait for the transaction to be mined
    await transaction.wait();

    console.log(`Approved contract ${nftCollateral.address} to manage token ID 1`);
}

/**
 * The main function is executed and any errors are caught and logged.
 * If an error occurs, the process exit code is set to 1 to indicate failure.
 */
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});