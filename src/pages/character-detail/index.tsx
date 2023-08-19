import { Avatar, Box, Button, Flex, Icon, Stack, Text } from "@chakra-ui/react";
import { MdHouse } from "react-icons/md";
import { BsTools } from "react-icons/bs";
import { MdTimelapse } from "react-icons/md";
import { MdOutlineDashboard } from "react-icons/md";

const character = {
  id: "9e3f7ce4-b9a7-4244-b709-dae5c1f1d4a8",
  name: "Harry Potter",
  alternate_names: ["The Boy Who Lived", "The Chosen One"],
  species: "human",
  gender: "male",
  house: "Gryffindor",
  dateOfBirth: "31-07-1980",
  yearOfBirth: 1980,
  wizard: true,
  ancestry: "half-blood",
  eyeColour: "green",
  hairColour: "black",
  wand: { wood: "holly", core: "phoenix feather", length: 11 },
  patronus: "stag",
  hogwartsStudent: true,
  hogwartsStaff: false,
  actor: "Daniel Radcliffe",
  alternate_actors: [],
  alive: true,
  image: "https://ik.imagekit.io/hpapi/harry.jpg",
};

const CharacterDetail = () => {
  return (
    <Box mt={2}>
      <Text>Character Detail</Text>
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
          <Box as="h2">{character.name}</Box>
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
          <Stack>
            <Text>Wand</Text>
            <Flex>
              <Stack>
                <Icon as={MdOutlineDashboard} />
                <Text fontSize="lg" fontWeight="bold">
                  Core
                </Text>
                <Text>{character.wand.core}</Text>
              </Stack>
              <Stack>
                <Icon as={MdTimelapse} />
                <Text fontSize="lg" fontWeight="bold">
                  Length
                </Text>
                <Text>{character.wand.length}</Text>
              </Stack>
              <Stack>
                <Icon as={BsTools} />
                <Text fontSize="lg" fontWeight="bold">
                  Core
                </Text>
                <Text>{character.wand.wood}</Text>
              </Stack>
            </Flex>
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
};
export default CharacterDetail;
