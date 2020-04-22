import React from 'react'

const Country = (props) => {
	return (
		<div>
			{props.country.name}
		<button onClick={props.show} value={props.country.name}>show</button>
		</div>
	)
}

export default Country