const { pinata, auth } = require('../services/pinataService')
const fs = require('fs')
const { Blob, File } = require('blob-polyfill')
const path = require('path')
const prisma = require('../utils/prismaClient')

const getDoc = async (req, res) => {
  try {
    const docData = req.body
    if (docData) {
      //getting data from ipfs and db by iterating over the array
      const filePromises = docData.map(async (doc) => {
        const ipfsData = await pinata.gateways.get(doc.cid)
        const dbData = await prisma.document.findUnique({
          where: { id: parseInt(doc.dbId) }
        })
        return { ipfsData, dbData }
      })
      // Wait for all promises to resolve
      const files = await Promise.all(filePromises)
      console.log(files)
      res.status(200).json(files)
    }
  } catch (error) {
    console.error('Error fetching documents:', error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
}
module.exports = getDoc
