const Blog = require('../models/blogs')
const User = require('../models/users')
const initialBlogs = [
  {
    'title': 'why black lives matter',
    'author': 'kallu',
    'url': 'kallu.io',
    'likes': 56,
    'user': '68458909ac8ae51b277852b1',
    'id': '68481d497d08974a3e608537'
  },
  {
    'title': 'shaurya\'s frst blog',
    'author': 'shaurya ',
    'url': 'shaurya.io',
    'likes': 56,
    'user': '6845882ac1bad1e9f750fdab',
    'id': '68566d3a2bf5f558efb5cae5'
  },
  {
    'title': 'why black lives don\'t matter',
    'author': 'kallu ',
    'url': 'kallu.io',
    'likes': 404,
    'user': '68458909ac8ae51b277852b1',
    'id': '6856753169b046bec6005dcd'
  },
  {
    'title': 'shaurya\'s second blog',
    'author': 'shaurya ',
    'url': 'shaurya.io',
    'likes': 404,
    'user': '6845882ac1bad1e9f750fdab',
    'id': '6856758369b046bec6005dd4'
  }
]
const initialUsers = [
  {
    'username': 'kshaurya.dev',
    'name': 'shaurya',
    'blogs': ['68566d3a2bf5f558efb5cae5','6856758369b046bec6005dd4'],
    'id': '6845882ac1bad1e9f750fdab'
  },
  {
    'username': 'kallu69',
    'name': 'kallu',
    'blogs': ['68481d497d08974a3e608537','6856753169b046bec6005dcd'],
    'id': '68458909ac8ae51b277852b1'
  }
]

const nonExistingId = async () => {
  const blog = new Blog({ content: 'willremovethissoon' })
  await blog.save()
  await blog.deleteOne()

  return blog._id.toString()
}
const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}
const usersInDb = async ()=>{
  const users = await User.find({})
  return users.map(user => user.toJSON())
}

module.exports = {
  initialBlogs,initialUsers , nonExistingId, blogsInDb , usersInDb
}