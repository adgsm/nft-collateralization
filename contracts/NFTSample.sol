// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import { ERC721 } from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract NFTSample is ERC721, Ownable {
    // Constructor
    constructor() ERC721("CollaterableNFT", "CNFT") {}

    // Allows minting of a new NFT 
    function mintCollectionNFT(address collector, uint256 tokenId) public onlyOwner() {
        _safeMint(collector, tokenId); 
    }
}
