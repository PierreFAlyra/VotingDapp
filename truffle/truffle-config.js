const HDWalletProvider = require('@truffle/hdwallet-provider');
require('dotenv').config();

module.exports = {

  contracts_build_directory: "../client/src/contracts",
  
  networks: {
    development: {
      host: "127.0.0.1",
      port: 8545,
      network_id: "*"
    },
    
    goerli:{
      provider : function() {return new HDWalletProvider({mnemonic:{phrase:`${process.env.SEED}`},providerOrUrl:`https://goerli.infura.io/v3/${process.env.INFURA_ID}`})},
      network_id:5
    },
    
    mumbai:{
      provider : function() {return new HDWalletProvider({mnemonic:{phrase:`${process.env.SEED}`},providerOrUrl:`https://polygon-mumbai.g.alchemy.com/v2/${process.env.ALCHEMY_ID}`})},
      network_id:80001
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
  
