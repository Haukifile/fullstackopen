/*eslint-env es6*/
const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]
const name = process.argv[3]
const number = process.argv[4]


const url =
  `mongodb+srv://plconnection:${password}@haukicluster-4ekn2.mongodb.net/pl-app?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
  id: Number
})

const Person = mongoose.model('Person', personSchema)

if (!name) {
  Person.find({}).then(result => {
    result.forEach(person => {
      console.log(person)
    })
    mongoose.connection.close()
    process.exit(1)
  })

} else {

  const person = new Person({
    name: name,
    number: number,
  })

  person.save().then(response => {
    console.log(`added ${person.name} number ${person.number} to phonebook ${response}`)
    mongoose.connection.close()
  })
}