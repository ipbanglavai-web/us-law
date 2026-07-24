import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { PlatformType } from '../types';
import { ShieldCheck, X, FilePlus, AlertCircle, CheckCircle2, Globe, Link2, HelpCircle, Send } from 'lucide-react';

const PLATFORMS: PlatformType[] = [
  'Facebook',
  'Instagram',
  'YouTube',
  'TikTok',
  'X (Twitter)',
  'Threads',
  'Pinterest',
  'LinkedIn',
  'Telegram',
  'Snapchat',
  'Reddit',
  'Website',
  'Other'
];

export const FileCaseModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({
  isOpen,
  onClose
}) => {
  const { currentUser, fileNewCase } = useApp();

  const [fullName, setFullName] = useState((currentUser as any)?.fullName || '');
  const [email, setEmail] = useState((currentUser as any)?.email || '');
  const [phone, setPhone] = useState((currentUser as any)?.phone || '');
  
  const [platform, setPlatform] = useState<PlatformType>('YouTube');
  const [infringingUrl, setInfringingUrl] = useState('');
  const [originalUrl, setOriginalUrl] = useState('');
  const [additionalDescription, setAdditionalDescription] = useState('');
  const [violationReason, setViolationReason] = useState('');

  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    if (!infringingUrl || !originalUrl || !violationReason) {
      setErrorMsg('Please fill in all required fields including Infringing URL, Original URL, and Violation Reason.');
      return;
    }

    const res = fileNewCase({
      fullName,
      email,
      phone,
      platform,
      infringingUrl,
      originalUrl,
      additionalDescription,
      violationReason
    });

    if (res.success) {
      setSuccessMsg(res.message);
      setTimeout(() => {
        setSuccessMsg(null);
        onClose();
      }, 2000);
    } else {
      setErrorMsg(res.message);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-2xl w-full p-6 sm:p-8 text-white shadow-2xl relative my-8 space-y-6">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Title */}
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
          <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400">
            <FilePlus className="w-6 h-6" />
          </div>
          <div>
            <h2 className="font-serif-legal font-bold text-2xl text-slate-100">
              File a New Takedown Case
            </h2>
            <p className="text-xs text-slate-400">
              US Law Enforcement Department Official IP Infringement Report
            </p>
          </div>
        </div>

        {errorMsg && (
          <div className="p-3.5 rounded-lg bg-red-500/10 border border-red-500/30 text-red-300 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {successMsg && (
          <div className="p-3.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>{successMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          
          {/* User Contact Info */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3 rounded-lg bg-slate-950 border border-slate-800/80">
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Full Name</label>
              <input
                type="text"
                required
                value={fullName}
                onChange={e => setFullName(e.target.value)}
                className="w-full px-3 py-2 rounded bg-slate-900 border border-slate-800 text-slate-100 focus:outline-none focus:border-amber-500"
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full px-3 py-2 rounded bg-slate-900 border border-slate-800 text-slate-100 focus:outline-none focus:border-amber-500"
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Phone Number</label>
              <input
                type="tel"
                required
                value={phone}
                onChange={e => setPhone(e.target.value)}
                className="w-full px-3 py-2 rounded bg-slate-900 border border-slate-800 text-slate-100 focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>

          {/* Infringing Platform Dropdown */}
          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
              Infringing Platform *
            </label>
            <div className="relative">
              <Globe className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
              <select
                value={platform}
                onChange={e => setPlatform(e.target.value as PlatformType)}
                className="w-full pl-9 pr-4 py-2.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-100 font-medium focus:outline-none focus:border-amber-500"
              >
                {PLATFORMS.map(p => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Infringing URL */}
          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
              Infringing URL (Stolen Content Link) *
            </label>
            <div className="relative">
              <Link2 className="w-4 h-4 text-red-400 absolute left-3 top-3" />
              <input
                type="url"
                required
                value={infringingUrl}
                onChange={e => setInfringingUrl(e.target.value)}
                placeholder="https://platform.com/unauthorized_post_or_video"
                className="w-full pl-9 pr-4 py-2.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-100 focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>

          {/* Original Content URL */}
          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
              Original Content URL (Your Proof Link) *
            </label>
            <div className="relative">
              <Link2 className="w-4 h-4 text-emerald-400 absolute left-3 top-3" />
              <input
                type="url"
                required
                value={originalUrl}
                onChange={e => setOriginalUrl(e.target.value)}
                placeholder="https://yourwebsite.com/original_work"
                className="w-full pl-9 pr-4 py-2.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-100 focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>

          {/* Question strictly required by prompt */}
          <div>
            <label className="block text-xs font-bold text-amber-300 uppercase tracking-wider mb-1 flex items-center gap-1.5">
              <HelpCircle className="w-4 h-4 text-amber-400" />
              <span>Why do you believe the content violates your intellectual property rights? *</span>
            </label>
            <textarea
              required
              rows={3}
              value={violationReason}
              onChange={e => setViolationReason(e.target.value)}
              placeholder="e.g. This video is a verbatim copy of our registered 4K masterclass uploaded without authorization or license on a commercial channel."
              className="w-full p-3 rounded-lg bg-slate-950 border border-slate-800 text-slate-100 focus:outline-none focus:border-amber-500"
            ></textarea>
          </div>

          {/* Additional Description */}
          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
              Additional Description / Metadata Notes
            </label>
            <textarea
              rows={2}
              value={additionalDescription}
              onChange={e => setAdditionalDescription(e.target.value)}
              placeholder="Optional timestamp info, channel username, or evidence notes..."
              className="w-full p-3 rounded-lg bg-slate-950 border border-slate-800 text-slate-100 focus:outline-none focus:border-amber-500"
            ></textarea>
          </div>

          <div className="pt-3 flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold shadow-lg flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              <span>Submit Takedown Case</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
