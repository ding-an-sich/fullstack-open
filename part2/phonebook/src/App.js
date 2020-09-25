import React, { useState } from 'react'

const Form = (props) => {
  return (
      <form onSubmit={props.addPerson}>
        <div>
          name: <input value={props.newName} onChange={props.handleNameChange}/>
        </div>
        <div>
          number: <input value={props.newNumber} onChange={props.handleNumberChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
  )
}

const Entry = ({ person }) => {
  return (
    <p>{person.name} {person.number}</p>
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

const Filter = (props) => {
  return (
    <div>
      search: <input value={props.searchFilter} onChange={props.handleSearchFilter}/>
    </div>
  )
}

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ searchFilter, setSearchFilter ] = useState('')

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }
    const filter = persons.filter(person => person.name === personObject.name)

    if (filter.length > 0) {
      window.alert(`Phonebook already contains ${personObject.name}`)
    } else {
      setPersons(persons.concat(personObject))
    }

    setNewNumber('')
    setNewName('')
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  const handleSearchFilter = (event) => {
    setSearchFilter(event.target.value)
  }

  const personList = searchFilter === ''
    ? persons
    : persons.filter(person => person.name.toUpperCase() === searchFilter.toUpperCase())

  return (
    <div>
      <h1>Phonebook</h1>
      <Filter searchFilter={searchFilter} handleSearchFilter={handleSearchFilter}/>
      <h2>Add new entry</h2>
      <Form addPerson={addPerson} newName={newName} handleNameChange={handleNameChange}
            handleNumberChange={handleNumberChange} newNumber={newNumber}
      />
      <h2>Entries</h2>
      <List persons={personList} />
    </div>
  )
}

export default App