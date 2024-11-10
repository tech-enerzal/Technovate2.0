require('@nomiclabs/hardhat-ethers');

module.exports = {
  solidity: "0.8.17",
  networks: {
    amoy: {
      url: "https://rpc-amoy.polygon.technology/",       // Replace with your Amoy RPC URL
      accounts: ["76deffe9d6f73c0b7ae9b7b3a48432577a5ccfecfdea365a12d724811a90e4be"]  // Replace with your private key
    }
  }
};
