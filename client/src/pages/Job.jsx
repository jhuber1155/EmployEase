import { useQuery } from '@apollo/client';
import { QUERY_JOB } from '../utils/queries';
import { useParams } from 'react-router-dom';

const Job = () => {
    const { jobId } = useParams();

    const { loading, data } = useQuery(QUERY_JOB, {
        variables: { jobId: jobId },
    });

    const { jobTitle, companyName, salary, description, location, fullTime, status, appliedOn, interviewOffered, jobLink } = data?.getJob || [];

    console.log(jobTitle)

    return (
        <main>
            {loading ? (
                <div>Loading...</div>
            ) : (
                <div className="bg-white max-w-2xl mx-auto rounded-md p-8 shadow-md">
          <h2 className="text-2xl font-semibold mb-4">{jobTitle}</h2>
          <p className="text-gray-600 mb-2">{companyName}</p>
          <p className="text-gray-600 mb-2">{location}</p>
          <p className="text-gray-600 mb-2">{salary}</p>
          <p className="text-gray-600 mb-2">{fullTime ? 'Full-time' : 'Part-time'}</p>
          <p className="text-gray-800 mb-4">{description}</p>
          <a className="text-blue-500 mb-2" href={jobLink}>Link</a>
          <p className="text-gray-600 mb-2">Status: {status}</p>
          <p className="text-gray-600 mb-2">Applied On: {appliedOn}</p>
          <p className="text-gray-600 mb-2">{interviewOffered ? 'Interview Offered' : 'No Interview Offered'}</p>
        </div>
            )}
        </main>

    )
};

export default Job;
