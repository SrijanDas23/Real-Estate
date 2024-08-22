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
          boxShadow: "0.2rem 0.2rem 1rem #b8b8ff", // Whitish-blue box shadow
          transform: "translateY(-0.25rem)",
          textShadow: "white 0 0 1rem",
        },
      }}
    >
      See More...
    </Button>
  );
}

export default SeeMoreButton
