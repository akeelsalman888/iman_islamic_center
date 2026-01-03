import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark fixed-top">
            <div className="container">
                {/* Brand */}
                <Link className="navbar-brand" to="/">Iman Islamic Center</Link>

                {/* Hamburger toggle for mobile */}
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

                {/* Navbar links */}
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto">

                        {/* Home */}
                        <li className="nav-item">
                            <a href="#hero" className="nav-link">Home</a>
                        </li>

                        {/* Prayer Times */}
                        <li className="nav-item">
                            <a href="#prayer" className="nav-link">Prayer Times</a>
                        </li>

                        {/* Events */}
                        <li className="nav-item">
                            <a href="#events" className="nav-link">Events</a>
                        </li>

                        {/* Contact */}
                        <li className="nav-item">
                            <a href="#footer" className="nav-link">Contact</a>
                        </li>

                        {/* Donate Button */}
                        <li className="nav-item">
                            <a href="#donate" className="btn btn-light ms-3">Donate</a>
                        </li>

                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
