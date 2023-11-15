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
  }

};

module.exports = resolvers;