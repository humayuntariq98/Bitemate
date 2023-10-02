import React, { useEffect, useState } from "react";
import { fetchRestaurantById } from "../services/restaurant";
import { useParams } from "react-router";
import MenuItem from "../components/MenuItem";
import { useAuth0 } from "@auth0/auth0-react";

export default function Restaurant() {
  const [restaurant, setRestaurant] = useState(null);
  const [loading, setLoading] = useState(false);
  const { restaurantId } = useParams();
  const { user } = useAuth0();
  const [existingOrders, setExistingOrders] = useState(null);

  

  useEffect(() => {
    getRestaurant(restaurantId);
  }, [restaurantId]);
  async function getRestaurant(id) {
    const response = await fetchRestaurantById(id);
    console.log("response", response);
    if (response?.data) {
      setRestaurant(response.data);
      setLoading(false);
    }
  }

  if (loading) {
    // return <Loader width={50} height={50} />;
    return "loading...";
  }
  return (
    <div className="container">
      <img
        className="img-fluid banner"
        style={{ width: "100%", height: "200px" }}
        alt="banner for restaurant"
        src={restaurant?.bannerImage}
      ></img>
      <h5>{restaurant?.name}</h5>
      {restaurant?.menu?.map(({ name, price, image, _id }) => (
        <MenuItem
          key={_id}
          name={name}
          price={price}
          image={image}
          restaurantId={restaurant?._id}
          itemId={_id}
          userId={user?.sub}
        ></MenuItem>
      ))}
    </div>
  );
}
