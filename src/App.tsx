import { useRoutes } from "react-router-dom";
import "./App.css";
import CharacterDetail from "./pages/character-detail";
import Home from "./pages/home";
import { Box } from "@chakra-ui/react";
import Navbar from "./components/navbar";

function App() {
  const routes = useRoutes([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/:id",
      element: <CharacterDetail />,
    },
  ]);
  return (
    <Box bg="brand.bgBlack" color="brand.white">
      <Navbar />
      {routes}
    </Box>
  );
}

export default App;
