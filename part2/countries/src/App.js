import React, { useState, useEffect } from "react";
import axios from "axios";

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

  const filterCountries = (search, countries) => {
    var filteredCountries = countries
      .filter((country) => country.name.includes(search))
      .map((filtered) => filtered);
    if (filteredCountries.length > 9) {
      return <p>Too many matches, specify another filter</p>;
    }
    if (filteredCountries.length === 1) {
      var country = filteredCountries[0];
      return (
        <div>
          <h1>{country.name}</h1> 
          <p>Capital: {country.capital}</p>
          <p>Population: {country.population}</p>
          <h2>Languages</h2>
          <ul>
            {country.languages.map((language) => (
              <li key={language.name}>{language.name}</li>
            ))}
          </ul>
          <img height="200px" width="300px" src={country.flag} alt="flag" />
        </div>
      );
    } else {
      return filteredCountries.map((country) => (
        <div>
        <p key={country.name}>{country.name}</p>
        </div>
      ));
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
