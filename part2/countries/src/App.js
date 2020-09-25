import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Filter = (props) => {
  return (
    <div>
      search: <input value={props.searchFilter} onChange={props.handleSearchFilter}/>
    </div>
  )
}

const List = ({ countries }) => {
  console.log(countries)
  return (
    null
  )
}

const App = () => {
  const [ countries, setCountries ] = useState([])
  const [ searchFilter, setSearchFilter ] = useState('')

  useEffect(() => {
    axios.get('https://restcountries.eu/rest/v2/all')
          .then(response => {
            setCountries(response.data)
          })
  }, [])

  const handleSearchFilter = (event) => {
    setSearchFilter(event.target.value)
  }

  const countriesList = searchFilter === ''
    ? countries
    : countries.filter((country) => country.name.includes(searchFilter))

  return (
    <div>
      <h2>Country info</h2>
      <Filter searchFilter={searchFilter} handleSearchFilter={handleSearchFilter} />
      <List countries={countriesList} />
    </div>
  )
}

export default App;
