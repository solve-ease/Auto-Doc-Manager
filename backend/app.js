

require('dotenv').config();
const express = require('express');
const session = require('express-session');
const app = express();
const cors = require('cors');
const authRoutes = require('./src/routes/auth');
const uploadRoute = require('./src/routes/uploadDoc');
const getDocsRoute = require('./src/routes/getDoc');
const port = process.env.PORT || 3000;

app.use(express.json());

const allowedOrigins = [
  'https://auto-doc-seven.vercel.app',
  'http://localhost:5173'
];

// Session middleware
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'fallback-session-secret',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true } // Set to true if using HTTPS
  })
);

// CORS middleware
app.use(
  cors({
    origin: allowedOrigins,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true // Allow credentials
  })
);

// Handle preflight requests
app.options('*', cors());

// Basic health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// Routes
app.use('/auth', authRoutes);
app.use('/api', uploadRoute);
app.use('/protected', getDocsRoute);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
