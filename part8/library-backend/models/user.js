const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 3,
  },
  name: {
    type: String,
    required: true,
    minlength: 3,
  },
  favGenre: String
})

userSchema.plugin(uniqueValidator)

const User = mongoose.model('user', userSchema)

module.exports = User