import { useQuery } from '@apollo/client';
import { QUERY_ME } from '../utils/queries';
import JobBoard from '../components/JobBoard.jsx';

const Home = () => {
  const {loading, data } = useQuery(QUERY_ME);
  // const jobs = data?.jobs || [];
  const jobs = [
    {
      "id": "65558b47f2f7c75f5253a0d1",
      "jobTitle": "Web Designer",
      "salary": "$55,000 - $100,000",
      "companyName": "AC infinite",
      "description": "A web designer for an HVAC company.",
      "status": "Accepted",
      "location": "Remote",
      "fullTime": true,
      "jobLink": "www.indeed.com",
      "appliedOn": "Nov 9th, 2023",
      "interviewOffered": true
    },
    {
      "id": "65558b47f2f7c75f5253a0d4",
      "jobTitle": "Junior Web Development Associate",
      "salary": "$25/hour",
      "companyName": "LA Clippers",
      "description": "Day to day operations of team website and mobile apps.",
      "status": "Open",
      "location": "Los Angeles, CA",
      "fullTime": false,
      "jobLink": "www.ziprecruiter.com",
      "appliedOn": "Oct 28th, 2023",
      "interviewOffered": false
    },
    {
      "id": "65558b47f2f7c75f5253a0d7",
      "jobTitle": "Web Designer",
      "salary": "$45/hour",
      "companyName": "Popular Marketing",
      "description": "Create and design best in class user experience website.",
      "status": "Open",
      "location": "Remote",
      "fullTime": true,
      "jobLink": "www.glassdoor.com",
      "appliedOn": "Sep 12th, 2023",
      "interviewOffered": true
    },
    {
      "id": "65558b47f2f7c75f5253a0da",
      "jobTitle": "Junior Web Designer",
      "salary": "$65,000 - $70,000",
      "companyName": "Sony",
      "description": "Music division website handling.",
      "status": "Rejected",
      "location": "New York, NY",
      "fullTime": true,
      "jobLink": "www.monster.com",
      "appliedOn": "Nov 1st, 2023",
      "interviewOffered": false
    },
    {
      "id": "65558b47f2f7c75f5253a0dd",
      "jobTitle": "Junior Frontend Engineer",
      "salary": "$67,000",
      "companyName": "Fitness Matrix Inc",
      "description": "Building customer-facing applications",
      "status": "Accepted",
      "location": "Remote",
      "fullTime": true,
      "jobLink": "https://www.linkedin.com/jobs/view/junior-frontend-engineer-javascript-html-css-at-fitness-matrix-inc-3763676883?utm_campaign=google_jobs_apply&utm_source=google_jobs_apply&utm_medium=organic",
      "appliedOn": "Nov 2nd, 2023",
      "interviewOffered": true
    },
    {
      "id": "65558b47f2f7c75f5253a0e0",
      "jobTitle": "Backend Web Developer",
      "salary": "$70,000 - $90,000",
      "companyName": "Virta Health",
      "description": "Code, test and ship new product features of the enrollment product maintaining high quality coding standards",
      "status": "Open",
      "location": "Calabassas, CA",
      "fullTime": true,
      "jobLink": "https://unique-jobs.us/joblistings/virta-health/california/backend-web-developer-6541139e709a3204c521bcdb?utm_campaign=google_jobs_apply&utm_source=google_jobs_apply&utm_medium=organic",
      "appliedOn": "Nov 14th, 2023",
      "interviewOffered": false
    }
  ]

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