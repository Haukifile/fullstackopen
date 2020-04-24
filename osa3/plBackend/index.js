const express = require('express')
const morgan = require('morgan')
const app = express()
const cors = require('cors')

const Person = require('./models/person')

app.use(express.static('build'))
app.use(cors())
app.use(express.json())
morgan.token('body', function (req, res) {
  console.log(res)
  return JSON.stringify(req.body)
})

app.use(morgan(function (tokens, req, res) {
  if (tokens.method(req,res)==='POST') {
    return [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.res(req, res, 'content-length'), '-',
      tokens['response-time'](req, res), 'ms',
      tokens.body(req,res),
    ].join(' ')
  } else {
    console.log('Logging request')
  }
}))
const persons = [{}]

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

app.get('/api/persons', (request, response,next) => {
  Person.find({})
    .then(persons => {
      response.json(persons.map(person => person.toJSON()))
    })
    .catch(error => next(error))
})
app.get('/api/persons/:id', (request, response,next) => {
  Person.findById(request.params.id)
    .    then(person => {
      response.json(person.toJSON())
    })
    .catch(error => next(error))
})
app.delete('/api/persons/:id', (request, response,next) => {
  Person.findByIdAndRemove(request.params.id)
    .then(result => {
      console.log(result)
      response.status(204).end()
    })
    .catch(error => next(error))
})
app.get('/info', (request, response) => {
  //console.log("Info request")
  Person.find({}).count(function(err, count){
    response.send(
      `Phonebook has information for ${count} people<p></p>${new Date()}`
    )
  })
})
app.post('/api/persons', (request, response, next) => {
  //console.log(request.body)
  const body = request.body
  if (!body.name) {
    return response.status(400).json({
      error: 'name missing'
    })
  }
  if (!body.number) {
    return response.status(400).json({
      error: 'number missing'
    })
  }
  const found = persons.find(person => person.name === body.name)
  if (found) {
    return response.status(400).json({
      error: 'person already in database'
    })
  }
  const person = new Person({
    name: body.name,
    number: body.number,
  })
  person.save()
    .then(savedPerson => {
      response.json(savedPerson.toJSON())
    })
    .catch(error => next(error))

  //persons = persons.concat(person)
  //response.json(person)
  //console.log(persons)
})
app.put('/api/persons/:id', (request, response, next) => {
  const body = request.body

  const person = {
    name: body.name,
    number: body.number,
  }

  Person.findByIdAndUpdate(request.params.id, person, { new: true })
    .then(updatedPerson => {
      response.json(updatedPerson.toJSON())
    })
    .catch(error => next(error))
})
const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  }
  if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }
  next(error)
}
app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})