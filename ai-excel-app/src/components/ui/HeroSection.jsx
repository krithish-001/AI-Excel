'use client';

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.4,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24, filter: 'blur(8px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const EXAMPLE_QUESTIONS = [
  'How does VLOOKUP work with multiple criteria?',
  'Write a SUMIFS formula for sales > $1000',
  'Explain INDEX MATCH vs XLOOKUP',
  'Create a dynamic named range formula',
];

export default function HeroSection({ onSubmitQuery, onOpenChat }) {
  const [query, setQuery] = useState('');
  const [currentPlaceholder, setCurrentPlaceholder] = useState(0);
  const inputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSubmitQuery?.(query);
      onOpenChat?.();
    }
  };

  const handleExampleClick = (question) => {
    setQuery(question);
    onSubmitQuery?.(question);
    onOpenChat?.();
  };

  return (
    <section
      className="relative z-10 min-h-screen flex items-center justify-center px-6 py-12"
      id="hero"
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="site-container text-center items-center"
      >
        {/* Badge */}
        <motion.div variants={itemVariants}>
          <div className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full border border-white/[0.08] bg-white/[0.02] text-[11px] font-mono tracking-[0.15em] uppercase"
            style={{ color: '#A1A1A1' }}
          >
            <Sparkles size={11} style={{ color: '#6B6B6B' }} />
            AI-Powered Formula Intelligence
          </div>
        </motion.div>

        {/* Headline */}
        <motion.h1
          variants={itemVariants}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-[6.5rem] font-extrabold leading-[1.0]"
          style={{ letterSpacing: '0.02em', color: '#FFFFFF' }}
          id="hero-headline"
        >
          The Future of
          <br />
          <span style={{ color: 'rgba(255,255,255,0.45)' }}>Excel Logic.</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          variants={itemVariants}
          className="text-base sm:text-lg md:text-xl max-w-2xl leading-relaxed font-light mx-auto"
          style={{ color: '#A1A1A1' }}
        >
          Ask any formula question. Get instant, intelligent explanations.
          <br className="hidden sm:block" />
          From VLOOKUP to complex array formulas — decoded in seconds.
        </motion.p>

        {/* Search Bar — Wide & Prominent */}
        <motion.form
          variants={itemVariants}
          onSubmit={handleSubmit}
          className="w-full mt-4"
          id="hero-search-form"
        >
          <div className="relative group mx-auto w-full max-w-[760px]">
            {/* Subtle glow */}
            <div className="absolute -inset-px rounded-xl bg-gradient-to-r from-white/[0.06] via-white/[0.12] to-white/[0.06] opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-500 blur-[2px]" />

            <div className="relative flex items-center rounded-xl bg-white/[0.03] border border-white/[0.10] group-hover:border-white/[0.18] group-focus-within:border-white/[0.25] transition-all duration-300">
              <div className="pl-5 pr-2">
                <span className="font-mono text-sm" style={{ color: '#6B6B6B' }}>{'>'}_</span>
              </div>
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={EXAMPLE_QUESTIONS[currentPlaceholder]}
                onFocus={() => {
                  const interval = setInterval(() => {
                    setCurrentPlaceholder((p) => (p + 1) % EXAMPLE_QUESTIONS.length);
                  }, 3000);
                  inputRef.current._interval = interval;
                }}
                onBlur={() => {
                  clearInterval(inputRef.current?._interval);
                }}
                className="flex-1 bg-transparent py-4 px-2 text-[15px] font-mono focus:outline-none placeholder:font-mono"
                style={{ color: '#FFFFFF', '--tw-placeholder-opacity': 1 }}
                id="hero-input"
              />
              <button
                type="submit"
                className="m-1.5 px-6 py-2.5 bg-white text-black font-semibold text-sm rounded-lg flex items-center gap-2 hover:bg-white/90 transition-colors duration-200"
                id="hero-submit"
              >
                Ask AI
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </motion.form>

        {/* Example Questions */}
        <motion.div
          variants={itemVariants}
          className="flex flex-wrap justify-center gap-2 max-w-[640px] mx-auto mt-2"
        >
          {EXAMPLE_QUESTIONS.slice(0, 3).map((q, i) => (
            <button
              key={i}
              onClick={() => handleExampleClick(q)}
              className="text-[11px] font-mono px-3 py-1.5 rounded-full border border-white/[0.06] hover:border-white/[0.15] transition-all duration-300"
              style={{ color: '#6B6B6B' }}
              id={`example-q-${i}`}
            >
              {q}
            </button>
          ))}
        </motion.div>

        {/* Stats bar */}
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-3 rounded-xl overflow-hidden mt-6 mx-auto w-max max-w-full"
          style={{ border: '1px solid rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.015)' }}
        >
          {[
            { value: '500+', label: 'Formulas' },
            { value: '50ms', label: 'Response' },
            { value: '99.2%', label: 'Accuracy' },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.6 + index * 0.15 }}
              className="text-center py-5 px-8 sm:px-14 flex flex-col justify-center"
              style={{
                borderLeft: index > 0 ? '1px solid rgba(255,255,255,0.06)' : 'none',
              }}
            >
              <div className="text-xl sm:text-2xl font-bold font-mono tracking-tight whitespace-nowrap" style={{ color: '#FFFFFF' }}>
                {stat.value}
              </div>
              <div className="text-[10px] mt-1 font-mono uppercase tracking-[0.2em] whitespace-nowrap" style={{ color: '#6B6B6B' }}>
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 opacity-80"
      >
        <div className="flex flex-col items-center gap-2 mb-2">
          <span className="text-[9px] font-mono uppercase tracking-[0.4em]" style={{ color: '#6B6B6B' }}>
            Scroll
          </span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="w-px h-6 bg-gradient-to-b from-white/20 to-transparent absolute top-full mt-2"
          />
        </div>
      </motion.div>
    </section>
  );
}
