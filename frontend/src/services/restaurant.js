import axios from "axios";

export const fetchRestaurants = async () => {
  return await axios.get("http://localhost:4000/restaurant");
};

export const fetchRestaurantById = async (id) => {
  return await axios.get(`http://localhost:4000/restaurant/${id}`);
};

