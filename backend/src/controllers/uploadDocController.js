const { pinata, auth } = require('../services/pinataService')
const fs = require('fs')
const { Blob, File } = require('blob-polyfill')
const path = require('path')

const uploadDoc = async (req, res) => {
  console.log('request received')
  if (!req.file) {
    return res.status(400).send('No file uploaded.')
  }
  const fileName = req.file.filename
  const filePath = path.join(__dirname, '../uploads', fileName)
  console.log(filePath)
  try {
    console.log('inside try')

    // Ensure the file exists before uploading
    if (!fs.existsSync(filePath)) {
      console.log('File not found')
      return res.status(400).send('File not found.')
    }
    // const text = await extractTextFromPdf(filePath)

    // Read the file as a stream
    const fileBuffer = fs.readFileSync(filePath)
    const fileBlob = new Blob([fileBuffer], { type: 'application/pdf' })

    // Create a File object
    const file = new File([fileBlob], fileName, { type: 'application/pdf' })
    //checking if pinata is working
    const auth = await pinata.testAuthentication()
    console.log(auth)
    // Uploading to Pinata
    const upload = await pinata.upload.file(file)
    console.log(upload)

    // const fileFromIpfs = await pinata.gateways.get(
    //   'bafkreih6nocqbn5veyg4m6bc3lu2typvj3ydyjvfg7yxbwmwyaygizixr4'
    // )
    // console.log(fileFromIpfs)
    res.status(200).send({
      message: 'File uploaded successfully'
    })
  } catch (err) {
    console.log(err)
    res.status(500).json({ error: err.message })
  }
}
module.exports = {
  uploadDoc
}
