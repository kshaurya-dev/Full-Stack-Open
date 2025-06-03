import { useState } from "react"
import axios from 'axios'
import personService from '../services/persons'
const Form =({persons , setPersons , setNotificationMessage})=>{

    const [newName , setNewName]=useState("")
    const [newNumber , setNewNumber]=useState("")

    const handleNameChange=(event)=>setNewName(event.target.value)
    const handleNumberChange=(event)=>setNewNumber(event.target.value)
    
    const handleNewPerson=(event)=>{
      event.preventDefault()
      const existingPerson = persons.find(person=> person.name===newName)
      if(existingPerson){
        if(window.confirm(`${newName} is already added to the PhoneBook , replace old number with new one ? `)){
          const changedNumber={...existingPerson , number:newNumber}
          const numberUpdated = persons.map(person=>
          person.id===changedNumber.id ? changedNumber : person)
          personService.update(changedNumber)
          .then(response=>{
            console.log("a number was changed !")
            setPersons(numberUpdated);
            setNewName("")
            setNewNumber("")
            setNotificationMessage(`${changedNumber.name}'s number was updated.`)
            setTimeout(() =>{
            setNotificationMessage('')}, 3000)
          })
          .catch(error => {
            console.log("promise unfullfilled , an error was caught !")
            setNotificationMessage(`${changedNumber.name} has already been removed from the server.`)
            setTimeout(() =>{
              setNotifyMessage('')}, 5000)
          })
          }
      }
      else{
        const newObject = {name:newName ,number:newNumber}
        personService.create(newObject)
        .then(response =>{
          console.log("a number was added to  server successfully!")
          setPersons(persons.concat(response.data))
          setNewName("")
          setNewNumber("")
          setNotificationMessage(`${newObject.name} was added to the phonebook.`)
          setTimeout(() =>{
            setNotificationMessage('')}, 3000)
        })
        }
    }
    return (
      <form onSubmit={handleNewPerson}>
        <div>Name: <input  value={newName} onChange={handleNameChange}/></div>
        <div>Number: <input  value={newNumber} onChange={handleNumberChange}/></div>
        <div><button type="submit">add</button></div>
      </form>
    )
    
}
export default Form