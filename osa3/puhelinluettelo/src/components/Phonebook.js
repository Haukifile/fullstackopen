import React from 'react'
import Person from '../components/Person'

const Phonebook = (props) => {
  const handleKill = (event) => props.eventHandle(event.target.value)
  if (props.newFilter!=='') {

    return (
      <div>
        {props.persons.filter(person => person.name.toLowerCase().includes(props.newFilter.toLowerCase())).map((pers,i) =>
          <Person key={i} person={pers}/>
        )}
      </div>
    )

  } else
  {
    return (
      <div>
        {props.persons.map((pers,i) =>
          <Person key={i} person={pers} pressFunc={handleKill} persNo={pers.id}/>
        )}
      </div>
    )
  }
}

export default Phonebook