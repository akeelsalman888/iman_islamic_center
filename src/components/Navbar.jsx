import React from "react";
import { Link } from "react-router-dom";
import { FaFacebookF, FaTwitter, FaYoutube, FaLinkedinIn, FaPhoneAlt, FaCommentDots } from "react-icons/fa";
import logo from "../assets/logo.png";
import "./Navbar.css";

function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg custom-navbar fixed-top py-3">
            <div className="container-fluid ps-2 pe-4 pe-lg-5 d-flex align-items-center justify-content-between">

                {/* Left Side: Logo + Branding */}
                <div className="d-flex align-items-center">
                    <Link className="navbar-brand d-flex align-items-center" to="/">
                        <img src={logo} alt="Iman Islamic Center Logo" className="navbar-logo" />
                        <div className="brand-text-wrapper d-flex flex-column">
                            <span className="navbar-brand-text">Iman Islamic Center</span>
                            <span className="navbar-brand-location">Lincoln, NE</span>
                        </div>
                    </Link>
                </div>

                {/* Hamburger button for mobile */}
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                {/* Right Side Section: Links + Actions Pod + Socials */}
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto align-items-center">
                        <li className="nav-item dropdown">
                            <Link to="/" className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Home
                            </Link>
                            <ul className="dropdown-menu">
                                <li><Link className="dropdown-item" to="/">Main Page</Link></li>
                                <li><Link className="dropdown-item" to="/contact">Contact Us</Link></li>
                            </ul>
                        </li>

                        {/* Events Dropdown */}
                        <li className="nav-item dropdown">
                            <a href="#events" className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Events
                            </a>
                            <ul className="dropdown-menu">
                                <li><a className="dropdown-item" href="#upcoming">Upcoming Events</a></li>
                                <li><a className="dropdown-item" href="#past">Past Events</a></li>
                            </ul>
                        </li>

                        <li className="nav-item dropdown">
                            <a href="#prayer" className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Prayer Times
                            </a>
                            <ul className="dropdown-menu">
                                <li><a className="dropdown-item" href="#fajr">Fajr</a></li>
                                <li><a className="dropdown-item" href="#dhuhr">Dhuhr</a></li>
                                <li><a className="dropdown-item" href="#asr">Asr</a></li>
                                <li><a className="dropdown-item" href="#maghrib">Maghrib</a></li>
                                <li><a className="dropdown-item" href="#isha">Isha</a></li>
                                <li><a className="dropdown-item" href="#jummah">Jummah</a></li>
                            </ul>
                        </li>

                        {/* Forms Dropdown */}
                        <li className="nav-item dropdown">
                            <a href="#" className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Forms
                            </a>
                            <ul className="dropdown-menu">
                                <li><a className="dropdown-item" href="/forms/membership.pdf" download>Membership Form</a></li>
                                <li><a className="dropdown-item" href="/forms/donation.pdf" download>Donation Form</a></li>
                                <li><a className="dropdown-item" href="/forms/volunteer.docx" download>Volunteer Application</a></li>
                            </ul>
                        </li>


                        <li className="nav-item"><a href="#donate" className="btn btn-donate ms-3">Donate</a></li>
                    </ul>

                    {/* ACTIONS POD: Phone + Contact (Pushed to the far right of links) */}
                    <div className="phone-wrapper middle-phone-modern d-none d-lg-flex ms-lg-4">
                        <div className="pod-item me-3">
                            <a href="tel:4027303883" className="social-icon phone-icon">
                                <FaPhoneAlt />
                            </a>
                            <span className="phone-number">402-730-3883</span>
                        </div>
                        <div className="pod-divider"></div>
                        <div className="pod-item ms-3">
                            <Link to="/contact" className="contact-link-modern">
                                <FaCommentDots className="me-2" />
                                <span>Contact Us</span>
                            </Link>
                        </div>
                    </div>

                    {/* Social Icons */}
                    <ul className="navbar-nav ms-lg-1 mt-3 mt-lg-0 navbar-right-items align-items-center">
                        <li className="nav-item me-2"><a href="https://facebook.com" target="_blank" className="social-icon facebook"><FaFacebookF /></a></li>
                        <li className="nav-item me-2"><a href="https://twitter.com" target="_blank" className="social-icon twitter"><FaTwitter /></a></li>
                        <li className="nav-item me-2"><a href="https://youtube.com" target="_blank" className="social-icon youtube"><FaYoutube /></a></li>
                        <li className="nav-item"><a href="https://linkedin.com" target="_blank" className="social-icon linkedin"><FaLinkedinIn /></a></li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
