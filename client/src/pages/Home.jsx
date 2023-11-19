import { useQuery } from '@apollo/client';
import { QUERY_ME } from '../utils/queries';
import JobBoard from '../components/JobBoard.jsx';
import { Link } from 'react-router-dom';
import Auth from '../utils/auth';
import { MapContainer, TileLayer } from "react-leaflet"

const Home = () => {
  const { loading, data } = useQuery(QUERY_ME);
  const jobs = data?.me.jobs || [];
  if (Auth.loggedIn()) {
    return (
      <main>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <>
            <JobBoard jobs={jobs} />
            <MapContainer center={[-118.37630726416945, 33.964051807995936]} zoom={13}>
              <TileLayer
                attribution='© OpenStreetMap contributors'
                url='https://tile.openstreetmap.org/{z}/{x}/{y}.png'
              />
            </MapContainer>
          </>
        )}
      </main>
    )
  } return (
    <div className='flex items-center justify-center h-screen bg-jobPageBlue'>
      <div className='text-center'>
        <p className='text-3xl font-bold text-white mb-4'>Welcome to the Job Board</p>
        <p className='text-white mb-8'>Please log in to view available jobs.</p>
        <button className='bg-cyan-400 text-white px-4 py-2 rounded-md hover:bg-cyan-700'>
          <Link to="/login">Login</Link>
        </button>
      </div>
    </div>
  )
};

export default Home;