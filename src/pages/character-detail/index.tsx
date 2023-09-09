import {
  Avatar,
  Box,
  Button,
  Flex,
  Heading,
  Icon,
  Image,
  Spinner,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import { MdHouse, MdArrowBack } from "react-icons/md";
import { BsTools } from "react-icons/bs";
import { MdTimelapse } from "react-icons/md";
import { MdOutlineDashboard } from "react-icons/md";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { getCharacter } from "../../hooks/useFetchQuery";
import { useQuery } from "react-query";
import { useState } from "react";
import { characters } from "../../App";
import NotFoundImage from "/characternotfound.svg";

const CharacterDetail = () => {
  const { id } = useParams();
  const navigation = useNavigate();
  const [charactersLoading, setCharactersLoading] = useState<boolean>(true);
  const toast = useToast();
  const [character, setCharacter] = useState<characters | null>(null);

  const { isLoading, isError } = useQuery(
    ["characterDetail"],
    () => getCharacter(id!),
    {
      staleTime: 0,
      onSuccess: (data) => {
        setCharacter(data[0]);
        setCharactersLoading(false);
      },
      onError: () => {
        setCharactersLoading(false);
      },
    }
  );
  if (!id) return <Navigate to="/" />;

  if (isError) {
    toast({
      title: "An error occurred.",
      description: "Unable to fetch data",
      status: "error",
      duration: 9000,
      isClosable: true,
      position: "top",
    });
  }
  if (isLoading || charactersLoading) {
    return (
      <Flex>
        <Spinner size="xl" />
      </Flex>
    );
  }
  if (!character) {
    return (
      <Flex h="90vh" flexDir="column" justify="center" align="center">
        <Text fontSize="2xl" fontWeight="bold">
          character not found
        </Text>
        <Image src={NotFoundImage} objectFit="cover" height="100%" />
      </Flex>
    );
  }
  return (
    <Box my={2}>
      <Stack maxW="md" mx="auto">
        <Stack align="center" gap={5}>
          <Flex gap={10}>
            <Button
              alignSelf="flex-start"
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
              onClick={() => navigation(-1)}
              transition={"all 0.3s ease"}
            >
              <Icon
                transition={"all 0.3s ease"}
                as={MdArrowBack}
                className="houseIcon"
                boxSize={5}
                color="brand.pink"
              />
              <Text>{"Back"}</Text>
            </Button>
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
              <Text>{character.house || "No House Available"}</Text>
            </Button>
          </Flex>
          <Avatar
            border={character.image.length ? "4px solid #FEB5A8" : "none"}
            size="50px"
            borderRadius="50%"
            name={character.name}
            src={character.image}
            height="250px"
            minW="200px"
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
