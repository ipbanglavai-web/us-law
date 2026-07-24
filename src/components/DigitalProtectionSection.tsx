import React from 'react';
import { ShieldCheck, Eye, Cpu, FileCheck, CheckCircle2, Lock, Sparkles, ArrowRight } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const DigitalProtectionSection: React.FC = () => {
  const { setActiveView } = useApp();

  return (
    <section className="py-20 bg-slate-900 text-white border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-800 border border-amber-500/40 text-amber-300 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>How Client Membership Works</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif-legal font-bold text-slate-100 tracking-tight">
            How Paid Clients Receive Digital Protection
          </h2>
          <p className="text-base text-slate-300 leading-relaxed font-sans-body">
            Our 5-stage automated & legal protection pipeline defends your intellectual property 24/7 across every major platform and web host worldwide.
          </p>
        </div>

        {/* 5 Process Steps Horizontal / Grid */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-16">
          
          {/* Step 1 */}
          <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 flex flex-col justify-between space-y-4 hover:border-amber-500/40 transition-colors">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center font-bold text-amber-400 text-sm font-mono">
                01
              </div>
              <h3 className="font-serif-legal font-bold text-base text-slate-100">
                Asset Registration
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Client registers original content URLs, video files, audio tracks, or brand credentials in the secure client dashboard.
              </p>
            </div>
            <div className="pt-2 border-t border-slate-900 text-[11px] font-semibold text-amber-400">
              Instant Legal Intake
            </div>
          </div>

          {/* Step 2 */}
          <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 flex flex-col justify-between space-y-4 hover:border-amber-500/40 transition-colors">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center font-bold text-amber-400 text-sm font-mono">
                02
              </div>
              <h3 className="font-serif-legal font-bold text-base text-slate-100">
                Continuous Web Crawler
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Automated web scanners index social networks, video sites, search engines, and torrent hubs 24/7 to catch unauthorized re-uploads.
              </p>
            </div>
            <div className="pt-2 border-t border-slate-900 text-[11px] font-semibold text-amber-400">
              Deep Fingerprinting
            </div>
          </div>

          {/* Step 3 */}
          <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 flex flex-col justify-between space-y-4 hover:border-amber-500/40 transition-colors">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center font-bold text-amber-400 text-sm font-mono">
                03
              </div>
              <h3 className="font-serif-legal font-bold text-base text-slate-100">
                Legal Notice Generation
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                When infringement is detected or reported, our legal system drafts formal Title 17 DMCA notices & statutory declarations.
              </p>
            </div>
            <div className="pt-2 border-t border-slate-900 text-[11px] font-semibold text-amber-400">
              Sworn Declarations
            </div>
          </div>

          {/* Step 4 */}
          <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 flex flex-col justify-between space-y-4 hover:border-amber-500/40 transition-colors">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center font-bold text-amber-400 text-sm font-mono">
                04
              </div>
              <h3 className="font-serif-legal font-bold text-base text-slate-100">
                Expedited Platform Removal
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Notices are transmitted directly to platform legal desks (YouTube, Meta, TikTok, X, Google) forcing immediate removal.
              </p>
            </div>
            <div className="pt-2 border-t border-slate-900 text-[11px] font-semibold text-amber-400">
              Platform Removal
            </div>
          </div>

          {/* Step 5 */}
          <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 flex flex-col justify-between space-y-4 hover:border-amber-500/40 transition-colors">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center font-bold text-amber-400 text-sm font-mono">
                05
              </div>
              <h3 className="font-serif-legal font-bold text-base text-slate-100">
                Dashboard Status Tracking
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Clients monitor case status live: "Submitted" → "In Review" → "Content Removed". Full legal audit history provided.
              </p>
            </div>
            <div className="pt-2 border-t border-slate-900 text-[11px] font-semibold text-amber-400">
              Live Audit Log
            </div>
          </div>

        </div>

        {/* CTA Banner */}
        <div className="bg-gradient-to-r from-amber-500/10 via-slate-950 to-slate-950 p-8 rounded-2xl border border-amber-500/30 flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="space-y-2">
            <h3 className="text-xl font-serif-legal font-bold text-amber-300">
              Ready to Protect Your Digital Assets Against Online Theft?
            </h3>
            <p className="text-xs text-slate-300">
              Select Monthly or Annual Unlimited Protection to activate US Law Enforcement Department as your official DMCA enforcement agent.
            </p>
          </div>
          <button
            onClick={() => {
              setActiveView('packages');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="px-6 py-3 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm shrink-0 flex items-center gap-2 shadow-lg"
          >
            <span>View Membership Packages</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
};
