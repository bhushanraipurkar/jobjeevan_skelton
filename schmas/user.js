const mongoose = require('mongoose');

const user__scema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      minlength: 6,
    },
    aadhar: {
      type: Number,
      minlength: 12,
      maxlength: 12,
    },
    phone: {
      type: Number,
      minlength: 10,
      maxlength: 10,
    },
    pass: {
      type: String,
      required: true,
    },
    owner: [
      {
        type: mongoose.Types.ObjectId,
        ref: 'Org',
      },
    ],
  },
  { timestamps: true }
);

const User = mongoose.model('User', user__scema);
module.exports = User;
