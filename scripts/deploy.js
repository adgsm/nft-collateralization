const hre = require("hardhat");

/**
 * Main function to deploy NFTSample and NFTCollateral contracts.
 * This function uses Hardhat Runtime Environment (hre) to get the contract factory,
 * deploy contracts, and log the deployed contracts' addresses.
 */
async function main() {
    let owner, addr1;
    [owner, addr1] = await hre.ethers.getSigners();

    // Get the contract factory for NFTSample
    const NFTSample = await hre.ethers.getContractFactory("NFTSample");
    
    // Deploy the NFTSample contract
    const nftSample = await NFTSample.deploy();

    // Wait for the deployment to be completed
    await nftSample.deployed();

    // Log the address of the deployed contract
    console.log("NFTSample deployed to:", nftSample.address);

    // Mint token
    const [deployer] = await hre.ethers.getSigners();
    let tx = await nftSample.connect(owner).mintCollectionNFT(addr1.address, 1);
    await tx.wait(); // wait for this tx to finish to avoid nonce issues

    // Get the contract factory for NFTCollateral
    const NFTCollateral = await hre.ethers.getContractFactory("NFTCollateral");
    
    // Deploy the NFTCollateral contract
    const nftCollateral = await NFTCollateral.deploy();

    // Wait for the deployment to be completed
    await nftCollateral.deployed();

    // Log the address of the deployed contract
    console.log("NFTCollateral deployed to:", nftCollateral.address);
}

/**
 * Entry point of the program.
 * Handles any uncaught promise rejections by logging the error and setting the process exit code to 1.
 */
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exitCode = 1;
    });
