const express = require('express');
const router = express.Router();

// **New Code: Import MySQL connection from the new location**
const db = require('../config/db');

// Display Register Form
router.get('/register', (req, res) => {
    const error = req.query.error;
    res.render('register', { error });
});

// Handle Registration Submission
router.post('/register', (req, res) => {
    const { username, email, password, confirm_password } = req.body;

    if (!username || !email || !password || !confirm_password) {
        return res.redirect('/auth/register?error=All fields are required.');
    }

    if (password !== confirm_password) {
        return res.redirect('/auth/register?error=Passwords do not match.');
    }

    // **New Code: Check if the username or email already exists**
    db.query('SELECT * FROM users WHERE username = ? OR email = ?', [username, email], (err, results) => {
        if (err) {
            console.error('Database query error:', err);
            return res.redirect('/auth/register?error=Database error.');
        }

        if (results.length > 0) {
            return res.redirect('/auth/register?error=Username or email already exists.');
        }

        // **New Code: Insert new user into the database**
        db.query('INSERT INTO users (username, email, password) VALUES (?, ?, ?)', [username, email, password], (err, results) => {
            if (err) {
                console.error('Database query error:', err);
                return res.redirect('/auth/register?error=Database error.');
            }

            res.send(`Registration successful! Welcome, ${username}.`);
        });
    });
});

// Display Login Form
router.get('/login', (req, res) => {
    const error = req.query.error;
    res.render('login', { error });
});

// Handle Login Submission
router.post('/login', (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.redirect('/auth/login?error=All fields are required.');
    }

    db.query('SELECT * FROM users WHERE email = ? AND password = ?', [email, password], (err, results) => {
        if (err) {
            console.error('Database query error:', err);
            return res.redirect('/auth/login?error=Database error.');
        }

        if (results.length === 0) {
            return res.redirect('/auth/login?error=Invalid email or password.');
        }

        res.send('Login successful!');
    });
});

module.exports = router;
