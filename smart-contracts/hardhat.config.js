require("@nomicfoundation/hardhat-toolbox")

/** @type import('hardhat/config').HardhatUserConfig */
require("dotenv").config()
const {
    SEPOLIA_RPC_URL,
    SEPOLIA_PRIVATE_KEY,
    ETHERSCAN_API_KEY,
    FUJI_RPC_URL,
    FUJI_PRIVATE_KEY,
} = process.env
module.exports = {
    defaultNetwork: "hardhat",
    networks: {
        hardhat: {},
        sepolia: {
            url: SEPOLIA_RPC_URL,
            accounts: [`0x${SEPOLIA_PRIVATE_KEY}`],
            chainId: 11155111,
        },
        fuji: {
            url: FUJI_RPC_URL, // Fuji Testnet RPC URL
            accounts: [`0x${FUJI_PRIVATE_KEY}`], // Your Fuji private key
            chainId: 43113, // Fuji Testnet chain ID
        },
    },
    etherscan: {
        apiKey: {
            etherscan: ETHERSCAN_API_KEY,
            snowtrace: "snowtrace",
        },
    },
    solidity: {
        compilers: [
            {
                version: "0.8.0",
            },
            {
                version: "0.8.20",
            },
            {
                version: "0.8.24",
            },
            {
                version: "0.7.6",
            },
            {
                version: "0.6.12",
            },
            // Add other versions as needed
        ],
    },
}
