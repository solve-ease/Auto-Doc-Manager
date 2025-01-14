const nodemailer = require('nodemailer')
const prisma = require('../utils/prismaClient')
require('dotenv').config();

const googleEmail = process.env.GOOGLE_EMAIL

let transporter
try {
  transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: googleEmail,
      pass: process.env.GOOGLE_APP_PASSWORD // Use the environment variable for the app password
    }
  })
} catch (error) {
  console.error('Error creating Nodemailer transporter:', error)
}
const phoneOtp = async (req, res) => {
  //to be done later on
}
const emailOtp = async (sendTo, otp) => {
  const mailOptions = {
    from: googleEmail,
    to: sendTo,
    subject: 'Your OTP Code',
    text: `Your OTP code is ${otp}`
  }
  try {
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000)
    // uploading otp to db
    const otpToDb = await prisma.otp.create({
      data: {
        otp: otp,
        verifyWith: sendTo,
        createdAt: new Date(),
        expiresAt: expiresAt
      }
    })
    //sending otp email
    await transporter.sendMail(mailOptions)
  } catch (error) {
    console.error('Error sending OTP:', error)
    throw error
  }
}
const sendOtp = async (req, res) => {
  console.log('sendOtp')
  const { optedMethod } = req.body
  const otp = Math.floor(100000 + Math.random() * 900000).toString()

  // Store OTP in session or database
  req.session.otp = otp
  if (optedMethod === 'phone') {
  } else {
    try {
      const { email } = req.body
      emailOtp(email, otp)
      res.status(200).json({ success: true })
    } catch (error) {
      console.error('Error sending OTP:', error)
      res.status(500).json({ success: false })
    }
  }
}
const verifyOtp = async (req, res) => {
  const { otp, verifyWith } = req.body
  const otpFromDb = await prisma.otp.findFirst({
    where: {
      otp: otp,
      verifyWith: verifyWith,
      expiresAt: {
        gt: new Date() // Check that the current time is before the expiresAt time
      }
    }
  })
  if (otpFromDb) {
    res.status(200).json({ success: true })
  } else {
    res.status(401).json({ success: false })
  }
}
module.exports = { sendOtp, verifyOtp }
