import React from 'react';
import { useApp } from '../context/AppContext';
import { ShieldAlert, X, Mail } from 'lucide-react';

export const BannedModal: React.FC = () => {
  const { bannedModal, setBannedModal, setActiveView } = useApp();

  if (!bannedModal) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fade-in">
      <div className="bg-slate-900 border-2 border-red-500 rounded-2xl max-w-md w-full p-6 text-white shadow-2xl relative space-y-5">
        
        <button
          onClick={() => setBannedModal(false)}
          className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3">
          <div className="p-3 bg-red-500/20 text-red-400 rounded-xl border border-red-500/40">
            <ShieldAlert className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-serif-legal font-bold text-lg text-slate-100">
              Account Suspended / Banned
            </h3>
            <span className="text-xs text-red-400 font-medium">US Law Enforcement Security Operations</span>
          </div>
        </div>

        {/* Exact Prompt Text Requirement */}
        <div className="p-5 rounded-xl bg-slate-950 border border-red-500/50 text-red-300 font-bold text-base text-center leading-relaxed shadow-inner">
          You were banned due to unusual activities
        </div>

        <p className="text-xs text-slate-300 leading-relaxed text-center">
          Your account access has been restricted by the system administrator due to detected security anomalies and unusual activity patterns.
        </p>

        <div className="pt-2 flex flex-col gap-2">
          <a
            href="mailto:takedown@law-enforcement.us?subject=Account%20Ban%20Appeal"
            className="w-full py-2.5 rounded-lg bg-red-600 hover:bg-red-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow"
          >
            <Mail className="w-4 h-4" />
            <span>Appeal to takedown@law-enforcement.us</span>
          </a>

          <button
            onClick={() => {
              setBannedModal(false);
              setActiveView('home');
            }}
            className="w-full py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs border border-slate-700"
          >
            Return to Home
          </button>
        </div>

      </div>
    </div>
  );
};
