import React from "react";
import heroImage from "../assets/hero.png";
import "./Hero.css";

function Hero() {
    return (
        <section className="hero-section d-flex align-items-center justify-content-center">
            <img
                src={heroImage}
                alt="Iman Islamic Center Hero"
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
