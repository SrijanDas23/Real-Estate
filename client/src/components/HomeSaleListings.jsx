import { Box, Button, Flex, Heading } from "@chakra-ui/react";
import { useState } from "react";
import ListingItem from "./ListingItem";

const HomeSaleListings = ({ saleListings }) => {
  const handleSeeMore = () => {
    setDisplayedListings((prevCount) =>
      prevCount + 4 > saleListings.length ? saleListings.length : prevCount + 4
    );
  };
  const handleSeeLess = () => {
    setDisplayedListings(4);
  };
  const [displayedListings, setDisplayedListings] = useState(4);
  return (
    <>
      {saleListings && saleListings.length > 0 && (
        <Box
          display="flex"
          flexDirection="column"
          width={{ base: "90%", md: "80%", lg: "90%" }}
          mx="auto"
          mt="5rem"
        >
          <Heading
            color="white"
            fontFamily="DM Sans"
            mb={{ lg: "0.5rem", md: "0.4rem", base: "0.2rem" }}
          >
            Listings For Sale:
          </Heading>
          <Flex
            flexDirection="row"
            flexWrap="wrap"
            rowGap="30px"
            justifyContent="space-evenly"
            mt="2rem"
          >
            {saleListings.slice(0, displayedListings).map((listing, index) => (
              <ListingItem key={listing._id} listing={listing} index={index} />
            ))}
          </Flex>
          <Box display="flex" justifyContent="space-between" my={4}>
            {displayedListings > 4 && (
              <Button
                onClick={handleSeeLess}
                colorScheme="red"
                variant="outline"
              >
                See Less...
              </Button>
            )}
            {saleListings.length > displayedListings && (
              <Button
                onClick={handleSeeMore}
                colorScheme="blue"
                variant="outline"
                ml="auto"
              >
                See More...
              </Button>
            )}
          </Box>
        </Box>
      )}
    </>
  );
};

export default HomeSaleListings;
