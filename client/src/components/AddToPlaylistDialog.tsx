import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Paper,
  Button,
} from "@mui/material";
import { AddToPlaylistDialogProps } from "../interfaces";

const AddToPlaylistDialog: React.FC<AddToPlaylistDialogProps> = ({
  open,
  onClose,
  playlists,
  trackToAdd,
  onAdd,
}) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle sx={{ bgcolor: "#282828", color: "#fff" }}>
        Select Playlist to Add "{trackToAdd?.name}"
      </DialogTitle>
      <DialogContent sx={{ bgcolor: "#1e1e1e", paddingTop: "24px !important" }}>
        {playlists.length === 0 && (
          <Typography color="gray" textAlign="center" mt={2}>
            No playlists available.
          </Typography>
        )}
        {playlists.map((playlist) => (
          <Paper
            key={playlist._id}
            elevation={2}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              p: 1.5,
              mb: 1,
              bgcolor: "#282828",
              borderRadius: 2,
              cursor: "pointer",
              "&:hover": { bgcolor: "#1db954" },
            }}
            onClick={() => {
              if (trackToAdd) {
                onAdd(playlist._id, trackToAdd.id);
                onClose();
              }
            }}
          >
            <Typography variant="subtitle1" fontWeight={600} color="white">
              {playlist.name}
            </Typography>
            <Typography
              component="span"
              sx={{
                fontWeight: "bold",
                color: "white",
                fontSize: "1.5rem",
                userSelect: "none",
              }}
            >
              +
            </Typography>
          </Paper>
        ))}
      </DialogContent>
      <DialogActions sx={{ bgcolor: "#282828" }}>
        <Button onClick={onClose} sx={{ color: "#ccc" }}>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddToPlaylistDialog;
