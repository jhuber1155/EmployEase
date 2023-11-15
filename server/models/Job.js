const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateformat')

const jobSchema = new Schema({
  jobTitle: {
    type: String
  },
  salary: {
    type: String
  },
  companyName: {
    type: String
  },
  description: {
    type: String
  },
  jobLink: {
    type: String
  },
  location: {
    type: String
  },
  fullTime: {
    type: Boolean
  }, 
  appliedOn: {
    type: Date,
    default: Date.now,
    get: (date) => dateFormat(date)
  },
  interviewOffered: {
    type: Boolean
  },
  status: {
    type: String
  }
});

const Job = model('Job', jobSchema);

module.exports = Job;