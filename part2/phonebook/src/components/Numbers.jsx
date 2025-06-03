import { useState , useEffect} from "react"
import personService from '../services/persons'
const Numbers=({persons , setPersons , setNotificationMessage})=>{
  
    const [filtered , setFiltered]=useState(persons)
    const [query , setQuery]=useState("")

    const handleQuery=(event)=>setQuery(event.target.value.toLowerCase())
    
    useEffect(() => {
        const  filteredPersons = persons.filter( person => person.name.toLowerCase().startsWith(query))
        setFiltered(filteredPersons)
      }, [persons , query]);


    const handlePersonDelete=(deletedID)=>{
     const toDelete=persons.find(person =>person.id===deletedID)
     if(window.confirm(`Delete ${toDelete.name} ? `)){
      personService.remove(deletedID)
    .then(response =>{
      console.log("an entry was deleted !")
      const updatedPersons = persons.filter(person=>person.id !=deletedID);
      setPersons(updatedPersons)
      setNotificationMessage(`${toDelete.name} was deleted .`)
      setTimeout(() =>{
        setNotificationMessage('')}, 5000)
    })
    .catch(error => {
      console.log("prmoise unfullfilled , caught error")
      setNotificationMessage(`${toDelete.name} has already been removed from the server.`)
      setTimeout(() =>{
        setNotificationMessage('')}, 5000)
    })
    }
  }
    

return (
   <>
   <input  placeholder="search..." onChange={handleQuery}/>
   <h1>NUMBERS : </h1>
    {filtered.map( person => 
    <p key={person.id}>{person.name} {person.number}
    <button type="button" onClick={()=>handlePersonDelete(person.id)}>delete</button></p>)}
   </>
)}
export default Numbers