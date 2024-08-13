const bcrypt = require('bcrypt');
const express = require('express');
const router = express.Router();
const db = require('../config/db');

// List Users Route
router.get('/users', async (req, res) => {
    const [users] = await db.query('SELECT * FROM users');
    res.render('list_user', { users });
});

router.get('/user/edit/:id', async (req, res) => {
    const [user] = await db.query('SELECT * FROM users WHERE user_id = ?', [req.params.id]);
    if (user.length === 0) {
        return res.redirect('/users');
    }
    res.render('edit_user', { user: user[0], error: null }); // Pass null for error initially
});

router.post('/user/edit/:id', async (req, res) => {
    const { username, email, password, confirm_password } = req.body;

    // Check if the username or email already exists for another user
    const [existingUser] = await db.query('SELECT * FROM users WHERE (username = ? OR email = ?) AND user_id != ?', [username, email, req.params.id]);
    
    if (existingUser.length > 0) {
        const [user] = await db.query('SELECT * FROM users WHERE user_id = ?', [req.params.id]);
        return res.render('edit_user', { 
            user: user[0],
            error: 'Username or email is already in use by another account'
        });
    }

    // Update user details
    const updateQuery = 'UPDATE users SET username = ?, email = ? WHERE user_id = ?';
    await db.query(updateQuery, [username, email, req.params.id]);

    // If password fields are filled and match, update the password
    if (password && confirm_password) {
        if (password === confirm_password) {
            const hashedPassword = await bcrypt.hash(password, 10);
            const updatePasswordQuery = 'UPDATE users SET password = ? WHERE user_id = ?';
            await db.query(updatePasswordQuery, [hashedPassword, req.params.id]);
        } else {
            const [user] = await db.query('SELECT * FROM users WHERE user_id = ?', [req.params.id]);
            return res.render('edit_user', { 
                user: user[0],
                error: 'Passwords do not match'
            });
        }
    }

    res.redirect('/users');
});


// Delete User Route
router.get('/user/delete/:id', async (req, res) => {
    await db.query('DELETE FROM users WHERE user_id = ?', [req.params.id]);
    res.redirect('/users');
});

module.exports = router;
