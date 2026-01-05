import React from "react";
import "./Contact.css";

import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaUser, FaPaperPlane } from "react-icons/fa";

function Contact() {
    return (
        <section className="contact-section" id="contact">
            <div className="container">
                <div className="contact-container">
                    <div className="row g-4 g-lg-5 align-items-stretch">
                        {/* Left Side: Info */}
                        <div className="col-lg-5">
                            <div className="contact-info-card">
                                <h2 className="info-title">Get in Touch</h2>
                                <p className="info-text">
                                    Whether you have a question about our services, events, or simply want to say hello, we'd love to hear from you.
                                </p>

                                <div className="info-details">
                                    <div className="info-item">
                                        <div className="icon-box">
                                            <FaPhoneAlt />
                                        </div>
                                        <div>
                                            <label>Call Us</label>
                                            <p>402-730-3883</p>
                                        </div>
                                    </div>
                                    <div className="info-item">
                                        <div className="icon-box">
                                            <FaEnvelope />
                                        </div>
                                        <div>
                                            <label>Email Us</label>
                                            <p>info@imanislamiccenter.org</p>
                                        </div>
                                    </div>
                                    <div className="info-item">
                                        <div className="icon-box">
                                            <FaMapMarkerAlt />
                                        </div>
                                        <div>
                                            <label>Visit Us</label>
                                            <p>Lincoln, Nebraska, USA</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Side: Form */}
                        <div className="col-lg-7">
                            <div className="contact-form-card">
                                <form className="contact-form">
                                    <h3 className="form-title">Send a Message</h3>
                                    <div className="row">
                                        <div className="col-md-6 mb-4">
                                            <div className="form-floating">
                                                <input type="text" className="form-control" id="name" placeholder="Name" required />
                                                <label htmlFor="name">Full Name</label>
                                            </div>
                                        </div>
                                        <div className="col-md-6 mb-4">
                                            <div className="form-floating">
                                                <input type="email" className="form-control" id="email" placeholder="Email" required />
                                                <label htmlFor="email">Email Address</label>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mb-4">
                                        <div className="form-floating">
                                            <input type="tel" className="form-control" id="phone" placeholder="Phone" />
                                            <label htmlFor="phone">Phone Number</label>
                                        </div>
                                    </div>

                                    <div className="mb-4">
                                        <div className="form-floating">
                                            <textarea className="form-control" id="message" placeholder="Message" style={{ height: "150px" }} required></textarea>
                                            <label htmlFor="message">Your Message</label>
                                        </div>
                                    </div>

                                    <div className="mt-4">
                                        <button type="submit" className="btn btn-modern-submit">
                                            <span>Send Message</span>
                                            <FaPaperPlane className="ms-2" />
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Contact;
