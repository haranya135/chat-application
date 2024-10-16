const express = require('express');
const app = express();

app.use(cors({
    origin: 'https://chat-application-ynam-lutr43wh0-haranyas-projects.vercel.app', // allow this specific origin
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true // if you're using cookies or sessions
  }));
  
app.options('*', cors({
    origin: 'https://chat-application-ynam-lutr43wh0-haranyas-projects.vercel.app',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
  }));

app.post('/auth/login', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', 'https://chat-application-ynam.vercel.app'); // Set specific allowed origin
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE'); // Set allowed methods
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization'); // Set allowed headers
  res.setHeader('Access-Control-Allow-Credentials', 'true'); // Enable credentials (if needed)

  res.send('Login success');
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});

