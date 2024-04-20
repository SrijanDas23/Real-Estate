import React, { useEffect, useState } from "react";

import { Link, useLocation } from "react-router-dom";
import useMediaQuery from "../hooks/useMediaQuery";
import {
  Input,
  InputGroup,
  InputRightElement,
  Box,
  Text,
  Avatar,
} from "@chakra-ui/react";
import { Heading } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";

import { useSelector } from "react-redux";
import Sidebar from "./Sidebar";

const Navbar = () => {
  const flexBetween = "flex items-center justify-between";
  const isAboveMediumScreens = useMediaQuery("(min-width: 1060px)");
  const [isBlurred, setisBlurred] = useState(true);

  const { currentUser } = useSelector((state) => state.user);
  // console.log(currentUser);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 150) {
        setisBlurred(false);
      } else {
        setisBlurred(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const location = useLocation();
  const hideNavbar =
    location.pathname.includes("/create-listing") ||
    location.pathname.includes("/edit-listing");

  if (hideNavbar) {
    return null;
  }

  return (
    <Box
      py="4"
      mb="2"
      position="fixed"
      top="0"
      left="0"
      right="0"
      zIndex="999"
      bg={
        isBlurred
          ? "transparent"
          : "linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0))"
      }
      backdropFilter={isBlurred ? "" : "blur(3px)"}
      as="nav"
    >
      <div className={`${flexBetween} mx-auto w-5/6`}>
        <div className={`flex w-full md:gap-6 lg:gap-14 smd:${flexBetween}`}>
          {/* icon*/}
          <Link to="/">
            <Box>
              <Heading
                fontSize={{ base: "3xl", md: "3xl" }}
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
                <Link to="/about">
                  <Text fontSize="xl" color={"white"}>
                    About
                  </Text>
                </Link>
              </div>

              {/* search bar in the middle */}

              <InputGroup
                size="lg"
                width={{ xl: "570px", md: "370px" }}
                ml="-12rem"
              >
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
                    // bg="black"
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
            <Sidebar />
          )}
        </div>
      </div>
    </Box>
  );
};

export default Navbar;
