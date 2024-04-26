import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Box, Textarea, Button, Text, useToast } from "@chakra-ui/react";

export default function Contact({ listing }) {
  const [landlord, setLandlord] = useState(null);
  const [message, setMessage] = useState("");
  const onChange = (e) => {
    setMessage(e.target.value);
  };
  const toast = useToast();

  useEffect(() => {
    const fetchLandlord = async () => {
      try {
        const res = await fetch(
          `https://real-estate-0kkf.onrender.com/api/user/${listing.userRef}`,
          {
            method: "GET",
            credentials: "include",
          }
        );
        const data = await res.json();
        setLandlord(data);
      } catch (error) {
        toast({
          title: `${error}`,
          position: "bottom-left",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      }
    };
    fetchLandlord();
  }, [listing.userRef]);

  return (
    <>
      {landlord && (
        <Box display="flex" flexDirection="column" gap="2" mt="8">
          <Text color="white">
            Contact{" "}
            <Text as="span" fontWeight="bold">
              {landlord.username}
            </Text>{" "}
            for{" "}
            <Text as="span" fontWeight="bold">
              {listing.name}
            </Text>
          </Text>
          <Textarea
            name="message"
            id="message"
            rows="2"
            value={message}
            onChange={onChange}
            placeholder="Enter your message here..."
            color="#ffffff"
            resize="none"
            borderRadius="md"
          ></Textarea>

          {/* <Button
            as={Link}
            to={`mailto:${landlord.email}?subject=Regarding ${listing.name}&body=${message}`}
            backgroundColor="slate.700"
            color="white"
            textAlign="center"
            padding="0.75rem 1rem"
            textTransform="uppercase"
            borderRadius="md"
            _hover={{ opacity: "0.95" }}
          >
            Send Message
          </Button> */}
          <Link
            style={{ width: "100%" }}
            to={`mailto:${landlord.email}?subject=Regarding ${listing.name}&body=${message}`}
          >
            <Button
              colorScheme="green"
              bg="#808080"
              mt="2"
              rounded="lg"
              textTransform="uppercase"
              p="3"
              w="100%"
            >
              Send Message
            </Button>
          </Link>
        </Box>
      )}
    </>
  );
}
