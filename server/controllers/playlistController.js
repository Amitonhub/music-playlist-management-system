const Playlist = require("../models/Playlist");

const createPlaylist = async (req, res) => {
  try {
    const { name, description } = req.body;

    const newPlaylist = new Playlist({
      name,
      description,
      userId: req.userId,
      songs: [],
    });

    await newPlaylist.save();
    res.status(201).json(newPlaylist);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const getPlaylists = async (req, res) => {
  try {
    const playlists = await Playlist.find({ userId: req.userId });
    res.status(200).json(playlists);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const updatePlaylist = async (req, res) => {
  try {
    const { name, description } = req.body;
    const updated = await Playlist.findOneAndUpdate(
      { _id: req.params.id, userId: req.userId },
      { name, description },
      { new: true }
    );

    if (!updated) return res.status(404).json({ message: "Playlist not found" });

    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const deletePlaylist = async (req, res) => {
  try {
    const deleted = await Playlist.findOneAndDelete({ _id: req.params.id, userId: req.userId });
    if (!deleted) return res.status(404).json({ message: "Playlist not found" });

    res.status(200).json({ message: "Playlist deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const addSongToPlaylist = async (req, res) => {
  try {
    const { trackId } = req.body;

    if (!trackId) return res.status(400).json({ message: "Track ID is required" });

    const playlist = await Playlist.findOne({ _id: req.params.id, userId: req.userId });
    if (!playlist) return res.status(404).json({ message: "Playlist not found" });

    if (playlist.songs.includes(trackId)) {
      return res.status(409).json({ message: "Song already in playlist" });
    }

    playlist.songs.push(trackId);
    await playlist.save();

    res.status(200).json(playlist);
  } catch (error) {
    console.error("Error adding song to playlist:", error);
    res.status(500).json({ message: "Server error" });
  }
};


module.exports = {
  createPlaylist,
  getPlaylists,
  updatePlaylist,
  deletePlaylist,
  addSongToPlaylist,
};
