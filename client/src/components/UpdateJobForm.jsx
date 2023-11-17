import React, { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { UPDATE_JOB } from "../utils/mutations";
import FormInput from "./FormInput";

const UpdateJobForm = ({ job }) => {

    const [ updateJob ] = useMutation(UPDATE_JOB)

    // Initialize form state with job prop
    const [formState, setFormState] = useState(job);

    // Update form state when job prop changes
    useEffect(() => {
        setFormState(job);
    }, [job]);

    // change job prop value 
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        console.log(`Changing ${name} to ${value}`);
        setFormState({
            ...formState,
            [name]: value,
        });
    };

    const handleFormChange = (name, value) => {
        setFormState({ ...formState, [name]: value })
      }

    // update job when form submitted
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data  } = await updateJob({
                variables: {
                    jobId: formState.id,
                    salary: formState.salary,
                    description: formState.description,
                    status: formState.status,
                    interviewOffered: formState.interviewOffered 
                }
            })
        } catch (err) {
            console.error(err);
          }

    };

    // toggle the interview status
    const toggleInterviewStatus = () => {
        {
            formState.interviewOffered ? console.log(`Changing interview status to interviewing`)
            : console.log(`Changing interview status to pending`);
        }

        setFormState((prevForm) => ({
            ...prevForm,
            interviewOffered: !prevForm.interviewOffered,
        }));
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white max-w-2xl mx-auto rounded-md p-8 shadow-md flex flex-col">
            <h2 className="text-2xl font-semibold mb-4">Update Job</h2>
            <FormInput
                formId="salary"
                title="Salary"
                value={formState.salary}
                onChange={handleFormChange}
                placeholder='Enter your hourly wage or Salary here'
                labelClasses="block mb-2"
                inputClasses="w-full border rounded-md p-2"
            />
            <label className="block mb-2">
                Status
                <select
                    name="status"
                    value={formState.status}
                    onChange={handleInputChange}
                    className="w-full border rounded-md p-2"
                >
                    <option value="Open">Open</option>
                    <option value="Accepted">Accepted</option>
                    <option value="Rejected">Rejected</option>
                </select>
            </label>
            <FormInput
                formId="description"
                title="Update Description"
                value={formState.description}
                onChange={handleFormChange}
                placeholder='Enter your job description'
                labelClasses="block mb-2"
                inputClasses="w-full border rounded-md p-2"
            />
            <p className="my-2">Click to toggle interview status:</p>
            <button
                type="button"
                name="interviewOffered"
                value={formState.interviewOffered}
                onClick={toggleInterviewStatus}
                className={formState.interviewOffered ? "bg-green-300 text-gray-700 font-bold px-4 py-2 rounded-md mr-2 mb-4 md:w-4/12" : "bg-yellow-300 text-gray-700 font-bold px-4 py-2 rounded-md mr-2 mb-4 md:w-4/12"}
            >
                {formState.interviewOffered ? "Interviewing" : "Pending Interview"}
            </button>

            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded-md self-center">
                Save Changes
            </button>
        </form>
    );
};


export default UpdateJobForm;

