// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract NFTCollateral is Ownable {
    struct Collateral {
        address nftContract;
        uint256 tokenId;
        address owner;
        uint256 loanAmount;
        bool isLoanActive;
    }

    mapping(uint256 => Collateral) public collaterals;
    uint256 public collateralCounter;

    event Collateralized(address indexed owner, address indexed nftContract, uint256 indexed tokenId, uint256 collateralId);
    event LoanCreated(uint256 indexed collateralId, uint256 loanAmount);
    event LoanRepaid(uint256 indexed collateralId);

    // Function to deposit Ether into the contract
    function deposit() external payable onlyOwner {
        require(msg.value > 0, "Deposit amount must be greater than zero");
    }

    // Function to collateralize the NFT
    function collateralizeNFT(address _nftContract, uint256 _tokenId) external {
        IERC721 nft = IERC721(_nftContract);
        require(nft.ownerOf(_tokenId) == msg.sender, "You do not own this NFT");
        require(nft.getApproved(_tokenId) == address(this), "Contract not approved to transfer provided NFT token");

        collaterals[collateralCounter] = Collateral({
            nftContract: _nftContract,
            tokenId: _tokenId,
            owner: msg.sender,
            loanAmount: 0,
            isLoanActive: false
        });

        emit Collateralized(msg.sender, _nftContract, _tokenId, collateralCounter);

        collateralCounter++;
    }

    // Function to create loan against a collateral 
    function createLoan(address _nftContract, uint256 _tokenId, uint256 _collateralId, uint256 _loanAmount) external onlyOwner {
        IERC721 nft = IERC721(_nftContract);
        Collateral storage collateral = collaterals[_collateralId];
        require(collateral.tokenId == _tokenId, "Invalid collateral token Id");
        require(!collateral.isLoanActive, "Loan already active on this collateral");
        require(address(this).balance >= _loanAmount, "Insufficient contract balance to fund the loan");

        collateral.loanAmount = _loanAmount;
        collateral.isLoanActive = true;

        payable(collateral.owner).transfer(_loanAmount);

        nft.transferFrom(collateral.owner, address(this), _tokenId);

        emit LoanCreated(_collateralId, _loanAmount);
    }

    // Function to repay the loan for an existing collateral
    function repayLoan(uint256 _collateralId) external payable {
        Collateral storage collateral = collaterals[_collateralId];
        require(collateral.isLoanActive, "No active loan on this collateral");
        require(msg.value >= collateral.loanAmount, "Insufficient repayment amount");

        collateral.isLoanActive = false;
        collateral.loanAmount = 0;

        IERC721(collateral.nftContract).transferFrom(address(this), collateral.owner, collateral.tokenId);

        emit LoanRepaid(_collateralId);
    }
}
