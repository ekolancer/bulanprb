import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, Globe, Shield } from 'lucide-react';

export const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer
      role="contentinfo"
      aria-label="Informasi situs Bulan PRB 2026"
      className="bg-primary text-white pt-20 pb-10 relative overflow-hidden"
    >
      {/* Ambient blobs */}
      <div
        aria-hidden="true"
        className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-white/5 filter blur-3xl pointer-events-none"
      />
      <div
        aria-hidden="true"
        className="absolute -top-32 -right-16 w-64 h-64 rounded-full bg-accent-orange/10 filter blur-3xl pointer-events-none"
      />

      <div className="max-w-[1280px] mx-auto px-6 grid md:grid-cols-12 gap-12 items-start relative z-10 text-left">

        {/* About column */}
        <div className="md:col-span-5 flex flex-col gap-5">
          <Link
            to="/"
            aria-label="Beranda Bulan PRB 2026"
            className="font-extrabold text-xl tracking-tight flex items-center gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 rounded-xl w-fit"
          >
            <img
              src="/BNPB.png"
              alt="Logo BNPB"
              className="w-10 h-10 object-contain shrink-0"
            />
            Bulan PRB 2026
          </Link>
          <p className="text-white/65 text-sm leading-relaxed max-w-sm">
            Website resmi Peringatan Bulan Pengurangan Risiko Bencana (PRB) Nasional 2026. Diselenggarakan oleh Badan Nasional Penanggulangan Bencana (BNPB).
          </p>
        </div>

        {/* Quick Links */}
        <nav aria-label="Tautan cepat" className="md:col-span-3 flex flex-col gap-4">
          <h2 className="font-bold text-sm text-white/90">Tautan Pintas</h2>
          <ul className="flex flex-col gap-2.5 text-sm text-white/65" role="list">
            <li>
              <a href="#gerakan" className="hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 rounded">
                Gerakan PRB
              </a>
            </li>
            <li>
              <Link to="/rundown" className="hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 rounded">
                Rundown Acara
              </Link>
            </li>
            <li>
              <Link to="/rundown#sharing" className="hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 rounded">
                Sharing Session
              </Link>
            </li>
            <li>
              <Link to="/akomodasi" className="hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 rounded">
                Akomodasi
              </Link>
            </li>
          </ul>
        </nav>

        {/* Contact info */}
        <div className="md:col-span-4 flex flex-col gap-4">
          <h2 className="font-bold text-sm text-white/90">Kontak Informasi</h2>
          <address className="not-italic flex flex-col gap-3.5 text-sm text-white/65">
            <a
              href="mailto:humas@bnpb.go.id"
              className="flex items-center gap-3 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 rounded"
            >
              <Mail className="w-4 h-4 text-primary-light shrink-0" aria-hidden="true" />
              humas@bnpb.go.id
            </a>
            <a
              href="tel:+62212987525"
              className="flex items-center gap-3 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 rounded"
            >
              <Phone className="w-4 h-4 text-primary-light shrink-0" aria-hidden="true" />
              +62 21-2987-5252
            </a>
            <a
              href="https://bnpb.go.id"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 rounded"
            >
              <Globe className="w-4 h-4 text-primary-light shrink-0" aria-hidden="true" />
              www.bnpb.go.id
            </a>
          </address>
        </div>

      </div>

      {/* Bottom bar */}
      <div className="max-w-[1280px] mx-auto px-6 border-t border-white/10 mt-16 pt-8 relative z-10">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/45">
          <p>© {year} BNPB Indonesia. Hak cipta dilindungi undang-undang.</p>

          {/* Legal links */}
          <nav aria-label="Tautan legal">
            <ul className="flex items-center gap-4" role="list">
              <li>
                <a
                  href="/kebijakan-privasi"
                  className="hover:text-white/80 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 rounded"
                >
                  Kebijakan Privasi
                </a>
              </li>
              <li>
                <a
                  href="/syarat-ketentuan"
                  className="hover:text-white/80 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 rounded"
                >
                  Syarat &amp; Ketentuan
                </a>
              </li>
              <li className="flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Situs Resmi Pemerintah</span>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
};
