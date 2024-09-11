const mongoose = require('mongoose')

const noteSchema = new mongoose.Schema(
  {
    title: String,
    content: String,
  },
  { timestamps: true }
)

noteSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})
const Note = mongoose.model('Note', noteSchema)

module.exports = Note
