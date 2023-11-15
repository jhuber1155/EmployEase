const typeDefs = `
  type Job {
    id: ID!
    jobTitle: String
    salary: String
    companyName: String
    location: String
    fullTime: Boolean
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
    addJob(userId: ID!, jobTitle: String!, salary: String!, location: String, fullTime: Boolean, companyName: String, description: String, jobLink: String, appliedOn: String, interviewOffered: Boolean, status: String): Job
    deleteJob(jobId: ID!): Job
    updateJob(jobId: ID!, salary: String!, location: String, fullTime: Boolean, interviewOffered: Boolean, status: String): Job
  }

  type Query {
    getUserJobs(userId: ID!): [Job]
    getUsers: [User]
    getUser(userId: ID!): User
    getJobs: [Job]
    getJob(jobId: ID!): Job
    me:User
  }`



module.exports = typeDefs;