import { useRoutes } from "react-router-dom";
import "./App.css";
import CharacterDetail from "./pages/character-detail";
import Home from "./pages/home";
import { Box } from "@chakra-ui/react";
import Navbar from "./components/navbar";
import { useState, useEffect } from "react";
import { data } from "../playground";

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

function App() {
  const [number, setNumber] = useState<number>(20);
  const [characters, setCharacters] = useState<characters[]>([]);

  useEffect(() => {
    setCharacters(data.slice(0, number));
  }, [number]);

  const onSearch = (search: string) => {
    if (!search) {
      setCharacters(data.slice(0, number));
      return;
    }
    const filteredCharacters = data.filter((character) =>
      character.name.toLowerCase().includes(search.toLowerCase())
    );
    setCharacters(filteredCharacters);
  };
  const onNumberChange = () => {
    if (number < data.length && number + 20 < data.length) {
      setNumber(number + 20);
    } else {
      setNumber(data.length);
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
          dataLength={data.length}
        />
      ),
    },
    {
      path: "/:id",
      element: <CharacterDetail />,
    },
  ]);

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