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
        <main className="container my-4">
            <div className="row justify-content-center">
                <div className="col-md-8 col-lg-6">
                    <div className="card">
                        <h4 className="card-header bg-dark text-white">Login</h4>
                        <div className="card-body">
                            {data ? (
                                <p>
                                    Success! You may now head{' '}
                                    <Link to="/" className="text-primary">back to the homepage.</Link>
                                </p>
                            ) : (
                                <form onSubmit={handleFormSubmit}>
                                    <div className="mb-3">
                                        <input
                                            className="form-control"
                                            placeholder="Your email"
                                            name="email"
                                            type="email"
                                            value={formState.email}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <input
                                            className="form-control"
                                            placeholder="******"
                                            name="password"
                                            type="password"
                                            value={formState.password}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <button
                                        className="btn btn-primary w-100"
                                        type="submit"
                                    >
                                        Submit
                                    </button>
                                    <div className="d-flex justify-content-center mt-2">
                                        <Link to="/signup" className="text-center">Signup</Link>
                                    </div>
                                </form>
                            )}

                            {error && (
                                <div className="alert alert-danger mt-3">
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
