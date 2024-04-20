import { LinkIcon } from "@chakra-ui/icons";
import { Box, useToast } from "@chakra-ui/react";
import React, { useState } from "react"; // Import useState
const LinkCopy = () => {
  const [copied, setCopied] = useState(false); // Define copied state variable and its setter function
  const toast = useToast();
  return (
    <Box
      position="fixed"
      top="10%"
      right="2%"
      zIndex="10"
      border="1px"
      borderColor="white"
      borderRadius="full"
      width="12"
      height="12"
      display="flex"
      justifyContent="center"
      alignItems="center"
      bg="transparent"
      cursor="pointer"
      color="white"
      backdropFilter="blur(3px)"
      transition="background-color 0.5s, color 0.5s"
      _hover={{ bg: "white", color: "black" }}
    >
      <LinkIcon
        onClick={() => {
          navigator.clipboard.writeText(window.location.href);
          setCopied(true);
          toast({
            title: "Link Copied!",
            position: "bottom-left",
            status: "success",
            duration: 9000,
            isClosable: true,
          });
          setTimeout(() => {
            setCopied(false);
          }, 2000);
        }}
      />
    </Box>
  );
};

export default LinkCopy;
