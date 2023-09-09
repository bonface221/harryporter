import { useRoutes } from "react-router-dom";
import "./App.css";
import CharacterDetail from "./pages/character-detail";
import Home from "./pages/home";
import { Box, SimpleGrid, Skeleton, useToast } from "@chakra-ui/react";
import Navbar from "./components/navbar";
import { useState } from "react";
import { useQuery } from "react-query";
import { getAllCharacters } from "./hooks/useFetchQuery";
import PageNotFound from "./components/page-not-found";

export interface characters {
  id: string;
  name: string;
  alternate_names: string[] | [];
  species: string;
  gender: string;
  house: string;
  dateOfBirth: null | string;
  yearOfBirth: null | number;
  wizard: boolean;
  ancestry: string;
  eyeColour: string;
  hairColour: string;
  wand: { wood: string; core: string; length: null | number };
  patronus: string;
  hogwartsStudent: boolean;
  hogwartsStaff: boolean;
  actor: string;
  alternate_actors: string[] | [];
  alive: boolean;
  image: string;
}

const sampleSkeletonsArray = Array.from(
  { length: 20 },
  (_, index) => index + 1
);

function App() {
  const [number, setNumber] = useState<number>(20);
  const [characters, setCharacters] = useState<characters[]>([]);
  const toast = useToast();

  const { isLoading, isError, data } = useQuery(
    ["characters"],
    getAllCharacters,
    {
      staleTime: 0,
      onSuccess: (data) => {
        setCharacters(data.slice(0, number));
      },
    }
  );

  const onSearch = (search: string) => {
    if (!search) {
      setCharacters(data.slice(0, number));
      return;
    }
    const filteredCharacters = data.filter((character: characters) =>
      character.name.toLowerCase().includes(search.toLowerCase())
    );
    setCharacters(filteredCharacters);
  };
  const onNumberChange = () => {
    if (number < data.length && number + 20 < data.length) {
      setNumber(number + 20);
      setCharacters((prev) => [...prev, ...data.slice(number, number + 20)]);
    } else {
      setNumber(data.length);
      setCharacters((prev) => [...prev, ...data.slice(number, data.length)]);
    }
  };

  const routes = useRoutes([
    {
      path: "/",
      element: (
        <Home
          number={number}
          characters={characters}
          onNumberChange={onNumberChange}
          dataLength={80}
        />
      ),
    },
    {
      path: "/:id",
      element: <CharacterDetail />,
    },
    {
      path: "*",
      element: <PageNotFound />,
    },
  ]);
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
      <Box bg="brand.bgBlack">
        <Box mx={{ base: "2%", md: "5%", lg: "10%" }}>
          <Navbar onSearch={onSearch} />
          <SimpleGrid
            mt={12}
            columns={{ base: 1, sm: 2, md: 3, xl: 4 }}
            spacing={10}
          >
            {sampleSkeletonsArray.map((_, index) => (
              <Skeleton key={index} height="250px" borderRadius="xl" />
            ))}
          </SimpleGrid>
        </Box>
      </Box>
    );
  }

  return (
    <Box bg="brand.bgBlack" color="brand.white" h="100vh" overflowY="scroll">
      <Box mx={{ base: "2%", md: "5%", lg: "10%" }}>
        <Navbar onSearch={onSearch} />
        {routes}
      </Box>
    </Box>
  );
}

export default App;
