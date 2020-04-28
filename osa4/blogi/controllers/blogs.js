const jwt = require('jsonwebtoken')
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const middleware = require('../utils/middleware')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({}).populate('user', { name: 1, username: 1 })

  response.json(blogs.map((blog) => blog.toJSON()))
})

blogsRouter.post('/', middleware.tokenExtractor, async (request, response, next) => {
  const { body } = request
  const token = request.authorization

  try {
    const decodedToken = jwt.verify(token, process.env.SECRET)

    if (!token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }

    const user = await User.findById(decodedToken.id)

    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
      user: user.id,
    })


    const savedBlog = await blog.save()
    const newUser = new User(user)
    newUser.blogs = user.blogs.concat(savedBlog.id)
    await User.findByIdAndUpdate(user.id, newUser, { new: true })
    response.json(savedBlog.toJSON())
  } catch (exception) {
    next(exception)
  }
})

blogsRouter.get('/:id', async (request, response, next) => {
  const blog = await Blog.findById(request.params.id)
  if (blog) {
    response.json(blog.toJSON())
  } else {
    response.status(404).end()
  }
})

blogsRouter.delete('/:id', middleware.tokenExtractor, async (request, response, next) => {
  const token = request.authorization
  const idToRemove = request.params.id
  try {
    const decodedToken = jwt.verify(token, process.env.SECRET)

    if (!token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }

    const user = await User.findById(decodedToken.id)

    const blog = await Blog.findById(idToRemove)

    console.log(`Testing${blog.user.toString()} against${user.id.toString()}`)
    if (blog.user.toString() === user.id.toString()) {
      await Blog.findByIdAndRemove(idToRemove)
      response.status(204).end()
    } else {
      return response.status(401).json({ error: 'unauthorized removal attempt' })
    }
  } catch (exception) {
    next(exception)
  }
})

blogsRouter.put('/:id', async (request, response, next) => {
  const { body } = request

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  }
  try {
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    response.json(updatedBlog.toJSON())
  } catch (exception) {
    next(exception)
  }
})
module.exports = blogsRouter
