import React, { useState } from 'react'

const Form = (props) => {
  return (
      <form onSubmit={props.addPerson}>
        <div>
          name: <input value={props.newName} onChange={props.handleNameChange}/>
        </div>
        <div>
          number: <input />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
  )
}

const Entry = ({ person }) => {
  return (
    <p>{person.name}</p>
  )
}

const List = ({ persons }) => {
  return (
    <div>
      {persons.map(person =>
        <Entry key={person.name} person={person} />
      )}
    </div>
  )
}

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')

  const addPerson = (event) => {
    event.preventDefault()
    const nameObject = {
      name: newName
    }
    const filter = persons.filter(person => person.name === nameObject.name)

    if (filter.length > 0) {
      window.alert(`Phonebook already contains ${nameObject.name}`)
    } else {
      setPersons(persons.concat(nameObject))
    }

    setNewName('')
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Form addPerson={addPerson} newName={newName} handleNameChange={handleNameChange}/>
      <h2>Numbers</h2>
      <List persons={persons} />
    </div>
  )
}

export default App