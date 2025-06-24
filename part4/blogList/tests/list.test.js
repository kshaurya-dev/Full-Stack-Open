const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')
const blogs = listHelper.blogs

test('dummy returns one', () => {
  const blogs = []
  const result = listHelper.dummy(blogs)
  assert.strictEqual(result, 1)
})

describe('Total Likes', () => {
  test('total likes of one blog is the number of likes of that blog', () => {
    const listWithOneBlog = [
      {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
        likes: 5,
        __v: 0
      }
    ]
    assert.strictEqual(listHelper.totalLikes(listWithOneBlog), 5)
  })
  test('of a empty list is zero' , ()=>{
    const emptyList=[]
    assert.strictEqual(listHelper.totalLikes(emptyList) , 0)
  })
  test('of a bigger list is calculated right' , ()=>{
    assert.strictEqual(listHelper.totalLikes(blogs) , 478)
  })
})

describe('favourite blog' , ()=>{
  const emptyList=[]
  test('for an empty list , favourite blog is null' , ()=>{
    assert.deepStrictEqual(listHelper.favouriteBlog(emptyList) ,null)
  })
  test('favourite blog is the one with most likes' , ()=>{
    assert.deepStrictEqual(listHelper.favouriteBlog(blogs) , blogs[1])
  })
})
describe('author with most ' , ()=>{
  test('blogs , test passes', ()=>{
    assert.deepStrictEqual(listHelper.mostBlogs(blogs) ,{
      author : 'shaurya',
      blogs:2
    })
  })
  test('likes , test passes', ()=>{
    assert.deepStrictEqual(listHelper.mostLikes(blogs) ,{
      author : 'shaurya',
      likes:473
    })
  })
})