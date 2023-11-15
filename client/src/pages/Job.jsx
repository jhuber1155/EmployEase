import { useQuery } from '@apollo/client';
import { QUERY_JOB } from '../utils/queries';
import { useParams } from 'react-router-dom';

const Job = () => {
    const { jobId } = useParams();

    const { loading, data } = useQuery(QUERY_JOB, {
        variables: { jobId: jobId },
    });

    const job = data?.job || [];

    console.log(jobId)

    return (
        <main>
        {loading ? (
            <div>Loading...</div>
        ) : (
            <div>
                <h2>{job.jobTitle || 'No title available'}</h2>
                <p>{job.companyName || 'No company name available'}</p>
                <p>{job.salary || 'No salary information available'}</p>
                <p>{job.description || 'No description available'}</p>
                <p>{job.jobLink || 'No job link available'}</p>
                <p>{job.appliedOn || 'No application date available'}</p>
            </div>
        )}
    </main>
    
    )
};

export default Job;