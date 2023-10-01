import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Food from "../components/Food";
import Carousel from "../components/Carousel";
import { fetchRestaurants } from "../services/restaurant";

export default function Home() {
  const [restaurant, setRestaurant] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
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
        <Navbar />
      </div>
      <div>
        <Carousel />
      </div>
      <div className="m-3">
        {restaurant?.map((r) => (
          <Food name={r.name}></Food>
        ))}
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}
