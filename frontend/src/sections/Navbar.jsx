import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Button } from '../components/Button';
import { Link, useLocation } from 'react-router-dom';

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Only show transparent/dark variant on the landing page (hero is there)
  const isLanding = location.pathname === '/';
  // Navbar is "over hero" when at top of landing page
  const isOverHero = isLanding && !isScrolled;

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 40);
    // Set initial state immediately
    setIsScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { label: 'Beranda', href: '/' },
    { label: 'Rundown & Sharing', href: '/rundown' },
    { label: 'Akomodasi & Transportasi', href: '/akomodasi' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${
        isOverHero
          ? 'bg-transparent py-5'
          : 'bg-white/85 backdrop-blur-md shadow-soft border-b border-gray-100/50 py-3'
      }`}
    >
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">

        {/* ── Logo ── */}
        <Link to="/" className="flex items-center gap-3 shrink-0">
          <span
            className={`w-8 h-8 rounded-lg flex items-center justify-center text-base font-extrabold transition-colors duration-300 ${
              isOverHero ? 'bg-white text-primary' : 'bg-primary text-white'
            }`}
          >
            B
          </span>
          <span
            className={`font-extrabold text-lg sm:text-xl tracking-tight transition-colors duration-300 ${
              isOverHero ? 'text-white' : 'text-primary'
            }`}
          >
            Bulan PRB 2025
          </span>
        </Link>

        {/* ── Desktop nav links ── */}
        <div className="hidden md:flex items-center gap-7">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.href;
            return (
              <Link
                key={link.label}
                to={link.href}
                className={`text-sm font-semibold transition-colors duration-300 relative group ${
                  isOverHero
                    ? isActive
                      ? 'text-white'
                      : 'text-white/70 hover:text-white'
                    : isActive
                    ? 'text-primary'
                    : 'text-text-secondary hover:text-primary'
                }`}
              >
                {link.label}
                {/* Active underline indicator */}
                {isActive && (
                  <motion.span
                    layoutId="nav-underline"
                    className={`absolute -bottom-1 left-0 right-0 h-0.5 rounded-full ${
                      isOverHero ? 'bg-white' : 'bg-primary'
                    }`}
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </div>

        {/* ── Desktop CTA ── */}
        <div className="hidden md:block shrink-0">
          {isOverHero ? (
            // White outline button on dark hero
            <Link to="/">
              <button className="px-5 py-2.5 rounded-xl font-semibold text-sm border border-white/40 text-white bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all duration-200">
                Daftar Aksi
              </button>
            </Link>
          ) : (
            <Link to="/">
              <Button variant="primary">Daftar Aksi</Button>
            </Link>
          )}
        </div>

        {/* ── Mobile hamburger ── */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label={isMobileMenuOpen ? 'Tutup menu' : 'Buka menu'}
          className={`md:hidden p-2 rounded-xl transition-colors duration-200 ${
            isOverHero
              ? 'bg-white/15 hover:bg-white/25 text-white'
              : 'bg-gray-100 hover:bg-gray-200 text-text-primary'
          }`}
        >
          {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* ── Mobile menu dropdown ── */}
      <AnimatePresence initial={false}>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="md:hidden absolute top-full left-0 w-full bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-soft-lg py-4 px-4 sm:px-6 flex flex-col gap-1"
          >
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`text-sm font-semibold py-3 px-3 rounded-xl transition-colors ${
                  location.pathname === link.href
                    ? 'bg-primary/5 text-primary'
                    : 'text-text-secondary hover:bg-gray-50 hover:text-primary'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-2 border-t border-gray-100 mt-1">
              <Link to="/" onClick={() => setIsMobileMenuOpen(false)}>
                <Button variant="primary" className="w-full">
                  Daftar Aksi
                </Button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
