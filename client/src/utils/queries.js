import { gql } from '@apollo/client';

export const QUERY_JOBS = gql`
query GetJobs {
    getJobs {
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
`

export const QUERY_JOB = gql`
query Query($jobId: ID!) {
    getJob(jobId: $jobId) {
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
`

export const QUERY_USER_JOBS = gql`
query GetUsers($userId: ID!) {
    getUserJobs(userId: $userId) {
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
  `

export const QUERY_ME = gql`
query me {
    me {
      id
      username
      email
      jobs {
        id
        jobTitle
        companyName
        description
        appliedOn
        salary
        location
        isRemote
        fullTime
        status
      }
    }
  }
`