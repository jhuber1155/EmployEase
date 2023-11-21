import { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import Auth from '../utils/auth'
import { ADD_JOB } from '../utils/mutations';
import FormInput from '../components/FormInput';
import FormToggle from '../components/FormToggle';
const JobForm = () => {

  const inputStyling = "block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6";
  const inputStylingWithError = "block w-full rounded-md border-0 px-3.5 py-2 text-red-600 shadow-sm ring-1 ring-inset ring-red-700 placeholder:text-red-600 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6";
  const labelStyling = "block text-sm font-semibold leading-6 text-gray-900";
  const labelStylingWithError = "block text-sm font-semibold leading-6 text-red-700";

  const [errorMessage, setErrorMessage] = useState({
    jobTitle: '',
    salary: '',
  });
  // default form input values
  const [formState, setFormState] = useState({
    jobTitle: '',
    salary: '',
    companyName: '',
    location: '',
    isRemote: false,
    fullTime: false,
    description: '',
    jobLink: '',
    appliedOn: new Date().toISOString().substring(0, 10),
    status: 'Open',
    interviewOffered: false,
  });

  const [addJob, { error }] = useMutation(ADD_JOB)
  // call add job mutation on form submit
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    let error = false
    const errorTemp = { ...errorMessage }
    if (formState.jobTitle == "") {
      errorTemp.jobTitle = `Please fill out a Job Title.`;
      error = true
    }

    if (formState.salary == "") {
      errorTemp.salary = `Please fill out a salary amount.`;
      error = true
    }

    if (error) {
      setErrorMessage(errorTemp)
      // Removes error message after any input is entered for some reason
      setTimeout(() => {
        errorTemp.jobTitle = ''
        errorTemp.salary = ''
        setErrorMessage(errorTemp)
      }, 1)
      return
    }
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
    <div className="isolate bg-gradient-to-t from-sky-600 to-sky-300 px-6 py-5 md:py-15 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight text-slate-100 sm:text-4xl">Add A Job</h2>
        <p className="mt-2 text-xl leading-8 text-slate-100">
          Enter the details of the Job below to add it to your Job Board!
        </p>
      </div>
      <form action="#" method="POST" className="mx-auto mt-16 max-w-xl sm:mt-20" onSubmit={handleFormSubmit}>
        <div className="grid grid-cols-2 gap-x-8 gap-y-6 bg-slate-400 p-3 rounded-md lg:grid-cols-2">
          <FormInput
            required={true}
            formId="jobTitle"
            title="Job Title:"
            value={formState.jobTitle}
            onChange={handleFormChange}
            placeholder={errorMessage.jobTitle ? errorMessage.jobTitle : 'Enter the Job Title'}
            labelClasses={errorMessage.jobTitle ? labelStylingWithError : labelStyling}
            inputClasses={errorMessage.jobTitle ? inputStylingWithError : inputStyling}
          />
          <FormInput required
            formId="salary"
            title="Salary:"
            value={formState.salary}
            onChange={handleFormChange}
            placeholder={errorMessage.salary ? errorMessage.salary : 'Enter the Hourly Wage or Salary'}
            labelClasses={errorMessage.salary ? labelStylingWithError : labelStyling}
            inputClasses={errorMessage.salary ? inputStylingWithError : inputStyling}
          />
          <FormInput
            formId="companyName"
            title="Company:"
            value={formState.companyName}
            onChange={handleFormChange}
            placeholder='Enter the Company Name'
            labelClasses={labelStyling}
            inputClasses={inputStyling}
          />
          <div>
            <FormInput
              formId="location"
              title="Address:"
              value={formState.location}
              onChange={handleFormChange}
              placeholder='123 Main Street, Your City, Your State, 12345'
              labelClasses={labelStyling}
              inputClasses={inputStyling}
            />
            <div>
              <input
                type="checkbox"
                id="isRemote"
                value={formState.isRemote}
                onChange={() =>
                  formState.isRemote ? setFormState({ ...formState, ["isRemote"]: false })
                    : setFormState({ ...formState, ["isRemote"]: true })}
              />
              <label className="text-sm text-gray-900" htmlFor="isRemote">This Position is Remote</label>
            </div>
          </div>
          <FormInput
            formId="description"
            title="Job Description:"
            value={formState.description}
            onChange={handleFormChange}
            placeholder='Enter a Job Description'
            labelClasses={labelStyling}
            inputClasses={inputStyling}
          />
          <FormInput
            formId="jobLink"
            title="Job Listing:"
            value={formState.jobLink}
            onChange={handleFormChange}
            placeholder='Enter a URL for this Job Listing'
            labelClasses={labelStyling}
            inputClasses={inputStyling}
          />
          <FormInput
            type='date'
            formId="appliedOn"
            title="Applied On:"
            value={formState.appliedOn}
            onChange={handleFormChange}
            containerClasses='col-span-2'
            labelClasses={labelStyling}
            inputClasses={inputStyling}
          />
          <FormToggle
            formId="fullTime"
            title="Full Time or Part Time:"
            options={[
              "Full Time",
              "Part Time"
            ]}
            isOption1={formState.fullTime}
            onChange={handleFormChange}
            labelClasses={labelStyling}
            inputClassesOptions={[
              "bg-green-300 text-gray-700 font-bold px-4 py-2 rounded-md mx-2 md:w-6/12 lg:w-6/12",
              "bg-yellow-300 text-gray-700 font-bold px-4 py-2 rounded-md mx-2 md:w-6/12 lg:w-6/12"
            ]}
          />
          <FormToggle
            formId="interviewOffered"
            title="Interview Status:"
            options={[
              "Interviewing",
              "Pending Interview"
            ]}
            isOption1={formState.interviewOffered}
            onChange={handleFormChange}
            labelClasses={labelStyling}
            inputClassesOptions={[
              "bg-green-300 text-gray-700 font-bold px-4 py-2 rounded-md mx-2 md:w-12/12 lg:w-12/12",
              "bg-yellow-300 text-gray-700 font-bold px-4 py-2 rounded-md mx-2 md:w-12/12 lg:w-12/12"
            ]}
          />
          <FormInput
            formId="status"
            title="Job Status:"
            value={formState.status}
            onChange={handleFormChange}
            containerClasses='col-span-2'
            labelClasses={labelStyling}
            inputClasses={inputStyling}
          />
          <div className="mt-10 col-span-2">
            <button
              type="submit"
              className="block w-full rounded-md bg-green-500 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-green-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-500"
            >
              <span className='text-lg'>Add to Jobs!</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  )
};

export default JobForm;