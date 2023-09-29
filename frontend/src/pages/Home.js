import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Food from "../components/Food";
import Carousel from "../components/Carousel";

export default function Home() {
  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div>
        <Carousel/>
      </div>
      <div>
        <Food />
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}
