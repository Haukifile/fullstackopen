const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/', async (request, response, next) => {
    const body = request.body
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)

    if(!body.username) {
        response.status(400).json({
            error: 'Username is required'})
    }
    if(body.username.length < 3) {
        response.status(400).json({
            error: 'Username length must be at least 3 characters'})
    }
    if(!body.name) {
        response.status(400).json({
            error: 'Name is required'})
    }
    if(!body.password) {
        response.status(400).json({
            error: 'Password is required'})
    }
    if(body.password.length < 3) {
        response.status(400).json({
            error: 'Password length must be at least 3 characters'})
    }

const userList = await User.find({})
const isUnique = userList.map(user => user.toJSON()).map(r => r.username).indexOf(body.username)
    
    if(isUnique !== -1) {
        console.log(`löytyi: ${isUnique}`)
            response.status(400).json({
                error: `Username ${body.username} already exists`})
    } else {
        console.log(`ei löytynyt: ${isUnique}`)
    const user = new User({
        name: body.name,
        username: body.username,
        passwordHash: passwordHash
    })

    try {
    const savedUser = await user.save() 
    response.json (savedUser)
    } catch (exception) {
        next(exception)
    }
}
})

usersRouter.get('/', async (request, response) => {
  const users = await User
    .find({}).populate('blogs', { title: 1, author: 1 })
  console.log(users)
  response.json(users.map(user => user.toJSON()))
})


usersRouter.get('/:id', async (request, response,next) => {
  const user = await User.findById(request.params.id)
  if (user) {
    response.json(user.toJSON())
  } else {
    response.status(404).end()
  }
})

usersRouter.delete('/:id', async (request, response, next) => {
  await User.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

usersRouter.put('/:id', async (request, response, next) => {
  const body = request.body

  const user = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  }
  try {
    const updateduser = await User.findByIdAndUpdate(request.params.id, user, { new: true })
    response.json(updateduser.toJSON())
  } catch(exception) {
    next(exception)
  }
})
module.exports = usersRouter