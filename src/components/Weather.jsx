import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom"; // Navigeringslänk för att byta sida
import "./Weather.css"; //  CSS för styling

//  ikoner som används för olika väderförhållanden
import clear_icon from "../assets/clear.png";
import cloud_icon from "../assets/cloud.png";
import drizzle_icon from "../assets/drizzle.png";
import humidity_icon from "../assets/humidity.png";
import rain_icon from "../assets/rain.png";
import search_icon from "../assets/search.png";
import snow_icon from "../assets/snow.png";
import wind_icon from "../assets/wind.png";

const Weather = () => {
  const inputRef = useRef(); // Skapar en referens till input-fältet
  const [weatherData, setWeatherData] = useState(false); // State för att lagra väderdata

  // Objekt som matchar väderkoder från API:et med motsvarande ikon
  const allicons = {
    "01d": clear_icon,
    "01n": clear_icon,
    "02d": cloud_icon,
    "02n": cloud_icon,
    "03d": cloud_icon,
    "03n": cloud_icon,
    "04d": drizzle_icon,
    "04n": drizzle_icon,
    "09d": rain_icon,
    "09n": rain_icon,
    "10d": rain_icon,
    "10n": rain_icon,
    "13d": snow_icon,
    "13n": snow_icon,
  };

  // Funktion för att hämta väderdata baserat på stadens namn
  const search = async (city) => {
    if (city === "") {
      alert("Enter City Name"); // Visar en varning om input-fältet är tomt
      return;
    }
    try {
      // Skapar API-anropet med stadens namn och API-nyckeln från miljövariabeln
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`;

      const response = await fetch(url); // Hämtar api :)
      const data = await response.json(); // Konverterar svaret till JSON
      if (!response.ok) {
        alert(data.message); // Visar ett felmeddelande om anropet misslyckas
        return;
      }

      console.log(data); // Loggar väderdata i konsolen för debugging

      // Väljer rätt ikon baserat på väderkoden från API:et
      const icon = allicons[data.weather[0].icon] || clear_icon;

      // Uppdaterar state med den hämtade väderinformationen
      setWeatherData({
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        temperature: Math.floor(data.main.temp),
        location: data.name,
        icon: icon,
      });
    } catch (error) {
      setWeatherData(false); // Återställer väderdata om ett fel uppstår
      console.error("Error in fetching weather data"); // Loggar felet i konsolen
    }
  };

  // useEffect körs vid komponentens första render och hämtar väderdata för New York
  useEffect(() => {
    search("New York");
  }, []);

  return (
    <div className="weather">
      {/* Sökfält för att ange stadens namn */}
      <div className="search-bar">
        <input ref={inputRef} type="text" placeholder="Search" />
        <img
          src={search_icon}
          alt="Search"
          onClick={() => search(inputRef.current.value)} // Anropar search-funktionen vid klick
        />
      </div>

      {/* Om weatherData har ett värde, visa väderinformationen */}
      {weatherData ? (
        <>
          <img src={weatherData.icon} alt="Weather Icon" className="weather-icon" />
          <p className="temperature">{weatherData.temperature}°c</p>
          <p className="location">{weatherData.location}</p>
          <div className="weather-data">
            {/* Visar luftfuktighet */}
            <div className="col">
              <img src={humidity_icon} alt="Humidity Icon" />
              <div>
                <p>{weatherData.humidity}%</p>
                <span>Humidity</span>
              </div>
            </div>

            {/* Visar vindhastighet */}
            <div className="col">
              <img src={wind_icon} alt="Wind Icon" />
              <div>
                <p>{weatherData.windSpeed} km/h</p>
                <span>Wind Speed</span>
              </div>
            </div>
          </div>
        </>
      ) : (
        <></> // Om det inte finns någon data, renderas ingenting
      )}

      {/* Länk för att navigera till API-sidan */}
      
    </div>
  );
};

export default Weather;
