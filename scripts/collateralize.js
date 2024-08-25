const hre = require("hardhat");

/**
 * Function to collateralize an NFT. It allows loan creation.
 * This function retrieves the NFT contract addresses from environment variables,
 * gets the NFTCollateral contract instance, and calls the collateralizeNFT function.
 */
async function main() {
    let owner, addr1;
    [owner, addr1] = await hre.ethers.getSigners();

    const nftSampleAddress = process.env.NFT_CONTRACT_ADDRESS;
    const nftCollateralAddress = process.env.NFT_COLLATERAL_CONTRACT_ADDRESS;
    const nftCollateral = await hre.ethers.getContractAt("NFTCollateral", nftCollateralAddress);
    const tokenId = 1; // Assuming token Id 1 of collateralized NFT

    // Call functions here
    await nftCollateral.connect(addr1).collateralizeNFT(nftSampleAddress, tokenId);

    console.log(`Contract ${nftSampleAddress} token Id ${tokenId} is collaterized`);
}

/**
 * The main function is executed and any errors are caught and logged.
 * If an error occurs, the process exit code is set to 1 to indicate failure.
 */
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exitCode = 1;
    });