import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import urlConfig from '../../config';
import { useAppContext } from '../../context/AuthContext';
import './LoginPage.css';

export default function LoginPage() {
  const navigate = useNavigate();
  const { setIsLoggedIn, setUserName } = useAppContext();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    setError('');

    if (!email || !password) {
      setError('Please enter your email and password.');
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        `${urlConfig.backendUrl}/api/auth/login`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      const json = await response.json();

      if (response.ok && json.authtoken) {
        sessionStorage.setItem('auth-token', json.authtoken);
        sessionStorage.setItem('name', json.userName);
        sessionStorage.setItem('email', json.userEmail);

        setUserName(json.userName);
        setIsLoggedIn(true);

        navigate('/app');
      } else {
        setError(
          json.error || 'Invalid email or password. Please try again.'
        );
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('Unable to connect to the server. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-background-shape login-shape-one"></div>
      <div className="login-background-shape login-shape-two"></div>

      <div className="login-container">
        <div className="login-card">

          {/* Left / Brand Section */}
          <div className="login-brand-section">
            <div className="brand-logo">
              <span className="brand-icon">🎁</span>
            </div>

            <h1>GiftLink</h1>

            <p>
              Connect, discover and share meaningful gifts
              with the people who matter.
            </p>

            <div className="brand-features">
              <div className="brand-feature">
                <span>✓</span>
                <p>Discover thoughtful gifts</p>
              </div>

              <div className="brand-feature">
                <span>✓</span>
                <p>Save your favorite ideas</p>
              </div>

              <div className="brand-feature">
                <span>✓</span>
                <p>Manage your profile easily</p>
              </div>
            </div>
          </div>

          {/* Login Form */}
          <div className="login-form-section">

            <div className="login-header">
              <span className="login-welcome">WELCOME BACK</span>

              <h2>Sign in to GiftLink</h2>

              <p>
                Enter your details to continue to your account.
              </p>
            </div>

            {error && (
              <div className="login-error">
                <span className="error-icon">!</span>
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleLogin}>

              {/* Email */}
              <div className="form-group">
                <label htmlFor="email">
                  Email address
                </label>

                <div className="input-wrapper">
                  <span className="input-icon">✉</span>

                  <input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete="email"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="form-group">
                <div className="password-label-row">
                  <label htmlFor="password">
                    Password
                  </label>

                  <span className="forgot-password">
                    Forgot password?
                  </span>
                </div>

                <div className="input-wrapper">
                  <span className="input-icon">🔒</span>

                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="current-password"
                  />

                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() =>
                      setShowPassword(!showPassword)
                    }
                    aria-label={
                      showPassword
                        ? 'Hide password'
                        : 'Show password'
                    }
                  >
                    {showPassword ? '◉' : '○'}
                  </button>
                </div>
              </div>

              {/* Remember */}
              <div className="login-options">
                <label className="remember-me">
                  <input type="checkbox" />
                  <span>Remember me</span>
                </label>
              </div>

              {/* Login Button */}
              <button
                type="submit"
                className="login-submit-button"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="login-spinner"></span>
                    Signing in...
                  </>
                ) : (
                  <>
                    Sign in
                    <span className="button-arrow">→</span>
                  </>
                )}
              </button>
            </form>

            {/* Register */}
            <div className="register-section">
              <span>Don't have an account?</span>

              <Link to="/app/register">
                Create an account
              </Link>
            </div>

            <div className="login-footer">
              <span>Secure access to your GiftLink account</span>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}