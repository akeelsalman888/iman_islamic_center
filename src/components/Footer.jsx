import React from "react";
import "./Footer.css";

function Footer() {
    return (
        <footer className="footer-section text-white py-4" id="footer">
            <div className="container-fluid px-3">
                <div className="row">
                    <div className="col-md-4 mb-3">
                        <h5>Iman Islamic Center</h5>
                        <p>Serving the Lincoln, NE community with religious guidance, education, and community programs.</p>
                    </div>
                    <div className="col-md-4 mb-3">
                        <h5>Quick Links</h5>
                        <ul className="list-unstyled">
                            <li><a href="/" className="footer-link">Home</a></li>
                            <li><a href="#prayer" className="footer-link">Prayer Times</a></li>
                            <li><a href="#events" className="footer-link">Events</a></li>
                            <li><a href="#footer" className="footer-link">Contact</a></li>
                        </ul>
                    </div>
                    <div className="col-md-4 mb-3">
                        <h5>Contact Us</h5>
                        <p>Email: info@imanislamic.org</p>
                        <p>Phone: (402) 555-1234</p>
                        <p>Address: 123 Faith St, Lincoln, NE</p>
                        <div className="social-links mt-2">
                            <a href="#" className="footer-link me-2">Facebook</a>
                            <a href="#" className="footer-link me-2">Twitter</a>
                            <a href="#" className="footer-link">Instagram</a>
                        </div>
                    </div>
                </div>
                <div className="text-center mt-3">
                    &copy; {new Date().getFullYear()} Iman Islamic Center. All Rights Reserved.
                </div>
            </div>
        </footer>
    );
}

export default Footer;
