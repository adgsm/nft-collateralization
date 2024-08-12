const NFTCollateral = artifacts.require("NFTCollateral");
const NFTCreation = artifacts.require("NFTCreation");

/**
 * Module exports a function to handle the deployment of the NFTCollateral contract.
 *
 * @param {Object} deployer - The deployer object used to manage contract deployments.
 */
module.exports = function (deployer) {
    deployer.deploy(NFTCreation);
    deployer.deploy(NFTCollateral);
};
