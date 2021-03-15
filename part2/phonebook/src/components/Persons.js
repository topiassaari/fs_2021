import React from 'react'


const Persons = (props) => {
  return (
    <div>
      <div>{props.persons.filter(person => person.name.includes(props.filter)).map(filtered => 
      <div key={filtered.name}>{filtered.name} {filtered.number}<button onClick={()=> props.handleDelete(filtered)}>delete</button></div>)}
    </div>
    </div>
  )
}

export default Persons