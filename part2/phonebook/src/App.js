import React, { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import phoneService from "./services/phoneService";
import Persons from "./components/Persons";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterValue, setFilterValue] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const fetchPersons = () => {
    phoneService.getAll().then((response) => {
      setPersons(response);
    });
  };

  useEffect(() => {
    fetchPersons();
  }, []);

  const updateNumber = (id, e) => {
    var result = window.confirm(
      `${newName} is already added to phonebook, replace the old number with new one?`
    );
    if (result === true) {
      phoneService.update(id, e).then(() => {
        setSuccess(`Updated ${newName}`);
        fetchPersons();
        setTimeout(() => {
          setSuccess(null);
        }, 5000);
      });
    }
  };

  const deletePerson = (e) => {
    var result = window.confirm(`delete ${e.name}?`);
    if (result === true) {
      phoneService
        .removePerson(e)
        .then(() => fetchPersons())
        .catch((error) => {
          console.log(error);
          setError(`User ${e.name} was already deleted.`);
          setTimeout(() => {
            fetchPersons();
            setError(null);
          }, 5000);
        });
    }
  };

  const addPerson = (e) => {
    e.preventDefault();
    const personObject = {
      name: newName,
      number: newNumber,
    };
    var c = 0;
    persons.forEach((e) => {
      if (e.name === newName || e.number === newNumber) {
        c += 1;
      }
      return c;
    });

    if (c === 0) {
      phoneService.create(personObject).then((response) => {
        setPersons(persons.concat(response));
        setSuccess(`Added ${newName}`);
        setTimeout(() => {
          setSuccess(null);
        }, 5000);
        setNewName("");
        setNewNumber("");
      });
    } else {
      var id;
      persons.forEach((e) => {
        if (e.name === newName) {
          id = e.id;
        }
      });
      updateNumber(id, personObject);
    }
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };
  const handleFilterChange = (event) => {
    setFilterValue(event.target.value);
  };

  return (
    <div>
      <Notification success={success} error={error} />
      <h2>Phonebook</h2>
      <Filter val={filterValue} changeValue={handleFilterChange} />
      <h2>Add a new</h2>
      <PersonForm
        name={newName}
        number={newNumber}
        submit={addPerson}
        nameChangeHanldler={handleNameChange}
        numberChangeHandler={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons
        persons={persons}
        handleDelete={deletePerson}
        filter={filterValue}
      />
    </div>
  );
};

export default App;
