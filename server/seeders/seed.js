const db = require('../config/connection');
const { User, Job } = require('../models');
const userSeeds = require('./userSeeds.json');
const jobSeeds = require('./jobSeeds.json');
const cleanDB = require('./cleanDB');
require('dotenv').config()


db.once('open', async () => {
  try {
    await cleanDB('Job', 'jobs');

    await cleanDB('User', 'users');
    
    for (let i=0; i<userSeeds.length; i++) {
      userSeeds[i].password = process.env.SEED_PASSWORD
    }

    const users = await User.create(userSeeds);
    console.log(users)

    for (let i = 0; i < jobSeeds.length; i++) {
      const { _id } = await Job.create(jobSeeds[i]);
      const user = await User.findOneAndUpdate(
        { _id: users[Math.floor(Math.random() * users.length)]._id },
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
