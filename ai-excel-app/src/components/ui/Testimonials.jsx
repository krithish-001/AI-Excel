'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Quote } from 'lucide-react';

const TESTIMONIALS = [
  {
    quote: "I used to spend 30 minutes hunting for the right formula. Now it takes me 10 seconds. AI Excel completely changed my workflow.",
    name: 'Sarah Chen',
    role: 'Financial Analyst, Goldman Sachs',
    metric: '30min → 10s',
  },
  {
    quote: "The formula debugger saved our team from a $50K reporting error. It caught a nested IF logic bug we'd never have found manually.",
    name: 'James Rodriguez',
    role: 'Data Lead, Stripe',
    metric: '$50K saved',
  },
  {
    quote: "XLOOKUP explanations are incredible. It's like having a senior Excel consultant available 24/7. Best tool purchase this year.",
    name: 'Priya Sharma',
    role: 'Operations Manager, Deloitte',
    metric: '24/7 access',
  },
  {
    quote: "We onboarded 200 new analysts using AI Excel's learning mode. Training time dropped by 60% and formula accuracy went up.",
    name: 'Michael Torres',
    role: 'VP of Training, JPMorgan Chase',
    metric: '60% faster',
  },
];

function TestimonialCard({ testimonial, index }) {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, margin: '-50px' });

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      className="group relative p-7 rounded-2xl border border-white/[0.06] bg-white/[0.01] hover:border-white/[0.15] hover:bg-white/[0.02] transition-all duration-400"
      id={`testimonial-${index}`}
    >
      <Quote size={20} style={{ color: 'rgba(255,255,255,0.06)' }} className="mb-5 group-hover:text-white/10 transition-colors" />

      <p className="text-sm leading-relaxed mb-6 group-hover:text-white/50 transition-colors" style={{ color: '#A1A1A1' }}>
        &ldquo;{testimonial.quote}&rdquo;
      </p>

      <div className="flex items-center justify-between">
        <div>
          <div className="text-sm font-medium" style={{ color: '#FFFFFF' }}>{testimonial.name}</div>
          <div className="text-[11px] mt-0.5 font-mono" style={{ color: '#6B6B6B' }}>{testimonial.role}</div>
        </div>
        <div className="text-right">
          <div className="text-sm font-bold font-mono group-hover:text-white/30 transition-colors" style={{ color: 'rgba(255,255,255,0.12)' }}>
            {testimonial.metric}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Testimonials() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  const companies = ['Goldman Sachs', 'Stripe', 'Deloitte', 'JPMorgan', 'McKinsey', 'Google', 'Meta', 'Amazon', 'Microsoft', 'Tesla'];

  return (
    <section ref={sectionRef} className="relative z-10 py-48 px-6" id="testimonials">
      <div className="site-container">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-12"
        >
          <span className="text-[11px] font-mono tracking-[0.3em] uppercase block mb-4" style={{ color: '#6B6B6B' }}>
            Trusted By
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4" style={{ color: '#FFFFFF' }}>
            Loved by Power Users
          </h2>
          <p className="text-base max-w-lg mx-auto" style={{ color: '#A1A1A1' }}>
            From analysts to data leads — teams rely on AI Excel every day.
          </p>
        </motion.div>

        {/* Marquee */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="mb-14 overflow-hidden"
        >
          <div className="flex items-center gap-14 animate-marquee">
            {[...companies, ...companies].map((company, i) => (
              <span key={i} className="text-[11px] font-mono whitespace-nowrap tracking-[0.15em] uppercase flex-shrink-0" style={{ color: 'rgba(255,255,255,0.06)' }}>
                {company}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {TESTIMONIALS.map((t, i) => (
            <TestimonialCard key={i} testimonial={t} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
