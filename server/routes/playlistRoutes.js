const express = require("express");
const router = express.Router();
const {
  createPlaylist,
  getPlaylists,
  updatePlaylist,
  deletePlaylist,
  addSongToPlaylist,
} = require("../controllers/playlistController");

// Create a new playlist
router.post("/", createPlaylist);

// Get all playlists for a user
router.get("/", getPlaylists);

// Update playlist (name, description)
router.put("/:id", updatePlaylist);

// Delete a playlist
router.delete("/:id", deletePlaylist);

// Add song to playlist
router.post("/:id/songs", addSongToPlaylist);

module.exports = router;
