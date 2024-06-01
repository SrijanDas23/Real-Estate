import { Flex, Text } from "@chakra-ui/react";
import React from "react";
import defaultLoader from "../assets/LoadingScreenGif.gif";

const Loading = ({ loader,mt }) => {
  return (
    <Flex
      align="center"
      justify="center"
      direction="column"
      gap="15px"
      height="100vh"
      mt={mt}
    >
      <img src={loader} />
      <Text color="white">The Page is Loading, Please Wait...</Text>
    </Flex>
  );
};

// Set the default prop value for 'loader'
Loading.defaultProps = {
  loader: defaultLoader,
  mt: "0"
};

export default Loading;
