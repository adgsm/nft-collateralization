const hre = require("hardhat");

/**
 * Main function to deposit a specified amount of ETH into the NFTCollateral contract.
 * 
 * This function retrieves the NFTCollateral contract address from the environment variables,
 * gets the contract instance, and deposits 5 ETH into the contract.
 */
async function main() {
    let owner;
    [owner] = await hre.ethers.getSigners();

    const nftCollateralAddress = process.env.NFT_COLLATERAL_CONTRACT_ADDRESS;
    const nftCollateral = await hre.ethers.getContractAt("NFTCollateral", nftCollateralAddress);

    const depositAmount = hre.ethers.utils.parseEther("5"); // Deposit 5 ETH

    console.log(`Depositing ${hre.ethers.utils.formatEther(depositAmount)} ETH to the contract...`);

    const tx = await nftCollateral.connect(owner).deposit({ value: depositAmount });
    await tx.wait();

    console.log("Deposit successful!");
}

/**
 * Entry point of the program.
 * Handles any uncaught promise rejections by logging the error and setting the process exit code to 1.
 */
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });