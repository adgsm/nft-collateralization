const hre = require("hardhat");

/**
 * Main function to interact with the NFTCollateral contract.
 * This function retrieves the contract address from the environment variables,
 * gets the contract instance, and calls the releaseNFT function to remove the collateral.
 */
async function main() {
    const nftCollateralAddress = process.env.NFT_COLLATERAL_CONTRACT_ADDRESS;
    const nftCollateral = await hre.ethers.getContractAt("NFTCollateral", nftCollateralAddress);

    // Call functions here
    await nftCollateral.releaseNFT(0);

    console.log(`Collateral removed from ${nftCollateralAddress}`);
}

/**
 * The main function is executed and any errors are caught and logged.
 * If an error occurs, the process exit code is set to 1 to indicate failure.
 */
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});