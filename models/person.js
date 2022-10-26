const mongoose = require('mongoose')

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5
  },
  lastname: {
    type: String,
    required: true,
    minlength: 5
  },
  dni: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 8,
  },
  phone: {
    type: Number,
  },
  email: {
    type: String,
  },
  address: {
    type: String,
  },
  date_birth: {
    type: Date,
  },
})

personSchema.set('toJSON', {
  transform: (_document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('persons', personSchema)