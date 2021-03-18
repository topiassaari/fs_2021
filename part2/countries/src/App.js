import React, { useState, useEffect } from "react";
import axios from "axios";
require('dotenv').config();

const App = () => {
  const [countries, setCountries] = useState([]);
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
  const showCountry = (p) => {
axios.get("http://api.openweathermap.org/data/2.5/weather?q="+p.capital+"&appid=" + process.env.WEATHER_API)
.then(response => {
  const weather = response.data;
  return (
    <div>
      {console.log(weather)}
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
      <h2>Weather in {weather.name}</h2>
    </div>
  );
}).catch(error => {
  console.log(error);
});

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
      console.log(filteredCountries);
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
