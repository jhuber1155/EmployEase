import { useQuery } from '@apollo/client';
import { QUERY_JOBS } from '../../utils/queries';
import JobBoard from '../components/JobBoard.jsx';

const Home = () => {
  const {loading, data } = useQuery(QUERY_JOBS);
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