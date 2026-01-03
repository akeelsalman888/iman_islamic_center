# iman_islamic_center

Iman Islamic Center Website
Project Overview

This is a fully responsive website for Iman Islamic Center, built with React and Vite.
It replicates the requested client theme and features:

Hero section with Donate button

Navbar with smooth scrolling

Prayer Times section with dynamic Hijri & Gregorian dates

Daily and Jumu'ah prayer tables

Events section with detail pages

Footer with contact info

Fully styled to match client’s color theme (#27569b)


```
iman_islamic_center/
│
├─ public/
│   └─ index.html                  # Main HTML file
│
├─ src/
│   ├─ components/
│   │   ├─ Navbar.jsx               # Navbar with Donate button
│   │   ├─ Hero.jsx                 # Hero section
│   │   ├─ PrayerTimes.jsx          # Daily & Jumu'ah prayer tables with current dates
│   │   ├─ Events.jsx               # Events list
│   │   ├─ EventDetails.jsx         # Single event details page
│   │   ├─ Donate.jsx               # Donate section
│   │   └─ Footer.jsx               # Footer section
│   │
│   ├─ PrayerTimes.css              # Styles for PrayerTimes component
│   ├─ App.jsx                      # Main app with routes
│   ├─ main.jsx                     # ReactDOM render
│   └─ index.css                    # Global styles
│
├─ package.json                     # Project dependencies
├─ vite.config.js                   # Vite configuration
└─ README.md                        # This file
```
Technologies Used

Frontend: React, Vite, JSX, CSS, Bootstrap

Routing: react-router-dom

Dates: JavaScript Date for Gregorian, Hijri calculated using JS conversion

Styling: Client theme color #27569b

Backend (optional): JSON Server (for events data)

Features

Responsive Navbar

Includes smooth scrolling

Donate button linking to donate section

Hero Section

Client-branded hero image and text

Prayer Times Section

Shows today’s Gregorian and Hijri dates

Daily prayers table

Jumu'ah prayers table

Events Section

List of events

Clicking on an event shows event details

Donate Section

Styled with client theme

Footer

Contact info, address, and links

Installation & Running
1. Clone the repository
git clone <your-repo-url>
cd iman_islamic_center

2. Install dependencies
npm install

3. Run development server
npm run dev


Open the displayed URL (usually http://localhost:5173) in your browser

4. Build for production
npm run build


This will create a dist/ folder ready to deploy on any web server

Usage Notes

The current date (Gregorian & Hijri) is shown dynamically above the prayer tables.

All sections are fully responsive and follow the client’s color theme.

Events can be extended via JSON server or API.

Only the developer needs Vite/Node.js to run locally; the client can view the built site from dist/ on any server.

Color Theme
Element	Color
Primary Theme	#27569b
Table Header	#27569b
Table Row Hover	#d0e4f8
Background	#f8f9fa
Text	#333
Notes for the Client

The site is fully functional and responsive.

No special software required to view the site — only a web browser.

Developer can update prayer times or events by editing PrayerTimes.jsx or Events.jsx.

Donate button can be linked to any payment processor.

