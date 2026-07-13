import React from 'react';
import { Mail, Phone, Globe, Shield } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-primary text-white pt-20 pb-10 relative overflow-hidden">
      {/* Decorative Orbs */}
      <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-accent-blue/10 filter blur-3xl" />

      <div className="max-w-[1280px] mx-auto px-6 grid md:grid-cols-12 gap-12 items-start relative z-10 text-left">
        
        {/* About column */}
        <div className="md:col-span-5 flex flex-col gap-6">
          <span className="font-extrabold text-2xl tracking-tight flex items-center gap-2">
            <span className="w-10 h-10 rounded-xl bg-white text-primary flex items-center justify-center text-xl">B</span>
            Bulan PRB 2025
          </span>
          <p className="text-white/70 text-sm leading-relaxed max-w-sm">
            Website resmi Peringatan Bulan Pengurangan Risiko Bencana (PRB) Nasional 2025. Diselenggarakan oleh Badan Nasional Penanggulangan Bencana (BNPB).
          </p>
        </div>

        {/* Quick Links */}
        <div className="md:col-span-3 flex flex-col gap-4">
          <h5 className="font-bold text-base">Tautan Pintas</h5>
          <div className="flex flex-col gap-2.5 text-sm text-white/70">
            <a href="#gerakan" className="hover:text-white transition-colors">Gerakan PRB</a>
            <a href="#rundown" className="hover:text-white transition-colors">Rundown Acara</a>
            <a href="#sharing" className="hover:text-white transition-colors">Sharing Session</a>
            <a href="#akomodasi" className="hover:text-white transition-colors">Akomodasi</a>
          </div>
        </div>

        {/* Contact info */}
        <div className="md:col-span-4 flex flex-col gap-4">
          <h5 className="font-bold text-base">Kontak Informasi</h5>
          <div className="flex flex-col gap-3.5 text-sm text-white/70">
            <div className="flex items-center gap-3">
              <Mail className="w-4 h-4 text-accent-blue" />
              <span>humas@bnpb.go.id</span>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="w-4 h-4 text-accent-blue" />
              <span>+62 21-2987-5252</span>
            </div>
            <div className="flex items-center gap-3">
              <Globe className="w-4 h-4 text-accent-blue" />
              <a href="https://bnpb.go.id" target="_blank" rel="noreferrer" className="hover:underline">www.bnpb.go.id</a>
            </div>
          </div>
        </div>

      </div>

      {/* Copyright border */}
      <div className="max-w-[1280px] mx-auto px-6 border-t border-white/10 mt-16 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/50 relative z-10">
        <p>© {new Date().getFullYear()} BNPB Indonesia. All rights reserved.</p>
        <div className="flex items-center gap-2">
          <Shield className="w-3.5 h-3.5" />
          <span>Situs Resmi Pemerintah (BNPB)</span>
        </div>
      </div>
    </footer>
  );
};
