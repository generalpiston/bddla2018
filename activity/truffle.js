var fs = require('fs');
var HDWalletProvider = require('truffle-hdwallet-provider');

// module.exports = {
//   networks: {
//     development: {
//       host: 'bddla.mobidex.io',
//       port: 8545,
//       network_id: '*'
//     }
// };

var mnemonic = fs.readFileSync('./mnemonic', { encoding: 'utf8' }).trim();

module.exports = {
  networks: {
    development: {
      provider: new HDWalletProvider(mnemonic, 'http://bddla.mobidex.io:8545'),
      network_id: '*'
    }
  }
};
