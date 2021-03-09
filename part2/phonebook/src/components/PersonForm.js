import React from 'react'

const PersonForm = (props) => {
  return (
    <div>
      <form onSubmit={props.submit}>
        <div>
          name: <input value={props.name}
          onChange={props.nameChangeHanldler}/>
        </div>
        <div>number: <input value={props.number}
          onChange={props.numberChangeHandler}/></div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  )
}

export default PersonForm