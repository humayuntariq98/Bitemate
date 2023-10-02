import "./App.css";
import Home from "./pages/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import Restaurant from "./pages/Restaurant";
import "../node_modules/bootstrap-dark-5/dist/css/bootstrap-dark.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";
import Profile from "./pages/profile";

export default function App() {
  return (
    <>
      <Navbar></Navbar>
      <Routes>
        <Route exact path="/profile" element={<Profile />} />
        <Route exact path="/" element={<Home />} />
        <Route exact path="/login" element={<Login />} />
        <Route path="/restaurant/:restaurantId" element={<Restaurant />} />
      </Routes>
    </>
  );
}
