import { Link } from "react-router-dom";
import { MdLocationOn } from "react-icons/md";
import { Box, Image, Text, Flex } from "@chakra-ui/react";
import { motion } from "framer-motion";

export default function ListingItem({ listing }) {
  return (
    <Box bg="white" overflow="hidden" rounded="lg" w="320px">
      <Link to={`/listing/${listing._id}`}>
        <Image
          src={
            listing.imageUrls[0] ||
            "https://53.fs1.hubspotusercontent-na1.net/hub/53/hubfs/Sales_Blog/real-estate-business-compressor.jpg?width=595&height=400&name=real-estate-business-compressor.jpg"
          }
          alt="listing cover"
          h="220px"
          w="full"
          objectFit="cover"
          _hover={{ transform: "scale(1.05)" }}
          transition="transform 0.3s ease"
        />

        <Box p={3} flexDir="column" gap={2} w="full">
          <Text
            fontSize="lg"
            fontWeight="semibold"
            color="slate.700"
            isTruncated
          >
            {listing.name}
          </Text>
          <Flex alignItems="center" gap={1}>
            <MdLocationOn />
            <Text fontSize="sm" color="black" isTruncated>
              {listing.address}
            </Text>
          </Flex>
          <Text fontSize="sm" color="black" noOfLines={2}>
            {listing.description}
          </Text>
          <Text fontSize="sm" color="black" mt={2} fontWeight="semibold">
            Rs.
            {listing.offer
              ? listing.discountPrice.toLocaleString("en-IN")
              : listing.regularPrice.toLocaleString("en-IN")}
            {listing.type === "rent" && " / month"}
          </Text>
          <Flex fontSize="xs" gap={4}>
            <Text fontWeight="bold" color="black">
              {listing.bedrooms > 1
                ? `${listing.bedrooms} bedrooms `
                : `${listing.bedrooms} bedroom `}
            </Text>
            <Text fontWeight="bold" color="black">
              {listing.bathrooms > 1
                ? `${listing.bathrooms} bathrooms `
                : `${listing.bathrooms} bathroom `}
            </Text>
          </Flex>
        </Box>
      </Link>
    </Box>
  );
}
