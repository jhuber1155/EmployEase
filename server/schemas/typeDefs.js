const typeDefs = `
  type Job {
    jobId: Int
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
  }

  type Query {
    getUserJobs(userId: ID!): [Job]
    getUsers: [User]
    getUser(userId: ID!): User
  }`

module.exports = typeDefs;