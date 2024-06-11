import React from "react";
import { Box } from "@mui/material";

const Block = ({ itemId, children }) => {
  return (
    <Box
      itemId={itemId}
      style={{
        display: "inline-block",
        whiteSpace: "normal",
        width: "400px",
        margin: "0 10px",
        verticalAlign: "top",
      }}
    >
      {children}
    </Box>
  );
};

export default Block;
