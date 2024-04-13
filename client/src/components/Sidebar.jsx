import React, { useState } from "react";

import { Link } from "react-router-dom";

import {
  useDisclosure,
  Input,
  InputGroup,
  InputRightElement,
  Box,
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
} from "@chakra-ui/react";
import { HamburgerIcon, SearchIcon, CloseIcon } from "@chakra-ui/icons";
import { Stack } from "@chakra-ui/react";
import { useSelector } from "react-redux";

const Sidebar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const firstField = React.useRef();

  const { currentUser } = useSelector((state) => state.user);
  return (
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
          {/* <DrawerCloseButton w={10} h={10} color="white" /> */}
          <DrawerHeader borderBottomWidth="2px">
            <Box display="flex" justifyContent="space-between">
              <Heading
                fontSize={{ base: "3xl", md: "3xl" }}
                style={{ color: "#ffffff" }}
              >
                Real
                <span style={{ color: "#808080" }}>Estate</span>
              </Heading>
              <CloseIcon color="white" h="4" w="4" mt="3.5" onClick={onClose} />
            </Box>
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
  );
};

export default Sidebar;
