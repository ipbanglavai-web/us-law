import React from 'react';
import { useApp, PACKAGES } from '../context/AppContext';
import { PackagePlan } from '../types';
import { ShieldCheck, Check, Sparkles, ArrowRight, Zap, Award } from 'lucide-react';

export const PackagesSelection: React.FC = () => {
  const { setSelectedPackageForSignup, setActiveView } = useApp();

  const handleSelectPackage = (pkg: PackagePlan) => {
    setSelectedPackageForSignup(pkg);
    setActiveView('signup');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="py-16 bg-slate-900 text-white min-h-[85vh] border-b border-slate-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-bold uppercase tracking-wider">
            <Award className="w-3.5 h-3.5 text-amber-400" />
            <span>Membership Selection Step 1 of 2</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif-legal font-bold text-slate-100 tracking-tight">
            Select Your Protection Package
          </h2>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-sans-body">
            Choose a legal protection plan to secure your digital assets, videos, images, audio, and brand content against unauthorized online piracy.
          </p>
        </div>

        {/* 2 Packages Cards Side by Side */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          
          {/* Package 1: Monthly Protection */}
          {(() => {
            const pkg1 = PACKAGES[0];
            return (
              <div className="bg-slate-950 rounded-2xl p-8 border border-slate-800 hover:border-slate-700 shadow-2xl flex flex-col justify-between space-y-6 relative transition-all">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400 font-mono">
                      Flexible Plan
                    </span>
                    <span className="px-2.5 py-1 rounded bg-slate-800 text-slate-300 text-xs font-semibold">
                      {pkg1.duration}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-serif-legal font-bold text-2xl text-slate-100">
                      {pkg1.name}
                    </h3>
                    <div className="mt-3 flex items-baseline gap-1">
                      <span className="text-4xl font-extrabold text-white font-mono">{pkg1.price}</span>
                      <span className="text-xs text-slate-400">/ month</span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-400 border-t border-b border-slate-800/80 py-3">
                    Includes <strong className="text-amber-400">{pkg1.takedowns}</strong> across all major social networks, web hosts, and torrent platforms.
                  </p>

                  <div className="space-y-2.5 text-xs text-slate-300">
                    {pkg1.features.map((feat, idx) => (
                      <div key={idx} className="flex items-center gap-2.5">
                        <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-900">
                  <button
                    onClick={() => handleSelectPackage(pkg1)}
                    className="w-full py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-sm border border-slate-700 flex items-center justify-center gap-2 transition-all"
                  >
                    <span>Select Monthly Package ($200)</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })()}

          {/* Package 2: Annual Unlimited Protection */}
          {(() => {
            const pkg2 = PACKAGES[1];
            return (
              <div className="bg-gradient-to-b from-slate-900 to-slate-950 rounded-2xl p-8 border-2 border-amber-500 shadow-2xl shadow-amber-500/10 flex flex-col justify-between space-y-6 relative transition-all transform hover:-translate-y-1">
                
                {/* Popular Badge */}
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-amber-500 text-slate-950 text-[11px] font-extrabold uppercase tracking-wider flex items-center gap-1 shadow-md">
                  <Sparkles className="w-3.5 h-3.5 fill-slate-950" />
                  <span>BEST VALUE • UNLIMITED TAKEDOWNS</span>
                </div>

                <div className="space-y-4 pt-2">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold uppercase tracking-wider text-amber-400 font-mono">
                      Full Enterprise Security
                    </span>
                    <span className="px-2.5 py-1 rounded bg-amber-500/20 border border-amber-500/30 text-amber-300 text-xs font-semibold">
                      {pkg2.duration}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-serif-legal font-bold text-2xl text-slate-100">
                      {pkg2.name}
                    </h3>
                    <div className="mt-3 flex items-baseline gap-2">
                      <span className="text-4xl font-extrabold text-amber-400 font-mono">{pkg2.price}</span>
                      <span className="text-xs text-slate-400">/ year</span>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-semibold border border-emerald-500/30">
                        Save $1,400+
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-300 border-t border-b border-slate-800/80 py-3">
                    Includes <strong className="text-amber-400">{pkg2.takedowns}</strong> for 365 days. Complete priority legal coverage and dedicated crawler.
                  </p>

                  <div className="space-y-2.5 text-xs text-slate-200">
                    {pkg2.features.map((feat, idx) => (
                      <div key={idx} className="flex items-center gap-2.5">
                        <Check className="w-4 h-4 text-amber-400 shrink-0" />
                        <span className={idx === 0 ? 'font-bold text-amber-300' : ''}>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-900">
                  <button
                    onClick={() => handleSelectPackage(pkg2)}
                    className="w-full py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-sm shadow-xl flex items-center justify-center gap-2 transition-all"
                  >
                    <Zap className="w-4 h-4 fill-slate-950" />
                    <span>Select Annual Unlimited Package ($1000)</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })()}

        </div>

      </div>
    </section>
  );
};
