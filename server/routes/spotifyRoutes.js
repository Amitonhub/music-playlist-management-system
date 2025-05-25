const express = require("express");
const { searchSongs, getRandomIndianSongs, getSpotifyTracks } = require("../controllers/spotifyController");
const router = express.Router();

// Route to search for songs
router.get("/search", searchSongs);

// Route to search for random indian songs
router.get("/random-indian-songs", getRandomIndianSongs);

// Spotify tracks by ids
router.post("/spotify-tracks", getSpotifyTracks);

module.exports = router;
