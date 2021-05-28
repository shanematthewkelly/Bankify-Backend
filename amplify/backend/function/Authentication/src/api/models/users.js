const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({

  //User ID
  _id: mongoose.Schema.Types.ObjectId,

  //Name validation
  name: {
    type: String,
    required: true
  },

  //Phone validation
  phone: {
    type: String,
    required: true
  },

  //Email validation
  email: {
    type: String,
    required: true,
    unique: true,
    match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
  },

  //Password validation
  password: {
    type: String,
    required: true
  },
})

const User = mongoose.model('User', userSchema)
module.exports = User
