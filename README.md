# Next.js Authentication Assessment Project

This project demonstrates a secure authentication system built with Next.js and Supabase, featuring JWT-based authentication, protected routes, and user management.

## Features

### Authentication
- User registration with email and password
- User login with JWT token generation
- Secure logout functionality
- Password reset flow
- HTTP-only cookies for JWT storage
- Automatic token refresh

### Application Pages
- **Public Pages**:
  - Home page with information about the application
  - Login page
  - Registration page
  - Password reset request page
- **Protected Pages**:
  - User dashboard showing profile information
  - Settings page for updating profile and password
  - Protected API endpoint for user data

### Security Features
- Secure password hashing (handled by Supabase)
- CSRF protection
- XSS prevention
- Proper JWT handling with HTTP-only cookies
- Input validation and sanitization using Zod

## Tech Stack
- Next.js 13.5 with App Router
- TypeScript
- Supabase for authentication and database
- React Hook Form for form handling
- Zod for validation
- Tailwind CSS with shadcn/ui components

## Getting Started

### Prerequisites
- Node.js 16.8 or later
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd <repository-name>
```

2. Install dependencies
```bash
npm install
# or
yarn install
```

3. Set up environment variables
Create a `.env.local` file in the root directory with the following variables:
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. Run the development server
```bash
npm run dev
# or
yarn dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Project Structure

```
├── app/                  # Next.js App Router
│   ├── api/              # API routes
│   ├── auth/             # Auth-related pages
│   ├── dashboard/        # Protected dashboard pages
│   ├── settings/         # User settings pages
│   └── ...               # Other app routes
├── components/           # React components
│   ├── auth/             # Authentication components
│   ├── dashboard/        # Dashboard components
│   ├── settings/         # Settings components
│   └── ui/               # UI components (shadcn/ui)
├── lib/                  # Utility functions and libraries
│   └── supabase/         # Supabase client setup
├── middleware.ts         # Next.js middleware for route protection
└── ...                   # Other configuration files
```

## API Documentation

### Authentication API

Handled by Supabase Auth:

- `POST /auth/v1/signup` - Register a new user
- `POST /auth/v1/token?grant_type=password` - Login with email and password
- `POST /auth/v1/token?grant_type=refresh_token` - Refresh access token
- `POST /auth/v1/logout` - Logout user

### User API

- `GET /api/user` - Get current user data (protected)

## Security Considerations

- All authentication is handled by Supabase Auth, which implements industry best practices
- JWTs are stored in HTTP-only cookies to prevent XSS attacks
- Middleware protects routes that require authentication
- Form inputs are validated with Zod to prevent malicious inputs
- Password requirements enforce strong security (minimum 8 characters)

## Deployment

This project can be deployed to any platform that supports Next.js applications, such as Vercel, Netlify, or a custom server.

```bash
# Build for production
npm run build

# Start production server
npm start
```