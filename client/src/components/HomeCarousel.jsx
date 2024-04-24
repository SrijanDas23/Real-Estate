import { Box, Flex, HStack, Heading, Image, Text, VStack } from "@chakra-ui/react";
import React from "react";
import { Carousel } from "react-responsive-carousel";
import { Link } from "react-router-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const HomeCarousel = ({offerListings}) => {
  return (
    <Box mb="6">
      {offerListings.length > 0 && (
        <Carousel
          autoPlay={true}
          interval={4000}
          showStatus={false}
          infiniteLoop={true}
          showIndicators={false}
          stopOnHover={true}
          showThumbs={false}
        >
          {offerListings.map((listing) => (
            <Link key={listing._id} to={`/listing/${listing._id}`}>
              <Box key={listing._id} h={{ lg: "600px", md: "500px" }}>
                <Image
                  src={listing.imageUrls[0]}
                  m="auto"
                  display="block"
                  w="100%"
                  opacity="0.3"
                  objectFit="cover"
                  minH="500px"
                />
              </Box>
              <VStack
                p={{ lg: "4.5rem", md: "5rem", sm: "3rem", base: "2rem" }}
                sx={{
                  position: "absolute",
                  bottom: 0,
                  height: "70%",
                  justifyContent: "flex-end",
                  alignItems: "flex-start",
                  opacity: 1,
                  transition: "opacity .3s",
                }}
                _hover={{ opacity: 1 }}
              >
                <Heading
                  textAlign="left"
                  mb={{ lg: "0.5rem", md: "0.4rem", base: "0.2rem" }}
                  fontWeight="500"
                  fontSize={{
                    lg: "48px",
                    md: "34px",
                    base: "24px",
                  }}
                  color="#fff"
                  fontFamily="DM Sans"
                >
                  {listing.name}
                </Heading>
                <HStack
                  mb={{ lg: "1rem", md: "0.8rem", base: "0.6rem" }}
                  color="#fff"
                  spacing={12}
                >
                  <Text
                    fontSize={{
                      lg: "1.2rem",
                      md: "1.1rem",
                      base: "0.9rem",
                    }}
                  >
                    {listing.address}
                  </Text>
                  <HStack spacing={2} align="center">
                    <Text
                      fontSize={{
                        lg: "1.2rem",
                        md: "1.1rem",
                        base: "0.9rem",
                      }}
                    >
                      Rs.{" "}
                      <Text as="span" textDecoration="line-through" mr="2">
                        {listing.regularPrice.toLocaleString("en-IN")}
                      </Text>
                      {listing.discountPrice.toLocaleString("en-IN")}
                    </Text>
                  </HStack>
                </HStack>
                <Flex
                  textAlign="left"
                  w={{ lg: "50%", md: "70%", base: "100%" }}
                  color="white"
                  fontStyle="italic"
                  fontWeight="400"
                  display="initial"
                  fontSize={{
                    lg: "16px",
                    md: "14px",
                    base: "12px",
                  }}
                  mb={{ lg: "1rem", md: "0.8rem", base: "0.6rem" }}
                >
                  <Text noOfLines={{ base: "6", md: "8", lg: "10" }}>
                    {listing.description}
                  </Text>
                </Flex>
              </VStack>
            </Link>
          ))}
        </Carousel>
      )}
    </Box>
  );
};

export default HomeCarousel;
