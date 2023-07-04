const HDWalletProvider = require('@truffle/hdwallet-provider');
require('dotenv').config();

module.exports = {

  contracts_build_directory: "../frontend/contracts",
  
  networks: {
    development: {
      host: "127.0.0.1",
      port: 8545,
      network_id: "*"
    },
    
    goerli:{
      provider : function() {return new HDWalletProvider({mnemonic:{phrase:`${process.env.SEED}`},providerOrUrl:`https://goerli.infura.io/v3/${process.env.INFURA_ID}`})},
      network_id:5
    }
  },

  mocha: {
    reporter: 'eth-gas-reporter',
    showTimeSpent: true
  },

  compilers: {
    solc: {
      version: "0.8.20"
    }
  },

};
  
