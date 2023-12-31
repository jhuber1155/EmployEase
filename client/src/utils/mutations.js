import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation login($password: String!, $email: String!) {
    login(password: $password, email: $email) {
      token
      user {
        email
        username
        id
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        email
        username
        id
      }
    }
  }
`;

export const ADD_JOB = gql`
  mutation addJob(
    $userId: ID!
    $jobTitle: String!
    $salary: String!
    $location: String
    $isRemote: Boolean
    $fullTime: Boolean
    $companyName: String
    $description: String
    $jobLink: String
    $appliedOn: String
    $interviewOffered: Boolean
    $status: String
  ) {
    addJob(
      userId: $userId
      jobTitle: $jobTitle
      salary: $salary
      location: $location
      isRemote: $isRemote
      fullTime: $fullTime
      companyName: $companyName
      description: $description
      jobLink: $jobLink
      appliedOn: $appliedOn
      interviewOffered: $interviewOffered
      status: $status
    ) {
      id
      jobTitle
      salary
      companyName
      location
      isRemote
      fullTime
      description
      jobLink
      appliedOn
      interviewOffered
      status
    }
  }
`;

export const UPDATE_JOB = gql`
  mutation Mutation(
    $jobId: ID!
    $salary: String
    $location: String
    $description: String
    $fullTime: Boolean
    $interviewOffered: Boolean
    $status: String
  ) {
    updateJob(
      jobId: $jobId
      salary: $salary
      description: $description
      location: $location
      fullTime: $fullTime
      interviewOffered: $interviewOffered
      status: $status
    ) {
      id
      salary
      location
      fullTime
      description
      interviewOffered
      status
    }
  }
`;

export const DELETE_JOB = gql`
  mutation Mutation($jobId: ID!) {
    deleteJob(jobId: $jobId) {
      id
      jobTitle
      companyName
    }
  }
`;
