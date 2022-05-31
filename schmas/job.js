const mongoose = require('mongoose');

const job__schema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      minlength: 5,
    },
    desc: {
      type: String,
      required: true,
    },
    vacancies: {
      type: Number,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
    salary: {
      type: String,
      required: true,
      min: 3000,
    },
    time: {
      type: String,
      enum: ['full', 'part'],
      default: 'full',
      required: true,
    },
    experience: {
      type: Number,
      default: 0,
    },
    contact: {
      type: Number,
      required: true,
      minlength: 10,
      maxlength: 12,
    },
    hiring: {
      type: Boolean,
      default: true,
    },
    owner: {
      type: mongoose.Types.ObjectId,
      ref: 'Org',
    },
    appliedby: [
      {
        _id: {
          type: mongoose.Types.ObjectId,
          ref: 'User',
        },
        created_at: {
          type: Date,
          default: Date.now(),
        },
      },
    ],
  },
  { timestamps: true }
);

const Job = mongoose.model('Job', job__schema);
module.exports = Job;
