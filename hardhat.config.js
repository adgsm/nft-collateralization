require("@nomiclabs/hardhat-waffle");
require("dotenv").config();

module.exports = {
  solidity: "0.8.17",
  networks: {
    hardhat: {},
    localhost: {
      url: "http://127.0.0.1:8545"
    },
    sepolia: {
      url: `https://sepolia.infura.io/v3/${process.env.INFURA_PROJECT_ID}`,
      accounts: [`${process.env.PRIVATE_KEY_OWNER}`, `${process.env.PRIVATE_KEY_ADDR1}`]
    },
    "linea-sepolia": {
      url: `https://linea-sepolia.infura.io/v3/${process.env.INFURA_PROJECT_ID}`,
      accounts: [`${process.env.PRIVATE_KEY_OWNER}`, `${process.env.PRIVATE_KEY_ADDR1}`]
    },
  }
};