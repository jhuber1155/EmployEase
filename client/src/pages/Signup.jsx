import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';
import Auth from '../utils/auth';

const Signup = () => {
    const [formState, setFormState] = useState({
        username: '',
        email: '',
        password: '',
    });

    const [addUser, { error, data }] = useMutation(ADD_USER);

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormState({
            ...formState,
            [name]: value,
        });
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        console.log(formState);

        try {
            const { data } = await addUser({
                variables: { ...formState },
            });
            console.log(data);
            Auth.login(data.addUser.token);
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <div className='bg-jobPageBlue'>
            <main className="container min-h-screen mx-auto py-4 px-4">
                <div className="flex justify-center">
                    <div className="w-full md:w-2/3 lg:w-1/2">
                        <div className="bg-white shadow-lg rounded-lg">
                            <h4 className="bg-slate-400 text-white text-3xl font-semibold py-3 px-4 rounded-t-lg">Sign Up</h4>
                            <div className="p-4">
                                {data ? (
                                    <p>
                                        Success! You may now head{' '}
                                        <Link to="/" className="text-blue-600 hover:text-blue-800">
                                            back to the homepage.
                                        </Link>
                                    </p>
                                ) : (
                                    <form onSubmit={handleFormSubmit}>
                                        <div className="mb-4">
                                            <input
                                                className="appearance-none block w-full px-3 py-2 border bg-slate-100 border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none sm:text-sm"
                                                placeholder="Your username"
                                                name="username"
                                                type="text"
                                                value={formState.username}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div className="mb-4">
                                            <input
                                                className="appearance-none block w-full px-3 py-2 border bg-slate-100 border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none sm:text-sm"
                                                placeholder="Your email"
                                                name="email"
                                                type="email"
                                                value={formState.email}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div className="mb-4">
                                            <input
                                                className="appearance-none block w-full px-3 py-2 border bg-slate-100 border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none sm:text-sm"
                                                placeholder="*********"
                                                name="password"
                                                type="password"
                                                value={formState.password}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <button className="bg-green-400 hover:bg-green-600 text-white font-bold py-2 px-4 rounded w-full" type="submit">
                                            Submit
                                        </button>
                                    </form>
                                )}

                                {error && (
                                    <div className="text-red-600 border border-red-400 rounded bg-red-100 px-4 py-3 mt-3">
                                        {error.message}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>

    );
};

export default Signup;

