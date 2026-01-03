import React from "react";
import "./Hero.css";

function Hero() {
    return (
        <section className="hero-section d-flex align-items-center justify-content-center">
            <div className="hero-overlay"></div>
            <div className="container-fluid hero-content">
                <h1>Welcome to Iman Islamic Center</h1>
                <p>Connecting Community, Faith, and Education</p>
            </div>
        </section>
    );
}

export default Hero;
