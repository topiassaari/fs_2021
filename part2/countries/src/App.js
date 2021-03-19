import React, { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [temperature, setTemperature] = useState("");
  const [wind, setWind] = useState("");
  const [search, setSearchValue] = useState("");

  useEffect(() => {
    console.log("fetch");
    axios.get("https://restcountries.eu/rest/v2/all").then((response) => {
      console.log("promise fulfilled");
      setCountries(response.data);
    });
  }, []);

  const handleSearchValue = (event) => {
    setSearchValue(event.target.value);
  };
  const getWeather = (p) => {
    axios
      .get(
        "https://api.openweathermap.org/data/2.5/weather?q=" +
          p.capital +
          "&units=metric&appid=" +
          process.env.REACT_APP_API_KEY
      )
      .then((response) => {
        console.log(response.data);
        setTemperature(response.data.main.temp);
        setWind(response.data.wind.speed);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const showCountry = (p) => {
    getWeather(p);
    return (
      <div>
        <h1>{p.name}</h1>
        <p>Capital: {p.capital}</p>
        <p>Population: {p.population}</p>
        <h2>Languages</h2>
        <ul>
          {p.languages.map((language) => (
            <li key={language.name}>{language.name}</li>
          ))}
        </ul>
        <img height="200px" width="300px" src={p.flag} alt="flag" />
        <h2>Weather in {p.capital}</h2>
        <p>Temperature: {temperature}°C</p>
        <p>Wind speed: {wind}m/s</p>
      </div>
    );
  };
  const listCountries = (p) => {
    return p.map((country) => (
      <div>
        {country.name}{" "}
        <button onClick={() => setSearchValue(country.name)}>show</button>
      </div>
    ));
  };

  const filterCountries = (search, countries) => {
    var filteredCountries = countries
      .filter((country) => country.name.includes(search))
      .map((filtered) => filtered);
    if (filteredCountries.length > 9) {
      return <p>Too many matches, specify another filter</p>;
    }
    if (filteredCountries.length === 1) {
      return showCountry(filteredCountries[0]);
    } else {
      return listCountries(filteredCountries);
    }
  };
  return (
    <div>
      Find countries <input value={search} onChange={handleSearchValue} />
      {filterCountries(search, countries)}
    </div>
  );
};

export default App;
