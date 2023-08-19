import { useRoutes } from "react-router-dom";
import "./App.css";
import CharacterDetail from "./pages/character-detail";
import Home from "./pages/home";
import { Box } from "@chakra-ui/react";
import Navbar from "./components/navbar";
import { useState, useEffect } from "react";
import { data } from "../playground";

function App() {
  const [number, setNumber] = useState(20);
  const [characters, setCharacters] = useState(data.slice(0, number));

  useEffect(() => {
    setCharacters(data.slice(0, number));
  }, [number]);

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
        <Navbar />
        {routes}
      </Box>
    </Box>
  );
}

export default App;
