import React, {useState, useEffect} from 'react'
import axios from 'axios'
import ShowWeather from '../components/ShowWeather'

const WeatherDetails = (props) => {
	console.log('Still alive', props)
	const [weather, setWeather] = useState([])

	const params = {
		access_key: process.env.REACT_APP_API_KEY,
		query: `${props.city},${props.country}`
	}
	
	const hook = () => {
		console.log(`call api `)
		axios
			.get('http://api.weatherstack.com/current', {params}) 
			.then(response => {
		if (response.status===200){
		console.log(response)
		setWeather(response.data)
		} else {
		 console.log('fail')
		}
		})
	} 
	
	useEffect(hook,[])

	console.log('weather set as ', weather)
	
	return (
	<div>
		<h2>Weather in {props.city}</h2>
		<ShowWeather data={weather}/>

	</div>	
	)
}
export default WeatherDetails