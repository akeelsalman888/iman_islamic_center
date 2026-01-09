import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import Events from "./components/Events";
import Donate from "./components/Donate";
import PrayerTimes from "./components/PrayerTimes";
import Contact from "./components/Contact";
import Reservation from "./components/Reservation";
import ContactPage from "./components/ContactPage";
import MarriageCertificate from "./components/MarriageCertificate";
import QuranBoysApplication from "./components/QuranBoysApplication";
import QuranGirlsApplication from "./components/QuranGirlsApplication";

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
              <div className="container-fluid my-5">
                <div className="row">
                  <div className="col-lg-8">
                    <Events />
                  </div>
                  <div className="col-lg-4">
                    <PrayerTimes />
                  </div>
                </div>
              </div>
              <Donate />
              <Reservation />
            </>
          }
        />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/marriage-certificate" element={<MarriageCertificate />} />
        <Route path="/quran-boys-application" element={<QuranBoysApplication />} />
        <Route path="/quran-girls-application" element={<QuranGirlsApplication />} />
        <Route path="/event/:id" element={<Events />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
