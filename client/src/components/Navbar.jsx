import React, { useState } from "react";
import {
  Bars3Icon,
  XMarkIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";
import useMediaQuery from "../hooks/useMediaQuery";
import {
  useDisclosure,
  Input,
  InputGroup,
  InputRightElement,
  extendTheme,
  Box,
  Flex,
  Text,
  Avatar,
} from "@chakra-ui/react";
import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  Heading,
  Image,
} from "@chakra-ui/react";
import { HamburgerIcon, SearchIcon } from "@chakra-ui/icons";
import { Stack } from "@chakra-ui/react";
import { useSelector } from "react-redux";

const Navbar = () => {
  const flexBetween = "flex items-center justify-between";
  const isAboveMediumScreens = useMediaQuery("(min-width: 1060px)");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const firstField = React.useRef();

  const { currentUser } = useSelector((state) => state.user);
  // console.log(currentUser);

  return (
    <nav>
      <Box
        py="4"
        mb="2"
        position="fixed"
        top="0"
        left="0"
        right="0"
        zIndex="999"
        bg="transparent"
      >
        <div className={`${flexBetween} mx-auto w-5/6`}>
          <div className={`flex w-full md:gap-16 xs:gap-3 smd:${flexBetween}`}>
            {/* icon*/}
            <Link to="/">
              <Box>
                <Heading
                  fontSize={{ base: "xl", md: "3xl" }}
                  style={{ color: "#ffffff" }}
                >
                  Real
                  <span style={{ color: "#808080" }}>Estate</span>
                </Heading>
              </Box>
            </Link>

            {/* left side */}

            {isAboveMediumScreens ? (
              <div className={`${flexBetween} w-full`}>
                <div className={`${flexBetween} gap-8 text-sm`}>
                  <Link to="/">
                    <Text fontSize="xl" color={"white"}>
                      Home
                    </Text>
                  </Link>
                  <Link to="/about">
                    <Text fontSize="xl" color={"white"}>
                      About
                    </Text>
                  </Link>
                </div>

                {/* search bar in the middle */}

                <InputGroup size="lg" width={{ xl: "570px", md: "400px" }}>
                  <InputRightElement pointerEvents="none">
                    <SearchIcon color="#808080" size="1.5rem" />
                  </InputRightElement>
                  <Input
                    type="text"
                    placeholder="Search for estates..."
                    borderRadius="1rem"
                    borderColor="#ffffff"
                    borderWidth="2px"
                    _placeholder={{ color: "#808080" }}
                    color="#d1d5db"
                  />
                </InputGroup>

                {/* right side */}

                {currentUser ? (
                  <Link to="/profile">
                    <Avatar
                      name={currentUser.username}
                      src={currentUser.avatar}
                      bg="black"
                      size="md"
                    />
                  </Link>
                ) : (
                  <div className={`${flexBetween} gap-8`}>
                    <Link to="/sign-in">
                      <Text fontSize="xl" color={"white"}>
                        Sign In
                      </Text>
                    </Link>
                    <Link to="/sign-up">
                      <Text fontSize="xl" color={"white"}>
                        Sign Up
                      </Text>
                    </Link>
                  </div>
                )}
              </div>
            ) : (
              <Box>
                <HamburgerIcon w={8} h={8} color="white" onClick={onOpen} />
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
                    <DrawerCloseButton w={8} h={8} color="white" />
                    <DrawerHeader borderBottomWidth="2px">
                      <Link to="/">
                        <Heading
                          fontSize={{ base: "xl", md: "3xl" }}
                          style={{ color: "#ffffff" }}
                        >
                          Real
                          <span style={{ color: "#808080" }}>Estate</span>
                        </Heading>
                      </Link>
                    </DrawerHeader>

                    <DrawerBody py="20px">
                      <Stack spacing="24px">
                        <InputGroup size="lg" width={{ base: "270px" }}>
                          <InputRightElement pointerEvents="none">
                            <SearchIcon color="#808080" size="1.5rem" />
                          </InputRightElement>
                          <Input
                            type="text"
                            placeholder="Search for estates..."
                            borderRadius="1rem"
                            borderColor="#ffffff"
                            borderWidth="2px"
                            _placeholder={{ color: "#808080" }}
                            color="#d1d5db"
                          />
                        </InputGroup>

                        <Link to="/">
                          <Button bg="#808080" w={270} onClick={onClose}>
                            Home
                          </Button>
                        </Link>

                        <Link to="/about">
                          <Button bg="#808080" w={270} onClick={onClose}>
                            About
                          </Button>
                        </Link>

                        {!currentUser ? (
                          <Link to="/sign-in">
                            <Button bg="#808080" w={270} onClick={onClose}>
                              Sign In
                            </Button>
                          </Link>
                        ) : (
                          <Link to="/profile">
                            <Button bg="#808080" w={270} onClick={onClose}>
                              Profile
                            </Button>
                          </Link>
                        )}
                      </Stack>
                    </DrawerBody>
                  </DrawerContent>
                </Drawer>
              </Box>
            )}
          </div>
        </div>
      </Box>

      {/* MOBILE MENU MODAL */}
    </nav>
  );
};

export default Navbar;
