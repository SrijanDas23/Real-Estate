import {
  Avatar,
  Box,
  Button,
  Container,
  Flex,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Spacer,
  Text,
  useToast,
  useDisclosure,
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
import { Link } from "react-router-dom";
import DeleteModal from "../components/DeleteModal";
import ShowListingSidebar from "../components/ShowListingSidebar";

const Profile = () => {
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const fileRef = useRef(null);
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  const [show, setShow] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [showListingsError, setShowListingsError] = useState(false);
  const [userListings, setUserListings] = useState([]);
  const dispatch = useDispatch();
  const toast = useToast();
  // console.log(formData);
  // console.log(filePerc);
  // console.log(fileUploadError);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const firstField = React.useRef();

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
      const res = await fetch(
        `https://real-estate-0kkf.onrender.com/api/user/update/${currentUser._id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "same-origin",
          body: JSON.stringify(formData),
        }
      );
      const data = await res.json();
      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
        toast({
          title: `${error}`,
          position: "bottom-left",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
        return;
      }
      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
      toast({
        title: "User Updated Successfully!",
        position: "bottom-left",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    } catch (error) {
      dispatch(updateUserFailure(error.message));
      toast({
        title: `${error}`,
        position: "bottom-left",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  const handleDeleteUser = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(
        `https://real-estate-0kkf.onrender.com/api/user/delete/${currentUser._id}`,
        {
          method: "DELETE",
          credentials: "same-origin",
        }
      );
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        toast({
          title: `${error}`,
          position: "bottom-left",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
        return;
      }
      dispatch(deleteUserSuccess(data));
      toast({
        title: "User Deleted Successfully!",
        position: "bottom-left",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
      toast({
        title: `${error}`,
        position: "bottom-left",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  const handleSignOut = async () => {
    try {
      dispatch(signOutUserStart());
      const res = await fetch(
        "https://real-estate-0kkf.onrender.com/api/auth/signout"
      );
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        toast({
          title: `${error}`,
          status: "error",
          position: "bottom-left",
          duration: 9000,
          isClosable: true,
        });
        return;
      }
      dispatch(deleteUserSuccess(data));
      toast({
        title: "User Signed Out Successfully!",
        status: "success",
        duration: 9000,
        position: "bottom-left",
        isClosable: true,
      });
    } catch (error) {
      dispatch(deleteUserFailure(data.message));
      toast({
        title: `${error}`,
        status: "error",
        position: "bottom-left",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  const handleShowListings = async (limit) => {
    try {
      setShowListingsError(false);
      const res = await fetch(
        `https://real-estate-0kkf.onrender.com/api/user/listings/${currentUser._id}?limit=${limit}`,
        {
          method: "GET",
          credentials: "same-origin", // Important: Include credentials for cookies to be sent
        }
      );
      const data = await res.json();
      if (data.success === false) {
        setShowListingsError(true);
        return;
      }

      setUserListings(data);
      onOpen();
    } catch (error) {
      setShowListingsError(true);
    }
  };

  const handleListingDelete = async (listingId) => {
    try {
      const res = await fetch(
        `https://real-estate-0kkf.onrender.com/api/listing/delete/${listingId}`,
        {
          method: "DELETE",
          credentials: "same-origin",
        }
      );
      const data = await res.json();
      if (data.success === false) {
        console.log(data.message);
        toast({
          title: `${data.message}`,
          status: "error",
          position: "bottom-left",
          duration: 9000,
          isClosable: true,
        });
        return;
      }

      setUserListings((prev) =>
        prev.filter((listing) => listing._id !== listingId)
      );
      toast({
        title: "Listing Deleted Successfully!",
        status: "success",
        duration: 9000,
        position: "bottom-left",
        isClosable: true,
      });
    } catch (error) {
      console.log(error.message);
      toast({
        title: `${error.message}`,
        status: "error",
        position: "bottom-left",
        duration: 9000,
        isClosable: true,
      });
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
            mt="10"
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
                  autoComplete="off"
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
                  autoComplete="off"
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
              onClick={handleSubmit}
              isLoading={loading}
            >
              Change Credentials
            </Button>

            <ShowListingSidebar
              handleListingDelete={handleListingDelete}
              handleShowListings={handleShowListings}
              userListings={userListings}
              onOpen={onOpen}
              onClose={onClose}
              isOpen={isOpen}
              firstField={firstField}
            />

            <Link to={"/create-listing"}>
              <Button colorScheme="blue" bg="#808080" w="100%">
                Create Listing
              </Button>
            </Link>
          </Flex>
          <Flex
            direction="row"
            width={{ xl: "570px", md: "400px", base: "300px" }}
          >
            <DeleteModal
              handleDeleteUser={handleDeleteUser}
              deleteText="Delete Account"
            />

            <Spacer />
            <Button
              colorScheme="red"
              bg="#808080"
              mt="2"
              onClick={handleSignOut}
            >
              Sign Out
            </Button>
          </Flex>
        </Flex>
      </Container>
    </Box>
  );
};

export default Profile;
