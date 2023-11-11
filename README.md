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
NODE_ENV=
ORIGIN=
PRODUCTION_ORIGIN=
URL_PRODUCTION=
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
REACT_APP_NODE_ENV=
REACT_APP_API_URL_PRODUCTION=
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

## Swagger Documentation

The project includes Swagger documentation for API endpoints. You can access the graphical documentation interface locally during development at [http://localhost:5000/api/v1/doc](http://localhost:5000/api/v1/doc). For the production environment, the Swagger documentation is available at [https://mern-auth-api-oaiy.onrender.com/api/v1/doc](https://mern-auth-api-oaiy.onrender.com/api/v1/doc). Additionally, the JSON format of the documentation is accessible both locally and in production at [http://localhost:5000/api/v1/doc.json](http://localhost:5000/api/v1/doc.json) and [https://mern-auth-api-oaiy.onrender.com/api/v1/doc.json](https://mern-auth-api-oaiy.onrender.com/api/v1/doc.json), respectively. This documentation provides comprehensive insights into the available API endpoints and their functionalities.

## Production Deployment

The project is currently deployed on [Render.com](https://dashboard.render.com/) for both the front end (client) and back end (server).

### Front End (Client)

The deployed front end is accessible at: [https://mern-auth-itlf.onrender.com](https://mern-auth-itlf.onrender.com)

### Back End (Server)

The deployed back end is accessible at: [https://mern-auth-api-oaiy.onrender.com](https://mern-auth-api-oaiy.onrender.com)

## Screen Examples

- **Login**: [Screenshot of the login form].  
  ![Login](https://github.com/OwenLobato/mern_auth/assets/74989360/e6c2adaf-487e-40d8-9a30-a2c3d124051c)

- **Register**: [Screenshot of the registration form].  
  ![Register](https://github.com/OwenLobato/mern_auth/assets/74989360/f875f0bc-6f7a-4b29-837e-be701f7bb69b)

- **Forgot Password**: [Screenshot of the form for sending forgotten password emails].  
  ![PasswordForgot](https://github.com/OwenLobato/mern_auth/assets/74989360/b2b7ac24-bc1c-435a-a60b-88cea99f2814)

- **Reset Password**: [Screenshot of the form for changing the password].  
  ![PasswordReset](https://github.com/OwenLobato/mern_auth/assets/74989360/a44015d5-6ddd-4b95-8efe-1f2ba71c14a1)

- **Page Not Found**: [Screenshot of the notice indicating that the selected route doesn't exist].  
  ![PageNotFound](https://github.com/OwenLobato/mern_auth/assets/74989360/f7ba513b-39ba-4a93-8661-e1328c84bcfc)

- **Users (Authorized)**: [Screenshot of the user component when authorized].  
  ![PrivateSuccess](https://github.com/OwenLobato/mern_auth/assets/74989360/3706e0d3-fb0d-4b1c-b3c3-74162b13a4fe)

- **Users (Unauthorized)**: [Screenshot of the user component when unauthorized].  
  ![PrivateError](https://github.com/OwenLobato/mern_auth/assets/74989360/e63991c4-4c5a-4eef-b090-254a1f63f78a)
