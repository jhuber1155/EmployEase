import { useQuery } from '@apollo/client';
import { QUERY_SINGLE_JOB } from '../../utils/queries';

const Job = () => {
    const { jobId} = useParams();

    const { loading, data } = useQuery(QUERY_SINGLE_JOB, {
        variables: { jobId: jobId },
    });

    const job = data?.job || [];

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
                </div>
            )}
        </main>
    )


};

export default Job;