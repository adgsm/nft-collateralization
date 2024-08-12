const { expect } = require("chai");

describe("NFTCollateral", function () {
    /**
     * Test case to ensure an NFT can be collateralized.
     */

    let nftCollateralAddress; 

    /**
     * Test to check if an NFT can be collateralized.
     */
    it("Should collateralize an NFT", async function () {
        // Deploy contracts
        const NFTCollateral = await ethers.getContractFactory("NFTCollateral");
        const nftCollateral = await NFTCollateral.deploy();
        await nftCollateral.deployed();

        nftCollateralAddress = nftCollateral.address;

        const NFTSample = await ethers.getContractFactory("NFTSample");
        const nftSample = await NFTSample.deploy();
        await nftSample.deployed();

        // Mint token
        const [deployer] = await hre.ethers.getSigners();
        let tx = await nftSample.mintCollectionNFT(deployer.address, 1);
        await tx.wait();

        // Give approval
        const nftContractABI = [
            "function approve(address to, uint256 tokenId) public"
        ];
        const nftContract = new hre.ethers.Contract(nftSample.address, nftContractABI, deployer);
        const transaction = await nftContract.approve(nftCollateral.address, 1);
        await transaction.wait();

        // Collateralize the NFT
        await nftCollateral.collateralizeNFT(nftSample.address, 1, 1);

        // Retrieve the collateral details
        expect(await nftCollateral.collateralCount()).to.equal(1);
    });

    /**
     * Test to check if a collateralized NFT can be released.
     */
    it("Should release an collaterized NFT", async function () {
        // Retrieve contract
        const nftCollateral = await hre.ethers.getContractAt("NFTCollateral", nftCollateralAddress);

        // Release the NFT
        await nftCollateral.releaseNFT(0);

        // Retrieve the collateral details
        expect(await nftCollateral.collateralCount()).to.equal(0);
    });
});
