import { Button } from '@chakra-ui/react';
import React from 'react'

const SeeMoreButton = ({handleSeeMore}) => {
  return (
    <Button
      onClick={handleSeeMore}
      colorScheme="blue"
      variant="outline"
      ml="auto"
      borderWidth="2px"
      transition="0.4s"
      fontFamily="'Shantell Sans', cursive"
      sx={{
        "&:hover": {
          boxShadow: "0 1em 3em -0.4em #b8b8ff", // Whitish-blue box shadow
          transform: "translateY(-0.25em)",
          textShadow: "white 0 0 1em",
        },
      }}
    >
      See More...
    </Button>
  );
}

export default SeeMoreButton
