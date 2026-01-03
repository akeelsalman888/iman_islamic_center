import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import Events from "./components/Events";
import Donate from "./components/Donate";
import PrayerTimes from "./components/PrayerTimes"; 

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Hero />
              <PrayerTimes /> {/* <-- Use the new component */}
              <Events />
              <Donate />
            </>
          }
        />
        <Route path="/event/:id" element={<Events />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
