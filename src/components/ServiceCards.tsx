import React from 'react';
import {
  ShieldCheck,
  Award,
  Eye,
  Gavel,
  FileCheck,
  Lock,
  ArrowRight
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const ServiceCards: React.FC = () => {
  const { setActiveView } = useApp();

  const services = [
    {
      id: 'copyright',
      title: 'Copyright Protection',
      icon: ShieldCheck,
      description: 'Comprehensive legal defense of original videos, photography, music recordings, films, literature, and software code against unauthorized copying or redistribution under 17 U.S.C.'
    },
    {
      id: 'trademark',
      title: 'Trademark Protection',
      icon: Award,
      description: 'Enforcement of registered trademarks, word marks, brand logos, and trade dress against consumer confusion, counterfeiting, and brand dilution under the Lanham Act.'
    },
    {
      id: 'monitoring',
      title: 'Content Monitoring',
      icon: Eye,
      description: '24/7 continuous digital scanning across social platforms (YouTube, Meta, TikTok, X, Telegram, Reddit, Web Hosts) to catch stolen assets as soon as they are uploaded.'
    },
    {
      id: 'enforcement',
      title: 'Online Enforcement',
      icon: Gavel,
      description: 'Aggressive multi-jurisdictional legal action, cease & desist notices, platform account terminations, and domain host escalations for repeat infringement offenders.'
    },
    {
      id: 'dmca',
      title: 'DMCA Takedown',
      icon: FileCheck,
      description: 'Sworn statutory DMCA Section 512(c) notices transmitted directly to designated platform legal officers forcing immediate removal of infringing material.'
    },
    {
      id: 'brand',
      title: 'Brand Protection',
      icon: Lock,
      description: 'Safeguarding corporate identities against fake brand accounts, impersonation pages, counterfeit products, domain squatting, and unauthorized affiliate deception.'
    }
  ];

  return (
    <section id="services" className="py-20 bg-white text-slate-900 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-100 border border-slate-300 text-slate-800 text-xs font-bold uppercase tracking-wider">
            <ShieldCheck className="w-3.5 h-3.5 text-amber-600" />
            <span>Legal Defense Portfolio</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif-legal font-bold text-slate-900 tracking-tight">
            Our Core IP Protection Services
          </h2>
          <p className="text-base text-slate-600 leading-relaxed font-sans-body">
            US Law Enforcement Department provides specialized legal protection services for paid clients looking to defend their digital assets and brand value worldwide.
          </p>
        </div>

        {/* 6 Service Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => {
            const IconComp = service.icon;
            return (
              <div
                key={service.id}
                className="bg-slate-50 rounded-2xl p-8 border border-slate-200 hover:border-amber-500/60 hover:bg-white hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
              >
                <div className="space-y-4">
                  <div className="w-14 h-14 rounded-xl bg-slate-900 text-amber-400 border border-slate-800 flex items-center justify-center group-hover:bg-amber-500 group-hover:text-slate-950 transition-colors shadow-md">
                    <IconComp className="w-7 h-7" />
                  </div>
                  <h3 className="font-serif-legal font-bold text-xl text-slate-900 group-hover:text-amber-800 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {service.description}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-200/80 flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-800 uppercase tracking-wider font-serif-legal">
                    Official Protection Service
                  </span>
                  <button
                    onClick={() => {
                      setActiveView('packages');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="p-1.5 rounded-full bg-slate-200 hover:bg-amber-500 hover:text-slate-950 text-slate-700 transition-colors"
                    title="Select Membership"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
