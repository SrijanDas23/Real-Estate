import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Grid,
  GridItem,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Spinner,
  Text,
  useToast,
} from "@chakra-ui/react";
import signIn1 from "../assets/signIn1.jpeg";
import signIn2 from "../assets/signIn2.jpg";
import signIn3 from "../assets/signIn3.jpg";
import signIn4 from "../assets/signIn4.jpg";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { FaGoogle } from "react-icons/fa";
import { Link } from "react-router-dom";

const SignIn = () => {
  const [show, setShow] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    e.preventDefault();
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/auth/signup", formData);
  };

  const disabled =
    formData.email === "" ||
    formData.username === "" ||
    formData.password === "";

  // console.log(formData);
  return (
    <Box
      background={`url(${signIn4})`}
      bgRepeat="no-repeat"
      bgSize="cover"
      bgPosition="center"
      w="100%"
      minH="100vh"
    >
      <Container maxW="container.sm">
        <Flex
          justify="center"
          align="center"
          direction="column"
          minH="100vh"
          gap="4"
          backdropFilter="blur(3px)"
        >
          <Heading fontFamily="DM Sans" color="#fff" mb="2">
            Login to Real<span style={{ color: "#b7b7b7" }}>Estate</span>
          </Heading>
          <Flex direction="column" gap="6" color="#fff" fontFamily="DM Sans">
            <FormControl>
              <FormLabel>Email</FormLabel>
              <Input
                autoComplete="off"
                type="email"
                id="email"
                placeholder="Enter Email"
                onChange={handleChange}
              />
            </FormControl>

            <FormControl>
              <FormLabel>Username</FormLabel>
              <Input
                autoComplete="off"
                type="text"
                id="username"
                placeholder="Enter Username"
                onChange={handleChange}
              />
            </FormControl>

            <FormControl>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input
                  type={show ? "text" : "password"}
                  placeholder="Enter Password"
                  id="password"
                  onChange={handleChange}
                />
                <InputRightElement>
                  <Box as="button" size="sm" onClick={() => setShow(!show)}>
                    {!show ? <ViewOffIcon /> : <ViewIcon />}
                  </Box>
                </InputRightElement>
              </InputGroup>
            </FormControl>

            <Button bg="#808080" type="submit" mt="2" isDisabled={disabled}>
              Login
            </Button>

            <Button
              colorScheme="red"
              bg="#808080"
              mt="2"
              leftIcon={<FaGoogle />}
            >
              Continue with Google
            </Button>
          </Flex>
          <Flex color="#fff" gap="3">
            <Text fontFamily="DM Sans">Don't have an account?</Text>
            <Link to="/sign-up">
              <Text
                fontWeight="bold"
                fontFamily="DM Sans"
                decoration="underline"
              >
                Sign Up
              </Text>
            </Link>
          </Flex>
        </Flex>
      </Container>
    </Box>
  );
};

export default SignIn;
