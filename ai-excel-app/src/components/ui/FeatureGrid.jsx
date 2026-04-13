'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  Calculator,
  Zap,
  BookOpen,
  Shield,
  Brain,
  Code2,
} from 'lucide-react';

const FEATURES = [
  {
    icon: Brain,
    title: 'AI Formula Engine',
    description:
      'Natural language to Excel formula conversion. Describe what you need — get production-ready formulas instantly.',
    tag: 'CORE',
  },
  {
    icon: Calculator,
    title: 'Formula Debugger',
    description:
      'Paste any formula. Get a step-by-step breakdown with error detection and optimization suggestions.',
    tag: 'DEBUG',
  },
  {
    icon: Zap,
    title: 'Instant Explanations',
    description:
      'Understand complex nested formulas in seconds. Visual breakdown of every function and argument.',
    tag: 'LEARN',
  },
  {
    icon: BookOpen,
    title: 'Formula Library',
    description:
      '500+ pre-built formula templates for finance, analytics, operations, and data science workflows.',
    tag: 'TEMPLATES',
  },
  {
    icon: Code2,
    title: 'VBA & Scripts',
    description:
      'Generate VBA macros and Office Scripts from natural language descriptions.',
    tag: 'ADVANCED',
  },
  {
    icon: Shield,
    title: 'Error Prevention',
    description:
      'AI-powered error detection catches #REF!, #VALUE!, circular references before they happen.',
    tag: 'SAFETY',
  },
];

function FeatureCard({ feature, index }) {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, margin: '-60px' });
  const Icon = feature.icon;

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{
        duration: 0.5,
        delay: index * 0.06,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="bg-white/5 p-8 sm:p-10 rounded-xl text-center h-full flex flex-col items-center justify-center min-h-[280px] hover:bg-white/10 transition-colors duration-300 w-full max-w-[300px]"
    >
      {/* Tag */}
      <span
        className="text-[10px] font-mono tracking-[0.2em] uppercase px-3 py-1.5 rounded-full border border-white/[0.08] mb-8 inline-block"
        style={{ color: '#A1A1A1' }}
      >
        {feature.tag}
      </span>

      {/* Icon */}
      <div className="mb-6">
        <Icon size={28} style={{ color: '#FFFFFF' }} />
      </div>

      {/* Title */}
      <h3 className="text-xl font-bold mb-5 tracking-tight" style={{ color: '#FFFFFF' }}>
        {feature.title}
      </h3>

      {/* Description */}
      <p className="text-[14px] leading-loose text-balance" style={{ color: '#A1A1A1' }}>
        {feature.description}
      </p>
    </motion.div>
  );
}

export default function FeatureGrid() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section
      id="capabilities"
      ref={sectionRef}
      className="relative z-10 w-full px-6 py-24 sm:py-32 flex flex-col items-center justify-center"
    >
      {/* Separated Tagline */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="text-center mb-24 w-full max-w-3xl flex flex-col items-center"
      >
        <span className="text-[11px] font-mono tracking-[0.3em] uppercase block mb-6" style={{ color: '#6B6B6B' }}>
          Capabilities
        </span>
        <h2 className="text-3xl md:text-5xl lg:text-5xl font-extrabold tracking-tight mb-8 text-center w-full" style={{ color: '#FFFFFF' }}>
          Built for Excel Power Users
        </h2>
        <p className="text-base md:text-lg max-w-2xl text-center leading-loose" style={{ color: '#A1A1A1' }}>
          Everything you need to master spreadsheet logic, from simple lookups to complex data models.
        </p>
      </motion.div>

      {/* Centered Grid Container */}
      <div className="w-full max-w-5xl flex justify-center">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12 lg:gap-y-16 justify-items-center w-full">
          {FEATURES.map((feature, i) => (
            <FeatureCard key={i} feature={feature} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
