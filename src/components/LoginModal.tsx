import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ShieldAlert, User, Lock, Mail, LogIn, AlertCircle } from 'lucide-react';

export const LoginModal: React.FC<{ initialMode?: 'client' | 'admin' }> = ({ initialMode = 'client' }) => {
  const { loginUser, authError, setActiveView, setAuthError } = useApp();

  const [loginMode, setLoginMode] = useState<'client' | 'admin'>(initialMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      loginUser(email, password);
      setLoading(false);
    }, 300);
  };

  return (
    <section className="py-16 bg-slate-900 text-white min-h-[85vh] flex items-center justify-center border-b border-slate-800">
      <div className="max-w-md w-full mx-auto px-4 sm:px-6">
        
        <div className="bg-slate-950 p-8 rounded-2xl border border-slate-800 shadow-2xl space-y-6">
          
          {/* Header */}
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-xl bg-slate-900 border border-amber-500/40 text-amber-400 flex items-center justify-center mx-auto shadow-md">
              {loginMode === 'admin' ? <ShieldAlert className="w-6 h-6" /> : <User className="w-6 h-6" />}
            </div>
            <h2 className="font-serif-legal font-bold text-2xl text-slate-100">
              {loginMode === 'admin' ? 'Admin Portal Login' : 'Client Portal Login'}
            </h2>
            <p className="text-xs text-slate-400">
              US Law Enforcement Department Authentication System
            </p>
          </div>

          {/* Portal Switcher Tabs */}
          <div className="grid grid-cols-2 p-1 bg-slate-900 rounded-lg border border-slate-800 text-xs font-semibold">
            <button
              type="button"
              onClick={() => {
                setLoginMode('client');
                setAuthError(null);
              }}
              className={`py-2 rounded-md transition-all flex items-center justify-center gap-1.5 ${
                loginMode === 'client' ? 'bg-amber-500 text-slate-950 font-bold shadow' : 'text-slate-400 hover:text-white'
              }`}
            >
              <User className="w-3.5 h-3.5" />
              <span>Client Login</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setLoginMode('admin');
                setAuthError(null);
              }}
              className={`py-2 rounded-md transition-all flex items-center justify-center gap-1.5 ${
                loginMode === 'admin' ? 'bg-amber-500 text-slate-950 font-bold shadow' : 'text-slate-400 hover:text-white'
              }`}
            >
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>Admin Login</span>
            </button>
          </div>

          {/* Auth Error Banner */}
          {authError && (
            <div className="p-3.5 rounded-lg bg-red-500/10 border border-red-500/30 text-red-300 text-xs flex items-start gap-2 leading-relaxed">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <div className="whitespace-pre-line">{authError}</div>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
                {loginMode === 'admin' ? 'Admin Email Address *' : 'Client Email Address *'}
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder={loginMode === 'admin' ? 'admin@law-enforcement.us' : 'robert@sterlingmedia.com'}
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-100 text-xs focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

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

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-sm shadow-lg flex items-center justify-center gap-2 transition-all disabled:opacity-50"
            >
              <LogIn className="w-4 h-4" />
              <span>{loading ? 'Authenticating...' : loginMode === 'admin' ? 'Login as Admin' : 'Login to Client Portal'}</span>
            </button>
          </form>

          {/* Footer Signup Prompt */}
          <div className="text-center pt-2 border-t border-slate-900 text-xs text-slate-400">
            Don't have a protection membership yet?{' '}
            <button
              onClick={() => {
                setActiveView('packages');
              }}
              className="text-amber-400 font-bold hover:underline"
            >
              Sign Up for Packages
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};
