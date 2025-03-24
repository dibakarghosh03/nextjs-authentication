# Custom Authentication in Next.js

This project implements a custom authentication system in Next.js, supporting both email/password-based login and OAuth authentication with GitHub and Discord. No third-party authentication libraries are used, providing complete control over the authentication flow.

## Features
- **Email/Password Authentication**: Register, login, and manage user accounts securely.
- **OAuth Authentication**: Login with GitHub and Discord.
- **Secure Token Management**: Protect user sessions with secure token handling.
- **Scalable Architecture**: Built with scalability and extensibility in mind.

## Tech Stack
- **Next.js**: Framework for building the application.
- **Database**: PostgreSQL for storing user credentials and session data.
- **ORM**: Drizzle ORM
- **OAuth Providers**: GitHub, Discord.
- **Encryption**: Passwords and sensitive data are encrypted using crypto.
