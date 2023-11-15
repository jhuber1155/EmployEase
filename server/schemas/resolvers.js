const { User, Job } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
  Query: {
    // Resolver for getUserJobs
    getUserJobs: async (parent, { userId }, context) => {
      try {
        const user = await User.findById(userId).populate('jobs');
        return user.jobs;
      } catch (error) {
        console.error(error);
      }
    },
    getJobs: async (parent, args) => {
      try {
        const jobs = await Job.find({})
        return jobs
      } catch (error) {
        console.error(error);
      }
    },
    getJob: async (parent, { jobId }) => {
      try {
        const job = await Job.findById(jobId)
        return job
      } catch (error) {
        console.error(error);
      }
    },
    getUsers: async (_, args, context) => {
      try {
        const users = await User.find({}).populate('jobs');
        return users;
      } catch (error) {
        console.error(error);
      }
    },
    getUser: async (_, { userId }, context) => {
      try {
        const user = await User.findById(userId).populate('jobs');

        if (!userId) {
          throw new AuthenticationError('User not found!');
        }

        return user;
      } catch (error) {
        console.error(error);
      }
    }

  },
  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw AuthenticationError;
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw AuthenticationError;
      }

      const token = signToken(user);

      return { token, user };
    },
    addJob: async (parent, args) => {
      try {
        const job = await Job.create(args)

        const user = await User.findOneAndUpdate(
          { _id: args.userId },
          {
            $addToSet: {
              jobs: job._id
            }
          },
          { new: true }
        );

        return job
      } catch (error) {
        console.error(error);
      }
    },
    updateJob: async (parent, args) => {
      try {
        const job = await Job.findOneAndUpdate(
          { _id: args.jobId },
          {
            salary: args.salary,
            interviewOffered: args.interviewOffered,
            status: args.status
          },
          { new: true }
        );

        if (!job) {
          throw new AuthenticationError('Job not found!');
        }

        return job
      } catch (error) {
        console.error(error);
      }
    },
    deleteJob: async (parent, { jobId }) => {
      try {
        const job = await Job.findOneAndDelete({
          _id: jobId
        });

        if (!job) {
          throw new AuthenticationError('Job not found!');
        }

        return job
      } catch (error) {
        console.error(error);
      }
    }
  }
};

module.exports = resolvers;