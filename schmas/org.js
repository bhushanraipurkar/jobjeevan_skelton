const mongoose = require('mongoose');

const org = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 5,
    },
    street: {
      type: String,
      minlength: 5,
    },
    city: {
      type: String,
      minlength: 3,
    },
    state: {
      type: String,
      required: true,
      minlength: 4,
    },
    pincode: {
      type: Number,
      required: true,
      minlength: 6,
      maxlength: 6,
    },
    contact: {
      type: Number,
      required: true,
      minlength: 10,
      maxlength: 12,
    },
    since: {
      type: Date,
      default: Date.now(),
    },
    reviews: [
      {
        _id: {
          type: mongoose.Types.ObjectId,
          ref: 'User',
        },
        message: {
          type: String,
          minlength: 2,
        },
        date: {
          type: Date,
          default: Date.now(),
        },
      },
    ],
  },
  { timestamps: true }
);

const Org = mongoose.model('Org', org);
module.exports = Org;
