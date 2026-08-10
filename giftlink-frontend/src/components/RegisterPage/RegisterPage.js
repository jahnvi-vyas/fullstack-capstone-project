import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import urlConfig from '../../config';
import { useAppContext } from '../../context/AuthContext';
import './RegisterPage.css';

export default function RegisterPage() {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showerr, setShowerr] = useState('');

    const navigate = useNavigate();
    const { setIsLoggedIn } = useAppContext();

    const handleRegister = async (e) => {
        e.preventDefault();

        setShowerr('');

        try {
            const response = await fetch(
                `${urlConfig.backendUrl}/api/auth/register`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        firstName,
                        lastName,
                        email,
                        password
                    })
                }
            );

            const json = await response.json();

            if (json.authtoken) {

                sessionStorage.setItem(
                    'auth-token',
                    json.authtoken
                );

                sessionStorage.setItem(
                    'name',
                    firstName
                );

                sessionStorage.setItem(
                    'email',
                    json.email || email
                );

                setIsLoggedIn(true);

                navigate('/app');

            } else if (json.error) {

                setShowerr(json.error);

            } else {

                setShowerr(
                    'Registration failed. Please try again.'
                );
            }

        } catch (error) {

            console.error(
                'Registration error:',
                error
            );

            setShowerr(
                'Unable to connect to the server. Please try again.'
            );
        }
    };

    return (
        <main className="register-page">

            <section className="register-wrapper">

                {/* Left / Brand Section */}
                <div className="register-brand">

                    <div className="brand-badge">
                        🎁
                    </div>

                    <h1>
                        Give something
                        <span> meaningful.</span>
                    </h1>

                    <p>
                        Create your GiftLink account and discover
                        thoughtful gifts for every special moment.
                    </p>

                    <div className="brand-points">

                        <div className="brand-point">
                            <span>✓</span>
                            Discover thoughtful gifts
                        </div>

                        <div className="brand-point">
                            <span>✓</span>
                            Save your favorite products
                        </div>

                        <div className="brand-point">
                            <span>✓</span>
                            Manage your profile easily
                        </div>

                    </div>

                </div>

                {/* Registration Card */}
                <div className="register-card">

                    <div className="register-header">

                        <span className="welcome-label">
                            GET STARTED
                        </span>

                        <h2>
                            Create your account
                        </h2>

                        <p>
                            Join GiftLink today. It only takes a minute.
                        </p>

                    </div>

                    {showerr && (
                        <div className="register-error">
                            <span>!</span>
                            <p>{showerr}</p>
                        </div>
                    )}

                    <form
                        className="register-form"
                        onSubmit={handleRegister}
                    >

                        <div className="form-row">

                            <div className="form-group">

                                <label htmlFor="firstName">
                                    First name
                                </label>

                                <input
                                    id="firstName"
                                    type="text"
                                    placeholder="Enter your first name"
                                    value={firstName}
                                    onChange={(e) =>
                                        setFirstName(e.target.value)
                                    }
                                    required
                                />

                            </div>

                            <div className="form-group">

                                <label htmlFor="lastName">
                                    Last name
                                </label>

                                <input
                                    id="lastName"
                                    type="text"
                                    placeholder="Enter your last name"
                                    value={lastName}
                                    onChange={(e) =>
                                        setLastName(e.target.value)
                                    }
                                    required
                                />

                            </div>

                        </div>

                        <div className="form-group">

                            <label htmlFor="email">
                                Email address
                            </label>

                            <input
                                id="email"
                                type="email"
                                placeholder="you@example.com"
                                value={email}
                                onChange={(e) =>
                                    setEmail(e.target.value)
                                }
                                required
                            />

                        </div>

                        <div className="form-group">

                            <div className="label-row">

                                <label htmlFor="password">
                                    Password
                                </label>

                                <span>
                                    Minimum 6 characters
                                </span>

                            </div>

                            <input
                                id="password"
                                type="password"
                                placeholder="Create a secure password"
                                value={password}
                                onChange={(e) =>
                                    setPassword(e.target.value)
                                }
                                minLength="6"
                                required
                            />

                        </div>

                        <button
                            type="submit"
                            className="register-submit"
                        >
                            Create account
                            <span>→</span>
                        </button>

                    </form>

                    <div className="register-footer">

                        <span>
                            Already have an account?
                        </span>

                        <Link to="/app/login">
                            Sign in
                        </Link>

                    </div>

                </div>

            </section>

        </main>
    );
}