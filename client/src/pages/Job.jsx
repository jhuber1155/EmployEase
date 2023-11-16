import { useQuery } from '@apollo/client';
import { QUERY_JOB } from '../utils/queries';
import { useParams } from 'react-router-dom';
import UpdateJobForm from '../components/updateJobForm';
import { Link } from 'react-router-dom';

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

                    <div className="bg-slate-200 max-w-2xl mx-auto mb-3 rounded-md p-8 shadow-md sm:flex justify-between">
                        <div>
                        <h2 className="text-2xl font-semibold mb-2">{job.jobTitle}</h2>
                        <p className="text-xl text-gray-600 mb-2">{job.companyName}</p>
                        <p className="text-gray-600 mb-2">{job.fullTime ? 'Full-time' : 'Part-time'}</p>
                        <p className="text-gray-600 mb-2"><span className='font-bold'>Salary: </span>{job.salary}</p>
                        <p className="text-gray-600 mb-2"><span className='font-bold'>Location: </span>{job.location}</p>
                        <p className="text-gray-600 mb-2"><span className='font-bold'>Description: </span>{job.description}</p>
                        </div>
                        <div className='align-self-center'>
                        <p className="text-gray-600 mb-2"><span className='font-bold'>Applied: </span>{job.appliedOn}</p>
                        <p className="text-gray-600 my-2"><span className='font-bold'>Status: </span>{job.status}</p>
                        <p className="text-gray-600 mb-2 italic font-semibold">{job.interviewOffered ? 'Interview Offered' : 'No Interview Offered'}</p>
                        <a className="text-blue-500" href={job.jobLink}>Job Link</a>
                        </div>

                    </div>

                    <UpdateJobForm job={job} />
                    <div className='text-center mt-4'>

                        <button className='bg-blue-500 text-white px-4 py-2 rounded-md'>
                            <Link to="/">Home</Link>
                        </button>
                    </div>

                </div>
            )}
        </main>

    )
};

export default Job;
