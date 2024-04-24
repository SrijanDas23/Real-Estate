import {
  Box,
  Button,
  Flex,
  Heading,
  Text,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Carousel } from "react-responsive-carousel";
import { Link, useParams } from "react-router-dom";
import Loading from "../components/Loading";

import LinkCopy from "../components/LinkCopy";
import {
  FaBath,
  FaBed,
  FaChair,
  FaMapMarkerAlt,
  FaParking,
} from "react-icons/fa";
import Contact from "../components/Contact";

const Listing = () => {
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [contact, setContact] = useState(false);
  const params = useParams();
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchListing = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/listing/get/${params.listingId}`);
        const data = await res.json();
        console.log(data);
        if (data.success === false) {
          setError(true);
          setLoading(false);
          return;
        }
        setListing(data);
        setLoading(false);
        setError(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchListing();
  }, [params.listingId]);

  function calculateDiscount(regularPrice, discountPrice) {
    return (+regularPrice - +discountPrice).toLocaleString("en-IN");
  }

  return (
    <>
      {loading && <Loading />}
      <Box>
        {listing && !loading && !error && (
          <>
            <Carousel
              autoPlay={true}
              interval={4000}
              showStatus={false}
              infiniteLoop={true}
              showIndicators={false}
              stopOnHover={true}
              showThumbs={false}
            >
              {listing.imageUrls.map((url) => (
                <Box key={url} h={{ lg: "600px", md: "500px" }}>
                  <Box
                    h={{ lg: "600px", base: "500px" }}
                    style={{
                      background: `url(${url}) center no-repeat`,
                      backgroundSize: "cover",
                    }}
                  ></Box>
                </Box>
              ))}
            </Carousel>
            <Flex
              flexDirection="column"
              maxWidth={{ base: "95%", md: "80%", lg: "70%", xl: "60%" }}
              mx="auto"
              p="3"
              my="7"
              gap="4"
            >
              <Heading
                color="white"
                fontSize={{ base: "2xl", md: "3xl", xl: "4xl" }}
                fontWeight="semibold"
              >
                {listing.name} - Rs.{" "}
                {listing.offer ? (
                  <>
                    <Text as="span" textDecoration="line-through" mr="2">
                      {listing.regularPrice.toLocaleString("en-IN")}
                    </Text>
                    {listing.discountPrice.toLocaleString("en-IN")}
                  </>
                ) : (
                  listing.regularPrice.toLocaleString("en-IN")
                )}
                {listing.type === "rent" && " / month"}
              </Heading>
              <Text
                mt="6"
                color="white"
                fontSize="sm"
                display="flex"
                alignItems="center"
                gap="2"
              >
                <FaMapMarkerAlt />
                {listing.address}
              </Text>
              <Flex gap="4">
                <Box
                  bg="#990000"
                  maxW="200px"
                  w="100%"
                  p="1"
                  rounded="md"
                  textAlign="center"
                  color="white"
                >
                  {listing.type === "rent" ? "For Rent" : "For Sale"}
                </Box>
                {listing.offer && (
                  <Box
                    bg="green"
                    maxW="200px"
                    width="full"
                    p="1"
                    rounded="md"
                    textAlign="center"
                    color="white"
                  >
                    Rs.{" "}
                    {calculateDiscount(
                      listing.regularPrice,
                      listing.discountPrice
                    )}{" "}
                    OFF
                  </Box>
                )}
              </Flex>
              <Text color="white" mt="4" fontWeight="semibold" fontSize="md">
                {listing.description}
              </Text>
              <Flex fontWeight="semibold" fontSize="md" flexWrap="wrap" gap="4">
                <Text
                  display="flex"
                  alignItems="center"
                  gap="1"
                  whiteSpace="nowrap"
                  color="white"
                >
                  <FaBed fontSize="lg" />
                  {listing.bedrooms > 1
                    ? `${listing.bedrooms} bedrooms `
                    : `${listing.bedrooms} bedroom `}
                </Text>
                <Text
                  display="flex"
                  alignItems="center"
                  gap="1"
                  whiteSpace="nowrap"
                  color="white"
                >
                  <FaBath fontSize="lg" />
                  {listing.bathrooms > 1
                    ? `${listing.bathrooms} bathrooms `
                    : `${listing.bathrooms} bathroom `}
                </Text>
                <Text
                  display="flex"
                  alignItems="center"
                  gap="1"
                  whiteSpace="nowrap"
                  color="white"
                >
                  <FaParking fontSize="lg" />
                  {listing.parking
                    ? "Parking Spot Available"
                    : "No Parking Spot"}
                </Text>
                <Text
                  display="flex"
                  alignItems="center"
                  gap="1"
                  whiteSpace="nowrap"
                  color="white"
                >
                  <FaChair fontSize="lg" />
                  {listing.furnished ? "Furnished" : "Unfurnished"}
                </Text>
              </Flex>
              {currentUser &&
                listing.userRef !== currentUser._id &&
                !contact && (
                  <Button
                    onClick={() => setContact(true)}
                    colorScheme="green"
                    bg="#808080"
                    mt="2"
                    rounded="lg"
                    textTransform="uppercase"
                    p="3"
                  >
                    Contact landlord
                  </Button>
                )}
              {currentUser && listing.userRef === currentUser._id && (
                <Link
                  style={{ width: "100%" }}
                  to={`/edit-listing/${listing._id}`}
                >
                  <Button
                    colorScheme="blue"
                    bg="#808080"
                    mt="2"
                    rounded="lg"
                    textTransform="uppercase"
                    p="3"
                    w="100%"
                  >
                    Edit Listing
                  </Button>
                </Link>
              )}
              {/* Render Contact component when contact state is true */}
              {contact && <Contact listing={listing} />}
            </Flex>
          </>
        )}
        <LinkCopy />
      </Box>
    </>
  );
};

export default Listing;
