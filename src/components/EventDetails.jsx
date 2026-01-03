import React from "react";
import { useParams, Link } from "react-router-dom";
import eventsData from "../data/events.json";

function EventDetails() {
    const { id } = useParams();
    const event = eventsData.find(e => e.id === parseInt(id));

    if (!event) return <p className="text-center py-5">Event not found</p>;

    return (
        <div className="container py-5">
            <h2>{event.title}</h2>
            <p>{event.description}</p>
            <Link to="/" className="btn btn-success mt-3">Back to Home</Link>
        </div>
    );
}

export default EventDetails;
