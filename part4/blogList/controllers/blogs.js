const blogRouter=require('express').Router()
const Blog = require('../models/blogs')
const jwt = require('jsonwebtoken')
const User = require('../models/users')
const middleware = require('../utils/middleware')

blogRouter.get('/', async(request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})
blogRouter.get('/:id' , async(request , response , next)=>{
  const blog = await Blog.findById(request.params.id)
  if(blog) response.json(blog)
  else response.status(404).end()
})
blogRouter.post('/',middleware.userExtractor, async(request, response , next) => {
  const user = request.user
  const body = request.body
  const blog = new Blog({
    title:body.title,
    author:body.author,
    url:body.url,
    likes : body.likes || 0,
    user : user._id
  })
  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()
  response.status(201).json(savedBlog) 
})

blogRouter.delete('/:id' ,middleware.userExtractor, async(request , response , next)=>{
  const blogToDelete = await Blog.findById(request.params.id)
  if (!blogToDelete) {
    return response.status(404).json({ error: 'blog not found' })
  }
  if (!blogToDelete) {
    return response.status(404).json({ error: 'blog not found' })
  }
  const user = request.user
  const isOwner =blogToDelete.user.toString() === user.id
  if(!isOwner){
    response.status(403).json({error : 'invalid user for deletion'})
  }else{
    await Blog.findByIdAndDelete(request.params.id)
    return response.status(204).end()
  }
})

blogRouter.put('/:id' , async(request , response , next)=>{
  const {title, author , url , likes}=request.body
  const result = await Blog.findById(request.params.id)
  if(!result)response.status(404).end()
  if(title)result.title = title
  if(likes)result.likes = likes
  if(author)result.author =author
  if(url)result.url = url
  await result.save()
  response.json(result)
})
const errorHandler = (error, request, response, next) => {
  console.error(error.message)
  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } 
  if(error.name==='ValidationError'){
    return response.status(400).send({error:error.message})
  }
  next(error)
}

// this has to be the last loaded middleware, also all the routes should be registered before this!
blogRouter.use(errorHandler)

module.exports = blogRouter