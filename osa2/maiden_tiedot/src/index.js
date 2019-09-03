import React,  { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios'


const FilterCountries = ({countries,searchCountry, handleShowButtonClick}) => {
    let foundCountries=countries
        .filter(country=>country.name.toString().toLowerCase()
        .includes(searchCountry.toLowerCase()))
        .map(country =>country)
    if(foundCountries.length>10&&searchCountry!==''){
        return(
            <div>
                <p>Too many matches, specify another filter</p>
            </div>
        )
    }
    if(foundCountries.length<10&&foundCountries.length>1){
        return(           
            <div>                
                {foundCountries
                    .map(country=><li style={{listStyleType: "none"}} key={country.name}> {country.name}  
                    <button onClick={handleShowButtonClick(country.name)}>show</button></li>) }                
            </div>
        )
    }
    if(foundCountries.length===1){
        const c= foundCountries[0]        
        return (
            <div><ShowInfo c={c} /></div>
        )        
    }
    return (
        <div></div>
    )
}

const ShowInfo = ({c}) => {
    return(
        <div><h2>{c.name}</h2>
        <p>capital {c.capital}</p>
        <p>population {c.population}</p> 
        <h3>languages</h3>
        <p>{c.languages.map(l=> <li  key={l.name}>{l.name}</li>)}</p>
        <img src={c.flag} alt="" width="400" height="300"/></div>
    )
}

const App = () => {
    const [ countries, setCountries] = useState([]) 
    const [ searchCountry, setSearched ] = useState('')
    
    useEffect(() => {
        console.log('effect')
        axios
            .get('https:restcountries.eu/rest/v2/all')
            .then(response => {
                const countries = response.data
                setCountries(countries)
            })
    }, [])

    const handleSearchedCountry = (event) => {
        setSearched(event.target.value)
    }
    
    const handleShowButtonClick = (value) => {
        return () => {
            setSearched(value)
        }
    }

    return( 
        <div>
            find countries <input value={searchCountry}onChange={handleSearchedCountry}/>        
            <FilterCountries 
                countries={countries} 
                searchCountry={searchCountry} 
                handleShowButtonClick={(event)=>handleShowButtonClick(event)}
                 />
        </div>
    )
}
ReactDOM.render(<App />, document.getElementById('root'));


