import { SxProps } from "@mui/material";
import { Theme } from "@mui/system";

export interface Track {
    id: string;
    name: string;
    artists: { name: string }[];
    album: {
        name: string;
        images: { url: string }[];
    };
}

export interface Playlist {
    _id: string;
    name: string;
    description: string;
    songs: string[];
}

export interface SidebarProps {
    playlists: Playlist[];
    setOpenDialog: (open: boolean) => void;
    setEditingId: (id: string | null) => void;
    setName: (name: string) => void;
    setDescription: (desc: string) => void;
    handleDelete: (id: string) => void;
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    handleSearch: () => void;
    setSelectedTracksIds: React.Dispatch<React.SetStateAction<string[]>>;
    selectedPlaylistId: string | null;
    setSelectedPlaylistId: React.Dispatch<React.SetStateAction<string | null>>;
    setIsSearchMode: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface AddToPlaylistDialogProps {
    open: boolean;
    onClose: () => void;
    playlists: Playlist[];
    trackToAdd: Track | null;
    onAdd: (playlistId: string, trackId: string) => Promise<void>;
}

export interface CustomButtonProps {
    title: String;
    onClick: () => void;
    sx?: SxProps<Theme>;
}

export interface PaginationControlsProps {
  isSearchMode: boolean;
  currentPage: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  itemsPerPage: number;
  searchResultsLength: number;
  displayedTracksLength: number;
}

export interface PlaylistDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: () => void;
  name: string;
  setName: (value: string) => void;
  description: string;
  setDescription: (value: string) => void;
  editingId: string | null;
}

export interface TrackCardProps {
  track: Track;
  handleOpenAddToPlaylist: (track: Track) => void;
}

export interface TracksDisplayProps {
  displayedTracks: Track[];
  isSearchMode: boolean;
  searchQuery: string;
  selectedPlaylistId: string | null;
  clearSearch: () => void;
  handleOpenAddToPlaylist: (track: Track) => void;
  searchPage: number;
  setSearchPage: React.Dispatch<React.SetStateAction<number>>;
  indianPage: number;
  setIndianPage: React.Dispatch<React.SetStateAction<number>>;
  itemsPerPage: number;
  searchResultsLength: number;
  isMobile: boolean;
  searchResults: Track[];
}