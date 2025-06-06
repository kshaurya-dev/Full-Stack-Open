const mongoose = require('mongoose')
require('dotenv').config()
mongoose.set('strictQuery', false)


const url = process.env.MONGODB_URI

console.log('connecting to', url)
mongoose.connect(url)
  .then( () => {
    console.log('connected to MongoDB')
  })
  .catch(error => {
    console.log('error connecting to MongoDB:', error.message)
  })

const personSchema = new mongoose.Schema ( {
  name: {
    type: String,
    required: true,
    minLength: 3
  },
  number: {
    type: String,
    required: [true , 'person\'s number is required'],
    validate: {
      validator: function(v) {
        const trimmedValue = v.trim()
        return /^\d{2}-\d{6,}$|^\d{3}-\d{5,}$/.test(trimmedValue)
      },
      message: props => `${props.value} is not a valid phone number!`
    },
  }
})
personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})


module.exports = mongoose.model('Note', personSchema)