import React, { useState } from 'react';
import { useApp, PACKAGES } from '../context/AppContext';
import { PackagePlan } from '../types';
import { ShieldCheck, Lock, Mail, Phone, User, CheckCircle2, AlertCircle, ArrowLeft } from 'lucide-react';

export const SignupModal: React.FC = () => {
  const {
    selectedPackageForSignup,
    setSelectedPackageForSignup,
    signupClient,
    setActiveView
  } = useApp();

  const [packageChoice, setPackageChoice] = useState<PackagePlan>(
    selectedPackageForSignup || PACKAGES[1]
  );

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isSuccessSubmitted, setIsSuccessSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!fullName || !email || !phone || !password || !confirmPassword) {
      setErrorMsg('All fields are required.');
      return;
    }

    if (password !== confirmPassword) {
      setErrorMsg('Password and Confirm Password do not match.');
      return;
    }

    if (password.length < 6) {
      setErrorMsg('Password must be at least 6 characters.');
      return;
    }

    const res = signupClient({
      fullName,
      email,
      phone,
      password,
      selectedPackage: packageChoice
    });

    if (res.success) {
      setIsSuccessSubmitted(true);
    } else {
      setErrorMsg(res.message);
    }
  };

  return (
    <section className="py-16 bg-slate-900 text-white min-h-[85vh] flex items-center justify-center border-b border-slate-800">
      <div className="max-w-2xl w-full mx-auto px-4 sm:px-6">
        
        {/* Top Back link */}
        <button
          onClick={() => setActiveView('packages')}
          className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-amber-400 mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Change Package Selection</span>
        </button>

        {isSuccessSubmitted ? (
          /* Success Card displaying exact text required by prompt */
          <div className="bg-slate-950 p-8 sm:p-10 rounded-2xl border-2 border-amber-500 shadow-2xl text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/40 flex items-center justify-center mx-auto">
              <ShieldCheck className="w-10 h-10" />
            </div>

            <div className="space-y-3">
              <h2 className="text-2xl sm:text-3xl font-serif-legal font-bold text-slate-100">
                Registration Submitted
              </h2>
              
              {/* Exact Prompt Required Text Box */}
              <div className="p-6 rounded-xl bg-slate-900 border border-amber-500/30 text-amber-300 font-semibold text-base sm:text-lg leading-relaxed whitespace-pre-line my-4 shadow-inner">
                {"Wait for Admin Approval.\n\nFor approval contact:\ntakedown@law-enforcement.us"}
              </div>

              <p className="text-xs text-slate-400 leading-relaxed max-w-md mx-auto">
                Your client application for <strong className="text-slate-200">{packageChoice.name}</strong> ({packageChoice.price}) has been logged in our legal system under email <strong className="text-slate-200">{email}</strong>. Users cannot log in before admin approval.
              </p>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={() => setActiveView('home')}
                className="px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs"
              >
                Return to Home Page
              </button>
              <button
                onClick={() => setActiveView('login')}
                className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs"
              >
                Go to Client Login Portal
              </button>
            </div>
          </div>
        ) : (
          /* Signup Form */
          <div className="bg-slate-950 p-8 rounded-2xl border border-slate-800 shadow-2xl space-y-6">
            
            <div className="flex justify-between items-start border-b border-slate-800 pb-4">
              <div>
                <h2 className="font-serif-legal font-bold text-2xl text-slate-100">
                  Client Account Registration
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  US Law Enforcement Department Digital Intellectual Property Protection Portal
                </p>
              </div>
              <div className="text-right">
                <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider block">
                  Selected Package:
                </span>
                <span className="text-xs font-bold text-slate-200 font-mono">
                  {packageChoice.name} ({packageChoice.price})
                </span>
              </div>
            </div>

            {errorMsg && (
              <div className="p-3.5 rounded-lg bg-red-500/10 border border-red-500/30 text-red-300 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Package Toggle Selector */}
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                  1. Confirm Selected Package *
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {PACKAGES.map((pkg) => (
                    <button
                      key={pkg.id}
                      type="button"
                      onClick={() => setPackageChoice(pkg)}
                      className={`p-3 rounded-lg border text-left transition-all ${
                        packageChoice.id === pkg.id
                          ? 'bg-amber-500/20 border-amber-500 text-amber-300'
                          : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                      }`}
                    >
                      <div className="font-bold text-xs">{pkg.name}</div>
                      <div className="text-xs font-mono text-slate-300 mt-0.5">{pkg.price} • {pkg.takedowns}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Full Name */}
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
                  Full Legal Name *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={e => setFullName(e.target.value)}
                    placeholder="e.g. Robert Sterling"
                    className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-100 text-xs focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              {/* Email & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
                    Email Address *
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      placeholder="e.g. robert@brand.com"
                      className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-100 text-xs focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
                    Phone Number *
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={e => setPhone(e.target.value)}
                      placeholder="+1 (555) 234-5678"
                      className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-100 text-xs focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>
              </div>

              {/* Password & Confirm */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
                    Password *
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                    <input
                      type="password"
                      required
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-100 text-xs focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
                    Confirm Password *
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                    <input
                      type="password"
                      required
                      value={confirmPassword}
                      onChange={e => setConfirmPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-100 text-xs focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-3">
                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-sm shadow-lg transition-all"
                >
                  Submit Registration for Admin Approval
                </button>
              </div>

              <div className="text-center text-[11px] text-slate-500 pt-2">
                By submitting, you certify that all information provided is accurate under 28 U.S.C. § 1746. Account requires Admin Approval prior to portal access.
              </div>
            </form>
          </div>
        )}

      </div>
    </section>
  );
};
