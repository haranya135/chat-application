const express = require('express');
const cors = require('cors');
const app = express();

// Define allowed origins
const allowedOrigins = [
  'https://chat-application-ynam.vercel.app',
  'https://chat-application-ynam-lutr43wh0-haranyas-projects.vercel.app'
];

// Middleware to dynamically set CORS headers
app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  next();
});

// Handle preflight (OPTIONS) requests
app.options('*', (req, res) => {
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.sendStatus(200);
});

// Your routes
app.post('/auth/login', (req, res) => {
  res.send('Login success');
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});


