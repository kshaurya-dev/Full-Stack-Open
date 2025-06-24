const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/users')

usersRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body
  if(!password)response.status(400).json({error:'password required'})
  if(password.length < 3){
    return response.status(400).json({error:'password length too short'})
  }
  console.log(request.body)
  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username,
    name,
    passwordHash,
  })

  const savedUser = await user.save()

  response.status(201).json(savedUser)
})
usersRouter.get('/', async (request, response) => {

  const users = await User.find({}).populate('blogs' , { 
    title :1 , url:1 , likes:1 })
  response.status(200).json(users)
})

module.exports = usersRouter