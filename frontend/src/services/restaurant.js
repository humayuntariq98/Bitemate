import axios from "axios";

export const fetchRestaurants = async () => {
  return await axios.get("http://localhost:4000/restaurant");
};
