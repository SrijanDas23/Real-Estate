import {
  Box,
  Button,
  Checkbox,
  Input,
  InputGroup,
  InputRightElement,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import SearchBar from "./SearchBar";
import { ChevronDownIcon, SearchIcon } from "@chakra-ui/icons";

const SearchFilterModal = ({
  filterdata,
  setFilterdata,
  handleChange,
  handleSubmit,
  isOpen,
  onOpen,
  onClose,
  handleSelect,
  handleApplyClose,
  selectedOption,
}) => {
  return (
    <>
      <Button onClick={onOpen} colorScheme="blue" bg="white" textColor="black">
        Filters
      </Button>

      <Modal onClose={handleApplyClose} isOpen={isOpen} isCentered>
        <ModalOverlay
          backdropFilter="blur(10px) hue-rotate(90deg)"
          bg="blackAlpha.300"
        />
        <ModalContent
          bg="black"
          width={{ xl: "570px", md: "400px", base: "300px" }}
        >
          <ModalHeader color="white">Filters:</ModalHeader>
          <ModalCloseButton color="white" />
          <ModalBody>
            <Box>
              <Text color="white" my="0.5rem">Search for names/locations</Text>
              <InputGroup size="lg" width="80%">
                <InputRightElement>
                  <SearchIcon color="#808080" size="1.5rem" />
                </InputRightElement>
                <Input
                  id="searchTerm"
                  type="text"
                  placeholder="Search for estates or locations..."
                  borderRadius="1rem"
                  borderColor="#ffffff"
                  borderWidth="2px"
                  _placeholder={{ color: "#808080" }}
                  color="#d1d5db"
                  value={filterdata.searchTerm}
                  onChange={handleChange}
                />
              </InputGroup>
            </Box>
            <Box my="2rem">
              <Text color="white">Types:</Text>
              <SimpleGrid minChildWidth="100px" spacing="15px" mt="15px">
                <Checkbox
                  colorScheme="green"
                  textColor="white"
                  id="all"
                  onChange={handleChange}
                  isChecked={filterdata.type === "all"}
                >
                  Sell & Rent
                </Checkbox>
                <Checkbox
                  colorScheme="green"
                  textColor="white"
                  id="rent"
                  onChange={handleChange}
                  isChecked={filterdata.type === "rent"}
                >
                  Rent
                </Checkbox>
                <Checkbox
                  colorScheme="green"
                  textColor="white"
                  id="sale"
                  onChange={handleChange}
                  isChecked={filterdata.type === "sale"}
                >
                  Sell
                </Checkbox>
                <Checkbox
                  colorScheme="green"
                  textColor="white"
                  id="offer"
                  onChange={handleChange}
                  isChecked={filterdata.offer}
                >
                  Offer
                </Checkbox>
              </SimpleGrid>
            </Box>

            <Box>
              <Text color="white">Facilities:</Text>
              <SimpleGrid minChildWidth="100px" spacing="15px" mt="15px">
                <Checkbox
                  colorScheme="green"
                  textColor="white"
                  id="parking"
                  onChange={handleChange}
                  isChecked={filterdata.parking}
                >
                  Parking Spot
                </Checkbox>
                <Checkbox
                  colorScheme="green"
                  textColor="white"
                  id="furnished"
                  onChange={handleChange}
                  isChecked={filterdata.furnished}
                >
                  Furnished
                </Checkbox>
              </SimpleGrid>
            </Box>
            <Box mt="2rem">
              <Menu id="sort_order">
                <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                  {selectedOption}
                </MenuButton>
                <MenuList>
                  <MenuItem
                    onClick={() =>
                      handleSelect("regularPrice_desc", "Price high to low")
                    }
                    minH="40px"
                  >
                    Price high to low
                  </MenuItem>
                  <MenuItem
                    onClick={() =>
                      handleSelect("regularPrice_asc", "Price low to high")
                    }
                    minH="40px"
                  >
                    Price low to high
                  </MenuItem>
                  <MenuItem
                    onClick={() => handleSelect("createdAt_desc", "Latest")}
                    minH="40px"
                  >
                    Latest First
                  </MenuItem>
                  <MenuItem
                    onClick={() => handleSelect("createdAt_asc", "Oldest")}
                    minH="40px"
                  >
                    Oldest First
                  </MenuItem>
                </MenuList>
              </Menu>
            </Box>
          </ModalBody>
          <ModalFooter>
            <Button
              onClick={handleSubmit}
              colorScheme="green"
              bg="white"
              textColor="black"
            >
              Apply
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default SearchFilterModal;
