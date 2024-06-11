import React, { useContext } from "react";
import { Box } from "@mui/material";
import { VisibilityContext } from "react-horizontal-scrolling-menu";

const Arrow = ({ direction }) => {
  const { scrollPrev, scrollNext } = useContext(VisibilityContext);

  const handleClick = () => {
    if (direction === "left") {
      scrollPrev();
    } else {
      scrollNext();
    }
  };

  return (
    <Box
      onClick={handleClick}
      sx={{
        cursor: "pointer",
        userSelect: "none",
        padding: "0 20px",
        display: "flex",
        alignItems: "center",
        zIndex: 1
      }}
    >
      {direction === "left" ? "<" : ">"}
    </Box>
  );
};

export default Arrow;
