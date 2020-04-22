import React from 'react'

const Crs = ({ crs }) => {
		
  const total = crs.parts.reduce((totalEx, part) => totalEx + part.exercises, 0);
  return (
	<div>
		<h1>{crs.name}</h1>
		<ul>
		{crs.parts.map((part, i) =>
			<Part key={part.id} part={part}/>
		)}
		<li>Total of {total} exercises</li> 
		</ul>
	</div>	
  )
}

const Part = ({ part }) => {
  return (
    <li>{part.name} {part.exercises}</li>
  )
}

const Course = ({ course }) => {

	return (
	<div>
		{course.map((crs, i) =>
			<Crs key={crs.id} crs={crs}/>
		)}
	</div>
  )
}

export default Course