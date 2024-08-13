const bcrypt = require('bcrypt');
const express = require('express');
const router = express.Router();

const db = require('../config/db');

// Display Register Form
router.get('/register', (req, res) => {
    const error = req.query.error;
    res.render('register', { error });
});

// Handle Registration
router.post('/register', async (req, res) => {
    const { username, email, password, confirm_password } = req.body;

    // Validation
    if (!username || !email || !password || !confirm_password) {
        return res.render('register', { error: 'All fields are required' });
    }
    if (password !== confirm_password) {
        return res.render('register', { error: 'Passwords do not match' });
    }
    
    // Check if username or email already exists
    const [existingUser] = await db.query('SELECT * FROM users WHERE username = ? OR email = ?', [username, email]);
    if (existingUser.length > 0) {
        return res.render('register', { error: 'Username or email already in use' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert the new user into the database
    await db.query('INSERT INTO users (username, email, password) VALUES (?, ?, ?)', [username, email, hashedPassword]);

    res.redirect('/auth/login');
});

// Display Login Form
router.get('/login', (req, res) => {
    const error = req.query.error;
    res.render('login', { error });
});

// Handle Login
router.post('/login', async (req, res) => {
    const { usernameOrEmail, password } = req.body;

    // Validation
    if (!usernameOrEmail || !password) {
        return res.render('login', { error: 'Username or Email and Password are required' });
    }

    // Fetch user by username or email
    const [users] = await db.query('SELECT * FROM users WHERE username = ? OR email = ?', [usernameOrEmail, usernameOrEmail]);
    if (users.length === 0) {
        return res.render('login', { error: 'Invalid username or password' });
    }

    const user = users[0];

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.render('login', { error: 'Invalid username or password' });
    }

    // Store user in session
    req.session.user = { id: user.user_id, username: user.username, email: user.email };

    res.redirect('/dashboard');
});

// GET route for logout
router.get('/logout', (req, res) => {
    // Destroy the session to log the user out
    req.session.destroy((err) => {
        if (err) {
            console.error('Session destruction error:', err);
            return res.redirect('/dashboard'); // Redirect back to the dashboard on error
        }

        res.redirect('/auth/login'); // Redirect to the login page after successful logout
    });
});

module.exports = router;
