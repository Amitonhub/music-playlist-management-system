import React from "react";
import { Box, Typography, Button } from "@mui/material";
import TrackCard from "./TrackCard";
import PaginationControls from "./PaginationControls";
import { TracksDisplayProps } from "../interfaces";

const TracksDisplay: React.FC<TracksDisplayProps> = ({
  displayedTracks,
  isSearchMode,
  searchQuery,
  selectedPlaylistId,
  clearSearch,
  handleOpenAddToPlaylist,
  searchPage,
  setSearchPage,
  indianPage,
  setIndianPage,
  itemsPerPage,
  searchResultsLength,
  isMobile,
  searchResults,
}) => {
  return (
    <Box
      flex={1}
      p={4}
      bgcolor="#121212"
      color="white"
      sx={{
        paddingTop: isMobile ? "20%" : undefined,
      }}
    >
      <Typography variant="h4" fontWeight={600} mb={3}>
        {displayedTracks.length > 0 && isSearchMode
          ? `Search Results for "${searchQuery}"`
          : selectedPlaylistId
          ? "Results"
          : "Discover Bollywood Songs 🎧"}
      </Typography>

      {isSearchMode && (
        <Button
          onClick={clearSearch}
          sx={{ color: "#1db954", textTransform: "none", mb: 2 }}
        >
          Clear Search
        </Button>
      )}

      <Box
        display="grid"
        gridTemplateColumns="repeat(auto-fill, minmax(300px, 1fr))"
        gap={3}
      >
        {displayedTracks.length > 0 ? (
          displayedTracks.map((track) => (
            <TrackCard
              key={track.id}
              track={track}
              handleOpenAddToPlaylist={handleOpenAddToPlaylist}
            />
          ))
        ) : (
          <Typography
            variant="subtitle1"
            color="textSecondary"
            align="center"
            sx={{
              mt: 3,
              color: "#fff",
              textAlign: "justify",
              fontSize: "24px",
            }}
          >
            No Songs Found!
          </Typography>
        )}
      </Box>

      {(isSearchMode || !selectedPlaylistId) && (
        <PaginationControls
          isSearchMode={isSearchMode}
          currentPage={isSearchMode ? searchPage : indianPage}
          setPage={isSearchMode ? setSearchPage : setIndianPage}
          itemsPerPage={itemsPerPage}
          searchResultsLength={searchResultsLength}
          displayedTracksLength={displayedTracks.length}
        />
      )}
    </Box>
  );
};

export default TracksDisplay;
