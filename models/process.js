const mongoose = require('mongoose')

const processSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true,
  },
  opening: {
    type: Date,
    default: Date.now,
  },
  closing: {
    type: Date,
  },
  dni: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 8,
  },
  type: {
    type: String,
    required: true
  },
})

processSchema.set('toJSON', {
  transform: (_document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('processes', processSchema)