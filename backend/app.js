require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const authRoutes = require('./src/routes/auth')
const uploadRoute = require('./src/routes/uploadDoc')
const getDocsRoute = require('./src/routes/getDoc')
const port = process.env.PORT || 3000

app.use(express.json())
app.use(cors({ origin: 'http://localhost:5173' }))

app.use('/auth', authRoutes)
app.use('/api', uploadRoute)
app.use('/protected', getDocsRoute)
app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
