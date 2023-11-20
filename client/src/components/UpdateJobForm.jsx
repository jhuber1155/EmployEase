import React, { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { UPDATE_JOB } from "../utils/mutations";
import FormInput from "./FormInput";
import FormToggle from "./FormToggle";

const UpdateJobForm = ({ job, setShowModal = "" }) => {

    const [updateJob] = useMutation(UPDATE_JOB)

    // Initialize form state with job prop
    const [formState, setFormState] = useState(job);

    // Update form state when job prop changes
    useEffect(() => {
        setFormState(job);
    }, [job]);

    // change job prop value 
    const handleFormChange = (name, value) => {
        setFormState({ ...formState, [name]: value })
    }

    // update job when form submitted
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await updateJob({
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

    return (
        <form id="dropdown" onSubmit={handleSubmit} className=" bg-white max-w-2xl mx-auto rounded-md p-8 shadow-md flex flex-col">

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
            <FormInput
                formId="status"
                title="Current Status"
                value={formState.status}
                onChange={handleFormChange}
                labelClasses="block mb-2"
                inputClasses="w-full border rounded-md p-2"
            />
            <FormInput
                formId="description"
                title="Update Description"
                value={formState.description}
                onChange={handleFormChange}
                placeholder='Enter your job description'
                labelClasses="block mb-2"
                inputClasses="w-full border rounded-md p-2"
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
                    "bg-green-300 text-gray-700 font-bold px-4 py-2 rounded-md mb-4 md:w-3/12 flex",
                    "bg-yellow-300 text-gray-700 font-bold px-4 py-2 rounded-md mb-4 md:w-4/12 flex"
                ]}
            />
            <div>
                {setShowModal ? <button
                    type="button"
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1"
                    onClick={() => setShowModal(false)}
                >
                    Close
                </button> : <></>}
                <button type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded-md self-center"
                >
                    Save Changes
                </button>
            </div>
        </form>
    );
};


export default UpdateJobForm;



