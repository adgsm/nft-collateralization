const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("NFTCollateral", function () {
    let nftCollateral;
    let nftSample;
    let owner, addr1;
    let collateralId;

    beforeEach(async function () {
        [owner, addr1] = await ethers.getSigners();

        // Deploy a sample NFT contract
        const NFTSample = await ethers.getContractFactory("NFTSample");
        nftSample = await NFTSample.deploy();
        await nftSample.deployed();

        // Mint NFT token 0 to addr1
        await nftSample.connect(owner).mintCollectionNFT(addr1.address, 0);
        expect(await nftSample.ownerOf(0)).to.equal(addr1.address);

        // Deploy the NFTCollateral contract
        const NFTCollateral = await ethers.getContractFactory("NFTCollateral");
        nftCollateral = await NFTCollateral.deploy();
        await nftCollateral.deployed();

        // Approve and collateralize the NFT
        await nftSample.connect(addr1).setApprovalForAll(nftCollateral.address, true);
        await nftCollateral.connect(addr1).collateralizeNFT(nftSample.address, 0);

        collateralId = 0; // The first collateralized NFT will have ID 0

        // Deposit Ether into the contract to enable loan creation
        const depositAmount = ethers.utils.parseEther("5"); // Deposit 5 ETH
        await nftCollateral.connect(owner).deposit({ value: depositAmount });
    });

    it("should create a loan successfully", async function () {
        const loanAmount = ethers.utils.parseEther("1"); // 1 ETH loan amount

        // Check initial balance of addr1
        const initialBalance = await ethers.provider.getBalance(addr1.address);

        // Create the loan
        await nftCollateral.connect(owner).createLoan(nftSample.address, 0, collateralId, loanAmount);

        // Check that the loan is active
        const collateral = await nftCollateral.collaterals(collateralId);
        expect(collateral.isLoanActive).to.be.true;
        expect(collateral.loanAmount).to.equal(loanAmount);

        // Check that addr1 received the loan amount
        const finalBalance = await ethers.provider.getBalance(addr1.address);
        expect(finalBalance).to.equal(initialBalance.add(loanAmount));
    });

    it("should fail to create a loan if contract has insufficient balance", async function () {
        const loanAmount = ethers.utils.parseEther("10"); // Attempting to loan more than available in contract

        await expect(
            nftCollateral.connect(owner).createLoan(nftSample.address, 0, collateralId, loanAmount)
        ).to.be.revertedWith("Insufficient contract balance to fund the loan");
    });

    it("should allow repayment of the loan and release the NFT", async function () {
        const loanAmount = ethers.utils.parseEther("1");

        // Create the loan
        await nftCollateral.connect(owner).createLoan(nftSample.address, 0, collateralId, loanAmount);

        // Repay the loan
        await nftCollateral.connect(addr1).repayLoan(collateralId, { value: loanAmount });

        // Check that the loan is no longer active
        const collateral = await nftCollateral.collaterals(collateralId);
        expect(collateral.isLoanActive).to.be.false;
        expect(collateral.loanAmount).to.equal(0);

        // Check that the NFT was transferred back to addr1
        expect(await nftSample.ownerOf(0)).to.equal(addr1.address);
    });

    it("should fail to repay the loan with insufficient funds", async function () {
        const loanAmount = ethers.utils.parseEther("1");

        // Create the loan
        await nftCollateral.connect(owner).createLoan(nftSample.address, 0, collateralId, loanAmount);

        // Try to repay with less than the loan amount
        await expect(
            nftCollateral.connect(addr1).repayLoan(collateralId, { value: ethers.utils.parseEther("0.5") })
        ).to.be.revertedWith("Insufficient repayment amount");

        // Check that the loan is still active
        const collateral = await nftCollateral.collaterals(collateralId);
        expect(collateral.isLoanActive).to.be.true;
    });

    it("should only allow the loan creator to create loans", async function () {
        const loanAmount = ethers.utils.parseEther("1");

        // Try to create a loan from addr1 (non-owner), which should fail
        await expect(
            nftCollateral.connect(addr1).createLoan(nftSample.address, 0, collateralId, loanAmount)
        ).to.be.revertedWith("Ownable: caller is not the owner");
    });

    it("should not allow repayment if there is no active loan", async function () {
        // Try to repay without an active loan, which should fail
        await expect(
            nftCollateral.connect(addr1).repayLoan(collateralId, { value: ethers.utils.parseEther("1") })
        ).to.be.revertedWith("No active loan on this collateral");
    });
});
