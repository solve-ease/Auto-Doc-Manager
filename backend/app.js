require('dotenv').config()
const express = require('express')
const session = require('express-session')
const app = express()
const cors = require('cors')
const authRoutes = require('./src/routes/auth')
const uploadRoute = require('./src/routes/uploadDoc')
const getDocsRoute = require('./src/routes/getDoc')
const port = process.env.PORT || 3000

app.use(express.json())
const allowedOrigins = [
  'https://auto-doc-seven.vercel.app',
  'http://localhost:5173'
]
app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (e.g., mobile apps, curl requests)
      if (!origin) return callback(null, true)

      if (allowedOrigins.includes(origin)) {
        callback(null, true) // Allow the request
      } else {
        callback(new Error('Not allowed by CORS')) // Block the request
      }
    },
    credentials: true // Allow credentials
  })
)
app.use(
  session({
    secret: process.env.SESSION_SECRET, // Replace with your own secret key
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Set to true if using HTTPS
  })
)

app.use('/auth', authRoutes)
app.use('/api', uploadRoute)
app.use('/protected', getDocsRoute)
app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
