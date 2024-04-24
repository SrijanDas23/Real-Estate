import {
  Badge,
  Box,
  Button,
  Flex,
  List,
  ListItem,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  Tooltip,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import { aboutData } from "../utils/aboutData";
import { Link } from "react-router-dom";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import { FaFacebook, FaGithub, FaInstagram } from "react-icons/fa";

const AboutModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button onClick={onOpen} variant="Link" color="white" fontSize="xl">
        About
      </Button>

      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay
          backdropFilter="blur(10px) hue-rotate(90deg)"
          bg="blackAlpha.300"
        />
        <ModalContent
          bg="black"
          width={{ xl: "570px", md: "400px", base: "300px" }}
        >
          <ModalHeader color="white">About</ModalHeader>
          <ModalCloseButton color="white" />
          <ModalBody>
            <Text color="white">
              Hello my name is Srijan, I am an engineering student in NSEC. This
              website has been made using MERN stack. The UI is made through
              Chakra UI and firebase has been used for google authentication.
            </Text>
            <Text color="white" fontSize="xl" mt="10">
              Used:
            </Text>
            <List spacing={3} mt="4" mb="10">
              {aboutData?.map((item, id) => (
                <ListItem spacing={3} key={item?.id}>
                  <Link to={`${item?.link}`}>
                    <Box display="flex" flexDirection="row" gap="2">
                      <ExternalLinkIcon color="white" />
                      <Text color="#fff">{item?.name}</Text>
                    </Box>
                  </Link>
                </ListItem>
              ))}
            </List>
            <Text color="white" fontSize="xl" mt="10">
              Links:
            </Text>
            <Flex align="center" gap="8" mt="4">
              <Tooltip label="Instagram" placement="top" hasArrow>
                <Link
                  to="https://www.instagram.com/_.drystan._/"
                  target="_blank"
                >
                  <FaInstagram
                    style={{
                      fontSize: "28px",
                      color: "#fff",
                    }}
                  />
                </Link>
              </Tooltip>
              <Tooltip label="Github" placement="top" hasArrow>
                <Link to="https://github.com/SrijanDas23" target="_blank">
                  <FaGithub style={{ fontSize: "28px", color: "#fff" }} />
                </Link>
              </Tooltip>
              <Tooltip label="FaceBook" placement="top" hasArrow>
                <Link
                  to="https://www.facebook.com/profile.php?id=100079036040325"
                  target="_blank"
                >
                  <FaFacebook style={{ fontSize: "28px", color: "#fff" }} />
                </Link>
              </Tooltip>
            </Flex>
          </ModalBody>
          <ModalFooter>
            <Button autoFocus={false} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AboutModal;
