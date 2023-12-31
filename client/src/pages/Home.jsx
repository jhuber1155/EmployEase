import { useQuery } from '@apollo/client';
import { QUERY_ME } from '../utils/queries';
import JobBoard from '../components/JobBoard.jsx';
import { Link } from 'react-router-dom';
import Auth from '../utils/auth';
import Map from '../components/Map.jsx';

const Home = () => {
  const { loading, data } = useQuery(QUERY_ME);
  const jobs = data?.me.jobs || [];
  // verify user is logged in to display home page
  if (Auth.loggedIn()) {
    return (
      <main>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <div id="homeContainer" className='flex'>
            <JobBoard jobs={jobs} />
            {/* display map only if user has added jobs */}
            {jobs.length > 0 ? (
              <Map jobs={jobs} />
            ) : (
              <></>
            )}
          </div>
        )}
      </main>
    );
  }
  // display if user is not logged in
  return (
    <div className='flex items-center justify-center h-screen bg-jobPageBlue'>
      <div className='text-center'>
        <p className='text-3xl font-bold text-white mb-4'>Welcome to the Job Board</p>
        <p className='text-white mb-8'>Please log in to view available jobs.</p>
        <button className='bg-cyan-400 text-white px-4 py-2 rounded-md hover:bg-cyan-700'>
          <Link to="/login">Login</Link>
        </button>
      </div>
    </div>
  );
};

export default Home;
