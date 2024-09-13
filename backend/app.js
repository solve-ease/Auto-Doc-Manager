require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')

const port = process.env.PORT || 3000

app.use(express.json())
app.use(cors({ origin: 'http://localhost:5173' }))

const { extractTextFromPdf } = require('./src/utils/textExtract')

app.get('/', (req, res) => {
  res.send('Hello World!')
})

const authRoutes = require('./src/routes/auth')
app.use('/api', authRoutes)
app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
