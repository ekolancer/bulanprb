import React from 'react';
import { motion } from 'framer-motion';
import { FileText, FileSpreadsheet, FileArchive, Download } from 'lucide-react';
import { dokumenData } from '../../data';

const typeIcon = {
  PDF: FileText,
  DOCX: FileText,
  PPTX: FileSpreadsheet,
  ZIP: FileArchive,
};

export const KumpulanDokumen = () => {
  return (
    <section
      id="dokumen"
      aria-label="Kumpulan dokumen Bulan PRB 2026"
      className="relative py-24 sm:py-32 lg:py-40 bg-app-gradient overflow-hidden"
    >

      <div className="relative max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col gap-4 max-w-2xl mb-14 sm:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-text-primary tracking-tight leading-[1.1] text-balance">
            Dokumen dan Materi Resmi
          </h2>
          <p className="text-text-secondary text-base leading-relaxed">
            Panduan, rundown, materi sosialisasi, dan aset visual resmi Bulan PRB 2026 untuk kebutuhan media dan mitra.
          </p>
        </motion.div>

        {/* Document card grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {dokumenData.map((doc, i) => {
            const Icon = typeIcon[doc.type] || FileText;
            return (
              <motion.a
                key={doc.id}
                href={doc.href}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, delay: (i % 3) * 0.07, ease: [0.22, 1, 0.36, 1] }}
                className="group relative rounded-[1.75rem] bg-black/[0.02] ring-1 ring-black/5 p-2 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-black/[0.035] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                {/* Inner core */}
                <div className="rounded-[calc(1.75rem-0.375rem)] bg-white ring-1 ring-black/[0.03] p-6 flex flex-col gap-4 h-full">
                  <div className="flex items-start justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-primary/[0.06] ring-1 ring-primary/10 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-primary" strokeWidth={1.5} aria-hidden="true" />
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-slate-100 text-[10px] font-bold text-text-secondary uppercase tracking-wide">
                      {doc.type}
                    </span>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <h3 className="text-base font-bold text-text-primary leading-snug">
                      {doc.title}
                    </h3>
                    <p className="text-sm text-text-secondary leading-relaxed">
                      {doc.description}
                    </p>
                  </div>

                  <div className="mt-auto pt-4 flex items-center justify-between border-t border-slate-100">
                    <span className="text-xs font-medium text-text-secondary/70">
                      {doc.size} · {doc.updatedAt}
                    </span>
                    <span className="w-8 h-8 rounded-full bg-black/[0.03] flex items-center justify-center shrink-0 transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:scale-105 group-hover:bg-primary/10">
                      <Download className="w-3.5 h-3.5 text-text-secondary group-hover:text-primary" strokeWidth={1.5} aria-hidden="true" />
                    </span>
                  </div>
                </div>
              </motion.a>
            );
          })}
        </div>
      </div>
    </section>
  );
};
