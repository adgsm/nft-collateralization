const hre = require("hardhat");

/**
 * Main function to execute the loan repayment process for a collateralized NFT.
 * This function retrieves the signers, connects to the NFTCollateral contract,
 * and repays the loan for a specified collateral ID.
 */
async function main() {
    let owner, addr1;
    [owner, addr1] = await hre.ethers.getSigners();

    const nftCollateralAddress = process.env.NFT_COLLATERAL_CONTRACT_ADDRESS;
    const nftCollateral = await hre.ethers.getContractAt("NFTCollateral", nftCollateralAddress);

    const collateralId = 0; // Assuming the first collateralized NFT
    const loanAmount = hre.ethers.utils.parseEther("0.01"); // Amount to repay (same as loan amount)

    console.log(`Repaying loan of ${hre.ethers.utils.formatEther(loanAmount)} ETH for collateral ID ${collateralId}...`);

    const tx = await nftCollateral.connect(addr1).repayLoan(collateralId, { value: loanAmount });
    await tx.wait();

    console.log("Loan repaid successfully and NFT retrieved!");
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