import { useQuery } from '@apollo/client';
import { QUERY_JOB } from '../utils/queries';
import { useParams } from 'react-router-dom';

const Job = () => {
    const { jobId } = useParams();

    const { loading, data } = useQuery(QUERY_JOB, {
        variables: { jobId: jobId },
    });

    const job = data?.getJob || [];

    console.log(job)

    return (
        <main>
            {loading ? (
                <div>Loading...</div>
            ) : (
                <div>
                    <h2>{job.jobTitle}</h2>
                    <p>{job.companyName}</p>
                    <p>{job.salary}</p>
                    <p>{job.description}</p>
                    <p>{job.jobLink}</p>
                    <p>{job.appliedOn}</p>
                    <p>{job.status}</p>
                    <p>{job.location}</p>
                    {job.fullTime ? (
                        <div>FULLTIME</div>
                    ) : (
                        <div>PARTTIME</div>
                    )}
                    {job.interviewOffered ? (
                        <div>INTERVIEWED</div>
                    ) : (
                        <div>INTERVIEW PENDING</div>
                    )}
                </div>
            )}
        </main>

    )
};

export default Job;