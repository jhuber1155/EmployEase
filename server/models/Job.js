const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateformat')

const jobSchema = new Schema({
  jobTitle: {
    type: String,
    required: true,
    trim: true
  },
  salary: {
    type: String,
    trim: true
  },
  companyName: {
    type: String,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  jobLink: {
    type: String,
    trim: true
  },
  location: {
    type: String,
    default: 'Remote'
  },
  isRemote: {
    type: Boolean,
  },
  fullTime: {
    type: Boolean,
  }, 
  appliedOn: {
    type: Date,
    default: Date.now(),
    get: (date) => dateFormat(date)
  },
  interviewOffered: {
    type: Boolean,
  },
  status: {
    type: String,
    default: 'Open'
  }
});

const Job = model('Job', jobSchema);

module.exports = Job;