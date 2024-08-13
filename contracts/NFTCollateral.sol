// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";

contract NFTCollateral {
    struct Collateral {
        address nftContract;
        uint256 tokenId;
        address borrower;
        uint256 loanAmount;
        bool isActiv;
    }

    mapping(uint256 => Collateral) public collaterals;
    uint256 public collateralCount;

    event Collateralized(address indexed borrower, address nftContract, uint256 tokenId, uint256 loanAmount);

    function collateralizeNFT(address _nftContract, uint256 _tokenId, uint256 _loanAmount) external {
        require(IERC721(_nftContract).getApproved(_tokenId) == address(this), "Contract is not approved to transfer this NFT");

        IERC721(_nftContract).transferFrom(msg.sender, address(this), _tokenId);

        collaterals[collateralCount] = Collateral({
            nftContract: _nftContract,
            tokenId: _tokenId,
            borrower: msg.sender,
            loanAmount: _loanAmount,
            isActiv: true
        });

        emit Collateralized(msg.sender, _nftContract, _tokenId, _loanAmount);
        collateralCount++;
    }

    function releaseNFT(uint256 _collateralId) external {
        Collateral storage collateral = collaterals[_collateralId];
        require(collateral.isActiv, "Collateral is not active");
        require(collateral.borrower == msg.sender, "Only borrower can release the collateral");

        collateral.isActiv = false;
        collateralCount--;

        IERC721(collateral.nftContract).transferFrom(address(this), msg.sender, collateral.tokenId);
    }
}
