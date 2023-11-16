import React, { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { UPDATE_JOB } from "../utils/mutations";

const UpdateJobForm = ({ job }) => {

    const [ updateJob ] = useMutation(UPDATE_JOB)

    // Initialize form state with job prop
    const [form, setForm] = useState(job);

    // Update form state when job prop changes
    useEffect(() => {
        setForm(job);
    }, [job]);

    // change job prop value 
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        console.log(`Changing ${name} to ${value}`);
        setForm({
            ...form,
            [name]: value,
        });
    };

    // update job when form submitted
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data  } = await updateJob({
                variables: {
                    jobId: form.id,
                    salary: form.salary,
                    status: form.status,
                    interviewOffered: form.interviewOffered 
                }
            })
        } catch (err) {
            console.error(err);
          }

    };

    // toggle the interview status
    const toggleInterviewStatus = () => {
        {
            form.interviewOffered ? console.log(`Changing interview status to interviewing`)
            : console.log(`Changing interview status to pending`);
        }

        setForm((prevForm) => ({
            ...prevForm,
            interviewOffered: !prevForm.interviewOffered,
        }));
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white max-w-2xl mx-auto rounded-md p-8 shadow-md flex flex-col">
            <h2 className="text-2xl font-semibold mb-4">Update Job</h2>
            <label className="block mb-2">
                Salary
                <input
                    type="text"
                    name="salary"
                    value={form.salary}
                    onChange={handleInputChange}
                    className="w-full border rounded-md p-2"
                />
            </label>
            <label className="block mb-2">
                Status
                <select
                    name="status"
                    value={form.status}
                    onChange={handleInputChange}
                    className="w-full border rounded-md p-2"
                >
                    <option value="Open">Open</option>
                    <option value="Accepted">Accepted</option>
                    <option value="Rejected">Rejected</option>
                </select>
            </label>
            <p className="my-2">Click to toggle interview status:</p>
            <button
                type="button"
                name="interviewOffered"
                value={form.interviewOffered}
                onClick={toggleInterviewStatus}
                className={form.interviewOffered ? "bg-green-300 text-gray-700 font-bold px-4 py-2 rounded-md mr-2 mb-4 md:w-4/12" : "bg-yellow-300 text-gray-700 font-bold px-4 py-2 rounded-md mr-2 mb-4 md:w-4/12"}
            >
                {form.interviewOffered ? "Interviewing" : "Pending Interview"}
            </button>

            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md self-center">
                Save Changes
            </button>
        </form>
    );
};


export default UpdateJobForm;

