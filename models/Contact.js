const mongoose = require('mongoose');

// + relation between : user --> contact
const ContactSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    // required: true,
  },
  phone: {
    type: String,
  },
  type: {
    type: String,
    default: 'personal',
  },
});

module.exports = mongoose.model('contact', ContactSchema);
