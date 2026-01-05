import React from "react";
import heroImage from "../assets/hero.jpg";
import "./Hero.css";

function Hero() {
    return (
        <section className="hero-section d-flex align-items-center justify-content-center">
            <img
                src="https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1920&q=80"
                alt="Grand Mosque with Domes"
                className="hero-bg-image"
            />

            <div className="hero-overlay"></div>

            <div className="container hero-content">
                <h1>Welcome to Iman Islamic Center</h1>
                <p>Connecting Community, Faith, and Education</p>
            </div>
        </section>
    );
}

export default Hero;
