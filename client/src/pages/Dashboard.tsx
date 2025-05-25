import { useEffect, useState } from "react";
import { Box, useMediaQuery } from "@mui/material";
import AddToPlaylistDialog from "../components/AddToPlaylistDialog";
import Sidebar from "../components/Sidebar";
import { toast } from "react-toastify";
import PlaylistDialog from "../components/PlaylistDialog";
import {
  fetchPaginatedSongs as apiFetchPaginatedSongs,
  fetchPlaylists as apiFetchPlaylists,
  savePlaylist as apiSavePlaylist,
  deletePlaylist as apiDeletePlaylist,
  searchTracks as apiSearchTracks,
  addSongToPlaylist as apiAddSongToPlaylist,
  fetchPlaylistSongs as apiFetchPlaylistSongs,
} from "../api/playlistApi";
import TracksDisplay from "../components/TrackDisplay";
import { Playlist, Track } from "../interfaces";

export default function Dashboard() {
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchResults, setSearchResults] = useState<Track[]>([]);
  const [isSearchMode, setIsSearchMode] = useState<boolean>(false);
  const [paginatedSongs, setPaginatedSongs] = useState<Track[]>([]);
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [openAddToPlaylistDialog, setOpenAddToPlaylistDialog] = useState(false);
  const [trackToAdd, setTrackToAdd] = useState<Track | null>(null);
  const [selectedTracksIds, setSelectedTracksIds] = useState<string[]>([]);
  const [playlistSongsMap, setPlaylistSongsMap] = useState<Track[]>([]);
  const [selectedPlaylistId, setSelectedPlaylistId] = useState<string | null>(
    null
  );

  const [indianPage, setIndianPage] = useState<number>(1);
  const [searchPage, setSearchPage] = useState<number>(1);
  const itemsPerPage = 9;
  const isMobile = useMediaQuery("(max-width:767px)");
  const token = localStorage.getItem("token") || "";

  const fetchPaginatedSongs = async (page: number = 1) => {
    try {
      const songs = await apiFetchPaginatedSongs(page, token, itemsPerPage);
      setPaginatedSongs(songs);
    } catch (err) {
      console.error("Failed to load random Indian songs:", err);
    }
  };

  const fetchPlaylists = async () => {
    try {
      const data = await apiFetchPlaylists(token);
      setPlaylists(data);
    } catch (err) {
      console.error("Failed to fetch playlists:", err);
    }
  };

  const handleAddOrUpdate = async () => {
    try {
      await apiSavePlaylist(
        token,
        { name, description },
        editingId || undefined
      );
      toast.success(
        editingId
          ? "Playlist Updated Successfully!"
          : "Playlist Added Successfully!"
      );
      setName("");
      setDescription("");
      setEditingId(null);
      setOpenDialog(false);
      fetchPlaylists();
    } catch (err) {
      console.error("Failed to save playlist:", err);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await apiDeletePlaylist(token, id);
      fetchPlaylists();
    } catch (err) {
      console.error("Failed to delete playlist:", err);
    }
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    try {
      const results = await apiSearchTracks(token, searchQuery);
      setSearchResults(results);
      setIsSearchMode(true);
      setSearchPage(1);
    } catch (err) {
      console.error("Search failed:", err);
    }
  };

  const handleAddSongToPlaylist = async (
    playlistId: string,
    trackId: string
  ) => {
    try {
      await apiAddSongToPlaylist(token, playlistId, trackId);
      toast.success("Song added to playlist!");
      fetchPlaylists();
    } catch (err) {
      console.error("Failed to add song:", err);
      toast.error("Failed to add song to playlist.");
    }
  };

  const clearSearch = () => {
    setSearchQuery("");
    setSearchResults([]);
    setIsSearchMode(false);
    setSearchPage(1);
  };

  const handleOpenAddToPlaylist = (track: Track) => {
    setTrackToAdd(track);
    setOpenAddToPlaylistDialog(true);
  };

  const fetchSongsOfPlaylists = async (ids: string[]) => {
    try {
      const songs = await apiFetchPlaylistSongs(token, ids);
      setPlaylistSongsMap(songs);
    } catch (err) {
      console.error("Failed to fetch playlist songs:", err);
    }
  };

  useEffect(() => {
    fetchSongsOfPlaylists(selectedTracksIds);
  }, [selectedTracksIds]);

  useEffect(() => {
    fetchPlaylists();
    fetchPaginatedSongs(indianPage);
  }, []);

  useEffect(() => {
    fetchPaginatedSongs(indianPage);
  }, [indianPage]);

  const paginatedSearchResults = searchResults.slice(
    (searchPage - 1) * itemsPerPage,
    searchPage * itemsPerPage
  );

  const displayedTracks = isSearchMode
    ? paginatedSearchResults
    : selectedPlaylistId
    ? playlistSongsMap
    : paginatedSongs;

  return (
    <Box display="flex" minHeight="100vh">
      <Sidebar
        playlists={playlists}
        setOpenDialog={setOpenDialog}
        setEditingId={setEditingId}
        setName={setName}
        setDescription={setDescription}
        handleDelete={handleDelete}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        handleSearch={handleSearch}
        setSelectedTracksIds={setSelectedTracksIds}
        selectedPlaylistId={selectedPlaylistId}
        setSelectedPlaylistId={setSelectedPlaylistId}
        setIsSearchMode={setIsSearchMode}
      />

      <TracksDisplay
        displayedTracks={displayedTracks}
        isSearchMode={isSearchMode}
        searchQuery={searchQuery}
        selectedPlaylistId={selectedPlaylistId}
        clearSearch={clearSearch}
        handleOpenAddToPlaylist={handleOpenAddToPlaylist}
        searchPage={searchPage}
        setSearchPage={setSearchPage}
        indianPage={indianPage}
        setIndianPage={setIndianPage}
        itemsPerPage={itemsPerPage}
        searchResultsLength={searchResults.length}
        isMobile={isMobile}
        searchResults={searchResults}
      />

      <PlaylistDialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        onSubmit={handleAddOrUpdate}
        name={name}
        setName={setName}
        description={description}
        setDescription={setDescription}
        editingId={editingId}
      />

      <AddToPlaylistDialog
        open={openAddToPlaylistDialog}
        onClose={() => setOpenAddToPlaylistDialog(false)}
        playlists={playlists}
        trackToAdd={trackToAdd}
        onAdd={handleAddSongToPlaylist}
      />
    </Box>
  );
}
