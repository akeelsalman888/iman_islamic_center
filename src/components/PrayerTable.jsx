import React from "react";
import "./PrayerTable.css";

function PrayerTable() {
    const dailyPrayers = [
        { prayer: "Fajr", adhaan: "06:17 AM", iqamah: "06:30 AM" },
        { prayer: "Sunrise", adhaan: "07:29 AM", iqamah: "" },
        { prayer: "Dhuhr", adhaan: "12:31 PM", iqamah: "02:00 PM" },
        { prayer: "Asr", adhaan: "03:14 PM", iqamah: "04:00 PM" },
        { prayer: "Maghrib", adhaan: "05:32 PM", iqamah: "05:42 PM" },
        { prayer: "Isha", adhaan: "06:45 PM", iqamah: "08:00 PM" },
    ];

    const jumuah = [
        { prayer: "1st Jumuah", khutba: "01:00 PM" },
        { prayer: "2nd Jumuah", khutba: "02:30 PM" },
    ];

    return (
        <section className="prayer-table-section" id="prayer">
            <h2>Prayer Times</h2>

            {/* Daily Prayers Table */}
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
                        {dailyPrayers.map((p, index) => (
                            <tr key={index}>
                                <td>{p.prayer}</td>
                                <td>{p.adhaan}</td>
                                <td>{p.iqamah}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Jumu'ah Table */}
            <div className="table-responsive">
                <table className="table jumuah-table">
                    <thead>
                        <tr>
                            <th>Jumu'ah</th>
                            <th>Khutba</th>
                        </tr>
                    </thead>
                    <tbody>
                        {jumuah.map((j, index) => (
                            <tr key={index}>
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

export default PrayerTable;
