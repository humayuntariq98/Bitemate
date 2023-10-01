import React, { useEffect, useState, useMemo } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Food from "../components/Food";
import Carousel from "../components/Carousel";
import { fetchRestaurants } from "../services/restaurant";

export default function Home() {
  const [restaurant, setRestaurant] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log("fetching");
    getRestaurant();
  }, []);

  async function getRestaurant() {
    setLoading(true);
    const response = await fetchRestaurants();
    if (response?.data) {
      setRestaurant(response.data);
      setLoading(false);
    }
  }

  return (
    <div>
      <div>
        <Carousel />
      </div>
      <div>
        {restaurant?.map((r) => (
          <Food
            key={r._id}
            name={r.name}
            slogan={r.slogan}
            restaurantId={r._id}
          ></Food>
        ))}
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}
