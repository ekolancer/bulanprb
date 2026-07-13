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
      <div className="min-h-screen bg-background flex flex-col">
        <Navbar />
        
        <main className="flex-grow">
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
