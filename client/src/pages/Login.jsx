import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';
import Auth from '../utils/auth';

const Login = (props) => {
    const [formState, setFormState] = useState({ email: '', password: '' });
    const [login, { error, data }] = useMutation(LOGIN_USER);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormState({
            ...formState,
            [name]: value,
        });
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        try {
            const { data } = await login({
                variables: { ...formState },
            });
            Auth.login(data.login.token);
        } catch (e) {
            console.error(e);
        }

        setFormState({
            email: '',
            password: '',
        });
    };

    return (
<main className="container min-h-screen mx-auto my-4 px-4">
    <div className="flex justify-center">
        <div className="w-full md:w-2/3 lg:w-1/2">
            <div className="card bg-white shadow-lg rounded-lg">
                <h4 className="card-header bg-slate-400 text-white text-3xl font-semibold py-3 px-4 rounded-t-lg">Login</h4>
                <div className="card-body p-4">
                    {data ? (
                        <p>
                            Success! You may now head{' '}
                            <Link to="/" className="text-blue-600 hover:text-blue-800">back to the homepage.</Link>
                        </p>
                    ) : (
                        <form onSubmit={handleFormSubmit}>
                            <div className="mb-4">
                                <input
                                    className="form-control appearance-none block w-full px-3 py-2 border bg-slate-100 border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    placeholder="Your email"
                                    name="email"
                                    type="email"
                                    value={formState.email}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="mb-4">
                                <input
                                    className="form-control appearance-none block w-full px-3 py-2 border bg-slate-100 border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    placeholder="******"
                                    name="password"
                                    type="password"
                                    value={formState.password}
                                    onChange={handleChange}
                                />
                            </div>
                            <button
                                className="btn bg-green-400 hover:bg-green-600 text-white font-bold py-2 px-4 rounded w-full"
                                type="submit"
                            >
                                Submit
                            </button>
                            <div className="flex justify-center mt-2">
                                <Link to="/signup" className="text-center text-green-400 hover:text-green-600">Signup</Link>
                            </div>
                        </form>
                    )}

                    {error && (
                        <div className="alert alert-danger mt-3 text-red-600 border border-red-400 rounded bg-red-100 px-4 py-3">
                            {error.message}
                        </div>
                    )}
                </div>
            </div>
        </div>
    </div>
</main>

    );
};

export default Login;
