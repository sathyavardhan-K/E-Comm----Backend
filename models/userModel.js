const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  userType: {
    type: String,
    enum: ['customer', 'admin'],
    default: 'customer',
  },
  phno: {
    type: String,
    required: true,
    validate: {
      validator: function(v) {
        return /^\d{10}$/.test(v);  // Validates a 10-digit phone number
      },
      message: props => `${props.value} is not a valid phone number!`
    },
  },
  shippingAddress: {
    type: String,
  },
  billingAddress: {
    type: String,
  },
  city: {
    type: String,
  },
  state: {
    type: String,
  },
  pincode: {
    type: String,
    validate: {
      validator: function(v) {
        return /^\d{6}$/.test(v);  // Validates a 6-digit pincode
      },
      message: props => `${props.value} is not a valid pincode!`
    },
  },
}, {
  timestamps: true,
});

const User = mongoose.model('User', userSchema);

module.exports = User;
