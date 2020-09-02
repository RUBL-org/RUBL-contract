const HDWalletProvider = require("truffle-hdwallet-provider-privkey");
const providerWithPrivateKey = (key, rpcEndpoint) =>
  new HDWalletProvider(key, rpcEndpoint);

const infuraProvider = (network, projectId) => (
  process.env.PRIVATE_KEY.split(";"),
  providerWithPrivateKey(
    process.env.PRIVATE_KEY.split(";"),
    `https://${network}.infura.io/v3/${projectId}`
  ))

const ropstenProvider = () => infuraProvider("ropsten", process.env.INFURA_ROPSTEN || process.env.INFURA_KEY);
const mainnetProvider = () => infuraProvider("mainnet", process.env.INFURA_MAINNET || process.env.INFURA_KEY);

module.exports = {
  networks: {
    development: {
      protocol: 'http',
      host: 'localhost',
      port: 8545,
      gas: 5000000,
      gasPrice: 5e9,
      networkId: '*',
    },
    mainnet: {
      provider: () => mainnetProvider(),
      gas: 5000000,
      gasPrice: 25e9,
    },
    ropsten: {
      provider: () => ropstenProvider(),
      gas: 5000000,
      gasPrice: 2e9,
    }
  },
};
