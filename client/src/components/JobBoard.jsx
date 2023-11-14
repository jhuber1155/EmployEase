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
    switch (jobs[i].status) {
      case 'Open':
        open.push({
          id: jobs[i].jobId,
          title: jobs[i].jobTitle,
          description: jobs[i].description,
          label: jobs[i].companyName
        });
        break;
      case 'Rejected':
        rejected.push({
          id: jobs[i].jobId,
          title: jobs[i].jobTitle,
          description: jobs[i].description,
          label: jobs[i].companyName
        });
        break;
      default: 
        accepted.push({
          id: jobs[i].jobId,
          title: jobs[i].jobTitle,
          description: jobs[i].description,
          label: jobs[i].companyName
        });
    }
  };

  // Format job data into trello board data format
  const data = {
    lanes: [
      {
        id: 'lane1',
        title: 'Open Applications',
        label: '1/1',
        cards: open
      },
      {
        id: 'lane2',
        title: 'Rejected',
        label: '0/0',
        cards: rejected
      },
      {
        id: 'lane3',
        title: 'Accepted',
        label: '0/0',
        cards: accepted
      }
    ]
  }

  return (
    <Board data={data} />
  )
}

export default JobBoard;