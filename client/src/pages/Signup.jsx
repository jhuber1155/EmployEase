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
        <main className="container my-4">
            <div className="row justify-content-center">
                <div className="col-md-8 col-lg-6">
                    <div className="card">
                        <h4 className="card-header bg-dark text-white">Sign Up</h4>
                        <div className="card-body">
                            {data ? (
                                <p>
                                    Success! You may now head{' '}
                                    <Link to="/" className="text-primary">
                                        back to the homepage.
                                    </Link>
                                </p>
                            ) : (
                                <form onSubmit={handleFormSubmit}>
                                    <div className="mb-3">
                                        <input
                                            className="form-control"
                                            placeholder="Your username"
                                            name="username"
                                            type="text"
                                            value={formState.username}
                                            onChange={handleChange}
                                        />
                                    </div>
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
                                    <button className="btn btn-primary w-100" type="submit">
                                        Submit
                                    </button>
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

export default Signup;

