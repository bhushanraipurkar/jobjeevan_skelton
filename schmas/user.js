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
      type: String,
      unique: true,
    },
    phone: {
      type: Number,
      unique: true,
    },
    owner: [
      {
        _id: {
          type: mongoose.Types.ObjectId,
          ref: 'Org',
        },
      },
    ],
    is_owner: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const User = mongoose.model('User', user__scema);
module.exports = User;
