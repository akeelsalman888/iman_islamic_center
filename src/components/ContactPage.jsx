import React, { useEffect } from "react";
import Contact from "./Contact";
import "./ContactPage.css";

function ContactPage() {
    // Scroll to top when the page loads
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="contact-page-wrapper">
            {/* Minimalist Header for the dedicated page */}
            <div className="contact-page-header">
                <div className="container">
                    <h1>Contact Us</h1>
                    <p>We are here to help and answer any questions you may have.</p>
                </div>
            </div>

            <div className="contact-page-content">
                <Contact />
            </div>
        </div>
    );
}

export default ContactPage;
