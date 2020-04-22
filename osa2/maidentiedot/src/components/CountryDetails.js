import React from 'react'
import Lang from '../components/Lang'
import WeatherDetails from '../components/WeatherDetails'

const CountryDetails = (props) => {
	
	return (
	<div>
		<h1>{props.country.name}</h1>
		<li>Capital {props.country.capital}</li>
		<li>Population {props.country.population}</li>
		<h2>Languages</h2>
			{props.country.languages.map((lang,iso639_1) =>
				<Lang key={iso639_1} language={lang}/>
			)}
		<img src={props.country.flag} alt={props.country.name} width="200"/>	
		<WeatherDetails city = {props.country.capital} country = {props.country.name} />
	</div>	
	)
}
export default CountryDetails