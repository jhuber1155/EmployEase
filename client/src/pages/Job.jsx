import { useQuery } from '@apollo/client';
import { QUERY_JOB } from '../utils/queries';
import { useParams } from 'react-router-dom';
import UpdateJobForm from '../components/updateJobForm';

const Job = () => {
    const { jobId } = useParams();

    const { loading, data } = useQuery(QUERY_JOB, {
        variables: { jobId: jobId },
    });

    // const { jobTitle, companyName, salary, description, location, fullTime, status, appliedOn, interviewOffered, jobLink } = data?.getJob || [];
    const job = data?.getJob || [];

    console.log(job)


    return (
        <main>
            {loading ? (
                <div>Loading...</div>
            ) : (
                <div>

                <div className="bg-white max-w-2xl mx-auto mb-3 rounded-md p-8 shadow-md">
                    <h2 className="text-2xl font-semibold mb-4">{job.jobTitle}</h2>
                    <p className="text-gray-600 mb-2">{job.companyName}</p>
                    <p className="text-gray-600 mb-2">{job.location}</p>
                    <p className="text-gray-600 mb-2">{job.salary}</p>
                    <p className="text-gray-600 mb-2">{job.fullTime ? 'Full-time' : 'Part-time'}</p>
                    <p className="text-gray-800 mb-2">{job.description}</p>
                    <a className="text-blue-500" href={job.jobLink}>Link</a>
                    <p className="text-gray-600 my-2">Status: {job.status}</p>
                    <p className="text-gray-600 mb-2">Applied On: {job.appliedOn}</p>
                    <p className="text-gray-600 mb-2">{job.interviewOffered ? 'Interview Offered' : 'No Interview Offered'}</p>

                </div>
                    <UpdateJobForm job={job} />
                </div>

            )}
        </main>

    )
};

export default Job;
