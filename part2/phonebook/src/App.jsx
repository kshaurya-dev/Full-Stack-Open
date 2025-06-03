import { useEffect, useState } from 'react'
import axios from 'axios'
import Form from './components/Form'
import Numbers from './components/Numbers'
import personService from './services/persons'
import Notification from './components/Notification'

const App=()=>{
  const [persons , setPersons] = useState([])
  const [notifyMessage , setNotificationMessage]=useState("")

  useEffect(()=>{
    personService.getAll()
    .then( response => {
      console.log("promise full-filled , data arrived from server!")
      setPersons(response.data)
    })}, [])

  return(
    <>
    <Notification message={notifyMessage}/>
    
    <Form persons={persons} setPersons={setPersons}
    setNotificationMessage={setNotificationMessage}/>

    <Numbers persons={persons} setPersons={setPersons}
    setNotificationMessage={setNotificationMessage}/>
    </>
  )
}
export default App