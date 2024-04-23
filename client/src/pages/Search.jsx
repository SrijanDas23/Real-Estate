import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  SimpleGrid,
  Spacer,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import SearchFilterModal from "../components/SearchFilterModal";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ListingItem from "../components/ListingItem";
import Loading from "../components/Loading";
import { FaHouseChimneyCrack } from "react-icons/fa6";

const Search = () => {
  const navigate = useNavigate();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const [loading, setLoading] = useState(false);
  const [listings, setListings] = useState([]);
  const [showMore, setShowMore] = useState(false);
  const [displayedListings, setDisplayedListings] = useState(6);
  // console.log(listings)

  const [filterdata, setFilterdata] = useState({
    searchTerm: "",
    type: "all",
    parking: false,
    furnished: false,
    offer: false,
    sort: "created_at",
    order: "desc",
  });

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    const typeFromUrl = urlParams.get("type");
    const parkingFromUrl = urlParams.get("parking");
    const furnishedFromUrl = urlParams.get("furnished");
    const offerFromUrl = urlParams.get("offer");
    const sortFromUrl = urlParams.get("sort");
    const orderFromUrl = urlParams.get("order");

    if (
      searchTermFromUrl ||
      typeFromUrl ||
      parkingFromUrl ||
      furnishedFromUrl ||
      offerFromUrl ||
      sortFromUrl ||
      orderFromUrl
    ) {
      setFilterdata({
        searchTerm: searchTermFromUrl || "",
        type: typeFromUrl || "all",
        parking: parkingFromUrl === "true" ? true : false,
        furnished: furnishedFromUrl === "true" ? true : false,
        offer: offerFromUrl === "true" ? true : false,
        sort: sortFromUrl || "created_at",
        order: orderFromUrl || "desc",
      });
    }

    const fetchListings = async () => {
      setLoading(true);
      setShowMore(false);
      const searchQuery = urlParams.toString();
      const res = await fetch(`/api/listing/get?${searchQuery}`);
      const data = await res.json();
      setListings(data);
      setLoading(false);
    };

    fetchListings();
  }, [location.search]);

  const handleSeeMore = () => {
    setDisplayedListings((prevCount) =>
      prevCount + 6 > listings.length ? listings.length : prevCount + 6
    );
  };
  const handleSeeLess = () => {
    setDisplayedListings(6);
  };

  const [selectedOption, setSelectedOption] = useState("Sort");

  const handleSelect = (value, label) => {
    setSelectedOption(label);
    handleChange({ target: { id: "sort_order", value } });
  };

  const handleApplyClose = () => {
    setSelectedOption("Sort"); // Reset selected option to 'Sort'
    onClose(); // Close the modal
  };

  const handleChange = (e) => {
    if (
      e.target.id === "all" ||
      e.target.id === "rent" ||
      e.target.id === "sale"
    ) {
      setFilterdata({ ...filterdata, type: e.target.id });
    }

    if (e.target.id === "searchTerm") {
      setFilterdata({ ...filterdata, searchTerm: e.target.value });
    }

    if (
      e.target.id === "parking" ||
      e.target.id === "furnished" ||
      e.target.id === "offer"
    ) {
      setFilterdata({
        ...filterdata,
        [e.target.id]:
          e.target.checked || e.target.checked === "true" ? true : false,
      });
    }

    if (e.target.id === "sort_order") {
      const sort = e.target.value.split("_")[0] || "created_at";
      const order = e.target.value.split("_")[1] || "desc";
      setFilterdata({ ...filterdata, sort, order });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams();
    urlParams.set("searchTerm", filterdata.searchTerm);
    urlParams.set("type", filterdata.type);
    urlParams.set("parking", filterdata.parking);
    urlParams.set("furnished", filterdata.furnished);
    urlParams.set("offer", filterdata.offer);
    urlParams.set("sort", filterdata.sort);
    urlParams.set("order", filterdata.order);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
    handleApplyClose();
  };

  const onShowMoreClick = async () => {
    const numberOfListings = listings.length;
    const startIndex = numberOfListings;
    const urlParams = new URLSearchParams(location.search);
    urlParams.set("startIndex", startIndex);
    const searchQuery = urlParams.toString();
    const res = await fetch(`/api/listing/get?${searchQuery}`);
    const data = await res.json();
    if (data.length < 9) {
      setShowMore(false);
    }
    setListings([...listings, ...data]);
  };

  return (
    <>
      <Box
        display="flex"
        flexDirection="column"
        width={{ base: "90%", md: "80%", lg: "70%" }}
        mx="auto"
        mt="5rem"
      >
        <Box display="flex" flexDirection="row">
          <Heading color="white">Search Results:</Heading>
          <Spacer />
          <SearchFilterModal
            filterdata={filterdata}
            setFilterdata={setFilterdata}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            isOpen={isOpen}
            onOpen={onOpen}
            onClose={onClose}
            handleSelect={handleSelect}
            handleApplyClose={handleApplyClose}
            selectedOption={selectedOption}
          />
        </Box>
        {loading && <Loading />}
        {!loading && listings.length === 0 && (
          <Box
            mt="5rem"
            display="flex"
            flexDirection="column"
            alignItems="center"
          >
            <FaHouseChimneyCrack size={300} color="white" />
            <Heading color="white" my="2rem">
              No Listings Found
            </Heading>
            <Text color="white" fontWeight="semibold">
              Sorry, we couldn't find any listings matching your search
              criteria.
            </Text>
          </Box>
        )}
        <Box>
          {!loading && listings && listings.length > 0 && (
            <Flex
              flexDirection="row"
              flexWrap="wrap"
              rowGap="30px"
              justifyContent="space-evenly"
              mt="2rem"
            >
              {listings.slice(0, displayedListings).map((listing, index) => (
                <ListingItem
                  key={listing._id}
                  listing={listing}
                  index={index}
                />
              ))}
            </Flex>
          )}
        </Box>
        <Box display="flex" justifyContent="space-between" my={4}>
          {displayedListings > 6 && (
            <Button onClick={handleSeeLess} colorScheme="red" variant="outline">
              See Less...
            </Button>
          )}
          {listings.length > displayedListings && (
            <Button
              onClick={handleSeeMore}
              colorScheme="blue"
              variant="outline"
              ml="auto"
            >
              See More...
            </Button>
          )}
        </Box>
      </Box>
    </>
  );
};

export default Search;
