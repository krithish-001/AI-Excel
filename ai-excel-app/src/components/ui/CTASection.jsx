'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, Zap } from 'lucide-react';

export default function CTASection() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section ref={sectionRef} className="relative z-10 w-full px-6 py-12 sm:py-16 flex justify-center" id="cta-section">
      <div className="w-full max-w-6xl flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full rounded-[2rem] border border-white/[0.08] p-20 sm:p-32 text-center overflow-hidden group hover:border-white/[0.15] transition-all duration-500"
          style={{ background: 'rgba(255,255,255,0.015)' }}
        >
          {/* Top gradient accent */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

          {/* Corner accents */}
          <div className="absolute top-10 left-10 w-5 h-5 border-t border-l border-white/[0.08]" />
          <div className="absolute top-10 right-10 w-5 h-5 border-t border-r border-white/[0.08]" />
          <div className="absolute bottom-10 left-10 w-5 h-5 border-b border-l border-white/[0.08]" />
          <div className="absolute bottom-10 right-10 w-5 h-5 border-b border-r border-white/[0.08]" />

          <div className="relative flex flex-col items-center">
            {/* Icon */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={isInView ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -180 }}
              transition={{ duration: 0.6, delay: 0.2, type: 'spring' }}
              className="w-20 h-20 rounded-3xl border border-white/[0.10] flex items-center justify-center mb-16"
            >
              <Zap size={32} style={{ color: '#A1A1A1' }} />
            </motion.div>

            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-[4.5rem] font-bold tracking-tight mb-8 leading-[1.3]" style={{ color: '#FFFFFF' }}>
              Stop Googling Formulas.
            </h2>
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-[4.5rem] font-bold tracking-tight mb-14 leading-[1.3]" style={{ color: 'rgba(255,255,255,0.35)' }}>
              Start Building.
            </h2>

            <p className="text-lg md:text-xl max-w-2xl mx-auto mb-20 leading-[2.5] tracking-wide" style={{ color: '#A1A1A1' }}>
              Join thousands of Excel professionals who&apos;ve upgraded their workflow. Free forever — no credit card required.
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-8 w-full">
              <button className="group/btn flex items-center justify-center gap-4 px-12 py-6 bg-white text-black font-bold text-[16px] rounded-2xl hover:bg-white/90 transition-all duration-300 shadow-2xl w-full sm:w-auto tracking-wide" id="cta-primary">
                Get Started — It&apos;s Free
                <ArrowRight size={18} className="group-hover/btn:translate-x-1.5 transition-transform" />
              </button>
              <button className="flex items-center justify-center gap-4 px-12 py-6 rounded-2xl border border-white/[0.10] text-[16px] font-bold hover:border-white/[0.30] transition-all duration-300 w-full sm:w-auto tracking-wide" style={{ color: '#E1E1E1' }} id="cta-secondary">
                Watch Demo
              </button>
            </div>

            {/* Trust */}
            <div className="mt-24 flex flex-wrap items-center justify-center gap-10 text-[13px] font-mono tracking-[0.2em] uppercase" style={{ color: '#6B6B6B' }}>
              <span>No credit card</span>
              <span className="w-1.5 h-1.5 rounded-full block" style={{ background: '#444' }} />
              <span>Free forever tier</span>
              <span className="w-1.5 h-1.5 rounded-full block" style={{ background: '#444' }} />
              <span>Cancel anytime</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
