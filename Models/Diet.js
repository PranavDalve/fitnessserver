const mongoose = require('mongoose');
const { Schema } = mongoose;

const DietSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  email: {
    type: String
  },
  contactNum: {
    type: String
  },
  description: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('element', DietSchema);