# MERN Authentication and User Management Project

This project is a web application developed using the MERN stack (MongoDB, Express, React, and Node.js) that provides authentication features, protected routes, user registration, password reset via email, and uses JSON Web Tokens (JWT) for authentication.

## Project Structure

### Server

- **Components**: This section handles entities in the system, with a structure that includes Network (endpoint and response), Controller (application logic), and Store (database logic).
- **Config**: Configuration files for the server are stored in this section.
- **Middlewares**: Middleware functions are included for verifying user authentication.
- **Models**: Database models and schemas are defined using Mongoose in this section.
- **Network**: This part is responsible for managing server routes and responses.
- **Utils**: It houses useful functions, such as customizing the Error class and handling email sending.

### Client

- **App.jsx**: It configures public and private routes using React Router.
- **Components**: Application components are organized here, with global components being more generic and module-specific components categorized by section, such as Users, Authorization, and more.
- **Hooks**: Custom hooks are provided, including the use of the `utils/requests.js` function, an abstract component for making Axios requests, and custom hooks like `useAuth` that simplify and generalize requests.

## Security

The project implements robust security measures, including JWT-based authentication, middleware for private routes, user registration, and password reset via email (utilizing **[SendGrid](https://app.sendgrid.com/)** for email services).

## Environment Variables

Both the client and server utilize `.env` files to manage environment variables. This approach streamlines configuration for various environments.

### Server .env

```bash
ORIGIN=
API_VERSION=
MONGODB_URI=
PORT=
SALT_ROUNDS=
JWT_SECRET_KEY=
JWT_EXPIRE_TIME=
EMAIL_SERVICE=
EMAIL_USERNAME=
EMAIL_PASSWORD=
EMAIL_FROM=
```

### Client .env

```bash
REACT_APP_API_URL=
REACT_APP_PORT=
REACT_APP_API_VERSION=
REACT_APP_AUTH_VERSION=
```

## How to run the project

### Running the Server

From the root directory of the project, you can launch the server with the following command:

```bash
npm run start-server
```

This command takes you to the "server" directory, installs dependencies if not already done, and starts the server using "nodemon."

### Running the Client

To run the client, navigate to the project's root directory and execute the following command:

```bash
npm run start-client
```

This command installs client dependencies if not already installed and launches the React application using "react-scripts."

Ensure that both the server and client are operational to use the application effectively.

# Screen Examples

- **Login**: [Screenshot of the login form]
- **Register**: [Screenshot of the registration form]
- **Forgot Password**: [Screenshot of the form for sending forgotten password emails]
- **Reset Password**: [Screenshot of the form for changing the password]
- **Page Not Found**: [Screenshot of the notice indicating that the selected route doesn't exist]
- **Users (Authorized)**: [Screenshot of the user component when authorized]
- **Users (Unauthorized)**: [Screenshot of the user component when unauthorized]
