/*eslint-env es6*/ 

const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator');
mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);

const url = process.env.MONGODB_URI
if (url == 'erk') { 
  console.log('poop') 
}

console.log('connecting to', url)
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

const personSchema = new mongoose.Schema({
  name: {type: String, required: true, unique:true, uniqueCaseInsensitive: true, minlength:3 },
  number: { type: String, minlength:8,
        validate: {
            validator: function(v) {
                return /^(\d|[+])\d+(\d|[-])+$/.test(v);
            },
            message: props => `${props.value} is not a valid phone number!`
        },
    required: [true, 'User phone number required']
  }
})
personSchema.plugin(uniqueValidator);

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Person', personSchema)