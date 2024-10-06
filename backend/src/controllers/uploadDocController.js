const { pinata, auth } = require('../services/pinataService')
const fs = require('fs')
const { Blob, File } = require('blob-polyfill')
const path = require('path')
const { prisma } = require('../utils/prismaClient')
const { callIssueDocument } = require('./contractController')

const uploadToIPFS = async (fileBuffer, fileName) => {
  try {
    const auth = await pinata.testAuthentication()
    const fileBlob = new Blob([fileBuffer], { type: 'application/pdf' })
    const file = new File([fileBlob], fileName, { type: 'application/pdf' })
    const upload = await pinata.upload.file(file)
    return upload
  } catch (err) {
    console.log(err)
    return err
  }
}
const uploadToDb = async (signer, ownerAddr, type) => {
  try {
    const doc = await prisma.document.create({
      data: {
        ownerAddress: ownerAddr,
        issuerAddress: signer.address,
        type: type,
        expiryAt: new Date()
      }
    })
    return doc
  } catch (err) {
    console.log(err)
    return err
  }
}
const uploadDoc = async (req, res) => {
  console.log('request received')
  const { signer, ownerAddr, type } = req.body
  if (!req.file) {
    return res.status(400).send('No file uploaded.')
  }

  const fileName = req.file.originalname
  const fileBuffer = req.file.buffer
  try {
    console.log('inside try')
    //uploading doc to ipfs and pinning
    const upload = await uploadToIPFS(fileBuffer, fileName)
    console.log(upload, 'doc successfully uploaded to ipfs')
    const cid = upload.IpfsHash

    //uploading doc to db
    const doc = await uploadToDb(req)
    console.log(doc, 'doc successfully uploaded to db')

    //updating blockchain
    const tx = await callIssueDocument(signer, cid, ownerAddr, doc.id)
    console.log(tx, 'doc successfully uploaded to blockchain')
  } catch (err) {
    console.log(err)
    res.status(500).json({ error: err.message })
  }
}
module.exports = {
  uploadDoc
}
