import {
  Avatar,
  Box,
  Button,
  Container,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  Spacer,
} from "@chakra-ui/react";
import React from "react";
import { useSelector } from "react-redux";

const Profile = () => {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <Box
      // background={`url(${signIn4})`}
      bgRepeat="no-repeat"
      bgSize="cover"
      bgPosition="center"
      w="100%"
      minH="100vh"
    >
      <Container>
        <Flex
          justify="center"
          align="center"
          direction="column"
          minH="100vh"
          gap="4"
        >
          <Avatar
            name={currentUser.username}
            src={currentUser.avatar}
            bg="black"
            size="xl"
            mb="10"
          />

          <Flex
            direction="column"
            gap="6"
            color="#fff"
            fontFamily="DM Sans"
            width={{ xl: "570px", md: "400px", base: "300px" }}
          >
            <FormControl>
              <FormLabel>Email</FormLabel>
              <Input
                autoComplete="off"
                type="email"
                id="email"
                variant="flushed"
                value={currentUser.email}
              />
            </FormControl>

            <FormControl>
              <FormLabel>Username</FormLabel>
              <InputGroup>
                <Input
                  value={currentUser.username}
                  id="username"
                  variant="flushed"
                />
              </InputGroup>
            </FormControl>

            <FormControl>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input
                  placeholder="Enter Password"
                  id="password"
                  variant="flushed"
                />
              </InputGroup>
            </FormControl>

            <Button bg="#808080" type="submit" mt="2">
              Change Credentials
            </Button>

            <Button colorScheme="blue" bg="#808080" mt="2">
              Create Listing
            </Button>
          </Flex>
          <Flex
            direction="row"
            width={{ xl: "570px", md: "400px", base: "300px" }}
          >
            <Button colorScheme="red" mt="2">
              Delete Account
            </Button>
            <Spacer />
            <Button colorScheme="blue" bg="#808080" mt="2">
              Create Listing
            </Button>
          </Flex>
        </Flex>
      </Container>
    </Box>
  );
};

export default Profile;
