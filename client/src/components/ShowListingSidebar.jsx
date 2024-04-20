import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Text,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Stack,
  Heading,
  Image,
} from "@chakra-ui/react";
import { EditIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";
import ListingDeleteModal from "./ListingDeleteModal";

const ShowListingSidebar = ({
  handleListingDelete,
  handleShowListings,
  userListings,
  onOpen,
  onClose,
  isOpen,
  firstField,
}) => {
  const [displayedListings, setDisplayedListings] = useState(4);

  const handleSeeMore = () => {
    setDisplayedListings((prevCount) =>
      prevCount + 4 > userListings.length ? userListings.length : prevCount + 4
    );
  };
  const handleSeeLess = () => {
    setDisplayedListings(4);
  };

  useEffect(() => {
    if (!isOpen) {
      setDisplayedListings(4);
    }
  }, [isOpen]);

  //   console.log(userListings.length)
  //   console.log(displayedListings)

  return (
    <Box>
      <Button
        colorScheme="green"
        bg="#808080"
        w="100%"
        onClick={handleShowListings}
      >
        Show Listing
      </Button>

      <Drawer
        isOpen={isOpen}
        placement="right"
        initialFocusRef={firstField}
        onClose={onClose}
      >
        <DrawerOverlay />
        <DrawerContent
          bg={"transparent"}
          backdropFilter={"blur(5px)"}
          // borderLeft="1px solid #ccc"
        >
          <DrawerCloseButton w={10} h={10} color="white" />
          <DrawerHeader borderBottomWidth="2px">
            <Heading fontSize="3xl" color="white" fontFamily="DM Sans">
              Your Listings
            </Heading>
          </DrawerHeader>

          <DrawerBody py="20px">
            <Stack spacing="24px">
              {userListings && userListings.length > 0 ? (
                <Box display="flex" flexDirection="column" gap="15">
                  {userListings.slice(0, displayedListings).map((listing) => (
                    <Box
                      display="flex"
                      justifyContent="space-between"
                      alignItems="center"
                      gap="4"
                      p="3"
                      borderWidth="2px"
                      borderRadius="0.5rem"
                      key={listing._id}
                      borderColor="white"
                    >
                      <Link to={`/listing/${listing._id}`}>
                        <Image
                          src={listing.imageUrls[0]}
                          alt="listing cover"
                          w="16"
                          objectFit="contain"
                          borderRadius="0.5rem"
                          h="16"
                        />
                      </Link>
                      <Link to={`/listing/${listing._id}`}>
                        <Box width="100px">
                          <Text
                            fontFamily="sans-serif"
                            isTruncated
                            fontWeight="600"
                            color="white"
                            sx={{
                              ":hover": {
                                textDecoration: "underline",
                              },
                            }}
                          >
                            {listing.name}
                          </Text>
                        </Box>
                      </Link>

                      <Box display="flex" flexDirection="column" gap="4">
                        <ListingDeleteModal
                          handleListingDelete={handleListingDelete}
                          _id={listing._id}
                          deleteText="Listing Delete"
                        />
                        <Link to={`/edit-listing/${listing._id}`}>
                          <EditIcon color="white" cursor="pointer" />
                        </Link>
                      </Box>
                    </Box>
                  ))}
                </Box>
              ) : (
                <Text color="white" fontWeight="bold" fontSize="3xl">
                  No Listings Made...
                </Text>
              )}
            </Stack>
            <Box display="flex" justifyContent="space-between" mt={4}>
              {displayedListings > 4 && (
                <Button
                  onClick={handleSeeLess}
                  colorScheme="red"
                  variant="outline"
                >
                  See Less...
                </Button>
              )}
              {userListings.length > displayedListings && (
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
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};

export default ShowListingSidebar;
