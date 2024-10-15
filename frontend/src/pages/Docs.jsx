import { ethers } from 'ethers'
import { useEffect, useState } from 'react'
import contractInfo from '../../config/contractInfo.json'

const Docs = () => {
  const [signer, setSigner] = useState(null)

  const connectWallet = async () => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        await window.ethereum.request({ method: 'eth_requestAccounts' })
        const provider = new ethers.BrowserProvider(window.ethereum)
        const signer = await provider.getSigner()
        const IssuerAddr = await signer.getAddress()
        console.log('Signer address:', IssuerAddr)
        setSigner(signer)
      } catch (error) {
        console.error('Failed to connect wallet:', error)
      }
    } else {
      alert('Please install MetaMask!')
    }
  }
  const getContract = async (signer, contractInfo) => {
    try {
      const { address, abi } = contractInfo
      console.log('Address:', address)
      console.log('ABI:', contractInfo.abi)
      const contract = new ethers.Contract(address, abi, signer)
      console.log('contract fetch successfully')
      return contract
    } catch (e) {
      console.error(e)
    }
  }
  const getDocFromIpfs = async (data) => {
    const response = await fetch('http://localhost:5000/protected/get-docs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    const result = await response.json()
    console.log(result)
  }
  const handleTxn = async (signer, contractInfo) => {
    try {
      if (signer && contractInfo) {
        const contract = await getContract(signer, contractInfo)
        if (contract) {
          const tx = await contract.getUserDocuments(
            '0xFA406716883ad513Eb28AaDfDC6b9dd9C619F9fC'
          )
          return tx
        }
      } else {
        console.log('signer or contractInfo not found')
      }
    } catch (e) {
      console.error(e)
    }
  }

  const fetchDocs = async (signer, contractInfo) => {
    try {
      const txn = await handleTxn(signer, contractInfo)
      if (txn && txn.length) {
        const docData = []
        txn.forEach((result) => {
          const doc = {
            cid: result[0],
            dbId: result[1]
          }
          docData.push(doc)
        })
        console.log(docData)
        getDocFromIpfs(docData)
      }
    } catch (e) {
      console.error(e)
    }
  }

  useEffect(() => {
    connectWallet()
  }, [])
  useEffect(() => {
    fetchDocs(signer, contractInfo)
  }, [signer])
  return <div></div>
}

export default Docs
