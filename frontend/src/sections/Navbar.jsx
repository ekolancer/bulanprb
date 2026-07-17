import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isLanding = location.pathname === '/';
  const isOverHero = isLanding && !isScrolled;

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 40);
    setIsScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  // Lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isMobileMenuOpen]);

  const navLinks = [
    { label: 'Beranda', href: '/' },
    { label: 'Rundown Acara', href: '/rundown' },
    { label: 'Akomodasi', href: '/akomodasi' },
    { label: 'Media Center', href: '/media-center' },
  ];

  return (
    <header role="banner">
      <nav
        aria-label="Navigasi utama"
        className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${isOverHero
            ? 'bg-transparent py-5'
            : 'py-3 bg-white/90 backdrop-blur-md shadow-soft border-b border-slate-100/60'
          }`}
      >
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">

          {/* ── Logo ── */}
          <Link
            to="/"
            aria-label="Beranda Bulan PRB 2026"
            className="flex items-center gap-3 shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-xl"
          >
            <img
              src="/BNPB.png"
              alt="Logo BNPB"
              className="w-9 h-9 object-contain shrink-0"
            />
            <span
              className={`font-extrabold text-lg sm:text-xl tracking-tight transition-colors duration-300 ${isOverHero ? 'text-white' : 'text-primary'
                }`}
            >
              Bulan PRB
            </span>
          </Link>

          {/* ── Desktop nav links ── */}
          <ul className="hidden md:flex items-center gap-7 list-none" role="list">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.href;
              return (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    aria-current={isActive ? 'page' : undefined}
                    className={`text-sm font-semibold transition-colors duration-300 relative group py-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-lg px-1 ${isOverHero
                        ? isActive
                          ? 'text-white'
                          : 'text-white/70 hover:text-white'
                        : isActive
                          ? 'text-primary'
                          : 'text-text-secondary hover:text-primary'
                      }`}
                  >
                    {link.label}
                    {isActive && (
                      <motion.span
                        layoutId="nav-underline"
                        className={`absolute -bottom-1 left-0 right-0 h-0.5 rounded-full ${isOverHero ? 'bg-white' : 'bg-primary'
                          }`}
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Spacer to keep navigation centered and prevent shifting */}
          <div className="hidden md:block w-[114px] shrink-0" aria-hidden="true" />

          {/* ── Mobile hamburger ── */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? 'Tutup menu navigasi' : 'Buka menu navigasi'}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
            className={`md:hidden p-2 rounded-xl transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${isOverHero
                ? 'bg-white/15 hover:bg-white/25 text-white'
                : 'bg-slate-100 hover:bg-slate-200 text-text-primary'
              }`}
          >
            {isMobileMenuOpen
              ? <X className="w-5 h-5" aria-hidden="true" />
              : <Menu className="w-5 h-5" aria-hidden="true" />
            }
          </button>
        </div>

        {/* ── Mobile menu dropdown ── */}
        <AnimatePresence initial={false}>
          {isMobileMenuOpen && (
            <motion.div
              id="mobile-menu"
              role="dialog"
              aria-modal="true"
              aria-label="Menu navigasi mobile"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="md:hidden absolute top-full left-0 w-full bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-soft-lg py-4 px-4 sm:px-6 flex flex-col gap-1"
            >
              <ul role="list" className="flex flex-col gap-1">
                {navLinks.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      aria-current={location.pathname === link.href ? 'page' : undefined}
                      className={`flex text-sm font-semibold py-3 px-3 rounded-xl transition-colors ${location.pathname === link.href
                          ? 'bg-primary/5 text-primary'
                          : 'text-text-secondary hover:bg-slate-50 hover:text-primary'
                        }`}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="pt-2 border-t border-slate-100 mt-1">
                <Link to="/" onClick={() => setIsMobileMenuOpen(false)} tabIndex={-1}>
                  <Button variant="primary" className="w-full">Daftar Aksi</Button>
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
};
