const axios = require("axios");
const { getAccessTokenForSpotify } = require("../middleware/getAccessTokenForSpotify");

const searchSongs = async (req, res) => {
    const query = req.query.q;
    if (!query) return res.status(400).json({ error: "Query parameter 'q' is required." });

    try {
        const token = await getAccessTokenForSpotify();
        const response = await axios.get("https://api.spotify.com/v1/search", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            params: {
                q: query,
                type: "track",
                limit: 10,
            },
        });

        res.json(response.data.tracks.items);
    } catch (err) {
        console.error("Spotify search failed:", err.message);
        res.status(500).json({ error: "Spotify search failed" });
    }
};

const getRandomIndianSongs = async (req, res) => {
    const { page = 1, limit = 6 } = req.query;
    const offset = (page - 1) * limit;

    try {
        const token = await getAccessTokenForSpotify();
        const response = await axios.get("https://api.spotify.com/v1/search", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            params: {
                q: "hindi",
                type: "track",
                market: "IN",
                limit,
                offset,
            },
        });

        const tracks = response.data.tracks.items;
        res.json(tracks);
    } catch (error) {
        console.error("Failed to fetch songs:", error.message);
        res.status(500).json({ message: "Error fetching songs" });
    }
};

const getSpotifyTracks = async (req, res) => {
    const { ids } = req.body;

    if (!ids || !Array.isArray(ids) || ids.length === 0) {
        return res.status(400).json({ message: "Invalid track IDs" });
    }

    try {
        const accessToken = await getAccessTokenForSpotify();

        const response = await axios.get("https://api.spotify.com/v1/tracks", {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
            params: {
                ids: ids.join(","),
            },
        });

        res.status(200).json(response.data.tracks);
    } catch (error) {
        console.error("Error fetching Spotify tracks:", error.response?.data || error.message);
        res.status(500).json({ message: "Failed to fetch tracks from Spotify" });
    }
};

module.exports = { searchSongs, getRandomIndianSongs, getSpotifyTracks };
