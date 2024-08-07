
This application is a user management system built using Express.js, Sequelize ORM, and a relational database (PostgreSQL, MySQL, or MariaDB). The application provides functionalities for user authentication and CRUD (Create, Read, Update, Delete) operations on users. It is designed to handle user roles and groups, making it suitable for applications requiring user access management and authorization.

### Key Features

1. **User Authentication**:
   - **Registration**: Users can register with a unique username and email, and their password is hashed before being stored in the database.
   - **Login**: Users can log in with their email and password, receiving a JWT token upon successful authentication.
   
2. **User Management**:
   - **Get All Users**: Retrieve a list of all registered users.
   - **Get User by ID**: Retrieve detailed information of a specific user by their ID.
   - **Update User**: Update user information such as username, email, and password.
   - **Delete User**: Remove a user from the database.

3. **Roles and Groups Management**:
   - **Roles**: Users can be assigned different roles for access control.
   - **Groups**: Users can be organized into groups with associated roles.
