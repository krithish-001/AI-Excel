'use client';

import { Zap } from 'lucide-react';

const FOOTER_LINKS = {
  Product: ['Features', 'Pricing', 'Changelog', 'Documentation'],
  Company: ['About', 'Blog', 'Careers', 'Contact'],
  Legal: ['Privacy', 'Terms', 'Security'],
};

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/[0.04]" id="footer">
      <div className="site-container py-32 md:py-40">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-20 md:gap-28 mb-32">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-4 mb-8">
              <Zap size={22} style={{ color: '#A1A1A1' }} />
              <span className="font-mono text-[15px] font-bold tracking-[0.4em]" style={{ color: '#FFFFFF' }}>
                AI EXCEL
              </span>
            </div>
            <p className="text-[16px] leading-[2.5] max-w-md tracking-wide" style={{ color: '#6B6B6B' }}>
              AI-powered Excel formula intelligence. From simple lookups to complex data models — decoded in seconds.
            </p>
            <div className="mt-10 text-[13px] font-mono tracking-widest" style={{ color: '#4B4B4B' }}>
              Built with precision. Designed for power users.
            </div>
          </div>

          {/* Links */}
          {Object.entries(FOOTER_LINKS).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-[13px] font-mono tracking-[0.4em] uppercase mb-10" style={{ color: '#6B6B6B' }}>
                {category}
              </h4>
              <ul className="space-y-6">
                {links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-[16px] hover:text-white/70 transition-colors duration-200 tracking-wide" style={{ color: '#5B5B5B' }}>
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="flex flex-col sm:flex-row items-center justify-between pt-12 border-t border-white/[0.04] gap-8">
          <p className="text-[13px] font-mono tracking-[0.2em]" style={{ color: '#4B4B4B' }}>
            © {new Date().getFullYear()} AI Excel. All rights reserved.
          </p>
          <div className="flex items-center gap-8">
            <span className="text-[13px] font-mono tracking-wider" style={{ color: '#4B4B4B' }}>v1.0.0</span>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-green-500/50 rounded-full" />
              <span className="text-[13px] font-mono tracking-[0.2em] uppercase" style={{ color: '#5B5B5B' }}>All systems operational</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
