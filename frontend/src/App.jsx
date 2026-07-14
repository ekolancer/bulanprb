import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './sections/Navbar';
import { LandingPage } from './pages/LandingPage';
import { RundownPage } from './pages/RundownPage';
import { AkomodasiPage } from './pages/AkomodasiPage';
import { Footer } from './sections/Footer';

function App() {
  return (
    <Router>
      {/* Skip-to-content — keyboard accessibility, WCAG 2.1 AA */}
      <a href="#main-content" className="skip-to-content">
        Lewati ke konten utama
      </a>

      <div className="min-h-screen bg-background flex flex-col">
        <Navbar />

        <main id="main-content" className="flex-grow" tabIndex={-1}>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/rundown" element={<RundownPage />} />
            <Route path="/akomodasi" element={<AkomodasiPage />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
