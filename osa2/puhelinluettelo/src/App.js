import React, { useState, useEffect } from 'react'
import FilterForm from './components/FilterForm'
import PersonForm from './components/PersonForm'
import Phonebook from './components/Phonebook'
import phoneService from './services/phoneService'
import Message from './components/Message'

const App = () => {
	const [ persons, setPersons] = useState([]) 
	const [ newName, setNewName ] = useState('')
	const [ newNumber, setNewNumber ] = useState('')
	const [ newFilter, setNewFilter ] = useState('')
	const [ message, setMessage ] = useState(null)
	const [ error, setError ] = useState(null)
	
	useEffect(() => {
		console.log('halp')
		phoneService
			.getAll()
			.then(response => {
				console.log(response)
				setPersons(response)
			})
			.catch(error => {
			console.log('not working')
			})
	},[])

	console.log('render App')
	const addPerson = (event) => {
		event.preventDefault()
		const personObject = {
			name: newName,
			number: newNumber
		}
		const found = persons.find(element => element.name === personObject.name);
		if (found) {
			if(window.confirm(`${personObject.name} is already on the list, replace with new information?`)) {
				const id = persons.filter(num => num.name === personObject.name)[0].id

				let tempPersons = [...persons]
				let index = tempPersons.findIndex(num => num.name === personObject.name)

				phoneService
				.update(id, personObject)
				.then(returnedPerson => {

					tempPersons[index] = returnedPerson
					setPersons(tempPersons)
					setMessage(`Updated person ${personObject.name}`)
					setTimeout(() => {
						setMessage(null)
					}, 2000)
					})
				.catch(error => {
					setError(`Person ${personObject.name} was already removed on server`)
					setTimeout(() => {
						setError(null)
					}, 2000)
				}
				)
		
			}
			
		} else 
		{
			phoneService
				.create(personObject)
				.then(returnedPerson => {
					setPersons(persons.concat(returnedPerson))
					})
			setMessage(`Added person ${personObject.name}`)
			setTimeout(() => {
			setMessage(null)
			}, 2000)
		}
		setNewName('')
		setNewNumber('')
	}

	const handleNameChange = (event) => {
		console.log(event.target.value)
		setNewName(event.target.value)
	}
	const handleNumberChange = (event) => {
		console.log(event.target.value)
		setNewNumber(event.target.value)
	}
	const handleFilterChange = (event) => {
		console.log(event.target.value)
		setNewFilter(event.target.value)
	}
	const killFunc = (event) => {
		let index = parseInt(event)
		let message = (persons.filter(num => num.id === index))
		console.log(`kill person no.${event}`)
		if (window.confirm(`Really remove ${message[0].name}?`)) {
		setPersons(persons.filter(num => num.id !== index))
			phoneService
			.kill(event)
			.then(console.log('yay'))
		setMessage(`Removed person ${message[0].name}`)
		setTimeout(() => {
          setMessage(null)
        }, 2000)
		}
	}
	
	return (
	<div>
		<Message message={message} msgClass='message'/>
		<Message message={error} msgClass='error'/>	
		
      <h2>Phonebook</h2>
	
		<FilterForm 
			content={newFilter} 
			controlFunc={handleFilterChange}/>
	  
      <h3>Add new Number</h3>
		
		<PersonForm 
			addFunc={addPerson}
			nameContent={newName} 
			nameFunc={handleNameChange}
			numberContent={newNumber} 
			numberFunc={handleNumberChange}/>
      <h3>Numbers</h3>

       <Phonebook newFilter={newFilter} persons={persons} eventHandle={killFunc}/>
		
	</div>
  )

}

export default App