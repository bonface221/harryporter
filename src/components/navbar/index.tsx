import {
  Box,
  Flex,
  Heading,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import { AiOutlineSearch } from "react-icons/ai";

const Navbar = () => {
  return (
    <Flex
      justify="space-between"
      align="center"
      py={2}
      flexDir={{ base: "column", sm: "row" }}
      gap={3}
    >
      <Heading color="brand.pink">Hogwarts</Heading>
      <Box>
        <InputGroup>
          <InputLeftElement pointerEvents="none">
            <Icon as={AiOutlineSearch} boxSize={5} color="brand.pink" />
          </InputLeftElement>
          <Input
            bg="brand.bgIcon"
            borderTopLeftRadius={3}
            borderTopEndRadius={3}
            variant="flushed"
            type="search"
            focusBorderColor="brand.pink"
            _placeholder={{ color: "brand.pink" }}
            borderColor="brand.pink"
            placeholder="Search for a character..."
          />
        </InputGroup>
      </Box>
    </Flex>
  );
};
export default Navbar;
