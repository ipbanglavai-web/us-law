import React from 'react';
import { ShieldCheck, Scale, FileText, CheckCircle2, Lock, Eye, Gavel, Award } from 'lucide-react';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-20 bg-white text-slate-900 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-100 border border-slate-300 text-slate-800 text-xs font-bold uppercase tracking-wider">
            <Award className="w-3.5 h-3.5 text-amber-600" />
            <span>Official Corporate Overview</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif-legal font-bold text-slate-900 tracking-tight">
            About US Law Enforcement Department
          </h2>
          <p className="text-base text-slate-600 leading-relaxed font-sans-body">
            Dedicated to safeguarding digital intellectual property, protecting brand reputation, and enforcing statutory copyright compliance across all online channels.
          </p>
        </div>

        {/* 2-Column Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <div className="space-y-6">
            <h3 className="text-2xl font-serif-legal font-bold text-slate-900">
              Specialized Digital Rights & Intellectual Property Protection
            </h3>
            <p className="text-slate-700 leading-relaxed">
              <strong>US Law Enforcement Department</strong> operates as a premier digital intellectual property defense agency. We represent independent content creators, media studios, music artists, digital authors, and corporate brand owners who require aggressive, legally binding defense against online infringement.
            </p>
            <p className="text-slate-700 leading-relaxed">
              In the modern digital landscape, stolen content propagates within seconds across social media networks, video streaming servers, messaging channels, and torrent platforms. Our agency deploys state-of-the-art crawling technology, automated digital fingerprint matching, and experienced IP legal specialists to identify unauthorized copies and execute immediate DMCA takedown demands.
            </p>

            {/* Protected Asset Bullets */}
            <div className="pt-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3 font-serif-legal">
                Protected Digital Assets:
              </h4>
              <div className="grid grid-cols-2 gap-2.5 text-sm font-semibold text-slate-800">
                <div className="flex items-center gap-2 p-2 rounded bg-slate-50 border border-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>Exclusive Video Renders</span>
                </div>
                <div className="flex items-center gap-2 p-2 rounded bg-slate-50 border border-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>High-Res Photography</span>
                </div>
                <div className="flex items-center gap-2 p-2 rounded bg-slate-50 border border-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>Audio Masters & Music</span>
                </div>
                <div className="flex items-center gap-2 p-2 rounded bg-slate-50 border border-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>E-books & Legal Documents</span>
                </div>
                <div className="flex items-center gap-2 p-2 rounded bg-slate-50 border border-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>Proprietary Software Files</span>
                </div>
                <div className="flex items-center gap-2 p-2 rounded bg-slate-50 border border-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>Trademarks & Brand Assets</span>
                </div>
              </div>
            </div>
          </div>

          {/* Feature Showcase Box */}
          <div className="bg-slate-900 text-white rounded-2xl p-8 border border-slate-800 shadow-2xl space-y-6">
            <div className="flex items-center gap-3 pb-4 border-b border-slate-800">
              <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30">
                <Gavel className="w-7 h-7 text-amber-400" />
              </div>
              <div>
                <h4 className="font-serif-legal font-bold text-lg text-slate-100">
                  Legal Representation Protocol
                </h4>
                <p className="text-xs text-slate-400">
                  Official DMCA Designated Enforcement Agent
                </p>
              </div>
            </div>

            <div className="space-y-4 text-sm text-slate-300">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                  1
                </div>
                <div>
                  <strong className="text-slate-100 block">Power of Attorney & Client Representation:</strong>
                  <span>Paid clients grant US Law Enforcement Department legal authorization to file binding notices under Title 17 U.S. Code § 512.</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                  2
                </div>
                <div>
                  <strong className="text-slate-100 block">Strict Legal Chain of Custody:</strong>
                  <span>Every detected violation is cataloged with cryptographic timestamping, server IP headers, and original work comparison logs.</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                  3
                </div>
                <div>
                  <strong className="text-slate-100 block">Multi-Platform Enforcement Engine:</strong>
                  <span>Direct legal API integrations with YouTube, Meta (Instagram/Facebook), TikTok, X, Telegram, Reddit, and major hosting providers.</span>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-amber-500/20 text-xs text-amber-300 flex items-center gap-3">
              <Lock className="w-5 h-5 text-amber-400 shrink-0" />
              <span>
                All enforcement documentation is executed in compliance with US Federal Copyright standards and statutory perjury laws.
              </span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
