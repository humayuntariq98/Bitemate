import axios from "axios";

console.log("API_BASE_URL", process.env.REACT_APP_API_BASE_URL);
export const fetchRestaurants = async () => {
  return await axios.get(`${process.env.REACT_APP_API_BASE_URL}/restaurant`);
};

export const fetchRestaurantById = async (id) => {
  return await axios.get(
    `${process.env.REACT_APP_API_BASE_URL}/restaurant/${id}`
  );
};
