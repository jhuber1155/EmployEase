import { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import Auth from '../utils/auth'
import { ADD_JOB } from '../utils/mutations';
import FormInput from '../components/FormInput';
import FormToggle from '../components/FormToggle';
import { checkText } from '../utils/helpers';

const JobForm = () => {
  const [errorMessage, setErrorMessage] = useState({
    jobTitle: '',
    salary: '',
    companyName: '',
    location: '',
    fullTime: false,
    description: '',
    jobLink: '',
    appliedOn: new Date().toISOString().substring(0,10),
    status: 'Open',
    interviewOffered: false,
  });

  const [formState, setFormState] = useState({
    jobTitle: '',
    salary: '',
    companyName: '',
    location: '',
    fullTime: false,
    description: '',
    jobLink: '',
    appliedOn: new Date().toISOString().substring(0,10),
    status: 'Open',
    interviewOffered: false,
  });

  useEffect(() =>{
    console.log(errorMessage)
  }, [errorMessage])

  const [addJob, { error }] = useMutation(ADD_JOB)

  const handleFormSubmit = async (event) => {
    event.preventDefault();
      let error=false
      const errorTemp = {...errorMessage}
    if (formState.jobTitle=="") {
        errorTemp.jobTitle= `Please fill out a Job Title.`;
        error = true
      }

      if (formState.salary=="") {
        errorTemp.salary= `Please fill out a salary amount.`;
        error = true
      }
      
      if (error){
        setErrorMessage(errorTemp)
        return } 
    try {
      const { data } = await addJob({
        variables: {
          ...formState,

          userId: Auth.getProfile().data._id
        },
      });

      window.location.assign("/")
    } catch (err) {
      console.error(err);
    }
  };

  // change formState values 
  const handleFormChange = (name, value) => {
    setFormState({ ...formState, [name]: value })
  }

  return (
    <div className="isolate bg-gradient-to-t from-sky-600 to-sky-300 px-6 py-24 sm:py-32 lg:px-8">
      <div
        className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]"
        aria-hidden="true"
      >
        <div
          className="relative left-1/2 -z-10 aspect-[1155/678] w-[36.125rem] max-w-none -translate-x-1/2 rotate-[30deg]"
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
        />
      </div>
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight text-slate-100 sm:text-4xl">Add A Job</h2>
        <p className="mt-2 text-xl leading-8 text-slate-100">
          Please enter the details of the Job below to add it to your Job Board!
        </p>
      </div>
      <form action="#" method="POST" className="mx-auto mt-16 max-w-xl sm:mt-20" onSubmit={handleFormSubmit}>
        <div className="grid grid-cols-1 gap-x-8 gap-y-6 bg-slate-400 p-3 rounded-md sm:grid-cols-2">
          <FormInput 
            required={true}
            formId="jobTitle"
            title="Job Title:"
            value={formState.jobTitle}
            onChange={handleFormChange}
            placeholder='Enter the Job Title you are applying for here'
            labelClasses="block text-sm font-semibold leading-6 text-gray-900"
            inputClasses="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
          <span className="text-red-700">{errorMessage.jobTitle}</span>
          <FormInput required
            formId="salary"
            title="Salary:"
            value={formState.salary}
            onChange={handleFormChange}
            placeholder='Enter your hourly wage or Salary here'
            labelClasses="block text-sm font-semibold leading-6 text-gray-900"
            inputClasses="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
          <span className="text-red-700">{errorMessage.salary}</span>
          <FormInput
            formId="companyName"
            title="Company:"
            value={formState.companyName}
            onChange={handleFormChange}
            placeholder='Enter the name of the Company you are applying to'
            labelClasses="block text-sm font-semibold leading-6 text-gray-900"
            inputClasses="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
          <FormInput
            formId="location"
            title="Location"
            value={formState.location}
            onChange={handleFormChange}
            placeholder='Where will this job be located at?'
            labelClasses="block text-sm font-semibold leading-6 text-gray-900"
            inputClasses="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
          <FormInput
            formId="description"
            title="Job Description:"
            value={formState.description}
            onChange={handleFormChange}
            placeholder='Enter a job description'
            labelClasses="block text-sm font-semibold leading-6 text-gray-900"
            inputClasses="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
          <FormInput
            formId="jobLink"
            title="Link to Job Listing:"
            value={formState.jobLink}
            onChange={handleFormChange}
            placeholder='Where did you discover this job listing?'
            labelClasses="block text-sm font-semibold leading-6 text-gray-900"
            inputClasses="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
          <FormInput
            type='date'
            formId="appliedOn"
            title="Applied On:"
            value={formState.appliedOn}
            onChange={handleFormChange}
            labelClasses="block text-sm font-semibold leading-6 text-gray-900"
            inputClasses="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
          <div>
            <FormToggle
              formId="fullTime"
              title="Full Time or Part Time:"
              options={[
                "Full Time",
                "Part Time"
              ]}
              isOption1={formState.fullTime}
              onChange={handleFormChange}
              labelClasses="my-2"
              inputClassesOptions={[
                "bg-green-300 text-gray-700 font-bold px-4 py-2 rounded-md mx-2 mb-4 md:w-6/12 lg:w-6/12",
                "bg-yellow-300 text-gray-700 font-bold px-4 py-2 rounded-md mx-2 mb-4 md:w-4/12 lg:w-6/12"
              ]}
            />
            <FormToggle
              formId="interviewOffered"
              title="Click to toggle interview status:"
              options={[
                "Interviewing",
                "Pending Interview"
              ]}
              isOption1={formState.interviewOffered}
              onChange={handleFormChange}
              labelClasses="my-2"
              inputClassesOptions={[
                "bg-green-300 text-gray-700 font-bold px-4 py-2 rounded-md mx-2",
                "bg-yellow-300 text-gray-700 font-bold px-4 py-2 rounded-md mx-2 mb-4 md:w-4/12 lg:w-6/12"
              ]}
            />
            <FormInput
              formId="status"
              title="Current Status"
              value={formState.status}
              onChange={handleFormChange}
              labelClasses="block text-sm font-semibold mt-2 leading-6 text-gray-900"
              inputClasses="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
        <div className="mt-10">
          <button
            type="submit"
            className="block w-full rounded-md bg-green-500 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-green-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-500"
          >
            <span className='text-lg'>Add to Jobs!</span>
          </button>
        </div>
      </form>
    </div>
  )
};

export default JobForm;