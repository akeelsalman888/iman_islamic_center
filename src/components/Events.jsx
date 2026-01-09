import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import "./Events.css";
import TaraweehImage from "../assets/Taraweeh20226.JPG";
import QuranImage from "../assets/quran_memorization.png";
import DaycareImage from "../assets/daycare.png";
import MarriageImage from "../assets/marriage_contract.png";
import EducationImage from "../assets/educational_programs.png";

const events = [
    {
        titleKey: "events.taraweehTitle",
        descKey: "events.taraweehDesc",
        image: TaraweehImage,
        link: "/event/taraweeh"
    },
    {
        titleKey: "events.quranTitle",
        descKey: "events.quranDesc",
        image: QuranImage,
        link: "/event/quran"
    },
    {
        titleKey: "events.daycareTitle",
        descKey: "events.daycareDesc",
        image: DaycareImage,
        link: "/event/daycare"
    },
    {
        titleKey: "events.marriageTitle",
        descKey: "events.marriageDesc",
        image: MarriageImage,
        link: "/event/marriage"
    },
    {
        titleKey: "events.eduTitle",
        descKey: "events.eduDesc",
        image: EducationImage,
        link: "/event/education"
    }
];

function Events() {
    const { t } = useLanguage();
    const [currentSlide, setCurrentSlide] = useState(0);

    // Auto-advance slides every 5 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % events.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % events.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + events.length) % events.length);
    };

    const goToSlide = (index) => {
        setCurrentSlide(index);
    };

    return (
        <section id="events" className="events-section">
            <div className="w-100 px-3">
                <h2 className="section-heading text-center mb-4">{t('events.heading')}</h2>

                <div className="carousel-container">
                    {/* Carousel Slides */}
                    <div className="carousel-slides">
                        {events.map((event, index) => (
                            <div
                                key={index}
                                className={`carousel-slide ${index === currentSlide ? 'active' : ''}`}
                            >
                                <img
                                    src={event.image}
                                    alt={t(event.titleKey)}
                                    className="carousel-image"
                                />
                                <div className="carousel-caption">
                                    <h3>{t(event.titleKey)}</h3>
                                    <p>{t(event.descKey)}</p>
                                    <a href={event.link} className="btn btn-primary">
                                        {t('events.learnMore')}
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Navigation Arrows */}
                    <button className="carousel-arrow carousel-arrow-left" onClick={prevSlide}>
                        &#10094;
                    </button>
                    <button className="carousel-arrow carousel-arrow-right" onClick={nextSlide}>
                        &#10095;
                    </button>

                    {/* Dot Indicators */}
                    <div className="carousel-dots">
                        {events.map((_, index) => (
                            <button
                                key={index}
                                className={`carousel-dot ${index === currentSlide ? 'active' : ''}`}
                                onClick={() => goToSlide(index)}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Events;
