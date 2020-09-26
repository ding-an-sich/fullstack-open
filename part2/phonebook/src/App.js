import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import List from './components/List'
import Form from './components/Form'
import personService from './services/persons'

const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ searchFilter, setSearchFilter ] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }
    const filteredPerson = persons.filter(person => person.name === personObject.name).pop()

    if (filteredPerson) {
      if (window.confirm(
        `Phonebook already contains ${personObject.name}, replace the number?`
        )){
        updatePerson(filteredPerson.id, personObject)
      }
    } else {
      personService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
        })
    }
    setNewNumber('')
    setNewName('')
  }

  const destroyPerson = (id) => {
    const person = persons.find(p => p.id === id)
    if (window.confirm(`Are you sure you want to delete ${person.name}?`))
    personService
      .destroy(person.id)
      .then(() => {
        setPersons(persons.filter(person => person.id !== id))
      })
  }

  const updatePerson = (id, newPerson) => {
    personService
      .update(id, newPerson)
      .then(returnedPerson => {
        setPersons(persons.map(person => person.id !== id ? person : returnedPerson))
      })
      .catch(error => {
        alert(
          `Entry not found! Something went wrong! ${error}`
        )
        setPersons(persons.filter(person => person.id !== id))
      })
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
    : persons.filter((person) => {
      const comparison = person.name.localeCompare(searchFilter, undefined, {sensitivity: 'base'})
      return comparison === 0
    })

  return (
    <div>
      <h1>Phonebook</h1>
      <Filter searchFilter={searchFilter} handleSearchFilter={handleSearchFilter}/>
      <h2>Add new entry</h2>
      <Form addPerson={addPerson} newName={newName} handleNameChange={handleNameChange}
            handleNumberChange={handleNumberChange} newNumber={newNumber}
      />
      <h2>Entries</h2>
      <List persons={personList} destroyPerson={destroyPerson}/>
    </div>
  )
}

export default App