const { StreamChat } = require('stream-chat');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
require('dotenv').config();

const api_key = process.env.STREAM_API_KEY;
const api_secret = process.env.STREAM_API_SECRET;
const app_id = process.env.STREAM_APP_ID;

const client = StreamChat.getInstance(api_key, api_secret); // StreamChat instance for both signup and login

// Signup Function
const signup = async (req, res) => {
    try {
        const { fullName, username, password, phoneNumber } = req.body;

        const userId = crypto.randomBytes(16).toString('hex');

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Generate token for user
        const token = client.createToken(userId);  // Use StreamChat to generate the token

        // Save user data to your DB (pseudo-code)
        // await saveUser({ userId, fullName, username, hashedPassword, phoneNumber });

        // Send response with token and user data
        res.status(200).json({ token, fullName, username, userId, hashedPassword, phoneNumber });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error signing up' });
    }
};

// Login Function
const login = async (req, res) => {
    try {
        const { username, password } = req.body;

        // Query user from your database (pseudo-code)
        // const user = await findUserByUsername(username);

        // In this case, we use StreamChat query for demonstration, but this should come from DB
        const { users } = await client.queryUsers({ name: username });

        if (!users.length) return res.status(400).json({ message: 'User not found' });

        const user = users[0];

        // Compare passwords
        const isPasswordCorrect = await bcrypt.compare(password, user.hashedPassword);

        if (!isPasswordCorrect) return res.status(400).json({ message: 'Incorrect password' });

        // Generate token for authenticated user
        const token = client.createToken(user.id);

        // Send the response back to the frontend
        res.status(200).json({ token, fullName: user.fullName, username, userId: user.id });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error logging in' });
    }
};

module.exports = { signup, login };
