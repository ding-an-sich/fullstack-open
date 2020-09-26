import React from 'react'

const Entry = ({ person, destroyPerson }) => {
    return (
      <p>{person.name} {person.number} <button onClick={destroyPerson}>delete</button></p>
    )
}
  
const List = ({ persons, destroyPerson}) => {
    return (
      <div>
        {persons.map(person =>
          <Entry key={person.name} person={person} destroyPerson={() => destroyPerson(person.id)}/>
        )}
      </div>
    )
}

export default List