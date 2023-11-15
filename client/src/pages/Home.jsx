import { useQuery } from '@apollo/client';
// import { QUERY_JOBS } from '../../utils/queries';
// import JobBoard from '../components/JobBoard.jsx';

const Home = () => {
  const {loading, data } = {
    loading: false,
    data: {
      jobs: [
        {
          _id: 1,
          jobTitle: 'Salaryman',
          salary: '10,000',
          companyName: 'Reebok'
        },
        {
          _id: 2,
          jobTitle: 'Businessman',
          salary: '20,000',
          companyName: 'Busyland'
        },
      ]
    }
  }; //useQuery(QUERY_JOBS);
  const jobs = data?.jobs || [];

  return (
    <main>
      {loading ? (
            <div>Loading...</div>
          ) : (
            jobs.map((job) => (
              <div key={job._id}>
                Title: {job.jobTitle}\n
                Salary: {job.salary}\n
                Company: {job.companyName}
              </div>
            ))
            // <JobBoard  jobs={jobs} />  Comment out to test if data is populated
          )}
    </main>
  )


};

export default Home;