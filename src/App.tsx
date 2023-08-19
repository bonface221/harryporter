import { useRoutes } from "react-router-dom";
import "./App.css";
import CharacterDetail from "./pages/character-detail";
import Home from "./pages/home";
import { Box } from "@chakra-ui/react";

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
  return <Box>{routes}</Box>;
}

export default App;
