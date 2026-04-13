'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Check, ArrowRight } from 'lucide-react';

const PLANS = [
  {
    name: 'Free',
    price: '$0',
    period: 'forever',
    description: 'Perfect for getting started with AI-powered Excel help.',
    features: [
      '10 formula queries / day',
      'Basic formula explanations',
      'Common function library',
      'Community support',
    ],
    cta: 'Start Free',
    highlighted: false,
  },
  {
    name: 'Pro',
    price: '$19',
    period: '/month',
    description: 'For power users who live in spreadsheets.',
    features: [
      'Unlimited formula queries',
      'Advanced formula debugging',
      'VBA & Office Script generation',
      'Multi-sheet analysis',
      'Priority AI responses',
      'Formula optimization engine',
    ],
    cta: 'Get Pro',
    highlighted: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: '',
    description: 'For teams and organizations with custom needs.',
    features: [
      'Everything in Pro',
      'Team collaboration',
      'Custom formula templates',
      'API access',
      'SSO & compliance',
      'Dedicated support',
    ],
    cta: 'Contact Sales',
    highlighted: false,
  },
];

export default function Pricing() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section
      ref={sectionRef}
      className="relative z-10 w-full px-6 py-12 sm:py-16 flex flex-col items-center justify-center pt-8"
      id="pricing"
    >
      <div className="w-full max-w-6xl flex flex-col items-center">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-32 flex flex-col items-center w-full"
        >
          <span className="text-[12px] font-mono tracking-[0.4em] uppercase block mb-8" style={{ color: '#6B6B6B' }}>
            Pricing
          </span>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-8" style={{ color: '#FFFFFF' }}>
            Simple, Transparent Pricing
          </h2>
          <p className="text-lg md:text-xl max-w-2xl mx-auto text-center leading-[2.2] tracking-wide" style={{ color: '#A1A1A1' }}>
            Start for free. Upgrade when you need more power.
          </p>
        </motion.div>

        {/* Cards — Equal height via flex stretch */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 md:gap-14 items-stretch w-full justify-center">
          {PLANS.map((plan, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.5, delay: 0.15 + i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className={`relative flex flex-col p-12 md:p-16 rounded-3xl transition-all duration-400 w-full max-w-[420px] mx-auto lg:max-w-none ${
                plan.highlighted
                  ? 'border border-white/[0.20] bg-white/[0.03]'
                  : 'border border-white/[0.06] bg-white/[0.01] hover:border-white/[0.12]'
              }`}
              style={plan.highlighted ? { boxShadow: 'inset 0 1px 40px rgba(255,255,255,0.03)' } : {}}
              id={`plan-${plan.name.toLowerCase()}`}
            >
              {/* Highlight accent */}
              {plan.highlighted && (
                <div className="absolute -top-px left-12 right-12 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />
              )}

              {/* Plan name */}
              <span className="text-[13px] font-bold font-mono tracking-[0.3em] uppercase mb-10" style={{ color: '#6B6B6B' }}>
                {plan.name}
              </span>

              {/* Price */}
              <div className="flex items-baseline gap-3 mb-8">
                <span className="text-6xl font-bold font-mono tracking-tight" style={{ color: '#FFFFFF' }}>
                  {plan.price}
                </span>
                {plan.period && (
                  <span className="text-base font-mono tracking-wide" style={{ color: '#6B6B6B' }}>
                    {plan.period}
                  </span>
                )}
              </div>

              <p className="text-[16px] mb-12 leading-[2.5] tracking-wide" style={{ color: '#A1A1A1' }}>
                {plan.description}
              </p>

              {/* Features */}
              <ul className="space-y-8 mb-16 flex-1">
                {plan.features.map((feature, j) => (
                  <li key={j} className="flex items-start gap-5">
                    <Check size={18} style={{ color: '#6B6B6B' }} className="mt-[6px] flex-shrink-0" />
                    <span className="text-[16px] leading-[1.8] tracking-wide" style={{ color: '#C1C1C1' }}>{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <button
                className={`w-full py-5 text-[16px] font-bold rounded-xl flex items-center justify-center gap-3 transition-all duration-300 tracking-wide ${
                  plan.highlighted
                    ? 'bg-white text-black hover:bg-white/90 shadow-2xl'
                    : 'border border-white/[0.10] hover:border-white/[0.30] transition-colors'
                }`}
                style={!plan.highlighted ? { color: '#E1E1E1' } : {}}
              >
                {plan.cta}
                <ArrowRight size={18} />
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
