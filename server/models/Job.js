const { Schema, model } = require('mongoose');

const jobSchema = new Schema({
  jobId: {
    type: Number
  },
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
  appliedOn: {
    type: Date,
    default: Date.now,
    get: (date) => formate_date(date)
  },
  applicant: {
    type: String
  },
  interviewOffered: {
    type: Boolean
  },
  status: {
    type: String
  }
});

const Job = model('Job', userSchema);

module.exports = Job;