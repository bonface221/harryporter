import {
  Avatar,
  Box,
  Button,
  Flex,
  Heading,
  Icon,
  Spinner,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import { MdHouse } from "react-icons/md";
import { BsTools } from "react-icons/bs";
import { MdTimelapse } from "react-icons/md";
import { MdOutlineDashboard } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import { getCharacter } from "../../hooks/useFetchQuery";
import { useQuery } from "react-query";

const CharacterDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const toast = useToast();

  const {
    isLoading,
    isError,
    data: character,
  } = useQuery(["characterDetail"], () => getCharacter(id!));
  if (!id) return navigate("/");

  if (isError) {
    toast({
      title: "An error occurred.",
      description: "Unable to fetch data",
      status: "error",
      duration: 9000,
      isClosable: true,
      position: "top",
    });
    return;
  }
  if (isLoading) {
    return (
      <Flex>
        <Spinner size="xl" />
      </Flex>
    );
  }
  return (
    <Box my={2}>
      <Text color="brand.pink">Detail</Text>
      <Stack maxW="md" mx="auto">
        <Stack align="center" gap={5}>
          <Button
            alignSelf="flex-end"
            borderRadius="full"
            bg="brand.blackCard"
            display="flex"
            gap={2}
            color="brand.white"
            _hover={{
              bg: "brand.pink",
              color: "brand.bgBlack",
              ".houseIcon": {
                color: "brand.bgBlack",
              },
            }}
            transition={"all 0.3s ease"}
          >
            <Icon
              transition={"all 0.3s ease"}
              as={MdHouse}
              className="houseIcon"
              boxSize={5}
              color="brand.pink"
            />
            <Text>{character.house}</Text>
          </Button>
          <Avatar
            border={character.image.length ? "4px solid #FEB5A8" : "none"}
            size="50px"
            borderRadius="50%"
            name={character.name}
            src={character.image}
          />
          <Heading fontSize="2xl">{character.name}</Heading>
          <Flex gap={2} flexWrap="wrap">
            {character.alternate_names.map((name) => (
              <Button
                key={name}
                alignSelf="flex-end"
                borderRadius="full"
                bg="brand.blackCard"
                display="flex"
                gap={2}
                color="brand.white"
                _hover={{
                  bg: "brand.pink",
                  color: "brand.bgBlack",
                  ".houseIcon": {
                    color: "brand.bgBlack",
                  },
                }}
                transition={"all 0.3s ease"}
              >
                <Text>{name}</Text>
              </Button>
            ))}
          </Flex>
          <Stack
            align="center"
            mt={2}
            gap={6}
            bg="brand.blackCard"
            w="100%"
            borderRadius="2xl"
            p={4}
            py={8}
          >
            <Heading fontSize="xl">Wand</Heading>
            <Flex
              w="100%"
              justify="space-evenly"
              flexDir={{ base: "column", sm: "row" }}
              gap={4}
            >
              <Stack align="center">
                <Icon as={MdOutlineDashboard} boxSize={8} color="brand.pink" />
                <Text fontSize="lg" fontWeight="bold">
                  Core
                </Text>
                <Text>{character.wand.core ? character.wand.core : "N/A"}</Text>
              </Stack>
              <Stack align="center">
                <Icon as={MdTimelapse} boxSize={8} color="brand.pink" />
                <Text fontSize="lg" fontWeight="bold">
                  Length
                </Text>
                <Text>
                  {character.wand.length ? character.wand.length : "N/A"}
                </Text>
              </Stack>
              <Stack align="center">
                <Icon as={BsTools} boxSize={8} color="brand.pink" />
                <Text fontSize="lg" fontWeight="bold">
                  Core
                </Text>
                <Text>{character.wand.wood ? character.wand.wood : "N/A"}</Text>
              </Stack>
            </Flex>
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
};
export default CharacterDetail;
