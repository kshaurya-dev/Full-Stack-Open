const blogs=[
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
    likes: 5,
    __v: 0
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'why shaurya is so shaurious',
    author: 'shaurya',
    url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
    likes: 404,
    __v: 0
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'why shaurya is so shaurious part 2',
    author: 'shaurya',
    url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
    likes: 69,
    __v: 0
  }
]
const dummy = (blogs) => {
  return 1
}
const totalLikes = (blogs)=>{
  const reducer = (sum , item)=>{
    return sum+item.likes
  }
  if(!blogs)return 0
  return blogs.reduce( reducer , 0)
}
const favouriteBlog=(blogs)=>{
  const reducer = (favourite, item)=>{
    if(item.likes>favourite.likes)favourite=item
    return favourite
  }
  if(!Array.isArray(blogs) || blogs.length === 0) return null
  return blogs.reduce( reducer , blogs[0])
}
const mostBlogs = (blogs)=>{
  const freq={}
  for(const blog of blogs){
    freq[blog.author]=(freq[blog.author]||0)+1
  }
  const sorted = Object.entries(freq).sort((a, b) => b[1] - a[1])
  const mostBlog = {
    author : sorted[0][0],
    blogs:sorted[0][1]
  }
  return mostBlog
}
const mostLikes = (blogs)=>{
  const freq={}
  for(const blog of blogs){
    freq[blog.author]=(freq[blog.author]||0)+blog.likes
  }
  const sorted = Object.entries(freq).sort((a, b) => b[1] - a[1])
  const mostLike = {
    author : sorted[0][0],
    likes:sorted[0][1]
  }
  return mostLike
}
module.exports = {
  dummy,
  totalLikes,
  favouriteBlog,
  blogs,
  mostBlogs,
  mostLikes
}