const db = require('../config/connection');
const { User, Job } = require('../models');
const userSeeds = require('./userSeeds.json');
const jobSeeds = require('./jobSeeds.json');
const cleanDB = require('./cleanDB');

db.once('open', async () => {
  try {
    await cleanDB('Job', 'jobs');

    await cleanDB('User', 'users');

    await User.create(userSeeds);

    for (let i = 0; i < jobSeeds.length; i++) {
      const { _id, applicant } = await Job.create(jobSeeds[i]);
      const user = await User.findOneAndUpdate(
        { username: applicant },
        {
          $addToSet: {
            jobs: _id,
          },
        }
      );
    }
  } catch (err) {
    console.error(err);
    process.exit(1);
  }

  console.log('all done!');
  process.exit(0);
});
