import React, { useState } from "react";
import "./Reservation.css";
import { FaCalendarAlt, FaClock, FaUser, FaEnvelope, FaCheckCircle } from "react-icons/fa";

function Reservation() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        date: "",
        time: "",
        message: ""
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        // Since there is no backend, we simulate the email sending
        alert(`Request sent! Confirmation for ${formData.name} on ${formData.date} at ${formData.time} has been prepared.`);
        // Note: To send actual emails, services like EmailJS or Formspree are recommended.
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <section id="reservation" className="reservation-section">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-8">
                        <div className="reservation-card">
                            <div className="reservation-header text-center">
                                <h2 className="section-title">Book a Visit</h2>
                                <p className="section-subtitle">Meet our team to learn more about our community and services.</p>
                            </div>

                            <form className="reservation-form" onSubmit={handleSubmit}>
                                <div className="row g-4">
                                    {/* Name */}
                                    <div className="col-md-6">
                                        <div className="input-group-modern">
                                            <label><FaUser className="me-2" /> Full Name</label>
                                            <input
                                                type="text"
                                                name="name"
                                                className="form-control-modern"
                                                placeholder="Enter your name"
                                                required
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>

                                    {/* Email */}
                                    <div className="col-md-6">
                                        <div className="input-group-modern">
                                            <label><FaEnvelope className="me-2" /> Email Address</label>
                                            <input
                                                type="email"
                                                name="email"
                                                className="form-control-modern"
                                                placeholder="your@email.com"
                                                required
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>

                                    {/* Date */}
                                    <div className="col-md-6">
                                        <div className="input-group-modern">
                                            <label><FaCalendarAlt className="me-2" /> Preferred Date</label>
                                            <input
                                                type="date"
                                                name="date"
                                                className="form-control-modern"
                                                required
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>

                                    {/* Time */}
                                    <div className="col-md-6">
                                        <div className="input-group-modern">
                                            <label><FaClock className="me-2" /> Preferred Time</label>
                                            <input
                                                type="time"
                                                name="time"
                                                className="form-control-modern"
                                                required
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>

                                    {/* Message */}
                                    <div className="col-12">
                                        <div className="input-group-modern">
                                            <label>Reason for Visit (Optional)</label>
                                            <textarea
                                                name="message"
                                                className="form-control-modern"
                                                rows="3"
                                                placeholder="Tell us a bit about your visit..."
                                                onChange={handleChange}
                                            ></textarea>
                                        </div>
                                    </div>

                                    <div className="col-12 text-center mt-4">
                                        <button type="submit" className="btn-modern-reservation">
                                            <span>Schedule Visit</span>
                                            <FaCheckCircle className="ms-2" />
                                        </button>
                                        <p className="form-hint mt-3">
                                            We'll send a confirmation to your email once the team reviews your request.
                                        </p>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Reservation;
