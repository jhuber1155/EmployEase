import { useQuery } from '@apollo/client';
import { QUERY_JOB } from '../utils/queries';
import { useParams } from 'react-router-dom';
import UpdateJobForm from '../components/updateJobForm';
import { Link } from 'react-router-dom';
import Auth from '../utils/auth';
import { FaHome } from "react-icons/fa";

const Job = () => {
    const { jobId } = useParams();

    const { loading, data } = useQuery(QUERY_JOB, {
        variables: { jobId: jobId },
    });

    // const { jobTitle, companyName, salary, description, location, fullTime, status, appliedOn, interviewOffered, jobLink } = data?.getJob || [];
    const job = data?.getJob || [];

    console.log(job)

    if (Auth.loggedIn()) {
        return (
            <main>
                {loading ? (
                    <div>Loading...</div>
                ) : (
                    <div className='mt-5'>
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
                        <div className='text-center mt-5'>
                            <button className='bg-gray-400 hover:bg-gray-700 text-white px-4 py-2 rounded-md'>
                                <Link to="/">
                                    <div className='flex'>
                                        Home
                                        <FaHome className='ml-2'/>
                                    </div>
                                </Link>
                            </button>
                        </div>
                    </div>
                )}
            </main>
        )
    }
    return (
        <>
            <div className="bg-slate-200 max-w-2xl mx-auto mb-3 rounded-md p-8 shadow-md text-center">
                <Link className="text-2xl" to="/login">Login to View Job</Link>
            </div>
            <div className="bg-slate-200 max-w-2xl mx-auto mb-3 rounded-md p-8 shadow-md text-center">
                <Link className="text-2xl" to="/login">Login to Edit Job</Link>
            </div>
        </>
    )

};

export default Job;
