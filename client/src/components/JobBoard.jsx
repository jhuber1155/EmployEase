import React from 'react';
import Board from 'react-trello';
import { useMutation } from "@apollo/client";
import { UPDATE_JOB, DELETE_JOB } from "../utils/mutations";

const JobBoard = ({ jobs }) => {

  const [updateJob] = useMutation(UPDATE_JOB)
  const [deleteJob] = useMutation(DELETE_JOB)

  if (!jobs.length) {
    return (
      <div className='bg-jobPageBlue h-screen w-6/12 text-white text-3xl text-center font-bold'>
        <div className='mt-5'>No Jobs Yet!</div>
        </div>
    )
  }

  // Create cards for trello lanes
  const open = [];
  const rejected = [];
  const accepted = [];
  for (let i = 0; i < jobs.length; i++) {
    const { id, jobTitle, jobLink, companyName, description, isRemote, appliedOn, salary, location, fullTime, status } = jobs[i];
    const jobData = {
      id: id,
      title: jobTitle,
      description: `Company: ${companyName}\nDescription: ${description}\n${isRemote ? "Address: " + location: ""}`,
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
        isRemote ? {
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
          backgroundColor: '#94A3B8',
          boxShadow: '2px 2px 4px 0px rgba(0,0,0,0.75)',
          color: '#fff',
          width: '350px',
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
          width: '350px',
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
          width: '350px',
        },
      }
    ]
  }

  return (
    <>
      <div id='trelloContainer'>
        <Board
          data={data}
          collapsibleLanes={true}
          onCardClick={function goToJob(cardId) {
            window.location.assign(`/jobs/${cardId}`);
          }}
          onCardMoveAcrossLanes={async function updateStatus(fromLaneId, toLaneId, cardId, index) {
            if (fromLaneId !== toLaneId) {
              try {
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
          onCardDelete={function handleDelete(cardId) {
            try {
              deleteJob({
                variables: {
                  jobId: cardId
                }
              });
              window.location.reload(false)
            } catch (err) {
              console.error(err);
            }
          }}
        />
      </div>
    </>
  )
}

export default JobBoard;