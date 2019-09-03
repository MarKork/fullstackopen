import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom';
import axios from 'axios'
import personService from './services/persons'
import './index.css'


const promise = axios.get('http://localhost:3002/')
console.log(promise)

const Persons = ({persons, searchName, handleDeleteButtonClick}) =>{
    if(!searchName){
        return (
            <div>
                {persons.map(person => <Person key={person.name} person={person} handleDeleteButtonClick={handleDeleteButtonClick}/>)}      
            </div>
        )
    }
    return(
        <div>    
             {persons.filter(p => p.name.toString().toLowerCase().includes(searchName))
              .map(p => <Person key={p.name} person={p} handleDeleteButtonClick={handleDeleteButtonClick}/>) }        
        </div>
    )
}
const Person = ({person, handleDeleteButtonClick}) =>{
    return(
        <div>
            <li style={{listStyleType: "none"}} key={person.name}> {person.name} {person.number}    
            <button onClick={()=>{handleDeleteButtonClick(person)}}>delete</button>
            </li>
        </div>
    )
}
const PersonForm = ({newName, newNumber, handleNewName, handleNewNumber,handleAddButtonClick}) =>{
    return(
        <div>
            <form onSubmit={handleAddButtonClick}>
                <div>name: <input             
                 value={newName} 
                 onChange={handleNewName}
                /></div>
                <div>number: <input             
                 value={newNumber} 
                 onChange={handleNewNumber}
                /></div>
            <button type="submit">add</button>
            </form>
        </div>
    )
}
const Filter = (props)=>{
  return(
    
      <div>filter shown with <input value={props.searchName}onChange={props.handleSearchName}/></div>
    
  )
}

const Notification = ({ message }) => {
  if (message.content === '') {
    return null
  }
  if(message.type==="error")
  return (
    <div className="error">
      {message.content}
    </div>
  )
  return (
    <div className="msg">
      {message.content}
    </div>)
}

const App = () => {
  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ searchName, setNewSearchName ] = useState('')
  const [ message, setMessage ] = useState({content:'', type:''})

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => 
        setPersons(initialPersons)
      )
  }, [])

  console.log('render', persons.length, 'persons')

  const handleAddButtonClick = (event) => {
    event.preventDefault()
    const nameObject = {
      name: newName,
      number: newNumber,
      id: newName,
    }
    let found=false
    const names=persons.map(person=>person.name)
    found=names.includes(newName)
    
    if(found){
        if(window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)){
          
          const foundPerson = persons.find(p => p.name === newName)
          const changedNameObject = {...foundPerson, number: newNumber}
          
          personService
          .update(nameObject.id, changedNameObject)
          .then(returnedPerson =>{
            setPersons(persons.map(p=>p.id!==newName ? p : changedNameObject))
              const newMessage = {
                content: `The number of ${newName} is updated`,
                type: 'msg'
              }
              setMessage(newMessage)
              setTimeout(() => {
                setMessage({content:'',type:''})
              }, 5000)
          })
          .catch(error =>{
              const newMessage = {
                content: `Information of ${newName} has already been removed from server.`,
                type: 'error'
              }
              setMessage(newMessage)
              setTimeout(() => {
                setMessage({content:'',type:''})
              }, 5000)
          })
          setNewName('')
          setNewNumber('')              
        }      
        else{
          setNewName('')
          setNewNumber('')
        }
    }else{
      personService
      .create(nameObject)
      .then(data => {
        setPersons(persons.concat(data))
        const newMessage = {
          content: `${newName} is added`,
          type: 'msg'
        }
        setMessage(newMessage)
        setTimeout(() => {
          setMessage({content:'',type:''})
        }, 5000)
        setNewName('')
        setNewNumber('')
      })
    }
  }
  
  const handleNewName = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }
  const handleNewNumber = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }
  const handleSearchName = (event) => {
    console.log(event.target.value)
    setNewSearchName(event.target.value)
  }

  const handleDeleteButtonClick = ( person) => {
    
    if (window.confirm(`Delete '${person.name}'?`)) {
      personService
      .remove(person.id)
      .then(data =>{
        setPersons(persons.filter(p=>p.id!==person.id))
        const newMessage = {
          content: `The number of ${person.name} is removed`,
          type: 'msg'
        }
        setMessage(newMessage)
        setTimeout(() => {
          setMessage({content:'',type:''})
        }, 5000)
        
      })
    }
  }



  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />
      <Filter  searchName={searchName} handleSearchName={(event)=>handleSearchName(event)}/>
      <h2>add a new</h2>
      <PersonForm handleAddButtonClick={(event) => handleAddButtonClick(event)} 
          newName={newName} 
          newNumber={newNumber} 
          searchName={searchName}
          handleNewName={(event)=>handleNewName(event)} 
          handleNewNumber={(event)=>handleNewNumber(event)} 
          />
      
      <h2>Numbers</h2>
      <Persons persons={persons} 
          searchName={searchName}
          handleDeleteButtonClick={(event) => handleDeleteButtonClick(event)}
          />
    </div>
  )

}

ReactDOM.render(<App />, document.getElementById('root'));
