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
  CircularProgress,
  CircularProgressLabel,
} from "@chakra-ui/react";
import CreateListingCards from "../components/CreateListingCards";
import { useState } from "react";

const ListingFormBody = ({
  handleImageSubmit,
  handleChange,
  storeImage,
  handleRemoveImage,
  handleSubmit,
  formData,
  disabled,
  loading,
  uploading,
  setFiles,
  files,
  name,
  imageUpload,
  setImageUpload,
}) => {
  const [showSpinner, setShowSpinner] = useState(true);
  console.log(imageUpload)
  return (
    <Box w="100%">
      <Heading
        fontFamily="DM Sans"
        color="#fff"
        mt="2rem"
        mb="6rem"
        textAlign="center"
      >
        {name} Listing
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
          {imageUpload !== 0 && imageUpload !== 100 && (
            <Box display="flex" flexDirection="column" alignItems="center">
              <CircularProgress value={imageUpload} color="green.400">
                <CircularProgressLabel color="white">
                  {Math.floor(imageUpload)}%
                </CircularProgressLabel>
              </CircularProgress>
            </Box>
          )}
          {imageUpload === 100 && showSpinner && (
            <Box display="flex" flexDirection="column" alignItems="center">
              <CircularProgress value={100} color="green.400">
                <CircularProgressLabel color="white">
                  100%
                </CircularProgressLabel>
              </CircularProgress>
              {setTimeout(() => {
                setShowSpinner(false)
              }, 500)}
            </Box>
          )}
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
            {name} Listing
          </Button>
        </Flex>
      </Center>
    </Box>
  );
};

export default ListingFormBody;
