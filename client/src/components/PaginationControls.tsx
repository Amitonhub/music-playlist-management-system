import React from "react";
import { Box, Button, Typography } from "@mui/material";
import { PaginationControlsProps } from "../interfaces";

const PaginationControls: React.FC<PaginationControlsProps> = ({
  isSearchMode,
  currentPage,
  setPage,
  itemsPerPage,
  searchResultsLength,
  displayedTracksLength,
}) => {
  const handlePrevious = () => {
    setPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNext = () => {
    setPage((prev) => prev + 1);
  };

  const isNextDisabled = isSearchMode
    ? currentPage * itemsPerPage >= searchResultsLength
    : displayedTracksLength < 8;

  return (
    <Box mt={5} textAlign="center">
      <Button
        variant="outlined"
        onClick={handlePrevious}
        sx={{ mr: 2 }}
        disabled={currentPage === 1}
      >
        Previous
      </Button>
      <Button variant="outlined" onClick={handleNext} disabled={isNextDisabled}>
        Next
      </Button>
      <Typography mt={2}>Page: {currentPage}</Typography>
    </Box>
  );
};

export default PaginationControls;
