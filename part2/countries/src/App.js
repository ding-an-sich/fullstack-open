import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Filter = (props) => {
  return (
    <div>
      search: <input value={props.searchFilter} onChange={props.handleSearchFilter}/>
    </div>
  )
}

const Details = ({ country }) => {

  return (
    <div>
      <h2>{country.name}</h2>
      <p>capital: {country.capital}</p>
      <p>population: {country.population}</p>
      <div>
        <h3>languages</h3>
        <ul>
          {country.languages.map(lang =>
            <li key={lang.iso639_1}>{lang.name}</li>
            )}
        </ul>
      </div>
      <div>
        <img src={country.flag} alt={`Flag of ${country.name}`}></img>
      </div>
    </div>
  )
}

const List = ({ countries, handleSearchFilter }) => {
  if (countries.length > 1 && countries.length <= 10) {
    return (
      <div>
        {countries.map(country =>
          <div key={country.name}>
          <p> {country.name} 
            <button value={country.name} onClick={handleSearchFilter}>show</button>
          </p> 
          </div>
          )}
      </div>
    )
  } else if (countries.length === 1) {
    return (
      <div>
        <Details country={countries[0]}/>
      </div>
    )
  } else if (countries.length === 0) {
    return (
      <p>No matches</p>
    )
  }

  return (
    <p>Too many matches. Specify the search.</p>
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
    : countries.filter((country) => country.name.toUpperCase().includes(searchFilter.toUpperCase()))

  return (
    <div>
      <h2>Country info</h2>
      <Filter searchFilter={searchFilter} handleSearchFilter={handleSearchFilter} />
      <List countries={countriesList} handleSearchFilter={handleSearchFilter}/>
    </div>
  )
}

export default App;
