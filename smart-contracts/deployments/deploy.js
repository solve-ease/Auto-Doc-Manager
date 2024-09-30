// const { ethers } = require("hardhat")

// async function main() {
//     const HelloWorld = await ethers.getContractFactory("DocumentManagement")
//     const hello_world = await HelloWorld.deploy("Hello World!")
//     console.log("Contract Deployed to Address:", hello_world.address)
// }
// main()
//     .then(() => process.exit(0))
//     .catch((error) => {
//         console.error(error)
//         process.exit(1)
//     })

const hre = require("hardhat")

async function main() {
    console.log("Deploying DocumentManagement contract...")

    // Deploy the DocumentManagement contract
    const DocumentManagement =
        await hre.ethers.getContractFactory("DocumentManagement")
    const documentManagement = await DocumentManagement.deploy()

    await documentManagement.deployed()

    console.log("DocumentManagement deployed to:", documentManagement.address)

    // Verify the contract on Etherscan (optional)
    // if (hre.network.name !== "hardhat" && hre.network.name !== "localhost") {
    //     console.log("Waiting for block confirmations...")
    //     await documentManagement.deployTransaction.wait(6)

    //     console.log("Verifying contract on Etherscan...")
    //     await hre.run("verify:verify", {
    //         address: documentManagement.address,
    //         constructorArguments: [],
    //     })
    // }
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
