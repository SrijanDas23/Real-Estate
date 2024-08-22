import { Button } from "@chakra-ui/react";
import React from "react";

const SeeLessButton = ({ handleSeeLess }) => {
  return (
    <Button
      onClick={handleSeeLess}
      colorScheme="red"
      variant="outline"
      borderWidth="2px"
      transition="0.4s"
      fontFamily="'Shantell Sans', cursive"
      sx={{
        "&:hover": {
          boxShadow: "0.2rem 0.2rem 1rem #ff9f9f",
          transform: "translateY(-0.25rem)",
          textShadow: "white 0 0 1rem",
        },
      }}
    >
      See Less...
    </Button>
  );
};

export default SeeLessButton;
