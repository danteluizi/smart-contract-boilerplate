
import "@nomiclabs/hardhat-ethers";
import "@nomiclabs/hardhat-waffle";
import "@nomiclabs/hardhat-etherscan";
import "dotenv/config";
import "hardhat-deploy";
import "hardhat-gas-reporter";
import "solidity-coverage";

const config = {
  defaultNetwork: "hardhat",
  solidity: {
    version: "0.8.10",
    settings: {
      optimizer: {
        enabled: true,
      },
      outputSelection: {
        "*": {
          "*": ["evm.methodIdentifiers", "abi"],
        },
      },
    },
  },
  namedAccounts: {
    deployer: 0,
  },
  mocha: {
    timeout: 40000000000000
  },
  networks: {
    hardhat: {
      forking: {
        enabled: true,
        url: `https://mainnet.infura.io/v3/${process.env.INFURA_TOKEN}`
      },
    },
    mainnet: {
      url: `https://mainnet.infura.io/v3/${process.env.INFURA_TOKEN}`,
      accounts:
        process.env.DEPLOY_PRIVATE_KEY == undefined
          ? []
          : [`0x${process.env.DEPLOY_PRIVATE_KEY}`],
    },
    rinkeby: {
      url: `https://rinkeby.infura.io/v3/${process.env.INFURA_TOKEN}`,
      gasPrice: 100000000000,
      accounts:
        process.env.TEST_DEPLOY_PRIVATE_KEY == undefined
          ? []
          : [`0x${process.env.TEST_DEPLOY_PRIVATE_KEY}`],
    },
    arbitrum: {
      url: "https://arb1.arbitrum.io/rpc",
      accounts:
        process.env.DEPLOY_PRIVATE_KEY == undefined
          ? []
          : [`0x${process.env.DEPLOY_PRIVATE_KEY}`],
    },
    avalanche: {
      url: "https://api.avax.network/ext/bc/C/rpc",
      chainId: 43114,
      accounts:
        process.env.DEPLOY_PRIVATE_KEY == undefined
          ? []
          : [`0x${process.env.DEPLOY_PRIVATE_KEY}`],
    },
    polygon: {
      url: "https://polygon-rpc.com",
      accounts:
        process.env.DEPLOY_PRIVATE_KEY == undefined
          ? []
          : [`0x${process.env.DEPLOY_PRIVATE_KEY}`],
    },
    bsc: {
      url: "https://bsc-dataseed.binance.org/",
      accounts:
        process.env.DEPLOY_PRIVATE_KEY == undefined
          ? []
          : [`0x${process.env.DEPLOY_PRIVATE_KEY}`],
    },
    bscTestnet: {
      url: "https://data-seed-prebsc-2-s3.binance.org:8545/",
      accounts:
        process.env.DEPLOY_PRIVATE_KEY == undefined
          ? []
          : [`0x${process.env.TEST_DEPLOY_PRIVATE_KEY}`],
    },
    ftm: {
      url: "https://rpc.ftm.tools/",
      accounts:
        process.env.DEPLOY_PRIVATE_KEY == undefined
          ? []
          : [`0x${process.env.DEPLOY_PRIVATE_KEY}`],
    }
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
  },
};

export default config;
