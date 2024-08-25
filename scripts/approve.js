const hre = require("hardhat");

/**
 * Main function to set up and approve NFT contracts.
 * 
 * This function retrieves the owner and another address from the Ethereum network,
 * fetches the NFT contract addresses from environment variables, and sets approval
 * for the NFT collateral contract to manage the NFT sample contract.
 */
async function main() {
    let owner, addr1;
    [owner, addr1] = await hre.ethers.getSigners();

    const nftSampleAddress = process.env.NFT_CONTRACT_ADDRESS;
    const nftCollateralAddress = process.env.NFT_COLLATERAL_CONTRACT_ADDRESS;

    const nftSample = await hre.ethers.getContractAt("NFTSample", nftSampleAddress);
    const nftCollateral = await hre.ethers.getContractAt("NFTCollateral", nftCollateralAddress);

    await nftSample.connect(addr1).setApprovalForAll(nftCollateral.address, true);

    console.log(`Approved contract ${nftCollateral.address} to manage ${nftSample.address}`);
}

/**
 * The main function is executed and any errors are caught and logged.
 * If an error occurs, the process exit code is set to 1 to indicate failure.
 */
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});