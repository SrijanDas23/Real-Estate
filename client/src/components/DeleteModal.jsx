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
} from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";

const DeleteModal = ({ handleDeleteUser, deleteText }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button colorScheme="red" mt="2" onClick={onOpen}>
        {deleteText}
      </Button>
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
                onClick={handleDeleteUser}
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

export default DeleteModal;
