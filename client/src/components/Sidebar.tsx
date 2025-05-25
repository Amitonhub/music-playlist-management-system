import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Avatar,
  Paper,
  IconButton,
  TextField,
  InputAdornment,
  Drawer,
  useMediaQuery,
  Tooltip,
} from "@mui/material";
import {
  Edit,
  Delete,
  Search,
  Menu as MenuIcon,
} from "@mui/icons-material";
import HeadsetIcon from "@mui/icons-material/Headset";
import { useNavigate } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import CustomAddButton from "./CustomAddButton";
import { toast } from "react-toastify";
import { SidebarProps } from "../interfaces";

const Sidebar: React.FC<SidebarProps> = ({
  playlists,
  setOpenDialog,
  setEditingId,
  setName,
  setDescription,
  handleDelete,
  searchQuery,
  setSearchQuery,
  handleSearch,
  setSelectedTracksIds,
  selectedPlaylistId,
  setSelectedPlaylistId,
  setIsSearchMode,
}) => {
  const isMobile = useMediaQuery("(max-width:767px)");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const sidebarContent = (
    <Box
      width={300}
      bgcolor="#1e1e1e"
      color="white"
      display="flex"
      flexDirection="column"
      sx={{
        height: "100%",
        overflowY: "auto",
        padding: isMobile ? "8px 20px" : 0,
      }}
    >
      <Box
        display="flex"
        alignItems="center"
        justifyContent={isMobile ? "end" : "space-evenly"}
        mb={2}
      >
        <Avatar sx={{ m: 1, bgcolor: "#1db954", color: "black" }}>
          <HeadsetIcon />
        </Avatar>
        <Typography variant="h6" fontWeight={600}>
          Manage Playlists
        </Typography>
      </Box>
      <CustomAddButton
        onClick={() => setOpenDialog(true)}
        title="Add Playlist"
      />

      {playlists.map((playlist) => {
        const isSelected = selectedPlaylistId === playlist._id;

        return (
          <Paper
            key={playlist._id}
            elevation={isSelected ? 6 : 2}
            sx={{
              p: 1.5,
              bgcolor: isSelected ? "#1db954" : "#282828",
              borderRadius: 2,
              position: "relative",
              mb: 1,
              cursor: "pointer",
            }}
            onClick={() => {
              setIsSearchMode(false);
              if (selectedPlaylistId === playlist._id) {
                setSelectedPlaylistId(null);
                setSelectedTracksIds([]);
              } else {
                if (playlist.songs.length == 0) {
                  setSelectedPlaylistId(null);
                  toast.success("No Songs available in the playlist!");
                } else {
                  setSelectedPlaylistId(playlist._id);
                  setSelectedTracksIds(playlist.songs);
                }
              }
            }}
          >
            <Typography variant="subtitle1" fontWeight={600} color="white">
              {playlist.name}
            </Typography>
            <Typography variant="caption" color="gray">
              {playlist.description}
            </Typography>

            <Box position="absolute" top={8} right={8}>
              <IconButton
                onClick={(e) => {
                  e.stopPropagation();
                  setEditingId(playlist._id);
                  setName(playlist.name);
                  setDescription(playlist.description);
                  setOpenDialog(true);
                }}
                size="small"
              >
                <Edit sx={{ color: "#121212", fontSize: 20 }} />
              </IconButton>
              <IconButton
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(playlist._id);
                  toast.success("Playlist Deleted Successfully!");
                }}
                size="small"
              >
                <Delete sx={{ color: "#e53935", fontSize: 20 }} />
              </IconButton>
            </Box>
          </Paper>
        );
      })}

      <TextField
        variant="outlined"
        placeholder="Search songs"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSearch();
            setDrawerOpen?.(false);
            toast.success("Songs fetched Successfully!");
          }

          if (searchQuery == "") {
            setIsSearchMode(false);
          }
        }}
        InputProps={{
          sx: { bgcolor: "#303030", borderRadius: 2, color: "white" },
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={() => {
                  handleSearch();
                  setDrawerOpen?.(false);
                  toast.success("Songs fetched Successfully!");

                  if (searchQuery == "") {
                    setIsSearchMode(false);
                  }
                }}
              >
                <Search sx={{ color: "#1db954" }} />
              </IconButton>
            </InputAdornment>
          ),
        }}
        InputLabelProps={{ style: { color: "#aaa" } }}
        sx={{ mt: 2 }}
      />

      <Box flexGrow={1} />

      <Tooltip title="Logout" arrow>
        <IconButton
          onClick={handleLogout}
          sx={{
            position: "absolute",
            bottom: 16,
            left: 16,
            bgcolor: "#1db954",
            color: "black",
            "&:hover": { bgcolor: "#1ed760" },
            width: 36,
            height: 36,
          }}
          size="small"
          aria-label="logout"
        >
          <LogoutIcon fontSize="small" />
        </IconButton>
      </Tooltip>
    </Box>
  );

  return (
    <>
      {isMobile ? (
        <>
          <IconButton
            onClick={() => setDrawerOpen(!drawerOpen)}
            sx={{
              position: "fixed",
              top: 16,
              left: 16,
              zIndex: 1300,
              bgcolor: "#1db954",
              color: "black",
              "&:hover": { bgcolor: "#1ed760" },
            }}
          >
            <MenuIcon />
          </IconButton>

          <Drawer
            anchor="left"
            open={drawerOpen}
            onClose={() => setDrawerOpen(false)}
          >
            {sidebarContent}
          </Drawer>
        </>
      ) : (
        <Box
          width="350px"
          bgcolor="#1e1e1e"
          color="white"
          p={3}
          display="flex"
          flexDirection="column"
          gap={3}
          sx={{
            position: "sticky",
            top: 0,
            height: "94vh",
            overflowY: "auto",
          }}
        >
          {sidebarContent}
        </Box>
      )}
    </>
  );
};

export default Sidebar;
