'use client';

import { useState, useRef } from 'react';
import dynamic from 'next/dynamic';
import Navbar from '@/components/ui/Navbar';
import HeroSection from '@/components/ui/HeroSection';
import AIChatInterface from '@/components/ui/AIChatInterface';
import FeatureGrid from '@/components/ui/FeatureGrid';
import HowItWorks from '@/components/ui/HowItWorks';
import Pricing from '@/components/ui/Pricing';
import CTASection from '@/components/ui/CTASection';
import Footer from '@/components/ui/Footer';

// Dynamic import for Three.js scene (SSR disabled)
const Scene = dynamic(() => import('@/components/three/Scene'), {
  ssr: false,
  loading: () => (
    <div className="fixed inset-0 bg-black z-0 flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-8 h-8 border border-white/20 animate-pulse" />
        <span className="text-xs font-mono text-white/20 tracking-widest">
          INITIALIZING
        </span>
      </div>
    </div>
  ),
});

export default function Home() {
  const [chatOpen, setChatOpen] = useState(false);
  const [initialQuery, setInitialQuery] = useState('');
  const formulaPopRef = useRef(null);

  const handleSubmitQuery = (query) => {
    setInitialQuery(query);
    setChatOpen(true);
  };

  const handleFormulaExplained = () => {
    // Trigger the 3D formula pop effect
    if (formulaPopRef.current) {
      formulaPopRef.current();
    }
  };

  return (
    <main className="relative min-h-screen bg-black scanlines noise" id="main-page">
      {/* 3D Background Canvas */}
      <Scene formulaPopRef={formulaPopRef} />

      {/* Navigation */}
      <Navbar />

      {/* Scrollable content layer */}
      <div className="relative z-10">
        {/* Hero Section */}
        <HeroSection
          onSubmitQuery={handleSubmitQuery}
          onOpenChat={() => setChatOpen(true)}
        />

        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/95 to-black pointer-events-none" />
          <div className="relative flex flex-col gap-16 md:gap-24 pb-24">
            {/* Divider between hero and content */}
            <div className="site-container">
              <div className="divider-gradient" />
            </div>

            <FeatureGrid />

            <div className="site-container w-full flex justify-center opacity-50">
              <div className="divider-gradient w-1/2" />
            </div>

            <HowItWorks />

            <div className="site-container w-full flex justify-center opacity-50">
              <div className="divider-gradient w-1/2" />
            </div>

            <Pricing />

            <div className="site-container w-full flex justify-center opacity-50">
              <div className="divider-gradient w-1/2" />
            </div>

            <CTASection />

            <Footer />
          </div>
        </div>
      </div>

      {/* AI Chat Interface (Overlay) */}
      <AIChatInterface
        isOpen={chatOpen}
        onClose={() => setChatOpen(false)}
        initialQuery={initialQuery}
        onFormulaExplained={handleFormulaExplained}
      />
    </main>
  );
}
