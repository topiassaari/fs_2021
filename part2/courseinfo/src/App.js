import React from 'react'
import Course from './components/course'

const App = (props) => {
  return (
    <div>
    <h1>Web development curriculum</h1>
    {props.course.map((c) => {
      return <Course course={c}></Course>
    })}
  </div>
  )
}

export default App 