import React from 'react';
import { ShieldCheck, Scale, Lock, Mail, Phone, ExternalLink } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Footer: React.FC = () => {
  const { setActiveView } = useApp();

  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-slate-800">
      {/* Top Legal Notice Section */}
      <div className="bg-slate-900/60 py-8 px-4 border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-slate-400">
          <div className="flex items-start gap-3">
            <Scale className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-slate-200 block mb-1">Title 17 U.S. Code Statutory Authority</span>
              <span>All takedown actions and legal notices issued by US Law Enforcement Department are executed pursuant to Title 17 of the United States Code and DMCA 17 U.S.C. § 512(c).</span>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-slate-200 block mb-1">17 U.S.C. § 504 Statutory Damages</span>
              <span>Willful copyright infringement carries statutory damages of up to $150,000 per infringed work, plus attorney fees under federal jurisprudence.</span>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Lock className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-slate-200 block mb-1">15 U.S.C. § 1114 Trademark Protection</span>
              <span>Unauthorized distribution and brand counterfeiting are prosecuted under the Lanham Act with immediate platform escalation.</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Body */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-slate-900 border border-amber-500/40 rounded-lg">
                <ShieldCheck className="w-6 h-6 text-amber-400" />
              </div>
              <div>
                <div className="font-serif-legal font-bold text-lg text-slate-100 tracking-wider">
                  US LAW ENFORCEMENT
                </div>
                <div className="text-xs text-amber-400 font-semibold tracking-widest uppercase">
                  Digital Intellectual Property Protection
                </div>
              </div>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed max-w-md">
              US Law Enforcement Department provides comprehensive, legal digital asset enforcement and takedown services for copyright holders, content creators, and corporate brands worldwide. We defend intellectual property against online theft, piracy, and unauthorized monetization across all digital platforms.
            </p>
            <div className="pt-2 flex flex-col space-y-1.5 text-xs text-slate-300 font-mono">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-amber-400" />
                <span>Legal Intake: <a href="mailto:takedown@law-enforcement.us" className="text-amber-300 hover:underline">takedown@law-enforcement.us</a></span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-amber-400" />
                <span>Legal Desk: +1 (800) 555-USLAW</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-100 uppercase tracking-wider font-serif-legal">
              Legal Services
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><button onClick={() => setActiveView('services')} className="hover:text-amber-300 transition-colors">Copyright Protection</button></li>
              <li><button onClick={() => setActiveView('services')} className="hover:text-amber-300 transition-colors">Trademark Enforcement</button></li>
              <li><button onClick={() => setActiveView('services')} className="hover:text-amber-300 transition-colors">DMCA Takedown Notices</button></li>
              <li><button onClick={() => setActiveView('services')} className="hover:text-amber-300 transition-colors">24/7 Content Scan</button></li>
              <li><button onClick={() => setActiveView('services')} className="hover:text-amber-300 transition-colors">Brand Protection</button></li>
              <li><button onClick={() => setActiveView('services')} className="hover:text-amber-300 transition-colors">Platform Escalation</button></li>
            </ul>
          </div>

          {/* Navigation */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-100 uppercase tracking-wider font-serif-legal">
              Organization
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><button onClick={() => setActiveView('home')} className="hover:text-amber-300 transition-colors">Home Portal</button></li>
              <li><button onClick={() => setActiveView('about')} className="hover:text-amber-300 transition-colors">About Company</button></li>
              <li><button onClick={() => setActiveView('faq')} className="hover:text-amber-300 transition-colors">Copyright FAQ</button></li>
              <li><button onClick={() => setActiveView('packages')} className="hover:text-amber-300 transition-colors">Protection Packages</button></li>
              <li><button onClick={() => setActiveView('contact')} className="hover:text-amber-300 transition-colors">Contact Legal Desk</button></li>
            </ul>
          </div>

          {/* Client & Admin Portals */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-100 uppercase tracking-wider font-serif-legal">
              Member Access
            </h4>
            <div className="space-y-2 text-xs">
              <button
                onClick={() => setActiveView('login')}
                className="w-full text-left px-3 py-2 rounded bg-slate-900 border border-slate-800 text-slate-200 hover:border-slate-700 transition-colors block"
              >
                Client Login Portal
              </button>
              <button
                onClick={() => setActiveView('packages')}
                className="w-full text-left px-3 py-2 rounded bg-amber-500/10 border border-amber-500/30 text-amber-300 hover:bg-amber-500/20 transition-colors block"
              >
                Sign Up Membership
              </button>
              <button
                onClick={() => setActiveView('admin-login')}
                className="w-full text-left px-3 py-2 rounded bg-slate-900 border border-amber-500/20 text-slate-300 hover:border-amber-400 transition-colors block"
              >
                Admin Security Portal
              </button>
            </div>
          </div>

        </div>

        {/* Legal Disclaimer Box */}
        <div className="mt-12 pt-6 border-t border-slate-800/80 text-[11px] text-slate-500 leading-normal space-y-2">
          <p>
            <strong className="text-slate-400">Legal Notice & Authorization:</strong> US Law Enforcement Department is a licensed digital IP protection agency acting as an authorized legal representative for paid client creators, media publishers, and trademark entities. Submission of fraudulent DMCA or trademark notices is punishable under 17 U.S.C. § 512(f) and federal perjury laws.
          </p>
        </div>

        {/* Bottom Copyright Text strictly required */}
        <div className="mt-8 pt-6 border-t border-slate-800 flex flex-col sm:flex-row justify-between items-center text-xs text-slate-400 gap-4">
          <div className="font-semibold text-slate-200 font-serif-legal">
            © US Law Enforcement Department
            <span className="font-normal text-slate-400 ml-1">All Rights Reserved.</span>
          </div>
          <div className="flex items-center space-x-6 text-slate-500">
            <span>Official US IP Protection Services</span>
            <span>•</span>
            <span>DMCA Authorized Agent</span>
            <span>•</span>
            <span>Title 17 U.S.C. Compliant</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
