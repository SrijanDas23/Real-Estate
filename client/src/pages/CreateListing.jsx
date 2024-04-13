import React, { useState } from "react";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Text,
  Textarea,
  Center,
  Checkbox,
  SimpleGrid,
  useToast,
} from "@chakra-ui/react";

import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CreateListingCards from "../components/CreateListingCards";

const CreateListing = () => {
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [files, setFiles] = useState([]);
  const [formData, setFormData] = useState({
    imageUrls: [],
    name: "",
    description: "",
    address: "",
    type: "rent",
    bedrooms: 1,
    bathrooms: 1,
    regularPrice: 50,
    discountPrice: 0,
    offer: false,
    parking: false,
    furnished: false,
  });
  const [imageUploadError, setImageUploadError] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const disabled =
    formData.name === "" ||
    formData.address === "" ||
    formData.description === "";
  // console.log(formData);

  // console.log(files);

  const handleImageSubmit = (e) => {
    if (files.length > 0 && files.length + formData.imageUrls.length < 7) {
      setUploading(true);
      setImageUploadError(false);
      const promises = [];

      for (let i = 0; i < files.length; i++) {
        promises.push(storeImage(files[i]));
      }
      Promise.all(promises)
        .then((urls) => {
          setFormData({
            ...formData,
            imageUrls: formData.imageUrls.concat(urls),
          });
          setImageUploadError(false);
          setUploading(false);
        })
        .catch((err) => {
          setImageUploadError("Image upload failed (2 mb max per image)");
          setUploading(false);
          toast({
            title: "Image upload failed (2 mb max per image)",
            position: "bottom-left",
            status: "error",
            duration: 9000,
            isClosable: true,
          });
        });
    } else {
      setImageUploadError("You can only upload 6 images per listing");
      setUploading(false);
      toast({
        title: "You can only upload 6 images per listing",
        position: "bottom-left",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  const storeImage = async (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is ${progress}% done`);
        },
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      );
    });
  };

  const handleRemoveImage = (index) => {
    setFormData({
      ...formData,
      imageUrls: formData.imageUrls.filter((_, i) => i !== index),
    });
  };

  const handleChange = (e) => {
    if (e.target.id === "sale" || e.target.id === "rent") {
      setFormData({
        ...formData,
        type: e.target.id,
      });
    }

    if (
      e.target.id === "parking" ||
      e.target.id === "furnished" ||
      e.target.id === "offer"
    ) {
      setFormData({
        ...formData,
        [e.target.id]: e.target.checked,
      });
    }

    if (
      e.target.type === "number" ||
      e.target.type === "text" ||
      e.target.type === "textarea"
    ) {
      setFormData({
        ...formData,
        [e.target.id]:
          e.target.type === "number" ? +e.target.value : e.target.value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formData.imageUrls.length < 1) {
        toast({
          title: "You must upload at least one image",
          position: "bottom-left",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
        return setError("You must upload at least one image");
      }

      if (formData.regularPrice < formData.discountPrice) {
        toast({
          title: "Discount price must be lower than regular price",
          position: "bottom-left",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
        return setError("Discount price must be lower than regular price");
      }

      setLoading(true);
      setError(false);
      const res = await fetch("/api/listing/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          userRef: currentUser._id,
        }),
      });
      const data = await res.json();
      setLoading(false);
      if (data.success === false) {
        setError(data.message);
        toast({
          title: `${data.message}`,
          position: "bottom-left",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      }
      navigate(`/listing/${data._id}`);
    } catch (error) {
      setError(error.message);
      setLoading(false);
      toast({
        title: `${data.message}`,
        position: "bottom-left",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  return (
    <Box w="100%">
      <Heading
        fontFamily="DM Sans"
        color="#fff"
        mt="2rem"
        mb="6rem"
        textAlign="center"
      >
        Create Listings
      </Heading>
      <Center my="-4rem" w="100%" px="10">
        <Flex
          direction="column"
          gap="6"
          w={{ xl: "50%", lg: "60%", md: "80%", base: "100%" }}
        >
          <Box
            display="flex"
            gap="6"
            flexDirection={{ md: "row", base: "column" }}
          >
            <FormControl>
              <FormLabel color="#ffffff">Name</FormLabel>
              <Input
                autoComplete="off"
                type="text"
                id="name"
                placeholder="Enter Name"
                color="#ffffff"
                onChange={handleChange}
                value={formData.name}
              />
            </FormControl>

            <FormControl>
              <FormLabel color="#ffffff">Address</FormLabel>
              <Input
                autoComplete="off"
                type="text"
                id="address"
                placeholder="Enter Address"
                color="#ffffff"
                onChange={handleChange}
                value={formData.address}
              />
            </FormControl>
          </Box>

          <Box>
            <Text color="#ffffff" mb="2">
              Description
            </Text>
            <Textarea
              placeholder="Description"
              id="description"
              color="#ffffff"
              onChange={handleChange}
              value={formData.description}
            />
          </Box>

          <SimpleGrid minChildWidth="120px" spacing="15px">
            <Checkbox
              colorScheme="green"
              textColor="white"
              id="sale"
              onChange={handleChange}
              isChecked={formData.type === "sale"}
            >
              Sell
            </Checkbox>
            <Checkbox
              colorScheme="green"
              textColor="white"
              id="rent"
              onChange={handleChange}
              isChecked={formData.type === "rent"}
            >
              Rent
            </Checkbox>
            <Checkbox
              colorScheme="green"
              textColor="white"
              id="parking"
              onChange={handleChange}
              isChecked={formData.parking}
            >
              Parking Spot
            </Checkbox>
            <Checkbox
              colorScheme="green"
              textColor="white"
              id="furnished"
              onChange={handleChange}
              isChecked={formData.furnished}
            >
              Furnished
            </Checkbox>
            <Checkbox
              colorScheme="green"
              textColor="white"
              id="offer"
              onChange={handleChange}
              isChecked={formData.offer}
            >
              Offer
            </Checkbox>
          </SimpleGrid>

          <SimpleGrid minChildWidth="120px" spacing="15px">
            <FormControl>
              <FormLabel color="#ffffff">Beds</FormLabel>
              <Input
                autoComplete="off"
                type="number"
                id="bedrooms"
                color="#ffffff"
                placeholder="No of Beds"
                onChange={handleChange}
                value={formData.bedrooms}
              />
            </FormControl>
            <FormControl>
              <FormLabel color="#ffffff">Bathrooms</FormLabel>
              <Input
                autoComplete="off"
                type="number"
                id="bathrooms"
                color="#ffffff"
                placeholder="No of Baths"
                onChange={handleChange}
                value={formData.bathrooms}
              />
            </FormControl>
            <FormControl>
              <FormLabel color="#ffffff">Regular Price</FormLabel>
              <Input
                autoComplete="off"
                type="number"
                id="regularPrice"
                color="#ffffff"
                placeholder="Enter Price"
                onChange={handleChange}
                value={formData.regularPrice}
              />
            </FormControl>
            {formData.offer && (
              <FormControl>
                <FormLabel color="#ffffff">Discount Price</FormLabel>
                <Input
                  autoComplete="off"
                  type="number"
                  id="discountPrice"
                  color="#ffffff"
                  placeholder="Enter Price"
                  onChange={handleChange}
                  value={formData.discountPrice}
                />
              </FormControl>
            )}
          </SimpleGrid>

          <Text fontWeight="bold" fontFamily="DM Sans" color="white">
            Images:
            <span style={{ color: "#808080" }}>
              {" "}
              The first image will be the cover (max 6)
            </span>
          </Text>
          <SimpleGrid
            minChildWidth="270px"
            spacing="15px"
            templateColumns={{ base: "repeat(1fr)", md: "70% 30%" }}
          >
            <Input
              size="lg"
              type="file"
              pt="2"
              id="images"
              accept="image/*"
              multiple
              textColor="white"
              onChange={(e) => {
                setFiles(e.target.files);
              }}
            />
            <Button
              size="lg"
              type="button"
              onClick={handleImageSubmit}
              isLoading={uploading}
              bg="#808080"
            >
              Upload
            </Button>
          </SimpleGrid>

          <CreateListingCards
            handleRemoveImage={handleRemoveImage}
            formData={formData}
          />

          <Button
            bg="#808080"
            type="submit"
            my="6"
            onClick={handleSubmit}
            isLoading={loading}
            isDisabled={disabled || uploading}
          >
            Create Listing
          </Button>
        </Flex>
      </Center>
    </Box>
  );
};

export default CreateListing;
