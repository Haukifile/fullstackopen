import React from 'react'

const ShowWeather = (props) => {
	
	if (props.data.length===0) {
	return (
		<div>
		<h3>No weather here</h3>
		</div>
		)
	} else {
	return (
	<div>
		<li>Temperature: {props.data.current.temperature} c</li>
		<img src={props.data.current.weather_icons} alt={props.data.current.weather_descriptions}/>
		<li>Wind: {props.data.current.wind_speed} km/h in direction {props.data.current.wind_dir}</li>
	</div>	
	)
	}
}
export default ShowWeather