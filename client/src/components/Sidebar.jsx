import React, { useState } from "react";

import { Link } from "react-router-dom";

import { useDisclosure, Box } from "@chakra-ui/react";
import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  Button,
  Heading,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { Stack } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import SearchBar from "./SearchBar";

const Sidebar = ({ searchTerm, setSearchTerm, handleSubmit }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const firstField = React.useRef();

  const { currentUser } = useSelector((state) => state.user);

  const handleSearchSubmit = () => {
    onClose();
    handleSubmit();
  };
  return (
    <Box>
      <HamburgerIcon
        w={8}
        h={8}
        color="white"
        onClick={onOpen}
        cursor={"pointer"}
      />
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
              <CloseIcon
                color="white"
                h="4"
                w="4"
                mt="3.5"
                onClick={onClose}
                cursor={"pointer"}
              />
            </Box>
          </DrawerHeader>

          <DrawerBody py="20px">
            <Stack spacing="24px">
              <SearchBar
                width={{ base: "270px" }}
                ml="0"
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                handleSubmit={handleSearchSubmit}
              />

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
