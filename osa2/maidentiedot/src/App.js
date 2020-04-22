import React, { useState, useEffect } from 'react'
import CountryList from './components/CountryList'
import FindForm from './components/FindForm'
import axios from 'axios'

const App = () => {
	
	const handleEvent = (event) => {
		setFilter(event)
	}
	
	const [countries, setCountries] = useState([])
	const [newFilter, setFilter] = useState('')
	const handleFilterChange = (event) => {
		console.log(event.target.value)
		setFilter(event.target.value)
	}

	const hook = () => {
		console.log('effect')
		axios
			.get('https://restcountries.eu/rest/v2/all')
			.then(response => {
		console.log('promise fulfilled')
		setCountries(response.data)
		})
	} 
	
	useEffect(hook,[])
	
  return (
    <div>
		<h1>Country info</h1>
		<FindForm 
			value={newFilter}
			controlFunc={handleFilterChange}/>
		<h2>List of countries</h2>
		<CountryList
			countries={countries}
			newFilter={newFilter}
			eventHandle={handleEvent}/>	
    </div>
  );
}

export default App;
