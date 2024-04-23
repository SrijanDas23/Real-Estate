import { SearchIcon } from '@chakra-ui/icons';
import { Input, InputGroup, InputRightElement } from '@chakra-ui/react';
import React from 'react'

const SearchBar = ({ width, ml, searchTerm, setSearchTerm, handleSubmit }) => {
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSubmit(); 
    }
  };
  return (
    <InputGroup size="lg" width={width} ml={ml}>
      <InputRightElement cursor="pointer" onClick={handleSubmit}>
        <SearchIcon color="#808080" size="1.5rem" />
      </InputRightElement>
      <Input
        type="text"
        placeholder="Search for estates..."
        borderRadius="1rem"
        borderColor="#ffffff"
        borderWidth="2px"
        _placeholder={{ color: "#808080" }}
        color="#d1d5db"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyDown={handleKeyDown}
      />
    </InputGroup>
  );
};

export default SearchBar
