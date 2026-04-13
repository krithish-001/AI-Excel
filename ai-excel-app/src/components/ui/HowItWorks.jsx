'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const STEPS = [
  {
    step: '01',
    title: 'Ask Your Question',
    description: 'Type your Excel question in natural language. No jargon required.',
    code: '> How do I sum values where date is in Q1 and region is "West"?',
  },
  {
    step: '02',
    title: 'AI Analyzes & Generates',
    description: 'Our AI engine parses your intent and constructs the optimal formula.',
    code: '=SUMIFS(D:D, A:A, ">="&DATE(2024,1,1), A:A, "<="&DATE(2024,3,31), B:B, "West")',
  },
  {
    step: '03',
    title: 'Learn & Apply',
    description: 'Get a step-by-step explanation and copy the formula directly into your sheet.',
    code: '✓ Formula copied to clipboard. Paste into cell E2.',
  },
];

export default function HowItWorks() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section
      ref={sectionRef}
      className="relative z-10 py-48 px-6"
      id="how-it-works"
    >
      <div className="site-container max-w-[1000px]">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-24 flex flex-col items-center"
        >
          <span className="text-[11px] font-mono tracking-[0.3em] uppercase block mb-6" style={{ color: '#6B6B6B' }}>
            Process
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-6" style={{ color: '#FFFFFF' }}>
            Three Steps. Zero Frustration.
          </h2>
          <p className="text-base md:text-lg max-w-2xl mx-auto leading-loose" style={{ color: '#A1A1A1' }}>
            From question to working formula in under 5 seconds.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="flex flex-col gap-10 md:gap-14">
          {STEPS.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
              transition={{
                duration: 0.6,
                delay: 0.15 + i * 0.12,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="group"
              id={`step-${i}`}
            >
              <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-start p-10 md:p-12 rounded-2xl border border-white/[0.06] hover:border-white/[0.15] transition-all duration-400 bg-white/[0.01] hover:bg-white/[0.03]">
                {/* Step Number */}
                <div className="flex-shrink-0">
                  <span className="text-5xl font-bold font-mono group-hover:text-white/20 transition-colors duration-300" style={{ color: 'rgba(255,255,255,0.06)' }}>
                    {step.step}
                  </span>
                </div>

                {/* Content */}
                <div className="flex-1">
                  <h3 className="text-2xl font-bold tracking-tight mb-4" style={{ color: '#FFFFFF' }}>
                    {step.title}
                  </h3>
                  <p className="text-[15px] leading-loose mb-8 max-w-xl" style={{ color: '#A1A1A1' }}>
                    {step.description}
                  </p>
                  <div className="rounded-xl bg-black/50 border border-white/[0.08] px-5 py-4 font-mono text-sm overflow-x-auto leading-relaxed shadow-inner" style={{ color: '#6B6B6B' }}>
                    <span style={{ color: '#4B4B4B' }} className="mr-3 select-none">$</span>
                    {step.code}
                  </div>
                </div>

                {/* Arrow */}
                <div className="flex-shrink-0 hidden md:flex items-center self-center pl-4">
                  <ArrowUpRight
                    size={24}
                    className="transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300"
                    style={{ color: 'rgba(255,255,255,0.1)' }}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
