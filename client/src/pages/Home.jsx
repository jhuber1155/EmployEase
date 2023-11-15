import { useQuery } from '@apollo/client';
import { QUERY_ME } from '../utils/queries';
import JobBoard from '../components/JobBoard.jsx';

const Home = () => {
  const {loading, data } = useQuery(QUERY_ME);
  const jobs = data?.jobs || [];

  return (
    <main>
      {loading ? (
            <div>Loading...</div>
          ) : (
             <JobBoard  jobs={jobs} />
          )}
    </main>
  )


};

export default Home;