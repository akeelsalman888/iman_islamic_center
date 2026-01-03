import React from "react";
import { Link } from "react-router-dom";
import eventsData from "../data/events.json";
import "./Events.css";

function Events() {
    return (
        <section className="events-section py-5" id="events">
            <div className="container-fluid px-3">
                <h2 className="text-center mb-4">Announcements & Events</h2>
                <div className="row">
                    {eventsData.map((event) => (
                        <div key={event.id} className="col-md-6 mb-3">
                            <Link to={`/event/${event.id}`} className="text-decoration-none">
                                <div className="event-card p-3 h-100">
                                    <h5 className="event-title">{event.title}</h5>
                                    <p>{event.description.substring(0, 80)}...</p>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Events;
