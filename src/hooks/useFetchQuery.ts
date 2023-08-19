import axios from "axios";

//base url for the api requests
const baseUrl = "https://hp-api.onrender.com/api/characters";

//creating an api instance
const api = axios.create({
  baseURL: baseUrl,
});

//Get all characters
export const getAllCharacters = async () => {
  const response = await api.get("/");
  return response.data;
};

//get a single character
export const getCharacter = async (id: string) => {
  const response = await api.get(`/${id}`);
  return response.data;
};
