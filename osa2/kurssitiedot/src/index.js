import React from 'react'
import ReactDOM from 'react-dom'
import Course from './components/Course'

const App = () => {
  const courses = [
  {
    name: 'Half Stack application development',
    id: 1,
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      },
	  {
        name: 'Lists are fun',
        exercises: 11,
        id: 4
      }
    ]
  },
  {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
	 },
	{
      name: 'Test course',
      id: 3,
      parts: [
        {
          name: 'First part',
          exercises: 1,
          id: 1
        },
        {
          name: 'Second part',
          exercises: 2,
          id: 2
        }
      ]
	 }
	]

  return (
    <div>
      <Course course={courses} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))