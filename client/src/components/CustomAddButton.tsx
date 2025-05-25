import React from "react";
import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { CustomButtonProps } from "../interfaces";

const CustomAddButton: React.FC<CustomButtonProps> = ({ title, onClick, sx }) => {
  return (
    <Button
      variant="contained"
      startIcon={<AddIcon />}
      onClick={onClick}
      sx={{
        bgcolor: "#1db954",
        color: "black",
        "&:hover": { bgcolor: "#1ed760" },
        fontWeight: 600,
        borderRadius: "50px",
        px: 2,
        mb: 2,
        ...sx,
      }}
    >
      {title}
    </Button>
  );
};

export default CustomAddButton;
