'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="absolute top-0 left-0 right-0 z-50 py-10 px-8 md:px-20 w-full flex items-center justify-between pointer-events-auto">
      {/* Logo */}
      <Link href="/" className="flex items-center group">
        <span className="font-sans text-2xl font-black tracking-[0.3em] text-white uppercase group-hover:text-white/70 transition-all duration-300">
          AI EXCEL
        </span>
      </Link>

      {/* Desktop Links */}
      <nav className="hidden md:flex items-center gap-12">
        <Link href="/" className="text-[17px] tracking-wide font-medium text-white/80 hover:text-white hover:-translate-y-0.5 transition-all duration-300">Home</Link>
        <Link href="#how-it-works" className="text-[17px] tracking-wide font-medium text-white/80 hover:text-white hover:-translate-y-0.5 transition-all duration-300">About</Link>
        <Link href="#features" className="text-[17px] tracking-wide font-medium text-white/80 hover:text-white hover:-translate-y-0.5 transition-all duration-300">Features</Link>
        <Link href="#pricing" className="text-[17px] tracking-wide font-medium text-white/80 hover:text-white hover:-translate-y-0.5 transition-all duration-300">Pricing</Link>
        <Link href="/templates" className="text-[17px] tracking-wide font-medium text-white/80 hover:text-white hover:-translate-y-0.5 transition-all duration-300">Templates</Link>
      </nav>

      {/* Mobile Menu Toggle */}
      <button 
        className="md:hidden text-white hover:text-white/70 p-2 transition-colors"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="absolute top-full left-0 right-0 w-full bg-black/95 backdrop-blur-xl border-b border-white/10 md:hidden overflow-hidden shadow-2xl z-40"
          >
            <div className="flex flex-col items-center py-10 gap-8">
              <Link href="/" className="text-white hover:text-white/60 text-lg font-medium" onClick={() => setMenuOpen(false)}>Home</Link>
              <Link href="#how-it-works" className="text-white hover:text-white/60 text-lg font-medium" onClick={() => setMenuOpen(false)}>About</Link>
              <Link href="#features" className="text-white hover:text-white/60 text-lg font-medium" onClick={() => setMenuOpen(false)}>Features</Link>
              <Link href="#pricing" className="text-white hover:text-white/60 text-lg font-medium" onClick={() => setMenuOpen(false)}>Pricing</Link>
              <Link href="/templates" className="text-white hover:text-white/60 text-lg font-medium" onClick={() => setMenuOpen(false)}>Templates</Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
