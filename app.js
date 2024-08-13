const express = require('express');
const session = require('express-session');
const path = require('path');
const authRoutes = require('./routes/auth'); // Make sure this path is correct
const userRoutes = require('./routes/user');

const app = express();

// Middleware to parse form data
app.use(express.urlencoded({ extended: true }));

// New added code: Set up session middleware
app.use(session({
    secret: 's3cREtKiU1-4QqMBUwR0Xa4K5hJH2LkYpz8k8JpxOQM=', // New added code: Secret key for session
    resave: false, // New added code: Do not resave session if unmodified
    saveUninitialized: true, // New added code: Save uninitialized session
    cookie: { secure: false } // New added code: Set to true if using HTTPS
}));

// Set the view engine to EJS
app.set('view engine', 'ejs');

// Set the views directory
app.set('views', path.join(__dirname, 'views'));

// Use the auth routes
app.use('/auth', authRoutes);
app.use('/', userRoutes); // Users route without prefix

// Default route
app.get('/', (req, res) => {
    res.send('Hello World!');
});

// GET route for the dashboard (no prefix)
app.get('/dashboard', (req, res) => {
    // Check if the user is logged in by checking the session
    if (!req.session.user) {
        return res.redirect('/auth/login');
    }

    // Render the dashboard view, passing the user data to the template
    res.render('dashboard', {
        user: req.session.user
    });
});

// Start the server
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
