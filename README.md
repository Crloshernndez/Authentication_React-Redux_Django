# Application Authentication with React, Redux and Django Rest Framework

This is a sample app that implements an authentication system using React, Redux, and the Django Rest Framework. The application uses the Djoser library to handle authentication and JWT (JSON Web Tokens) for the generation and validation of authentication tokens. The database used is PostgreSQL.

## Characteristics

The authenticator application has the following main features:

User Registration: Users can register by providing their username, email address and password. A confirmation email is sent with a URL to complete the authentication process.

Login: Registered users can login to the app by providing their email and password. A valid JWT access token is generated for authentication.

Path protection: A path protection mechanism is implemented to restrict access to certain parts of the application to authenticated users only. If an unauthenticated user tries to access a protected path, they are redirected to the login page.

Password Reset: Users have the option to reset their password in case they forget it. They can provide their email address and they will receive an email with a URL to create a new password.

## Used technology

The authenticator application is built using the following technologies:

### Frontend

React: A JavaScript library for building interactive user interfaces.
Redux: A state management library for JavaScript applications.
React Router: A library to handle navigation and routing in a React application.

### Backend

Django: A Python web framework for quickly building secure and scalable web applications.
Django Rest Framework: A library for building web APIs in Django.
Djoser: A Django library for user management, authentication, and related views.

### Database

PostgreSQL: An open source and scalable relational database management system.

## Contribución

If you want to contribute to this project, please follow the steps below:

Create a branch (git checkout -b feature/new-feature)
Make your changes and commit them (git commit -m 'Add new functionality')
Push your changes to the branch (git push origin feature/new-feature)
Open a Pull Request on GitHub
Thanks for your contribution!
