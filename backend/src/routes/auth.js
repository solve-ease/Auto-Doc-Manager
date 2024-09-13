const express = require('express')
const { body, validationResult } = require('express-validator')
const {
  register,
  login,
  token,
  uploadDoc
} = require('../controllers/authController')
const checkPermissions = require('../middlewares/checkPermissions')
const multer = require('multer')
const path = require('path')
const fs = require('fs')

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

const uploadDir = path.join(__dirname, 'uploads')
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir)
}
const router = express.Router()

// root
router.get('/', (req, res) => {
  res.send('Welome to Auto doc managers Backend!')
})

// health-check
router.get('/health-check', (req, res) => {
  res.status(500).json({ message: 'Status : OK' })
})

router.post(
  '/register',
  [
    body('email').isEmail().withMessage('Invalid email'),
    body('password').notEmpty().withMessage('Password is required')
  ],
  register
)

router.post(
  '/login',
  [
    body('email').isEmail().withMessage('Invalid email'),
    body('password').notEmpty().withMessage('Password is required')
  ],
  login
)
router.post('/token', token)
router.post(
  'upload-doc',
  checkPermissions('create', 'Document'),
  upload.single('file'),
  uploadDoc
)
module.exports = router
