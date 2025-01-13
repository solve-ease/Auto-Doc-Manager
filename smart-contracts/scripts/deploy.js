const DocumentManagementModule = require(`../ignition/modules/deploy`)
async function main() {
    try {
        const { documentManagement } = await hre.ignition.deploy(
            DocumentManagementModule,
        )
        const contractAddress = await documentManagement.getAddress()
        console.log(`Contract deployed to: ${contractAddress}`)

        // Verify the contract on Etherscan

        // await hre.run("verify:verify", {
        //     address: contractAddress,
        //     constructorArguments: [], // Add constructor arguments if any
        // })
        // console.log("Contract verified on Etherscan")
    } catch (error) {
        console.error(error)
    }
}

main().catch(console.error)
