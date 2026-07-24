import React from 'react';
import { useApp } from '../context/AppContext';
import { ShieldAlert, X, Mail, Phone, ExternalLink } from 'lucide-react';

export const PendingNoticeModal: React.FC = () => {
  const { pendingNoticeModal, setPendingNoticeModal, setActiveView } = useApp();

  if (!pendingNoticeModal) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="bg-slate-900 border-2 border-amber-500 rounded-2xl max-w-md w-full p-6 text-white shadow-2xl relative space-y-5">
        
        <button
          onClick={() => setPendingNoticeModal(false)}
          className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3">
          <div className="p-3 bg-amber-500/20 text-amber-400 rounded-xl border border-amber-500/40">
            <ShieldAlert className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-serif-legal font-bold text-lg text-slate-100">
              Account Status: Pending Approval
            </h3>
            <span className="text-xs text-amber-400 font-medium">US Law Enforcement Department Legal Intake</span>
          </div>
        </div>

        {/* Exact Prompt Text Requirement Box */}
        <div className="p-5 rounded-xl bg-slate-950 border border-amber-500/40 text-amber-300 font-semibold text-base text-center leading-relaxed whitespace-pre-line shadow-inner">
          {"Wait for Admin Approval.\n\nFor approval contact:\ntakedown@law-enforcement.us"}
        </div>

        <p className="text-xs text-slate-300 leading-relaxed text-center">
          In accordance with legal compliance procedures, new client memberships must be approved by an Administrator before portal access and takedown executions can begin.
        </p>

        <div className="pt-2 flex flex-col gap-2">
          <a
            href="mailto:takedown@law-enforcement.us?subject=Client%20Account%20Approval%20Request"
            className="w-full py-2.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 shadow"
          >
            <Mail className="w-4 h-4" />
            <span>Email Admin: takedown@law-enforcement.us</span>
          </a>

          <button
            onClick={() => {
              setPendingNoticeModal(false);
              setActiveView('contact');
            }}
            className="w-full py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs border border-slate-700"
          >
            Open Legal Intake Contact Desk
          </button>
        </div>

      </div>
    </div>
  );
};
