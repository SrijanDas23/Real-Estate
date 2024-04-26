import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  Alert,
  AlertIcon,
  AlertTitle,
  useToast,
} from "@chakra-ui/react";
import signIn1 from "../assets/signIn1.jpeg";
import signIn2 from "../assets/signIn2.jpg";
import signIn3 from "../assets/signIn3.jpg";
import signIn4 from "../assets/signIn4.jpg";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { FaGoogle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../firebase";
import { useDispatch } from "react-redux";
import { signInSuccess } from "../redux/user/userSlice";

const SignUp = () => {
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const toast = useToast();

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
    try {
      setLoading(true);
      e.preventDefault();
      const res = await fetch(
        "https://real-estate-0kkf.onrender.com/api/auth/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: 'include',
          body: JSON.stringify(formData),
        }
      );
      const data = await res.json();
      if (data.success === false) {
        setError(data.message);
        setLoading(false);
        toast({
          title: `${data.message}`,
          position: "bottom-left",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
        return;
      }
      setLoading(false);
      setError(null);
      toast({
        title: "User Created Successfully!",
        position: "bottom-left",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
      navigate("/sign-in");
      // console.log(data);
    } catch (error) {
      setLoading(false);
      setError(error.message);
      toast({
        title: `${data.message}`,
        position: "bottom-left",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      const result = await signInWithPopup(auth, provider);
      const res = await fetch(
        "https://real-estate-0kkf.onrender.com/api/auth/google",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: 'include',
          body: JSON.stringify({
            name: result.user.displayName,
            email: result.user.email,
            photo: result.user.photoURL,
          }),
        }
      );
      const data = await res.json();
      dispatch(signInSuccess(data));
      toast({
        title: "User Logged In Successfully!",
        position: "bottom-left",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
      navigate("/");
    } catch (error) {
      console.log("couldnt fetch google details", error);
      toast({
        title: `${data.message}`,
        position: "bottom-left",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  const disabled =
    formData.email === "" ||
    formData.username === "" ||
    formData.password === "";

  // console.log(formData);
  return (
    <Box
      background={`linear-gradient(rgba(1,1,1,1), rgba(0,0,0,0)), url(${signIn4})`}
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
            Welcome to Real<span style={{ color: "#b7b7b7" }}>Estate</span>
          </Heading>
          <Flex direction="column" gap="6" color="#fff" fontFamily="DM Sans">
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

            <Button
              bg="#808080"
              type="submit"
              mt="2"
              isDisabled={disabled}
              onClick={handleSubmit}
              isLoading={loading}
            >
              Sign Up
            </Button>

            <Button
              colorScheme="red"
              bg="#808080"
              mt="2"
              leftIcon={<FaGoogle />}
              onClick={handleGoogleClick}
            >
              Continue with Google
            </Button>
          </Flex>
          <Flex color="#fff" gap="3">
            <Text fontFamily="DM Sans">Already have an account?</Text>
            <Link to="/sign-in">
              <Text
                fontWeight="bold"
                fontFamily="DM Sans"
                decoration="underline"
              >
                Sign In
              </Text>
            </Link>
          </Flex>
        </Flex>
      </Container>
    </Box>
  );
};

export default SignUp;
