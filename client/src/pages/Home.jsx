import {
  Box,
  Button,
  Flex,
  HStack,
  Heading,
  Image,
  Text,
  VStack,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Carousel } from "react-responsive-carousel";
import { Link } from "react-router-dom";

import { StarIcon } from "@chakra-ui/icons";
import HomeCarousel from "../components/HomeCarousel";
import ListingItem from "../components/ListingItem";
import HomeRentListings from "../components/HomeRentListings";
import HomeSaleListings from "../components/HomeSaleListings";
import HomeRecentListings from "../components/HomeRecentListings";

const Home = () => {
  const [offerListings, setOfferListings] = useState([]);
  const [saleListings, setSaleListings] = useState([]);
  const [rentListings, setRentListings] = useState([]);
  const [recentListings, setRecentListings] = useState([]);

  console.log(recentListings);

  useEffect(() => {
    const fetchOfferListings = async () => {
      try {
        const res = await fetch(
          "https://real-estate-0kkf.onrender.com/api/listing/get?offer=true&limit=10"
        );
        const data = await res.json();
        setOfferListings(data);
        fetchRentListings();
      } catch (error) {
        console.log(error);
      }
    };
    const fetchRentListings = async () => {
      try {
        const res = await fetch(
          "https://real-estate-0kkf.onrender.com/api/listing/get?type=rent&sort=regularPrice&order=desc"
        );
        const data = await res.json();
        setRentListings(data);
        fetchSaleListings();
      } catch (error) {
        console.log(error);
      }
    };

    const fetchSaleListings = async () => {
      try {
        const res = await fetch(
          "https://real-estate-0kkf.onrender.com/api/listing/get?type=sale&sort=regularPrice&order=desc"
        );
        const data = await res.json();
        setSaleListings(data);
        fetchRecentListings();
      } catch (error) {
        log(error);
      }
    };

    const fetchRecentListings = async () => {
      try {
        const res = await fetch(
          "https://real-estate-0kkf.onrender.com/api/listing/get?sort=createdAt&order=desc&limit=8"
        );
        const data = await res.json();
        setRecentListings(data);
      } catch (error) {
        log(error);
      }
    };
    fetchOfferListings();
  }, []);

  const handleSeeMore = () => {
    setDisplayedListings((prevCount) =>
      prevCount + 4 > rentListings.length ? rentListings.length : prevCount + 4
    );
  };
  const handleSeeLess = () => {
    setDisplayedListings(4);
  };
  return (
    <>
      <HomeCarousel offerListings={offerListings} />

      <HomeRentListings rentListings={rentListings}/>
      
      <HomeSaleListings saleListings={saleListings}/>

      <HomeRecentListings recentListings={recentListings}/>
    </>
  );
};

export default Home;
