import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';
import Auth from '../utils/auth';

const Login = (props) => {
    const [formState, setFormState] = useState({ email: '', password: '' });
    const [login, { loading, error, data }] = useMutation(LOGIN_USER);
    
    const loadingIcon = (<div role="status">
        <svg aria-hidden="true" class="inline w-6 h-6 text-gray-200 animate-spin dark:text-gray-600 fill-green-500" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
        </svg>
        <span class="sr-only">Loading...</span>
    </div>);

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
        <div className='bg-jobPageBlue'>
        <main className="container min-h-screen mx-auto py-4 px-4">
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
                                    <button
                                        className="btn bg-green-400 hover:bg-green-600 text-white font-bold py-2 px-4 rounded w-full"
                                        type="submit"
                                    >
                                        {loading? loadingIcon:"Submit"}
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
        </div>

    );
};

export default Login;
