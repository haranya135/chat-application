const cors = require('cors');
const express = require('express');
const app = express();

app.use(cors({
  origin: 'https://chat-application-ynam.vercel.app', // or '*' to allow all origins
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true // if you're using cookies or sessions
}));

// Your routes go here
app.post('/auth/login', (req, res) => {
  // handle login
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
