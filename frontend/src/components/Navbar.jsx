import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import LoginButton from "./Auth/LoginButton";
import LogoutButton from "./Auth/LogoutButton";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
export default function Navbar() {
  const { isLoading, isAuthenticated, user } = useAuth0();
  const [weatherData, setWeatherData] = useState(null);
  const datafrom = useAuth0();
  useEffect(() => {
    fetchWeatherData();
  }, []);

  const fetchWeatherData = async () => {
    const weatherRes = await axios.get(
      `${process.env.REACT_APP_WEATHER_API_URL}/350126?apikey=${process.env.REACT_APP_WEATHER_API_KEY}`
    );
    console.log("weather", weatherRes?.data);
    if (weatherRes?.data) {
      setWeatherData(weatherRes?.data?.[0]);
    }
  };
  console.log(datafrom, "seeinf data");
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-danger">
        <div className="container-fluid">
          <Link className="navbar-brand fs-1 fst-italic" to="/">
            Bitemate
          </Link>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/">
                  Home
                </Link>
              </li>
              {isAuthenticated && (
                <li className="nav-item">
                  <Link className="nav-link">
                    Current Temp: {weatherData?.Temperature?.Imperial?.Value} $
                    {weatherData?.Temperature?.Imperial?.Unit}
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>

        {!isLoading ? (
          <>
            <div>
              {isAuthenticated ? (
                <>
                  {" "}
                  <Link to="/profile">My Profile</Link> <LogoutButton />
                </>
              ) : (
                <LoginButton />
              )}
            </div>
          </>
        ) : null}
      </nav>
    </div>
  );
}
