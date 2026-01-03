import React from "react";
import { useParams, Link } from "react-router-dom";
import QuranImage from "../assets/quran_memorization.jpg";
import DaycareImage from "../assets/daycare.jpg";
import MarriageImage from "../assets/marriage_contract.jpg";
import EducationImage from "../assets/educational_programs.jpg";
import "./EventDetails.css";

const eventsData = {
    quran: {
        title: "Quran Memorization and Teaching Sessions",
        description:
            "The Quran memorization halaqas run three days a week for two hours each day. Both boys and girls, from children to youth, have the opportunity to memorize the entire Holy Quran and learn the fundamentals of Islam. All sessions are led by trained teachers.",
        image: QuranImage,
    },
    daycare: {
        title: "Part-Time Daycare Services",
        description:
            "Providing a nurturing and religious environment for children while supporting working parents.",
        image: DaycareImage,
    },
    marriage: {
        title: "Marriage Contract",
        description:
            "Initiation of Marriage contracts based on the Holy Quran and the Sunnah of the Prophet (ﷺ)",
        image: MarriageImage,
    },
    education: {
        title: "Educational Programs",
        description:
            "Engaging the community with Quran sessions and lectures.",
        image: EducationImage,
    },
};

function EventDetails() {
    const { id } = useParams(); // get the event ID from the URL
    const event = eventsData[id];

    if (!event) {
        return (
            <div className="container py-5">
                <h2 className="text-center text-danger">Event not found!</h2>
                <p className="text-center">
                    <Link to="/">Go back to Home</Link>
                </p>
            </div>
        );
    }

    return (
        <section className="event-details py-5">
            <div className="container">
                <h2 className="event-title text-center mb-4">{event.title}</h2>
                <div className="event-image-container text-center mb-4">
                    <img
                        src={event.image}
                        alt={event.title}
                        className="event-image img-fluid"
                    />
                </div>
                <p className="event-description">{event.description}</p>
                <div className="text-center mt-4">
                    <Link to="/" className="btn btn-primary">
                        Back to Events
                    </Link>
                </div>
            </div>
        </section>
    );
}

export default EventDetails;
