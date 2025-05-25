Music Playlist Management System
Overview
This project is a Music Playlist Management System that allows users to create & manage their music playlists. The application integrates with the Spotify API to fetch song details and provides an intuitive, responsive user interface.

Features
User Authentication

User registration and login

Password hashing with bcrypt

JWT-based session management to protect routes

Playlist Management

Create, read, update, and delete playlists

Add songs to playlists from Spotify search results

Spotify API Integration

Search for songs via Spotify API

Display song details including title, artist, and album

Pagination

Responsive UI

Built with React.js, TypeScript, and Material UI

Responsive design works across devices and screen sizes

Backend

Node.js with Express.js server

MongoDB for storing user, playlist, and song data

Tech Stack
Frontend: React.js, TypeScript, Material UI, HTML/CSS

Backend: Node.js, Express.js, MongoDB

Authentication: JWT, bcrypt

API: Spotify API

Setup & Installation
Clone the repository

git clone https://github.com/Amitonhub/music-playlist-management-system.git
cd music-playlist-management
Install dependencies

Frontend:

cd client
npm install
Backend:

cd ../server
npm install

Run the project

Start backend server:

npm run server
Start frontend:

cd ../client
npm start
Open in browser

Visit http://localhost:3000 to use the app.

Demo
A live demo of the project is available at:
https://your-demo-url.com

Folder Structure

/client       # React frontend
/server       # Node.js backend
Notes
Ensure MongoDB is running or accessible via connection string.

Spotify API credentials are needed to enable music search functionality.

JWT protects routes to ensure only authenticated users can manage playlists.

Author
Your Name — amitthakurat4615321@gmail.com