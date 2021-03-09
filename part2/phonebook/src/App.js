import React, { useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filterValue, setFilterValue ] = useState('')
    const addPerson = (e) => {
    e.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber,
    }
    var c = 0;
    persons.forEach(e => {
      if ((e.name === newName) || e.number === newNumber) {
        c += 1;
      } 
return c;
    });

    if (c === 0) {
      setPersons(persons.concat(personObject))
      setNewName('')
      setNewNumber('')
      }
      else {
        window.alert(`${newName} is already added to phonebook`);
      }
  }
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  const handleFilterChange = (event) => {
    setFilterValue(event.target.value)
  }
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter val={filterValue} changeValue={handleFilterChange}/>
      <h2>Add a new</h2>
      <PersonForm name={newName} number={newNumber} submit={addPerson} nameChangeHanldler={handleNameChange} numberChangeHandler={handleNumberChange}/>
      <h2>Numbers</h2>
      <Persons persons={persons} filter={filterValue}/>
</div>
  )
}

export default App