import React from 'react'

const Person = (props) => {
	return (
	<div>
	{props.person.name} {props.person.number}
	<button onClick={props.pressFunc} value={props.persNo}>delete</button>
	</div>
	)
}
export default Person