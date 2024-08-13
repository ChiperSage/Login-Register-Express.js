const express = require('express');
const session = require('express-session');
const path = require('path');
const authRoutes = require('./routes/auth'); // Make sure this path is correct
const userRoutes = require('./routes/user');

const app = express();

app.use(express.urlencoded({ extended: true }));

app.use(session({
    secret: 's3cREtKiU1-4QqMBUwR0Xa4K5hJH2LkYpz8k8JpxOQM=',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

app.set('view engine', 'ejs');

app.set('views', path.join(__dirname, 'views'));

app.use('/auth', authRoutes);
app.use('/', userRoutes); // Users route without prefix

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/dashboard', (req, res) => {
    if (!req.session.user) {
        return res.redirect('/auth/login');
    }

    res.render('dashboard', {
        user: req.session.user
    });
});

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
