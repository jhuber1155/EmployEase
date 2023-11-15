const typeDefs = `
  type Job {
    jobTitle: String
    salary: String
    companyName: String
    description: String
    jobLink: String
    appliedOn: String
    interviewOffered: Boolean
    status: String
  }
  
  type User {
    id: ID!
    username: String!
    email: String!
    password: String!
    jobs: [Job]
  }

  type Auth {
    token: ID!
    user: User
  }
  
  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth

    addJob(jobTitle: String!, salary: String!, companyName: String, description: String, jobLink: String, appliedOn: String, interviewOffered: Boolean, status: String): Job

    deleteJob(jobId: ID!): Job

    updateJob(jobId: ID!, salary: String!, interviewOffered: Boolean, status: String): Job
  }

  type Query {
    getUserJobs(userId: ID!): [Job]
    getUsers: [User]
    getUser(userId: ID!): User
    getJobs: [Job]
    getJob(jobId: ID!): Job
  }`

module.exports = typeDefs;