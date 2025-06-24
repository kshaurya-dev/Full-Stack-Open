/*const assert=require('node:assert')
const { test, after, beforeEach , describe} = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blogs')
const User = require('../models/users')
const helper = require('./test_helper')
const { fileURLToPath } = require('node:url')
const api = supertest(app)

beforeEach(async()=>{
  await Blog.deleteMany({})
  await User.deleteMany({})
  await User.insertMany(helper.initialUsers)
})
describe('when there is initially some users saved', () => {
  test('users are returned as json ' , async()=>{
    await api.get('/api/users').expect(200)
      .expect('Content-Type', /application\/json/)
  })
  test('all users are returned' , async()=>{
    const usersAtEnd = await helper.usersInDb()
    assert.strictEqual( usersAtEnd.length , helper.initialUsers.length)
  })
  test('a specific users is within the returned ' , async()=>{
    const users = await helper.usersInDb()
    const usernames = users.map( e => e.username)
    assert(usernames.includes('kshaurya.dev'))
  })
})
describe('a user can be created' , async()=>{
  test('a valid user can be created' , async()=>{
    const usersAtStart = helper.usersInDb()
    const newUser = {
      username:'billuBadmaas',
      name:'billu',
      password:'billu@7'
    }
    await api.post('/api/users').send(newUser).expect(201)
      .expect('Content-Type', /application\/json/)
    const usersAtEnd = await helper.usersInDb()
    const users = usersAtEnd.map(u => u.username)
    assert(usersAtEnd.length , usersAtStart.length+1)
    assert(users.includes('billuBadmaas'))
  })
  test('user creation fails if username is not unique' , async()=>{
    const usersAtStart = helper.usersInDb()
    await api.post('/api/users').send({
      username:'kshaurya.dev',
      name:'billu',
      password:'billu@7'
    }).expect(400)
    const usersAtEnd = await helper.usersInDb()
    assert(usersAtEnd.length , usersAtStart.length)
  })
  test('user creation fails if username not provided' , async()=>{
    const usersAtStart = helper.usersInDb()
    await api.post('/api/users').send({
      username:'',
      name:'billu',
      password:'billu@7'
    }).expect(400)
    const usersAtEnd = await helper.usersInDb()
    assert(usersAtEnd.length , usersAtStart.length)
  })
  test('user creation fails if password length is short' , async()=>{
    const usersAtStart = helper.usersInDb()
    await api.post('/api/users').send({
      username:'kshaurya.dev',
      name:'bi',
      password:'billu@7'
    }).expect(400)
    const usersAtEnd = await helper.usersInDb()
    assert(usersAtEnd.length , usersAtStart.length)
  })
  test('creating a blog updates in blogs field of the user' , async()=>{
    await api.post('/api/users')
      .send({
        username:'tester404',
        name:'tester bro',
        password:'testpassword404'
      }).expect(201)
    const loginResponse = await api.post('/api/login')
      .send({
        username : 'tester404',
        password : 'testpassword404'
      }).expect(200)
    const token = loginResponse.body.token

    const newBlog = {
      title: 'why shaurya is so shaurious part 2',
      author: 'Kunwar Shaurya Pratap Singh',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      likes: 404,
      __v: 0
    }
    const posted = await api.post('/api/blogs').send(newBlog).expect(201)
      .set('Authorization' , `Bearer ${token}`)
      .expect('Content-Type', /application\/json/)
    const blogId =posted.body.id
    const userResponse = await api.get('/api/users')
    const testUser = userResponse.body.find(u => u.username === 'tester404')
    const userBlogIds = testUser.blogs.map(blog => blog.id)
    assert(userBlogIds.includes(blogId), 'User\'s blogs should include the new blog ID')
  })
})
after(async()=>{
  await mongoose.connection.close()
})*/
