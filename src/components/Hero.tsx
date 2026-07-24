import React from 'react';
import { useApp } from '../context/AppContext';
import { ShieldCheck, ShieldAlert, ArrowRight, Lock, CheckCircle2, FileCheck, Scale, Award } from 'lucide-react';

export const Hero: React.FC = () => {
  const { setActiveView, setSelectedPackageForSignup } = useApp();

  const handleStartProtection = () => {
    setSelectedPackageForSignup(null);
    setActiveView('packages');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="relative bg-slate-950 text-white overflow-hidden py-16 lg:py-24 border-b border-slate-800">
      {/* Background Decorative Grid & Badge Watermark */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-25"></div>
      
      {/* Subtle Gold Accent Gradient */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-gradient-to-b from-amber-500/10 via-amber-600/5 to-transparent blur-3xl rounded-full pointer-events-none"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Official Insignia Header Badge */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/90 border border-amber-500/40 text-amber-300 text-xs font-semibold tracking-wider uppercase shadow-lg backdrop-blur">
            <Award className="w-4 h-4 text-amber-400" />
            <span>Official US Digital Asset Legal Protection Agency</span>
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
            <span className="text-slate-300">Title 17 U.S.C. Enforcement</span>
          </div>
        </div>

        <div className="text-center max-w-4xl mx-auto space-y-6">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif-legal font-bold tracking-tight text-slate-100 leading-[1.15]">
            US Law Enforcement Department Protects <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-500">Digital Creators & Brands</span> Against Unauthorized Content Misuse
          </h1>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-3xl mx-auto font-sans-body">
            US Law Enforcement Department provides rigorous, legally backed Digital Intellectual Property Protection for paid clients worldwide. If any unauthorized person, page, or website uploads, copies, republishes, distributes, or misuses your videos, audio, music, images, or copyrighted content, we initiate immediate legal action and execute platform-wide DMCA takedowns on your behalf.
          </p>

          {/* Action CTAs */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={handleStartProtection}
              className="w-full sm:w-auto px-8 py-4 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-base shadow-xl shadow-amber-500/20 flex items-center justify-center gap-2 transition-all transform hover:-translate-y-0.5"
            >
              <ShieldCheck className="w-5 h-5 text-slate-950" />
              <span>Get Digital Protection Now</span>
              <ArrowRight className="w-5 h-5" />
            </button>

            <button
              onClick={() => {
                setActiveView('login');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="w-full sm:w-auto px-7 py-4 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-200 font-semibold text-base border border-slate-700 hover:border-slate-600 flex items-center justify-center gap-2 transition-all"
            >
              <Lock className="w-4 h-4 text-amber-400" />
              <span>Client Portal Login</span>
            </button>
          </div>

          {/* Trust Guarantees Bar */}
          <div className="pt-8 border-t border-slate-800/80 grid grid-cols-2 md:grid-cols-4 gap-4 text-xs font-medium text-slate-300">
            <div className="flex items-center justify-center gap-2 p-2.5 rounded bg-slate-900/60 border border-slate-800">
              <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
              <span>24/7 Platform Scanning</span>
            </div>
            <div className="flex items-center justify-center gap-2 p-2.5 rounded bg-slate-900/60 border border-slate-800">
              <FileCheck className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Legal DMCA Filings</span>
            </div>
            <div className="flex items-center justify-center gap-2 p-2.5 rounded bg-slate-900/60 border border-slate-800">
              <Scale className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Title 17 U.S. Code</span>
            </div>
            <div className="flex items-center justify-center gap-2 p-2.5 rounded bg-slate-900/60 border border-slate-800">
              <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Counterfeit Takedowns</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
