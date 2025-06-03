import axios from 'axios'
const baseUrl ='http://localhost:3001/persons'

const getAll = ()=> axios.get(baseUrl)

const create = (newObject) => axios.post(baseUrl , newObject)

const remove=(id)=>axios.delete(`${baseUrl}/${id}`)

const update=(newObject)=>axios.put(`${baseUrl}/${newObject.id}`,newObject)
  

export default { 
    getAll : getAll, 
    create : create,
    remove : remove,
    update : update
  }