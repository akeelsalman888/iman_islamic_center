import React from "react";
import "./Donate.css";

function Donate() {
    return (
        <section id="donate" className="donate-section d-flex align-items-center justify-content-center">
            <div className="donate-overlay"></div>
            <div className="container-fluid donate-content text-center">
                <h2>Support Iman Islamic Center</h2>
                <p>Your generous contributions help us run educational programs, Quran classes, and community services.</p>
                <a href="https://www.paypal.com/donate" target="_blank" rel="noopener noreferrer" className="btn btn-light btn-lg mt-3">
                    Donate Now
                </a>
            </div>
        </section>
    );
}

export default Donate;
