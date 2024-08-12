const hre = require("hardhat");

/**
 * Main function to collateralize an NFT.
 * This function retrieves the NFT contract addresses from environment variables,
 * gets the NFTCollateral contract instance, and calls the collateralizeNFT function.
 */
async function main() {
    const nftSampleAddress = process.env.NFT_CONTRACT_ADDRESS;
    const nftCollateralAddress = process.env.NFT_COLLATERAL_CONTRACT_ADDRESS;
    const nftCollateral = await hre.ethers.getContractAt("NFTCollateral", nftCollateralAddress);

    // Call functions here
    await nftCollateral.collateralizeNFT(nftSampleAddress, 1, 1);

    console.log(`Contract ${nftSampleAddress} is collaterized`);
}

/**
 * The main function is executed and any errors are caught and logged.
 * If an error occurs, the process exit code is set to 1 to indicate failure.
 */
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});