import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import './RegisterPage.css';
import urlConfig from '../../config';
import { useAppContext } from '../../context/AuthContext';

function RegisterPage() {
    // Form states
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // Error message state
    const [showerr, setShowerr] = useState('');

    // Navigation and authentication context
    const navigate = useNavigate();
    const { setIsLoggedIn } = useAppContext();

    const handleRegister = async () => {
        try {
            // Step 1: Call registration API
            const response = await fetch(
                `${urlConfig.backendUrl}/api/auth/register`,
                {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json',
                    },
                    body: JSON.stringify({
                        firstName: firstName,
                        lastName: lastName,
                        email: email,
                        password: password
                    })
                }
            );

            // Step 2: Access JSON response
            const json = await response.json();

            // Successful registration
            if (json.authtoken) {
                // Store authentication/user details
                sessionStorage.setItem('auth-token', json.authtoken);
                sessionStorage.setItem('name', firstName);
                sessionStorage.setItem('email', json.email);

                // Update login state
                setIsLoggedIn(true);

                // Navigate to MainPage
                navigate('/app');
            }

            // Registration error
            if (json.error) {
                setShowerr(json.error);
            }

        } catch (e) {
            console.log('Error fetching details: ' + e.message);
            setShowerr('Registration failed. Please try again.');
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6 col-lg-4">

                    <div className="register-card p-4 border rounded">

                        <h2 className="text-center mb-4 font-weight-bold">
                            Register
                        </h2>

                        {/* First Name */}
                        <div className="mb-4">
                            <label
                                htmlFor="firstName"
                                className="form-label"
                            >
                                First Name
                            </label>

                            <input
                                id="firstName"
                                type="text"
                                className="form-control"
                                placeholder="Enter your first name"
                                value={firstName}
                                onChange={(e) =>
                                    setFirstName(e.target.value)
                                }
                            />
                        </div>

                        {/* Last Name */}
                        <div className="mb-4">
                            <label
                                htmlFor="lastName"
                                className="form-label"
                            >
                                Last Name
                            </label>

                            <input
                                id="lastName"
                                type="text"
                                className="form-control"
                                placeholder="Enter your last name"
                                value={lastName}
                                onChange={(e) =>
                                    setLastName(e.target.value)
                                }
                            />
                        </div>

                        {/* Email */}
                        <div className="mb-4">
                            <label
                                htmlFor="email"
                                className="form-label"
                            >
                                Email
                            </label>

                            <input
                                id="email"
                                type="email"
                                className="form-control"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) =>
                                    setEmail(e.target.value)
                                }
                            />

                            {/* Registration error */}
                            {showerr && (
                                <div className="text-danger mt-2">
                                    {showerr}
                                </div>
                            )}
                        </div>

                        {/* Password */}
                        <div className="mb-4">
                            <label
                                htmlFor="password"
                                className="form-label"
                            >
                                Password
                            </label>

                            <input
                                id="password"
                                type="password"
                                className="form-control"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) =>
                                    setPassword(e.target.value)
                                }
                            />
                        </div>

                        {/* Register Button */}
                        <button
                            type="button"
                            className="btn btn-primary w-100"
                            onClick={handleRegister}
                        >
                            Register
                        </button>

                        {/* Login Link */}
                        <p className="mt-4 text-center">
                            Already a member?{' '}
                            <a
                                href="/app/login"
                                className="text-primary"
                            >
                                Login
                            </a>
                        </p>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default RegisterPage;