const express = require('express')
const { body, validationResult } = require('express-validator')
const { register, login, token } = require('../controllers/authController')
const { uploadDoc } = require('../controllers/uploadDocController')
const checkPermissions = require('../middlewares/checkPermissions')
const multer = require('multer')
const path = require('path')
const fs = require('fs')

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

module.exports = router
