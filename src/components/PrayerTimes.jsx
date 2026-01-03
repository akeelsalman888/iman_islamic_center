import React, { useState, useEffect } from "react";
import "./PrayerTimes.css";

function PrayerTimes() {
    const [gregorianDate, setGregorianDate] = useState("");
    const [hijriDate, setHijriDate] = useState("");

    useEffect(() => {
        const today = new Date();

        // Gregorian Date
        setGregorianDate(
            today.toLocaleDateString("en-GB", {
                day: "numeric",
                month: "long",
                year: "numeric",
            })
        );

        // Hijri Date (accurate – browser Islamic calendar)
        setHijriDate(
            today.toLocaleDateString("en-TN-u-ca-islamic", {
                day: "numeric",
                month: "long",
                year: "numeric",
            }) + " Hijri"
        );
    }, []);

    const dailyPrayers = [
        { prayer: "Fajr", adhaan: "06:17 AM", iqamah: "06:30 AM" },
        { prayer: "Sunrise", adhaan: "07:29 AM", iqamah: "" },
        { prayer: "Dhuhr", adhaan: "12:31 PM", iqamah: "02:00 PM" },
        { prayer: "Asr", adhaan: "03:14 PM", iqamah: "04:00 PM" },
        { prayer: "Maghrib", adhaan: "05:32 PM", iqamah: "05:42 PM" },
        { prayer: "Isha", adhaan: "06:45 PM", iqamah: "08:00 PM" },
    ];

    const jumuah = [
        { prayer: "1st Jumu'ah", khutba: "01:00 PM" },
        { prayer: "2nd Jumu'ah", khutba: "02:30 PM" },
    ];

    return (
        <section className="prayer-section" id="prayer">
            <h2 className="prayer-heading">Prayer Times</h2>

            {/* Dates */}
            <div className="prayer-date-container">
                <span className="prayer-date-hijri">{hijriDate}</span>
                <span>|</span>
                <span className="prayer-date-greg">{gregorianDate}</span>
            </div>

            {/* Daily Prayers */}
            <div className="table-responsive">
                <table className="table daily-table">
                    <thead>
                        <tr>
                            <th>Prayer</th>
                            <th>Adhaan</th>
                            <th>Iqamah</th>
                        </tr>
                    </thead>
                    <tbody>
                        {dailyPrayers.map((p, i) => (
                            <tr key={i}>
                                <td>{p.prayer}</td>
                                <td>{p.adhaan}</td>
                                <td>{p.iqamah || "-"}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Jumu'ah */}
            <div className="table-responsive">
                <table className="table jumuah-table">
                    <thead>
                        <tr>
                            <th>Jumu'ah</th>
                            <th>Khutba</th>
                        </tr>
                    </thead>
                    <tbody>
                        {jumuah.map((j, i) => (
                            <tr key={i}>
                                <td>{j.prayer}</td>
                                <td>{j.khutba}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
    );
}

export default PrayerTimes;
