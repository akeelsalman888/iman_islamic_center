import React from "react";

function PrayerTable() {
    return (
        <section className="prayer-table-section">
            <h2 className="prayer-title">Prayer Times</h2>

            <div className="prayer-card">
                <table className="prayer-table">
                    <thead>
                        <tr>
                            <th>Prayer</th>
                            <th>Adhaan</th>
                            <th>Iqamah</th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr>
                            <td className="prayer-name">Fajr</td>
                            <td>06:17 AM</td>
                            <td>06:30 AM</td>
                        </tr>
                        <tr>
                            <td className="prayer-name">Dhuhr</td>
                            <td>12:31 PM</td>
                            <td>02:00 PM</td>
                        </tr>
                        <tr>
                            <td className="prayer-name">Asr</td>
                            <td>03:45 PM</td>
                            <td>04:15 PM</td>
                        </tr>
                        <tr>
                            <td className="prayer-name">Maghrib</td>
                            <td>05:20 PM</td>
                            <td>05:30 PM</td>
                        </tr>
                        <tr>
                            <td className="prayer-name">Isha</td>
                            <td>06:45 PM</td>
                            <td>07:00 PM</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </section>
    );
}

export default PrayerTable;
