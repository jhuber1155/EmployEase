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
    const jobData = {
      id: jobs[i].id,
      title: jobs[i].jobTitle,
      description: `Company: ${jobs[i].companyName}\nDescription: ${jobs[i].description}`,
      label: jobs[i].appliedOn,
      tags: [
        // Salary 
        {
          bgcolor: '#afcafe',
          color: 'white',
          title: jobs[i].salary
        },

        // Remote tag shows in different color than location tag
        jobs[i].location=="Remote"?{
          bgcolor: '#8866BB',
          color: 'white',
          title: 'Remote'
        }:{
          bgcolor: '#779944',
          title: jobs[i].location
        },

        // Tag for full/part time
        jobs[i].fullTime?{
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
    
    switch (jobs[i].status) {
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
        label: `${open.length}/${jobs.length}`,
        cards: open
      },
      {
        id: 'lane2',
        title: 'Rejected',
        label: `${rejected.length}/${jobs.length}`,
        cards: rejected,
        style: {
          backgroundColor: '#EB5A46',
          boxShadow: '2px 2px 4px 0px rgba(0,0,0,0.75)',
          color: '#fff',
          width: 280
        },
      },
      {
        id: 'lane3',
        title: 'Accepted',
        label: `${accepted.length}/${jobs.length}`,
        cards: accepted,
        style: {
          backgroundColor: '#61BD4F',
          boxShadow: '2px 2px 4px 0px rgba(0,0,0,0.75)',
          color: '#fff',
          width: 280
        },
      }
    ]
  }

  console.log(data);

  return (
    <Board data={data} />
  )
}

export default JobBoard;