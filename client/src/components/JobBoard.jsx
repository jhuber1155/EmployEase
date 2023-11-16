import React from 'react'
import Board from 'react-trello'

const JobBoard = ({jobs}) => {
  if (!jobs.length) {
    return <h3>No Jobs Yet</h3>
  }

  // Create cards for trello lanes
  const open = [];
  const rejected = [];
  const accepted = [];

  for (let i =0; i<jobs.length; i++) {
    const {id, jobTitle, companyName, description, appliedOn, salary, location, fullTime, status} = jobs[i];
    const jobData = {
      id: id,
      title: jobTitle,
      description: `Company: ${companyName}\nDescription: ${description}`,
      label: appliedOn,
      tags: [
        // Salary 
        {
          bgcolor: '#afcafe',
          color: 'white',
          title: salary
        },

        // Remote tag shows in different color than location tag
        jobs[i].location=="Remote"?{
          bgcolor: '#8866BB',
          color: 'white',
          title: 'Remote'
        }:{
          bgcolor: '#779944',
          title: location
        },

        // Tag for full/part time
        fullTime?{
          bgcolor: '#14A5B9',
          color: 'white',
          title: 'Full time'
        }:{
          bgcolor: '#EB5A46',
          color: 'white',
          title: 'Part time'
        }
      ]
    }
    
    switch (status) {
      case 'Open':
        open.push(jobData);
        break;
      case 'Rejected':
        rejected.push(jobData);
        break;
      default: 
        accepted.push(jobData);
    }
  };

  // Format job data into trello board data format
  const data = {
    lanes: [
      {
        id: 'lane1',
        title: 'Open Applications',
        label: `${open.length}/${jobs.length}`, //label is jobs in lane/total jobs
        cards: open,
        style: {
          boxShadow: '2px 2px 4px 0px rgba(0,0,0,0.75)',
          color: '#fff',
        },
      },
      {
        id: 'lane2',
        title: 'Rejected',
        label: `${rejected.length}/${jobs.length}`, //label is jobs in lane/total jobs
        cards: rejected,
        style: {
          backgroundColor: '#EB5A46',
          boxShadow: '2px 2px 4px 0px rgba(0,0,0,0.75)',
          color: '#fff',
        },
      },
      {
        id: 'lane3',
        title: 'Accepted',
        label: `${accepted.length}/${jobs.length}`, //label is jobs in lane/total jobs
        cards: accepted,
        style: {
          backgroundColor: '#61BD4F',
          boxShadow: '2px 2px 4px 0px rgba(0,0,0,0.75)',
          color: '#fff',
        },
      }
    ]
  }

  return (
    <Board data={data} />
  )
}

export default JobBoard;