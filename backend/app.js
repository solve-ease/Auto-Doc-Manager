require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const authRoutes = require('./src/routes/auth')
const uploadRoute = require('./src/routes/uploadDoc')

const port = process.env.PORT || 3000

app.use(express.json())
app.use(cors({ origin: 'https://auto-doc-backend.vercel.app' }))

app.use('/auth', authRoutes)
app.use('/api', uploadRoute)
app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
