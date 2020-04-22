import React from 'react'
import Country from '../components/Country'
import CountryDetails from '../components/CountryDetails'

	
const CountryList = (props) => {
	const handleToo = (event) => props.eventHandle(event.target.value)

	let copy = props.countries.filter(country => country.name.toLowerCase().includes(props.newFilter.toLowerCase()))
	
	if (copy.length > 10) {
		return (
			<div>
			Too many matches, please choose a more specific filter
			</div>
		)
	} else 
	if (copy.length === 0) {
		return (
			<div>
			No matches
			</div>
		)
	} else
	if (copy.length === 1) {
		return (
			<div>
			<CountryDetails country={copy[0]}/>
			</div>
		)
	}	
	else 
	{
		return (
			<div>
				{copy.map((ctr,i) =>
					<Country key={i} country={ctr} show={handleToo}/>
				)}
			</div>
		)
	}
}

export default CountryList