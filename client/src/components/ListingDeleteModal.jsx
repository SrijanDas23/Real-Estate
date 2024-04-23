import {
  Button,
  Flex,
  Spacer,
  Text,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Tooltip,
} from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";

const ListingDeleteModal = ({ handleListingDelete, deleteText, _id }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      {/* <Button colorScheme="red" mt="2" onClick={onOpen}>
        {deleteText}
      </Button> */}
      <Tooltip label="Delete Listing" placement="top" hasArrow>
        <DeleteIcon color="red" cursor="pointer" onClick={onOpen} />
      </Tooltip>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay
          backdropFilter="blur(10px) hue-rotate(90deg)"
          bg="blackAlpha.300"
        />
        <ModalContent
          bg="black"
          width={{ xl: "570px", md: "400px", base: "300px" }}
        >
          <ModalHeader color="white">{deleteText}</ModalHeader>
          <ModalCloseButton color="white" />
          <ModalBody>
            <Text color="white">Are you sure that you want to delete?</Text>
          </ModalBody>

          <ModalFooter>
            <Flex direction="row" w="100%">
              <Button colorScheme="green" mr={3} onClick={onClose}>
                No
              </Button>
              <Spacer />
              <Button
                leftIcon={<DeleteIcon />}
                colorScheme="red"
                onClick={() => handleListingDelete(_id)}
              >
                Yes
              </Button>
            </Flex>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ListingDeleteModal;
