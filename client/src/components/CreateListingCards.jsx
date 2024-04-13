import { Box, SimpleGrid, Image } from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";

const CreateListingCards = ({ handleRemoveImage, formData }) => {
  return (
    <>
      <SimpleGrid
        minChildWidth="270px"
        spacing="15px"
        templateColumns={{ base: "repeat(1fr)", md: "repeat(2,1fr)" }}
      >
        {formData.imageUrls.length > 0 &&
          formData.imageUrls.map((url, index) => (
            <Box
              key={url}
              display="flex"
              justifyContent="space-between"
              p="3"
              borderWidth="2px"
              alignItems="center"
            >
              <Image
                src={url}
                alt="listing image"
                w="20"
                objectFit="contain"
                borderRadius="0.5"
                h="20"
              />
              <DeleteIcon
                color="red"
                onClick={() => handleRemoveImage(index)}
                cursor="pointer"
              />
            </Box>
          ))}
      </SimpleGrid>
    </>
  );
};

export default CreateListingCards;
