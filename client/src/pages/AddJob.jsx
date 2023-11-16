import { useState } from 'react';
import { useMutation } from '@apollo/client';

import { ADD_JOB } from '../utils/mutations';

const JobForm = () => {

  const [formState, setFormState] = useState({
    jobTitle: '',
    salary: '',
    companyName: '',
    location: '',
    description: '',
    jobLink: '',
    appliedOn: '',
    status: '',
  });
  
  const [addJob, { error }] = useMutation(ADD_JOB)

  const handleFormSubmit = async (event) => {
    event.preventDefault();
      try{
        const { data } = await addJob({
          variables: { ...formState },
        });

        setFormState({
          jobTitle: '',
          salary: '',
          companyName: '',
          location: '',
          description: '',
          jobLink: '',
          appliedOn: '',
          status: '',
        });
      } catch (err) {
        console.error(err);
      }
  };

    const handleChange = (event) => {
        //??????
    }

    return (
      <div className="isolate bg-white px-6 py-24 sm:py-32 lg:px-8">
        <div
          className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]"
          aria-hidden="true"
        >
          <div
            className="relative left-1/2 -z-10 aspect-[1155/678] w-[36.125rem] max-w-none -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-40rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
          />
        </div>
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Add A Job</h2>
          <p className="mt-2 text-lg leading-8 text-gray-600">
            Please enter the details of the Job below to add it to your Job Board!
          </p>
        </div>
        <form action="#" method="POST" className="mx-auto mt-16 max-w-xl sm:mt-20" onSubmit={handleFormSubmit}>
          <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
          <div className="sm:col-span-2">
              <label htmlFor="job-title" className="block text-sm font-semibold leading-6 text-gray-900">
                Job Title:
              </label>
              <div className="mt-2.5">
                <input
                  type="text"
                  name="jobTitle"
                  id="jobTitle"
                  value={formState.jobTitle}
                  onChange={handleChange}
                  autoComplete="jobTitle"
                  className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="Enter the Job Title you are applying for here"
                />
              </div>
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="salary" className="block text-sm font-semibold leading-6 text-gray-900">
                Salary:
              </label>
              <div className="mt-2.5">
                <input
                  type="text"
                  name="salary"
                  id="salary"
                  value={formState.salary}
                  onChange={handleChange}
                  autoComplete="salary"
                  className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="Enter your hourly wage or Salary here"
                />
              </div>
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="company" className="block text-sm font-semibold leading-6 text-gray-900">
                Company:
              </label>
              <div className="mt-2.5">
                <input
                  type="text"
                  name="company"
                  id="company"
                  value={formState.companyName}
                  onChange={handleChange}
                  autoComplete="companyName"
                  className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="Enter the name of the Company you are applying to"
                />
              </div>
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="location" className="block text-sm font-semibold leading-6 text-gray-900">
                Location:
              </label>
              <div className="mt-2.5">
                <input
                  type="text"
                  name="location"
                  id="location"
                  value={formState.location}
                  onChange={handleChange}
                  autoComplete="location"
                  className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="Where will this job be located at?"
                />
              </div>
            </div>
            <div>
                <div className="sm:col-span-2">
                    <label htmlFor="hours" className="block text-sm font-semibold leading-6 text-gray-900">
                        Full Time or Part Time:
                    </label>
                    <div className="mt-2.5">
                        <input
                        type="checkbox"
                        name="fullTime"
                        id="fullTime"
                        autoComplete="fullTime"
                        className="block rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                    <label htmlFor="hours" className="ml-2 text-sm text-gray-900">
                    Is this a Part Time or Full Time Job?
                    </label>
                    </div>
                </div>
            <div className="sm:col-span-2">
              <label htmlFor="description" className="block text-sm font-semibold leading-6 text-gray-900">
                Job Description:
              </label>
              <div className="mt-2.5">
                <textarea
                  name="description"
                  id="description"
                  value={formState.description}
                  onChange={handleChange}
                  rows={4}
                  className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="Enter some key information about this particular job"
                  defaultValue={''}
                />
              </div>
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="link" className="block text-sm font-semibold leading-6 text-gray-900">
                Website used to find Job Listing:
              </label>
              <div className="mt-2.5">
                <input
                  type="text"
                  name="link"
                  id="link"
                  value={formState.jobLink}
                  onChange={handleChange}
                  autoComplete="jobLink"
                  className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="Where did you discover this job listing?"
                />
              </div>
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="date" className="block text-sm font-semibold leading-6 text-gray-900">
                Applied On:
              </label>
              <div className="mt-2.5">
                <input
                  type="text"
                  name="date"
                  id="date"
                  value={formState.appliedOn}
                  onChange={handleChange}
                  autoComplete="appliedOn"
                  className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="On what day did you apply for this job?"
                />
              </div>
            </div>
                <div className="sm:col-span-2">
                <label htmlFor="interview" className="block text-sm font-semibold leading-6 text-gray-900">
                Interview Offered?
                </label>
                    <div className="mt-2.5 flex items-center">
                        <input
                        type="checkbox"
                        name="interview"
                        id="interview"
                        autoComplete="interviewOffered"
                        className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        />
                <label htmlFor="interview" className="ml-2 text-sm text-gray-900">
                Did you land an interview for this job?
                </label>
                    </div>
                </div>
            <div className="sm:col-span-2">
              <label htmlFor="status" className="block text-sm font-semibold leading-6 text-gray-900">
                Current Status:
              </label>
              <div className="mt-2.5">
                <input
                  type="text"
                  name="status"
                  id="status"
                  value={formState.status}
                  onChange={handleChange}
                  autoComplete="status"
                  className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="What is the current status of this job?"
                />
              </div>
            </div>
            </div>
          </div>
          <div className="mt-10">
            <button
              type="submit"
              className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-black shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Add to Jobs!
            </button>
          </div>
        </form>
      </div>
    )
  };
  
  export default JobForm;