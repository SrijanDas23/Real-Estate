import { Button } from '@chakra-ui/react';
import React from 'react'
import { FaGoogle } from 'react-icons/fa';

const OAuth = () => {
  return (
    <div>
      <Button colorScheme="red" bg="#808080" mt="2" leftIcon={<FaGoogle />}>
        Continue with Google
      </Button>
    </div>
  );
}

export default OAuth
