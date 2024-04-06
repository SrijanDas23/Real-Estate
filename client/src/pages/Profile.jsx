import {
  Alert,
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
  InputRightElement,
  Spacer,
  Text,
  AlertIcon,
  AlertTitle,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import {
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  signOutUserStart,
  updateUserFailure,
  updateUserStart,
  updateUserSuccess,
} from "../redux/user/userSlice";
import { useDispatch } from "react-redux";

const Profile = () => {
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const fileRef = useRef(null);
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  const [show, setShow] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const dispatch = useDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();
  // console.log(formData);
  // console.log(filePerc);
  // console.log(fileUploadError);

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePerc(Math.round(progress));
      },
      (error) => {
        setFileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData({ ...formData, avatar: downloadURL })
        );
      }
    );
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
        return;
      }

      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  };

  const handleDeleteUser = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };

  const handleSignOut = async () => {
    try {
      dispatch(signOutUserStart());
      const res = await fetch("/api/auth/signout");
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(data.message));
    }
  };

  return (
    <Box
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
          <input
            onChange={(e) => setFile(e.target.files[0])}
            type="file"
            ref={fileRef}
            hidden
            accept="image/*"
          />
          <Avatar
            name={currentUser.username}
            src={formData.avatar || currentUser.avatar}
            // bg="black"
            size="xl"
            mb="2"
            onClick={() => fileRef.current.click()}
          />
          <Text>
            {fileUploadError ? (
              <span style={{ color: "red" }}>
                Error Image upload (image must be less than 2 mb)
              </span>
            ) : filePerc > 0 && filePerc < 100 ? (
              <span
                style={{ color: "whitesmoke" }}
              >{`Uploading ${filePerc}%`}</span>
            ) : filePerc === 100 ? (
              <span style={{ color: "green" }}>
                Image successfully uploaded!
              </span>
            ) : (
              ""
            )}
          </Text>

          <Flex
            direction="column"
            gap="6"
            color="#fff"
            fontFamily="DM Sans"
            width={{ xl: "570px", md: "400px", base: "300px" }}
          >
            <FormControl>
              <FormLabel style={{ color: "#B2BEB5" }}>Email</FormLabel>
              <Input
                autoComplete="off"
                type="email"
                id="email"
                variant="flushed"
                defaultValue={currentUser.email}
                onChange={handleChange}
              />
            </FormControl>

            <FormControl>
              <FormLabel style={{ color: "#B2BEB5" }}>Username</FormLabel>
              <InputGroup>
                <Input
                  defaultValue={currentUser.username}
                  id="username"
                  variant="flushed"
                  onChange={handleChange}
                />
              </InputGroup>
            </FormControl>

            <FormControl>
              <FormLabel style={{ color: "#B2BEB5" }}>Password</FormLabel>
              <InputGroup>
                <Input
                  placeholder="Enter Password"
                  id="password"
                  variant="flushed"
                  type={show ? "text" : "password"}
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
              onClick={handleSubmit}
              isLoading={loading}
            >
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
            <Button colorScheme="red" mt="2" onClick={onOpen}>
              Delete Account
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
                <ModalHeader color="white">Delete Account</ModalHeader>
                <ModalCloseButton color="white" />
                <ModalBody>
                  <Text color="white">
                    Are you sure that you want to delete?
                  </Text>
                </ModalBody>

                <ModalFooter>
                  <Flex direction="row" w="100%">
                    <Button colorScheme="green" mr={3} onClick={onClose}>
                      No
                    </Button>
                    <Spacer />
                    <Button colorScheme="red" onClick={handleDeleteUser}>
                      Yes
                    </Button>
                  </Flex>
                </ModalFooter>
              </ModalContent>
            </Modal>

            <Spacer />
            <Button colorScheme="red" bg="#808080" mt="2" onClick={handleSignOut}>
              Sign Out
            </Button>
          </Flex>
          {error && (
            <Alert
              status="error"
              variant="solid"
              display="flex"
              justifyContent="center"
              mb="-10"
            >
              <AlertIcon />
              <AlertTitle>{error}</AlertTitle>
            </Alert>
          )}
          {updateSuccess && (
            <Alert
              status="error"
              variant="solid"
              display="flex"
              justifyContent="center"
              mb="-10"
              bg="green"
            >
              <AlertTitle>User Updated Successfully!</AlertTitle>
            </Alert>
          )}
        </Flex>
      </Container>
    </Box>
  );
};

export default Profile;
