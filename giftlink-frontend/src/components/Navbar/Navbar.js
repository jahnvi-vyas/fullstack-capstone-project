import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import urlConfig from '../../config';
import { useAppContext } from '../../context/AuthContext';
import './Navbar.css';

export default function Navbar() {
    const {
        isLoggedIn,
        setIsLoggedIn,
        userName,
        setUserName
    } = useAppContext();

    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const authToken = sessionStorage.getItem('auth-token');
        const storedName = sessionStorage.getItem('name');

        if (authToken && storedName) {
            setUserName(storedName);
            setIsLoggedIn(true);
        }
    }, [setIsLoggedIn, setUserName]);

    const closeMenu = () => {
        setMenuOpen(false);
    };

    const handleLogout = () => {
        sessionStorage.removeItem('auth-token');
        sessionStorage.removeItem('name');
        sessionStorage.removeItem('email');

        setIsLoggedIn(false);
        setUserName('');

        closeMenu();
        navigate('/app');
    };

    const handleProfile = () => {
        closeMenu();
        navigate('/app/profile');
    };

    return (
        <header className="giftlink-navbar">
            <div className="navbar-container">

                {/* Logo */}
                <Link
                    to="/app"
                    className="navbar-logo"
                    onClick={closeMenu}
                >
                    <span className="logo-icon">🎁</span>
                    <span className="logo-text">
                        Gift<span>Link</span>
                    </span>
                </Link>

                {/* Mobile Menu Button */}
                <button
                    className={`mobile-menu-button ${menuOpen ? 'active' : ''}`}
                    onClick={() => setMenuOpen(!menuOpen)}
                    aria-label="Toggle navigation"
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </button>

                {/* Navigation */}
                <nav className={`navbar-navigation ${menuOpen ? 'open' : ''}`}>

                    <Link
                        to="/app"
                        className="navbar-link"
                        onClick={closeMenu}
                    >
                        <span className="nav-icon">⌂</span>
                        Home
                    </Link>

                    <Link
                        to="/app"
                        className="navbar-link"
                        onClick={closeMenu}
                    >
                        <span className="nav-icon">🎁</span>
                        Gifts
                    </Link>

                    <Link
                        to="/app/search"
                        className="navbar-link"
                        onClick={closeMenu}
                    >
                        <span className="nav-icon">⌕</span>
                        Search
                    </Link>

                    <div className="navbar-divider"></div>

                    {isLoggedIn ? (
                        <div className="logged-in-section">

                            <button
                                className="profile-button"
                                onClick={handleProfile}
                            >
                                <span className="profile-avatar">
                                    {userName
                                        ? userName.charAt(0).toUpperCase()
                                        : 'U'}
                                </span>

                                <span className="profile-name">
                                    {userName}
                                </span>
                            </button>

                            <button
                                className="logout-button"
                                onClick={handleLogout}
                            >
                                Logout
                            </button>

                        </div>
                    ) : (
                        <div className="auth-buttons">

                            <Link
                                to="/app/login"
                                className="login-button"
                                onClick={closeMenu}
                            >
                                Login
                            </Link>

                            <Link
                                to="/app/register"
                                className="register-button"
                                onClick={closeMenu}
                            >
                                Get Started
                            </Link>

                        </div>
                    )}

                </nav>
            </div>
        </header>
    );
}