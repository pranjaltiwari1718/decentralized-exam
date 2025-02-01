// truffle-config.js
module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",     // Localhost (default: none)
      port: 7545,            // Default port for Ganache CLI
      network_id: "*",       // Any network (default: none)
      gas: 900000,          // Set within the limit specified in the CLI
      gasPrice: 20000000000, // Standard gas price
    },
  },
  compilers: {
    solc: {
      version: "0.8.0",        // Your contract's Solidity version
      settings: {
        optimizer: {
          enabled: true,       // Enable optimization
          runs: 200,           // Optimize for how many times you intend to run the code
        },
        evmVersion: "istanbul", // Set EVM version
      },
    },
  },
  db: {
    enabled: false,
  },
};
