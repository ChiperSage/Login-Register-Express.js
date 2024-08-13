const mysql = require('mysql2');

// **New Code: Set up the MySQL connection**
const connection = mysql.createConnection({
    host: 'localhost', // Your database host
    user: 'root',      // Your database user
    password: '', // Your database password
    database: 'express_auth' // Your database name
});

// **New Code: Connect to the database**
connection.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err.stack);
        return;
    }
    console.log('Connected to MySQL as id ' + connection.threadId);
});

module.exports = connection;
