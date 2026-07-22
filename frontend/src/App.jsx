import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './sections/Navbar';
import { LandingPage } from './pages/LandingPage';
import { RundownPage } from './pages/RundownPage';
import { AkomodasiPage } from './pages/AkomodasiPage';
import { MediaCenterPage } from './pages/MediaCenterPage';
import { Footer } from './sections/Footer';
import { ScrollToTop } from './components/ScrollToTop';
import { BackToTop } from './components/BackToTop';

function App() {
  return (
    <Router>
      <ScrollToTop />

      {/* Skip-to-content — keyboard accessibility, WCAG 2.1 AA */}
      <a href="#main-content" className="skip-to-content">
        Lewati ke konten utama
      </a>

      <div className="min-h-screen bg-app-gradient flex flex-col">
        <Navbar />

        <main id="main-content" className="flex-grow" tabIndex={-1}>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/rundown" element={<RundownPage />} />
            {/* <Route path="/akomodasi" element={<AkomodasiPage />} /> */}
            <Route path="/media-center" element={<MediaCenterPage />} />
          </Routes>
        </main>

        <Footer />
        <BackToTop />
      </div>
    </Router>
  );
}

export default App;
