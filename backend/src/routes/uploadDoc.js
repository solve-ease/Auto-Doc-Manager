const express = require('express')
const checkPermissions = require('../middlewares/checkPermissions')
const { uploadDoc } = require('../controllers/uploadDocController')
const multer = require('multer')
const path = require('path')
const fs = require('fs')

const router = express.Router()

// Set up multer for file uploads
const uploadDir = path.join(__dirname, '../uploads')

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir)
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`)
  }
})

const upload = multer({ storage: storage })

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir)
}
// route for issuer to upload document and then uploading it to pinata
router.post('/upload-doc', upload.single('file'), uploadDoc)
module.exports = router
