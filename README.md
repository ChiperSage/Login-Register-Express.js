## **Express Authentication App**

### **Description**

This is a simple Express.js application that provides user registration and login functionality. It uses MySQL as the database for storing user information. The application allows users to register with a username, email, and password, and subsequently log in with their email and password.

### **Modules**

- **Express**: A web framework for Node.js, used to build the server and handle routing.
- **EJS**: An embedded JavaScript templating engine, used to render HTML views.
- **MySQL**: A relational database management system, used to store and manage user data.
- **mysql2**: A MySQL client for Node.js, used to connect to and interact with the MySQL database.

### **Directory Structure**

- **`app.js`**: The main application file that sets up the Express server, middleware, and routes.
- **`config/db.js`**: The configuration file for connecting to the MySQL database. It sets up and exports the MySQL connection.
- **`routes/auth.js`**: Contains routes for user registration and login. Handles form submissions and interacts with the MySQL database to manage user data.
- **`views/`**: A directory containing EJS template files for rendering the registration and login forms.

### **Setup and Configuration**

1. **Install Dependencies**: Ensure you have Node.js and MySQL installed. Install the required npm packages by running `npm install express ejs, etc`.

- **Node.js**: Server-side JavaScript runtime
- **Express.js**: Web framework for Node.js
- **EJS**: Embedded JavaScript templating engine
- **MySQL**: Relational database
- **bcrypt**: Library for hashing passwords
- **express-session**: Middleware for managing user sessions

3. **Configure MySQL**:
   - Create a MySQL database named `express_auth`.
   - Create a `users` table with columns for `id`, `username`, `email`, and `password`.

4. **Run the Application**:
   - Start the Express server by running `npm start`.
   - Access the application at `http://localhost:3000/`.
   - Visit `http://localhost:3000/auth/register` to view the registration form.
   - Visit `http://localhost:3000/auth/login` to view the login form.
