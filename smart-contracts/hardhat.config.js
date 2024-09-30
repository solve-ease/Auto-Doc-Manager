require("@nomicfoundation/hardhat-toolbox")

/** @type import('hardhat/config').HardhatUserConfig */
require("dotenv").config()
// ERRoR
// const SEPOLIA_RPC_URL = process.env.SEPOLIA_RPC_URL
// const PRIVATE_KEY = process.env.PRIVATE_KEY

const { API_URL, PRIVATE_KEY } = process.env

console.log(process.env.PRIVATE_KEY)
console.log(typeof process.env.PRIVATE_KEY)

module.exports = {
    defaultNetwork: "hardhat",
    // networks: {
    //     sepolia: {
    //         url: SEPOLIA_RPC_URL,
    //         accounts: [PRIVATE_KEY],
    //         chainId: 11155111,
    //     },
    // },
    solidity: "0.8.8",
    networks: {
        hardhat: {},
        sepolia: {
            url: API_URL,
            accounts: [`0x${PRIVATE_KEY}`],
        },
    },
}
