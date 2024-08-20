const express = require('express')
const app = express()
const multer = require('multer')
const path = require('path')
const cors = require('cors')

const port = process.env.PORT || 3000

app.use(express.json())
app.use(cors({ origin: 'http://localhost:5173' }))
// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/')
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`)
  }
})

const upload = multer({ storage: storage })

// Create uploads directory if it doesn't exist
const fs = require('fs')
const uploadDir = path.join(__dirname, 'uploads')
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir)
}

app.get('/', (req, res) => {
  res.send('Hello World!')
})

// get-doc endpoint to handle PDF uploads
app.post('/get-doc', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.')
  }
  res.status(200).send({
    message: 'File uploaded successfully',
    file: req.file
  })
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
