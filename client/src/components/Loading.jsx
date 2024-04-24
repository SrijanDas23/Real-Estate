import { Flex, Spinner, Text } from "@chakra-ui/react";
import React from "react";

const Loading = () => {
  return (
    <Flex
      mt="15rem"
      align="center"
      justify="center"
      direction="column"
      gap="15px"
      height="100%"
    >
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="blue.500"
        size="xl"
      />
      <Text color="white">The Page is Loading, Please Wait...</Text>
    </Flex>
  );
};

export default Loading;
