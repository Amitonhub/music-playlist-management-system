import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from "@mui/material";
import { PlaylistDialogProps } from "../interfaces";

const PlaylistDialog: React.FC<PlaylistDialogProps> = ({
  open,
  onClose,
  onSubmit,
  name,
  setName,
  description,
  setDescription,
  editingId,
}) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle sx={{ bgcolor: "#282828", color: "#fff" }}>
        {editingId ? "Edit Playlist" : "Add Playlist"}
      </DialogTitle>
      <DialogContent sx={{ bgcolor: "#1e1e1e" }}>
        <TextField
          fullWidth
          label="Title"
          value={name}
          onChange={(e) => setName(e.target.value)}
          sx={{ my: 2 }}
          InputProps={{ sx: { color: "white" } }}
          InputLabelProps={{ style: { color: "#aaa" } }}
        />
        <TextField
          fullWidth
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          sx={{ mb: 2 }}
          InputProps={{ sx: { color: "white" } }}
          InputLabelProps={{ style: { color: "#aaa" } }}
        />
      </DialogContent>
      <DialogActions sx={{ bgcolor: "#282828" }}>
        <Button onClick={onClose} sx={{ color: "#ccc" }}>
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={onSubmit}
          sx={{
            bgcolor: "#1db954",
            color: "black",
            "&:hover": { bgcolor: "#1ed760" },
          }}
        >
          {editingId ? "Update" : "Create"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PlaylistDialog;
