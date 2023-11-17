import { useQuery } from '@apollo/client';
import { QUERY_ME } from '../utils/queries';
import JobBoard from '../components/JobBoard.jsx';
import { Link } from 'react-router-dom';
import Auth from '../utils/auth';

const Home = () => {
  const { loading, data } = useQuery(QUERY_ME);
  const jobs = data?.me.jobs || [];
  if (Auth.loggedIn()) {
    return (
      <main>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <JobBoard jobs={jobs} />
        )}
      </main>
    )
  } return (
    <div className='text-center mt-4'>
      <button className='bg-cyan-400 text-white px-4 py-2 rounded-md hover:bg-cyan-700'>
        <Link to="/login">Login to View Jobs</Link>
      </button>
    </div>
  )
};

export default Home;