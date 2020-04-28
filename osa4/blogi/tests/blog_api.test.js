const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const helper = require ('./test_helper')
const middleware = require('../utils/middleware')

beforeEach(async () => {
    await Blog.deleteMany({})
  
    let blogObject = new Blog(helper.initialBlogs[0])
    await blogObject.save()
  
    blogObject = new Blog(helper.initialBlogs[1])
    await blogObject.save()

    blogObject = new Blog(helper.initialBlogs[2])
    await blogObject.save()
  })

describe('gettingBlogs', () => {
  test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('there are four blogs', async () => {
    const response = await api.get('/api/blogs')
  
    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })
  
  test('a specific blog title is returned', async () => {
    const response = await api.get('/api/blogs')
  
    const titles = response.body.map(r => r.title)
    expect(titles).toContain(
        'Pullantuoksuinen Haitari'
    )
  })
  test ('returned blog is defined by id', async () => {
    const response = await helper.blogsInDb()
    expect(response[0].id).toBeDefined()
})
})

let token = {}
describe('logIn', () => {
  test('login works', async () => {
    const testCred = {
      "username": process.env.TESTUSER,
      "password": process.env.TESTPASS
    } 
  const response = await api
    .post('/api/login')
    .send(testCred)
    .expect(200)
    .expect('Content-Type', /application\/json/)
  token = await response.body.token
  console.log(token)
})
})


describe ('postUpdateRemove', () => {
  test('blog without title and url is not added', async () => {
    const newBlog = {
      author:'Erkki',
      likes: 7000000
    }
  
    await api
      .post('/api/blogs')
      .set('authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(400)
    

    const blogsAtEnd = await helper.blogsInDb()
    
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
  })
  
  test ('a blog can be added', async () => {
    const newBlog = {
      "title": "Should be deleted",
      "author": "Should be deleted",
      "url": "Should be deleted",
      "likes": 0
    }
    
    await api
      .post('/api/blogs')
      .set('authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)
  

  })
  test('adding blog with no likes given returns 0 likes', async () => {
    const newBlog = {
      title:'Test',
      author:'Test',
      url: 'www'
    }
  
    const response = await api
      .post('/api/blogs')
      .set('authorization', `Bearer ${token}`)
      .send(newBlog)
    
      expect(response.body.likes === 0)

      const blogsAtEnd = await helper.blogsInDb()    
      expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
    
  })
  test ('the blog can be found with the id', async () => {
    let newBlog = {
      "title": "Should be deleted",
      "author": "Should be deleted",
      "url": "Should be deleted",
      "likes": 0
    }

    await api
      .post('/api/blogs')
      .set('authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const blogList = await helper.blogsInDb()
    const addedId = blogList.filter(blog => blog.author.toLowerCase() === newBlog.author.toLowerCase())[0].id

  const response = await api.get(`/api/blogs/${addedId}`)
  expect(response.body.author).toContain(newBlog.author)

  })

  test ('updated', async () => {
    let newBlog = {
      "title": "Should be deleted",
      "author": "Should be deleted",
      "url": "Should be deleted",
      "likes": 0
    }

    await api
      .post('/api/blogs')
      .set('authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)
  
    const blogList = await helper.blogsInDb()
    const addedId = blogList.filter(blog => blog.author.toLowerCase() === newBlog.author.toLowerCase())[0].id

    newBlog.likes = 100

    const sent = await api
      .put(`/api/blogs/${addedId}`)
      .set('authorization', `Bearer ${token}`)
      .send(newBlog)
    expect(sent.status = 204)

    const response = await api
      .get(`/api/blogs/${addedId}`)
    expect(response.body.likes == newBlog.likes)
  })
 
  test ('and deleted', async () => {
    let newBlog = {
      "title": "Should be deleted",
      "author": "Should be deleted",
      "url": "Should be deleted",
      "likes": 0
    }

    await api
      .post('/api/blogs')
      .set('authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)
  
    const blogList = await helper.blogsInDb()
    const addedId = blogList.filter(blog => blog.author.toLowerCase() === newBlog.author.toLowerCase())[0].id

    await api
      .delete(`/api/blogs/${addedId}`)
      .set('authorization', `Bearer ${token}`)
      .expect(204)
    const blogsAtEnd = await helper.blogsInDb()
    const authors = blogsAtEnd.map(r => r.author)
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
    expect(authors).not.toContain(newBlog.author)
  })
})

afterAll(() => {
  mongoose.connection.close()
})