import { useState, useEffect } from 'react'
import axios from 'axios'
import CountryDetails from './components/CountryDetails'
const App = () => {
  const [query, setQuery] = useState("")
  const [data, setData] = useState([])
  const [selectedCountry, setSelectedCountry] = useState(null)

  useEffect(() => {
    axios
      .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
      .then(response => {
        console.log("Promise fulfilled! Data arrived from the API!")
        setData(response.data)
      })
  }, [])

  const handleQuery = (event) => {
    setQuery(event.target.value)
    setSelectedCountry(null)  
  }

  const handleShow = (country) => {
    setSelectedCountry(country)
  }

  const filteredCountries = data.filter(c =>
    c.name.common.toLowerCase().includes(query.toLowerCase())
  )

  return (
    <>
      <form>
        <div>Find Countries: <input value={query} onChange={handleQuery} /></div>
      </form>

      {query && filteredCountries.length > 10 && (
        <p>Too many matches, please make your query more specific.</p>
      )}

      {query && filteredCountries.length <= 10 && filteredCountries.length > 1 && (
        <ul>
          {filteredCountries.map(c => (
            <li key={c.cca3}>
              {c.name.common} <button onClick={() => handleShow(c)}>show</button>
            </li>
          ))}
        </ul>
      )}

      {query && filteredCountries.length === 1 && (
        <CountryDetails country={filteredCountries[0]} />
      )}

      {selectedCountry && <CountryDetails country={selectedCountry} />}
    </>
  )
}
export default App
