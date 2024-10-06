// const { JsonRpcProvider } = require("ethers")
const { ethers } = require("hardhat")
async function main() {
    // Load environment variables
    require("dotenv").config()
    const { SEPOLIA_RPC_URL, PRIVATE_KEY } = process.env

    // Connect to the Sepolia network

    const provider = await ethers.provider
    const wallet = new ethers.Wallet(PRIVATE_KEY, provider)
    // Check account balance
    const balance = await provider.getBalance(wallet.address)
    console.log(`Account balance is : ${balance} ETH`)
    // Get the contract factory
    const ContractFactory =
        await ethers.getContractFactory("DocumentManagement")
    // Ensure the contract factory is properly initialized
    if (!ContractFactory) {
        throw new Error("Failed to initialize contract factory")
    }

    // Estimate gas for deployment
    const estimatedGas = await ethers.provider.estimateGas(
        ContractFactory.getDeployTransaction(),
    )

    // Get current gas price
    const gasPrice = await provider.getGasPrice

    // Calculate estimated cost in ETH
    // const estimatedCost = estimatedGas.mul(gasPrice)

    console.log(`Estimated Gas: ${estimatedGas.toString()}`)
    console.log(`Gas Price: ${ethers.utils.formatUnits(gasPrice, "gwei")} gwei`)
    // console.log(
    //     `Estimated Cost: ${ethers.utils.formatEther(estimatedCost)} ETH`,
    // )
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
