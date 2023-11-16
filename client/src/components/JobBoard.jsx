import React from 'react';
import Board from 'react-trello';
import { useMutation } from "@apollo/client";
import { UPDATE_JOB } from "../utils/mutations";

const JobBoard = ({ jobs }) => {

  const [updateJob] = useMutation(UPDATE_JOB)

  if (!jobs.length) {
    return <h3>No Jobs Yet</h3>
  }

  // Create cards for trello lanes
  const open = [];
  const rejected = [];
  const accepted = [];

  for (let i = 0; i < jobs.length; i++) {
    const { id, jobTitle, jobLink, companyName, description, appliedOn, salary, location, fullTime, status } = jobs[i];
    const jobData = {
      id: id,
      title: jobTitle,
      description: `Company: ${companyName}\nDescription: ${description}`,
      url: jobLink,
      label: appliedOn,
      tags: [
        // Salary 
        {
          bgcolor: '#afcafe',
          color: 'white',
          title: salary
        },

        // Remote tag shows in different color than location tag
        jobs[i].location == "Remote" ? {
          bgcolor: '#8866BB',
          color: 'white',
          title: 'Remote'
        } : {
          bgcolor: '#779944',
          title: location
        },

        // Tag for full/part time
        fullTime ? {
          bgcolor: '#14A5B9',
          color: 'white',
          title: 'Full time'
        } : {
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
        id: 'Open',
        title: 'Open Applications',
        label: `${open.length}/${jobs.length}`, //label is jobs in lane/total jobs
        cards: open,
        style: {
          boxShadow: '2px 2px 4px 0px rgba(0,0,0,0.75)',
          color: '#fff',
        },
      },
      {
        id: 'Rejected',
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
        id: 'Accepted',
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
    <Board
      data={data}
      onCardClick={function goToJob(cardId) {
        window.location.assign(`/jobs/${cardId}`);
      }}
      onCardMoveAcrossLanes={async function updateStatus(fromLaneId, toLaneId, cardId, index) {
        if (fromLaneId !== toLaneId) {
          try {
            console.log(typeof cardId);
            console.log(cardId);
            await updateJob({
              variables: {
                jobId: cardId,
                status: toLaneId
              }
            })
          } catch (err) {
            console.error(err);
          }
        }
      }}
    />
  )
}

export default JobBoard;