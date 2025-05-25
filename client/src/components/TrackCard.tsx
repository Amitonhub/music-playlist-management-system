import React from "react";
import { Box, Typography, Button, Paper, Tooltip } from "@mui/material";
import CustomAddButton from "./CustomAddButton";
import { TrackCardProps } from "../interfaces";

const TrackCard: React.FC<TrackCardProps> = ({
  track,
  handleOpenAddToPlaylist,
}) => {
  return (
    <Paper
      elevation={4}
      sx={{
        bgcolor: "#1f1f1f",
        borderRadius: 4,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        height: "100%",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        "&:hover": {
          transform: "scale(1.02)",
          boxShadow: "0 8px 24px rgba(0,0,0,0.3)",
        },
      }}
    >
      <Box
        component="img"
        src={track.album.images[0]?.url}
        alt={track.name}
        sx={{
          width: "100%",
          height: 180,
          objectFit: "cover",
        }}
      />

      <Box p={2} display="flex" flexDirection="column" flexGrow={1}>
        <Typography
          variant="h6"
          color="white"
          fontWeight={600}
          gutterBottom
          noWrap
        >
          {track.name}
        </Typography>

        <Typography variant="body2" color="gray" gutterBottom noWrap>
          {track.artists.map((a) => a.name).join(", ")} &mdash;{" "}
          {track.album.name}
        </Typography>

        <Box mt="auto" display="flex" flexWrap="wrap" gap={1}>
          <Tooltip title="Add to Playlist">
            <CustomAddButton
              title="Add to Playlist"
              onClick={() => handleOpenAddToPlaylist(track)}
              sx={{
                mt: 2,
                border: "1px solid #1db954",
                "&:hover": { bgcolor: "#1ed760" },
                px: 1,
                width: "auto",
              }}
            />
          </Tooltip>
        </Box>
      </Box>
    </Paper>
  );
};

export default TrackCard;
