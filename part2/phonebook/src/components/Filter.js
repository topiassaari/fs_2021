import React from 'react'

const Filter = (props) => {
  return (
    <div>
        filter by name <input value={props.val} onChange={props.changeValue}/>
    </div>
  )
}

export default Filter