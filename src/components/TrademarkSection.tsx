import React from 'react';
import { Award, ShieldAlert, CheckCircle2, Lock, Scale, Zap } from 'lucide-react';

export const TrademarkSection: React.FC = () => {
  return (
    <section className="py-20 bg-slate-50 text-slate-900 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-200 border border-slate-300 text-slate-800 text-xs font-bold uppercase tracking-wider">
            <Award className="w-3.5 h-3.5 text-amber-600" />
            <span>Federal Trademark Defense</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif-legal font-bold text-slate-900 tracking-tight">
            Trademark Protection & Brand Enforcement
          </h2>
          <p className="text-base text-slate-600 leading-relaxed font-sans-body">
            Safeguarding federal registered trademarks, word marks, logos, brand assets, and digital handles against customer confusion, counterfeiting, and brand dilution under the Lanham Act (15 U.S.C.).
          </p>
        </div>

        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left: Detail Accordions / Info */}
          <div className="space-y-6">
            <div className="p-6 rounded-xl bg-white border border-slate-200 shadow-sm space-y-3">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded bg-amber-500/10 text-amber-700">
                  <ShieldAlert className="w-5 h-5" />
                </div>
                <h3 className="font-serif-legal font-bold text-lg text-slate-900">
                  Lanham Act Compliance (15 U.S.C. § 1114 & § 1125)
                </h3>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Federal law strictly prohibits unauthorized commercial use of registered trademarks that causes likelihood of consumer confusion, deception, or brand dilution. We issue formal Cease & Desist demands and file trademark abuse reports across online marketplaces and social networks.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-white border border-slate-200 shadow-sm space-y-3">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded bg-amber-500/10 text-amber-700">
                  <Lock className="w-5 h-5" />
                </div>
                <h3 className="font-serif-legal font-bold text-lg text-slate-900">
                  Impersonation & Social Handle Squatting
                </h3>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Fake social media profiles, fraudulent verified handles, and unauthorized domain redirects deceive clients and destroy hard-earned brand equity. US Law Enforcement Department forces platform compliance to reclaim or terminate fake brand accounts.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-white border border-slate-200 shadow-sm space-y-3">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded bg-amber-500/10 text-amber-700">
                  <Zap className="w-5 h-5" />
                </div>
                <h3 className="font-serif-legal font-bold text-lg text-slate-900">
                  Counterfeit Goods & Digital Assets Takedown
                </h3>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Illicit e-commerce listings, counterfeit product portals, and leaked digital products are targeted for swift removal from Shopify, Amazon, eBay, Telegram groups, and web host infrastructure.
              </p>
            </div>
          </div>

          {/* Right: Enforcement Matrix */}
          <div className="bg-slate-900 text-white p-8 rounded-2xl border border-slate-800 shadow-xl space-y-6">
            <h3 className="font-serif-legal font-bold text-xl text-slate-100 pb-3 border-b border-slate-800">
              Trademark Protection Scope
            </h3>

            <div className="space-y-4 text-xs">
              <div className="flex items-center justify-between p-3 rounded bg-slate-950 border border-slate-800">
                <span className="font-semibold text-slate-200">USPTO & International Registered Marks</span>
                <span className="text-amber-400 font-bold">100% Enforced</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded bg-slate-950 border border-slate-800">
                <span className="font-semibold text-slate-200">Social Media Username Impersonation</span>
                <span className="text-amber-400 font-bold">Immediate Takedown</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded bg-slate-950 border border-slate-800">
                <span className="font-semibold text-slate-200">Counterfeit E-commerce Products</span>
                <span className="text-amber-400 font-bold">Merchant Removal</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded bg-slate-950 border border-slate-800">
                <span className="font-semibold text-slate-200">Domain Squatting & Cyber-Piracy</span>
                <span className="text-amber-400 font-bold">UDRP & Host Filing</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded bg-slate-950 border border-slate-800">
                <span className="font-semibold text-slate-200">Brand Logo & Watermark Misuse</span>
                <span className="text-amber-400 font-bold">Legal C&D Notice</span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-950/80 border border-amber-500/30 text-xs text-slate-300 leading-relaxed">
              <strong className="text-amber-400 block mb-1">Brand Integrity Guarantee:</strong>
              We defend client brand assets against commercial exploitation and ensure swift removal of misleading content deceiving consumers in the marketplace.
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
