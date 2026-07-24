import React from 'react';
import { Scale, BookOpen, AlertTriangle, ShieldCheck, FileText, CheckCircle } from 'lucide-react';

export const CopyrightLawSection: React.FC = () => {
  return (
    <section className="py-20 bg-slate-900 text-white border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-800 border border-amber-500/40 text-amber-300 text-xs font-bold uppercase tracking-wider">
            <Scale className="w-3.5 h-3.5 text-amber-400" />
            <span>Title 17 United States Code</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif-legal font-bold text-slate-100 tracking-tight">
            US Copyright Law & Legal Statutory Framework
          </h2>
          <p className="text-base text-slate-300 leading-relaxed font-sans-body">
            Understanding federal statutory protections, DMCA Safe Harbor requirements, and strict statutory damages enforcing creators' rights under United States Code Title 17.
          </p>
        </div>

        {/* 3 Cards Breakdown */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          
          {/* Card 1 */}
          <div className="bg-slate-950 p-8 rounded-xl border border-slate-800 hover:border-amber-500/40 transition-all space-y-4">
            <div className="w-12 h-12 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <BookOpen className="w-6 h-6" />
            </div>
            <h3 className="font-serif-legal font-bold text-xl text-slate-100">
              17 U.S.C. § 512 (DMCA Enforcement)
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              The Digital Millennium Copyright Act (DMCA) section 512 provides the legal framework requiring online service providers, platforms, and web hosts to expeditiously remove or disable access to infringing material upon receiving a formal Notice of Claimed Infringement.
            </p>
            <ul className="text-xs text-slate-400 space-y-1.5 pt-2 border-t border-slate-800">
              <li className="flex items-center gap-2">
                <CheckCircle className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>Formal Notification of Infringement</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>Expedited Platform Takedown Obligations</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>Repeat Infringer Account Termination</span>
              </li>
            </ul>
          </div>

          {/* Card 2 */}
          <div className="bg-slate-950 p-8 rounded-xl border border-slate-800 hover:border-amber-500/40 transition-all space-y-4">
            <div className="w-12 h-12 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <h3 className="font-serif-legal font-bold text-xl text-slate-100">
              17 U.S.C. § 504 (Statutory Damages)
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Federal law prescribes severe financial penalties for copyright infringement. In lieu of actual damages and profits, copyright owners may elect statutory damages up to $30,000 per work, and up to $150,000 per work for willful infringement under 17 U.S.C. § 504(c).
            </p>
            <ul className="text-xs text-slate-400 space-y-1.5 pt-2 border-t border-slate-800">
              <li className="flex items-center gap-2">
                <CheckCircle className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>Up to $150,000 Willful Infringement Fine</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>Full Attorney’s Fees & Legal Costs Recovery</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>Federal Injunctions & Revenue Seizures</span>
              </li>
            </ul>
          </div>

          {/* Card 3 */}
          <div className="bg-slate-950 p-8 rounded-xl border border-slate-800 hover:border-amber-500/40 transition-all space-y-4">
            <div className="w-12 h-12 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-serif-legal font-bold text-xl text-slate-100">
              Copyright Ownership & Protection
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Copyright protection subsists in original works of authorship fixed in any tangible medium of expression. US Law Enforcement Department asserts statutory claims for visual media, audio recordings, written literature, software code, and digital streams.
            </p>
            <ul className="text-xs text-slate-400 space-y-1.5 pt-2 border-t border-slate-800">
              <li className="flex items-center gap-2">
                <CheckCircle className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>Immediate Fixation Protection Rights</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>US Copyright Office Registration Support</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>International Treaty Enforcement (Berne)</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Legal Notice Callout */}
        <div className="p-6 rounded-xl bg-slate-950 border border-amber-500/30 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <FileText className="w-8 h-8 text-amber-400 shrink-0" />
            <div>
              <h4 className="font-serif-legal font-bold text-sm text-slate-100">
                Authorized DMCA Representation Service
              </h4>
              <p className="text-xs text-slate-400">
                US Law Enforcement Department issues statutory notices with sworn declarations under penalty of perjury as prescribed by 28 U.S.C. § 1746.
              </p>
            </div>
          </div>
          <a
            href="mailto:takedown@law-enforcement.us"
            className="px-5 py-2.5 rounded bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shrink-0 transition-colors"
          >
            Contact Legal Desk
          </a>
        </div>

      </div>
    </section>
  );
};
