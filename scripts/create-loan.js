const hre = require("hardhat");

/**
 * Main function to create a loan using NFT collateral.
 * This function retrieves necessary contract instances and environment variables,
 * defines the collateral ID and loan amount, and creates a loan by calling the 
 * createLoan function on the NFT collateral contract.
 */
async function main() {
    let owner;
    [owner] = await hre.ethers.getSigners();

    // Get the address of the NFT sample contract from environment variables
    const nftSampleAddress = process.env.NFT_CONTRACT_ADDRESS;

    // Get the address of the NFT collateral contract from environment variables
    const nftCollateralAddress = process.env.NFT_COLLATERAL_CONTRACT_ADDRESS;

    // Get the NFT sample contract instance
    const nftSample = await hre.ethers.getContractAt("NFTSample", nftSampleAddress);

    // Get the NFT collateral contract instance
    const nftCollateral = await hre.ethers.getContractAt("NFTCollateral", nftCollateralAddress);

    // Define the collateral ID and loan amount
    const collateralId = 0; // Assuming the first collateralized NFT
    const loanAmount = hre.ethers.utils.parseEther("0.01"); // Loan amount of 0.01 ETH

    // Log the loan creation details
    console.log(`Creating a loan of ${hre.ethers.utils.formatEther(loanAmount)} ETH for collateral ID ${collateralId}...`);

    const tokenId = 1; // Assuming token Id 1 of collateralized NFT

    // Create the loan by calling the createLoan function on the NFT collateral contract
    const tx = await nftCollateral.connect(owner).createLoan(nftSample.address, tokenId, collateralId, loanAmount);

    // Wait for the transaction to be mined
    await tx.wait();

    // Log the success message
    console.log("Loan created successfully!");
}

/**
 * The main function is executed and any errors are caught and logged.
 * If an error occurs, the process exit code is set to 1 to indicate failure.
 */
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });