import React from "react";
import { Link } from "react-router-dom";
import eventsData from "../data/events.json";
import "./Events.css";
import QuranImage from "../assets/quran_memorization.png";
import DaycareImage from "../assets/daycare.png";
import MarriageImage from "../assets/marriage_contract.png";
import EducationImage from "../assets/educational_programs.png";
import "./Events.css";

const events = [
    {
        title: "Quran Memorization and Teaching Sessions",
        description:
            "The Quran memorization halaqas run three days a week for two hours each day. Both boys and girls, from children to youth, have the opportunity to memorize the entire Holy Quran and learn the fundamentals of Islam. All sessions are led by trained teachers.",
        image: QuranImage,
        link: "/event/quran"
    },
    {
        title: "Part-Time Daycare Services",
        description:
            "Providing a nurturing and religious environment for children while supporting working parents.",
        image: DaycareImage,
        link: "/event/daycare"
    },
    {
        title: "Marriage Contract",
        description:
            "Initiation of Marriage contracts based on the Holy Quran and the Sunnah of the Prophet (ﷺ)",
        image: MarriageImage,
        link: "/event/marriage"
    },
    {
        title: "Educational Programs",
        description:
            "Engaging the community with Quran sessions and lectures.",
        image: EducationImage,
        link: "/event/education"
    }
];

function Events() {
    return (
        <section className="events-section py-5" id="events">
            <div className="container">
                <h2 className="section-heading text-center mb-4">Announcements & Events</h2>
                <div className="row">
                    {events.map((event, index) => (
                        <div className="col-md-6 col-lg-3 mb-4" key={index}>
                            <div className="card h-100 event-card">
                                <img
                                    src={event.image}
                                    className="card-img-top"
                                    alt={event.title}
                                />
                                <div className="card-body d-flex flex-column">
                                    <h5 className="card-title">{event.title}</h5>
                                    <p className="card-text">{event.description}</p>
                                    <a href={event.link} className="btn btn-primary mt-auto">
                                        Learn More
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Events;
