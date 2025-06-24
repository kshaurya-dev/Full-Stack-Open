/*const assert = require('node:assert')
const { test, after, beforeEach , describe} = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blogs')
const User = require('../models/users')
const helper = require('./test_helper')
const { fileURLToPath } = require('node:url')
const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})
  await User.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
})

describe('when there is initially some blogs saved', () => {
  test('blogs are returned as json ' , async()=>{
    await api.get('/api/blogs').expect(200)
      .expect('Content-Type', /application\/json/)
  })
  test('all blogs are returned' , async()=>{
    const blogsAtEnd = await helper.blogsInDb()
    assert.strictEqual(blogsAtEnd.length , helper.initialBlogs.length)
  })
  test('a specific blog is within the returned ' , async()=>{
    const response = await api.get('/api/blogs')
    const contents = response.body.map( e => e.title)
    assert(contents.includes('shaurya\'s frst blog'))
  })
  test('a specific blog can be viewed' , async()=>{
    const blogsAtEnd=await helper.blogsInDb()
    const blogToView=blogsAtEnd[3]
    const response = await api.get(`/api/blogs/${blogToView.id}`).expect(200)
      .expect('Content-Type', /application\/json/)
    const returnedBlog = response.body
    assert.deepStrictEqual(blogToView, returnedBlog)
  })
})

describe('adding a new note ' ,()=>{
  test('a valid blog can be added' , async()=>{
    await api.post('/api/users')
      .send({
        username:'testuser',
        name:'tester',
        password:'testpassword'
      }).expect(201)
    const loginResponse = await api.post('/api/login')
      .send({
        username : 'testuser',
        password : 'testpassword'
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
    const blogsAtEnd = await helper.blogsInDb()
    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1)
    const contents = blogsAtEnd.map(n => n.title)
    assert(contents.includes('why shaurya is so shaurious part 2'))
  })
  test('added blog has the id of the user who created it' , async()=>{
    const newUser = await api.post('/api/users')
      .send({
        username:'testuser',
        name:'tester',
        password:'testpassword'
      }).expect(201)
    const userId = newUser.body.id
    const loginResponse = await api.post('/api/login')
      .send({
        username : 'testuser',
        password : 'testpassword'
      }).expect(200)
    const token = loginResponse.body.token
    const newBlog = {
      title: 'why shaurya is so shaurious part 2',
      author: 'Kunwar Shaurya Pratap Singh',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      likes: 404,
      __v: 0
    }
    const postedBlog = await api.post('/api/blogs').send(newBlog).expect(201).set('Authorization',`Bearer ${token}`)
      .expect('Content-Type', /application\/json/)
    const id = postedBlog.body.user
    assert(id , userId)
  })
  test('blog cannot be added if token  is not provided' , async()=>{
    const newBlog = {
      title: 'why shaurya is so shaurious part 2',
      author: 'Kunwar Shaurya Pratap Singh',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      likes: 404,
      __v: 0
    }
    await api.post('/api/blogs').send(newBlog).expect(401)
  })
  test('blog without title is not added' , async()=>{
    await api.post('/api/users')
      .send({
        username:'testuser',
        name:'tester',
        password:'testpassword'
      })
      .expect(201)
    const loginResponse = await api.post('/api/login')
      .send({
        username : 'testuser',
        password : 'testpassword'
      })
      .expect(200)
    const token = loginResponse.body.token
    const newBlog={
      author: 'Kunwar Shaurya Pratap Singh',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      likes: 404,
      __v: 0
    }
    await api.post('/api/blogs').send(newBlog).expect(400).set('Authorization' , `Bearer ${token}`)
    const blogsAtEnd = await helper.blogsInDb()
    assert.strictEqual(blogsAtEnd.length , helper.initialBlogs.length)
  })
  test('adding a blog with no likes field defaults to 0 likes' , async()=>{
    await api.post('/api/users')
      .send({
        username:'testuser',
        name:'tester',
        password:'testpassword'
      })
      .expect(201)
    const loginResponse = await api.post('/api/login')
      .send({
        username : 'testuser',
        password : 'testpassword'
      })
      .expect(200)
    const token = loginResponse.body.token
    const newBlog={
      title:'testing zero likes',
      author: 'Kunwar Shaurya Pratap Singh',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      __v: 0
    } 
    const temp = await api.post('/api/blogs').send(newBlog).expect(201).set('Authorization' , `Bearer ${token}`)
    const request= await helper.blogsInDb()
    const findBlog = request.filter( b => b.title===newBlog.title)
    assert.strictEqual(findBlog[0].likes , 0)
  })
  test('blog without author or title fileds is not added' , async()=>{
    await api.post('/api/users')
      .send({
        username:'testuser',
        name:'tester',
        password:'testpassword'
      })
      .expect(201)
    const loginResponse = await api.post('/api/login')
      .send({
        username : 'testuser',
        password : 'testpassword'
      })
      .expect(200)
    const token = loginResponse.body.token
    const newBlog={
      title:'',
      author: '',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      likes:50,
      __v: 0
    }
    await api.post('/api/blogs').send(newBlog).expect(400).set('Authorization' , `Bearer ${token}`)
    const notesAtEnd=await helper.blogsInDb()
    assert(notesAtEnd.length , helper.initialBlogs.length)
  })
})
describe('deletion of a note' , ()=>{
  test('a blog can be deleted by its user' , async()=>{
    await api.post('/api/users').send({
      username:'testuser',
      name:'tester',
      password:'testpassword'
    }).expect(201)
    const loginResponse= await api.post('/api/login').send({
      username:'testuser',
      password:'testpassword'
    }).expect(200)
    const token = loginResponse.body.token
    const newBlog = {
      title: 'why shaurya is so shaurious part 2',
      author: 'Kunwar Shaurya Pratap Singh',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      likes: 404
    }
    const postedBlog =await api.post('/api/blogs').send(newBlog).set('Authorization' , `Bearer ${token}`)
      .expect(201)
    const blogId = postedBlog.body.id
    await api.delete(`/api/blogs/${blogId}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(204)
    const blogsAtEnd = await helper.blogsInDb()
    const titles = blogsAtEnd.map(b => b.title)
    assert(!titles.includes('why shaurya is so shaurious part 2'))
  })

  test('deletion without token fails' , async()=>{
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]
    await api.delete(`/api/blogs/${blogToDelete.id}`)
      .expect(401)
    const blogsAtEnd = await helper.blogsInDb()
    assert.strictEqual(blogsAtEnd.length, blogsAtStart.length)
  })
  test('deletion fails if  user tries to delete another user\'s blog',async()=>{
    await api.post('/api/users').send({
      username:'user1',
      name:'user1',
      password:'passworduser1'
    }).expect(201)
    await api.post('/api/users').send({
      username:'user2',
      name:'user2',
      password:'passworduser2'
    }).expect(201)
    const user1 = await api.post('/api/login').send({
      username:'user1',
      password:'passworduser1'
    }).expect(200)
    const user2 = await api.post('/api/login').send({
      username:'user2',
      password:'passworduser2'
    }).expect(200)
    const token1 = user1.body.token
    const token2 = user2.body.token

    const newBlog = {
      title: 'why shaurya is so shaurious part 2',
      author: 'Kunwar Shaurya Pratap Singh',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      likes: 404
    }
    //user1 creates the blog
    const postedBlog =await api.post('/api/blogs').send(newBlog)
      .set('Authorization' , `Bearer ${token1}`).expect(201)
    const blogId = postedBlog.body.id
    //user2 tries to delete the blog
    const temp =await api.delete(`/api/blogs/${blogId}`)
      .set('Authorization', `Bearer ${token2}`).expect(403)
    //user 1 deletes the blog
    const temp2=await api.delete(`/api/blogs/${blogId}`)
      .set('Authorization', `Bearer ${token1}`).expect(204)
    const blogsAtEnd = await helper.blogsInDb()
    const titles = blogsAtEnd.map(b => b.title)
    assert(!titles.includes('why shaurya is so shaurious part 2'))
    
  })
})
after(async () => {
  await mongoose.connection.close()
})*/