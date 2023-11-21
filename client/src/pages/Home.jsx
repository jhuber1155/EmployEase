import { useQuery } from '@apollo/client';
import { QUERY_ME } from '../utils/queries';
import JobBoard from '../components/JobBoard.jsx';
import { Link } from 'react-router-dom';
import Auth from '../utils/auth';
import Map from '../components/Map.jsx';

const Home = () => {
  const { loading, data } = useQuery(QUERY_ME);
  const jobs = data?.me.jobs || [];

  if (Auth.loggedIn()) {
    return (
      <main>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <div id="homeContainer" className='flex'>
            <JobBoard jobs={jobs} />
            {jobs.length > 0 ? (
              <Map jobs={jobs} />
            ) : (
              <div className='bg-jobPageBlue h-screen w-6/12 text-white text-3xl text-center font-bold flex'>
                <div className='self-center m-auto'>Add Jobs to view Map 📍</div>
              </div>
            )}
          </div>
        )}
      </main>
    );
  }

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
