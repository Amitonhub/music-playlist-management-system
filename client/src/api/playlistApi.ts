import axios from "axios";

const API_BASE = `${process.env.REACT_APP_API_URL}/api`;

export const fetchPaginatedSongs = async (page = 1, token: string, itemsPerPage: number) => {
    const res = await axios.get(`${API_BASE}/spotify/random-indian-songs?page=${page}&limit=${itemsPerPage}`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
};

export const fetchPlaylists = async (token: string) => {
    const res = await axios.get(`${API_BASE}/playlists`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
};

export const savePlaylist = async (token: string, data: { name: string; description: string }, id?: string) => {
    if (id) {
        await axios.put(`${API_BASE}/playlists/${id}`, data, {
            headers: { Authorization: `Bearer ${token}` },
        });
    } else {
        await axios.post(`${API_BASE}/playlists`, data, {
            headers: { Authorization: `Bearer ${token}` },
        });
    }
};

export const deletePlaylist = async (token: string, id: string) => {
    await axios.delete(`${API_BASE}/playlists/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
    });
};

export const searchTracks = async (token: string, query: string) => {
    const res = await axios.get(`${API_BASE}/spotify/search?q=${query}`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
};

export const addSongToPlaylist = async (token: string, playlistId: string, trackId: string) => {
    await axios.post(`${API_BASE}/playlists/${playlistId}/songs`, { trackId }, {
        headers: { Authorization: `Bearer ${token}` },
    });
};

export const fetchPlaylistSongs = async (token: string, ids: string[]) => {
    const res = await axios.post(`${API_BASE}/spotify/spotify-tracks`, { ids }, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
};
