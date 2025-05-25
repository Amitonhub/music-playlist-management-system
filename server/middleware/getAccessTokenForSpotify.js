const axios = require("axios");

const getAccessTokenForSpotify = async () => {
    let accessToken = "";
    let tokenExpiration = 0;

    const res = await axios.post(
        "https://accounts.spotify.com/api/token",
        new URLSearchParams({ grant_type: "client_credentials" }),
        {
            headers: {
                Authorization:
                    "Basic " + Buffer.from(`${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`).toString("base64"),
                "Content-Type": "application/x-www-form-urlencoded",
            },
        }
    );

    accessToken = res.data.access_token;
    tokenExpiration = Date.now() + res.data.expires_in * 1000 - 10000;
    return accessToken;
};

module.exports = { getAccessTokenForSpotify }