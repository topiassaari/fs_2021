import React from 'react'


const Persons = (props) => {
  return (
    <div>
      <div>{props.persons.filter(person => person.name.includes(props.filter)).map(filtered => 
      <p key={filtered.name}>{filtered.name} {filtered.number}</p>)}</div>
    </div>
  )
}

export default Persons