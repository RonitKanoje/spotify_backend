# Spotify Backend

A Node.js Express backend API for a Spotify-like music streaming application with user authentication, music uploads, and album management.

## Features

- User registration & login with JWT authentication
- Role-based access control (artist/user)
- Music upload and album creation (artists only)
- Get all music and albums with artist details
- Logout functionality

## Tech Stack

- Node.js, Express.js, MongoDB
- JWT authentication with bcrypt
- Multer for file uploads

## Installation

1. Clone and install dependencies:

```bash
git clone <repository-url>
cd Spotify\ Backend
npm install
```

2. Create `.env` file:

```
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
PORT=5000
```

3. Start the server:

```bash
npm start
# or npm run dev (for development with auto-reload)
```

## Project Structure

```
src/
├── controllers/    # Business logic
├── routes/         # API routes
├── models/         # Database schemas
├── middlewares/    # Auth middleware
├── services/       # File storage
└── db/             # DB connection
```

## API Endpoints

| Method | Endpoint                 | Auth   | Description       |
| ------ | ------------------------ | ------ | ----------------- |
| POST   | `/auth/register`         | -      | Register user     |
| POST   | `/auth/login`            | -      | Login user        |
| POST   | `/auth/logout`           | Yes    | Logout user       |
| POST   | `/music/upload`          | Artist | Upload music file |
| POST   | `/music/album`           | Artist | Create album      |
| GET    | `/music/`                | User   | Get all music     |
| GET    | `/music/albums`          | User   | Get all albums    |
| GET    | `/music/albums/:albumId` | User   | Get album by ID   |

## Database Models

- **User:** username, email, password (hashed), role, timestamps
- **Music:** title, uri, artist (ref), timestamps
- **Album:** title, artist (ref), musics (array), timestamps

## License

This project is open source and available under the MIT License.
