import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  ShieldCheck,
  Menu,
  X,
  User,
  LogIn,
  UserPlus,
  ShieldAlert,
  ChevronRight,
  LogOut,
  FileText,
  Lock
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const {
    activeView,
    setActiveView,
    currentUser,
    currentRole,
    logout,
    setSelectedPackageForSignup,
    setPendingNoticeModal
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (viewName: string) => {
    setActiveView(viewName);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSignUpClick = () => {
    setSelectedPackageForSignup(null); // allow package selection first
    setActiveView('packages');
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="flex flex-col">
      {/* Top Legal Notice Bar - Hidden when logged in as client or admin */}
      {!currentUser && (
        <div className="order-2 md:order-1 bg-slate-950 text-slate-300 py-2 px-3 sm:px-4 border-b border-slate-800/80 border-t md:border-t-0">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-2 text-center md:text-left">
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-1.5 sm:gap-2 text-[11px] sm:text-xs">
              <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-950/80 text-emerald-400 border border-emerald-500/30 text-[10px] font-bold tracking-wider uppercase shadow-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                OFFICIAL PORTAL
              </span>
              <span className="text-slate-100 font-semibold tracking-tight">US Law Enforcement Department</span>
              <span className="hidden sm:inline text-slate-600">—</span>
              <span className="text-slate-400 font-medium">Digital Rights Protection Division</span>
            </div>
            <div className="flex flex-wrap items-center justify-center md:justify-end gap-2 sm:gap-3 text-[11px] sm:text-xs text-slate-400">
              <div className="flex items-center gap-1.5">
                <span className="text-slate-400">Official Email:</span>
                <a href="mailto:takedown@law-enforcement.us" className="text-amber-400 hover:text-amber-300 font-medium underline decoration-amber-500/40 hover:decoration-amber-300 transition-colors">
                  takedown@law-enforcement.us
                </a>
              </div>
              <span className="hidden sm:inline text-slate-800">|</span>
              <span className="px-1.5 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-300 text-[10px] sm:text-xs font-medium">
                28 U.S.C. § 1746 Certified
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Main Navigation Bar */}
      <header className="order-1 md:order-2 sticky top-0 z-40 bg-slate-900/95 backdrop-blur-md text-white border-b border-slate-800 shadow-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-3.5 sm:py-4.5 min-h-[5.25rem]">
            
            {/* Logo & Brand */}
            <div
              onClick={() => handleNavClick('home')}
              className="flex items-center gap-3.5 cursor-pointer group select-none pt-1 pb-1 sm:pt-0 sm:pb-0"
            >
              <div className="relative flex items-center justify-center w-11 h-11 rounded-lg bg-gradient-to-br from-slate-800 to-slate-950 border border-amber-500/40 shadow-inner group-hover:border-amber-400 transition-colors shrink-0">
                <ShieldCheck className="w-7 h-7 text-amber-400 group-hover:scale-105 transition-transform" />
                <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-amber-500 rounded-full border-2 border-slate-900 flex items-center justify-center">
                  <Lock className="w-2 h-2 text-slate-950" />
                </div>
              </div>
              <div className="flex flex-col justify-center py-0.5">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="font-bold text-base sm:text-xl tracking-wider text-slate-100 group-hover:text-amber-300 transition-colors leading-tight">
                    US LAW ENFORCEMENT
                  </span>
                </div>
                <span className="text-[10px] font-semibold tracking-widest text-slate-400 uppercase mt-0.5 leading-none">
                  Digital Intellectual Property Protection
                </span>
              </div>
            </div>

            {/* Desktop Navigation Links */}
            <nav className="hidden xl:flex items-center space-x-1 font-medium text-sm text-slate-300">
              <button
                onClick={() => handleNavClick('home')}
                className={`px-3.5 py-2 rounded-md transition-colors ${
                  activeView === 'home' ? 'text-amber-400 font-semibold bg-slate-800/80' : 'hover:text-white hover:bg-slate-800/50'
                }`}
              >
                Home
              </button>
              <button
                onClick={() => handleNavClick('about')}
                className={`px-3.5 py-2 rounded-md transition-colors ${
                  activeView === 'about' ? 'text-amber-400 font-semibold bg-slate-800/80' : 'hover:text-white hover:bg-slate-800/50'
                }`}
              >
                About
              </button>
              <button
                onClick={() => handleNavClick('services')}
                className={`px-3.5 py-2 rounded-md transition-colors ${
                  activeView === 'services' ? 'text-amber-400 font-semibold bg-slate-800/80' : 'hover:text-white hover:bg-slate-800/50'
                }`}
              >
                Services
              </button>
              <button
                onClick={() => handleNavClick('faq')}
                className={`px-3.5 py-2 rounded-md transition-colors ${
                  activeView === 'faq' ? 'text-amber-400 font-semibold bg-slate-800/80' : 'hover:text-white hover:bg-slate-800/50'
                }`}
              >
                FAQ
              </button>
              <button
                onClick={() => handleNavClick('contact')}
                className={`px-3.5 py-2 rounded-md transition-colors ${
                  activeView === 'contact' ? 'text-amber-400 font-semibold bg-slate-800/80' : 'hover:text-white hover:bg-slate-800/50'
                }`}
              >
                Contact
              </button>
            </nav>

            {/* Desktop User Actions / Login / Admin Buttons */}
            <div className="hidden lg:flex items-center gap-3">
              {currentUser ? (
                <div className="flex items-center gap-3">
                  {currentRole === 'admin' ? (
                    <button
                      onClick={() => handleNavClick('admin-dashboard')}
                      className={`flex items-center gap-2 px-3.5 py-2 rounded-md font-medium text-sm border ${
                        activeView === 'admin-dashboard'
                          ? 'bg-amber-500 text-slate-950 border-amber-400 font-semibold'
                          : 'bg-slate-800 text-amber-300 border-amber-500/40 hover:bg-slate-700'
                      }`}
                    >
                      <ShieldAlert className="w-4 h-4" />
                      <span>Admin Panel</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => handleNavClick('client-dashboard')}
                      className={`flex items-center gap-2 px-3.5 py-2 rounded-md font-medium text-sm border ${
                        activeView === 'client-dashboard'
                          ? 'bg-slate-100 text-slate-950 border-white font-semibold'
                          : 'bg-slate-800 text-slate-200 border-slate-700 hover:bg-slate-700'
                      }`}
                    >
                      <User className="w-4 h-4 text-amber-400" />
                      <span>Client Portal</span>
                    </button>
                  )}

                  <button
                    onClick={logout}
                    title="Sign Out"
                    className="p-2 text-slate-400 hover:text-red-400 hover:bg-slate-800 rounded-md transition-colors"
                  >
                    <LogOut className="w-5 h-5" />
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-2.5">
                  <button
                    onClick={() => handleNavClick('login')}
                    className="flex items-center gap-1.5 px-3.5 py-2 rounded-md text-sm font-medium text-slate-200 hover:text-white hover:bg-slate-800 transition-colors"
                  >
                    <LogIn className="w-4 h-4 text-slate-400" />
                    <span>Client Login</span>
                  </button>

                  <button
                    onClick={handleSignUpClick}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-md text-sm font-semibold bg-amber-500 text-slate-950 hover:bg-amber-400 shadow-md hover:shadow-amber-500/20 transition-all"
                  >
                    <UserPlus className="w-4 h-4" />
                    <span>Sign Up</span>
                  </button>

                  <button
                    onClick={() => handleNavClick('admin-login')}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-md text-xs font-semibold bg-slate-800/80 text-amber-300 hover:bg-slate-800 border border-amber-500/30 transition-colors"
                  >
                    <ShieldAlert className="w-3.5 h-3.5" />
                    <span>Admin</span>
                  </button>
                </div>
              )}
            </div>

            {/* Mobile Hamburger Toggle */}
            <div className="flex lg:hidden items-center">
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="p-2 rounded-md text-slate-300 hover:text-white hover:bg-slate-800"
                aria-label="Open Mobile Menu"
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer - Slide from left as requested */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          {/* Backdrop overlay */}
          <div
            className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Drawer content - Slide from Left */}
          <div className="relative w-4/5 max-w-sm bg-slate-900 text-white h-full shadow-2xl flex flex-col border-r border-slate-800 z-10">
            {/* Drawer Header */}
            <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950">
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="w-6 h-6 text-amber-400" />
                <div>
                  <div className="font-serif-legal font-bold text-base text-slate-100">
                    US LAW ENFORCEMENT
                  </div>
                  <div className="text-[10px] text-amber-400 font-medium uppercase tracking-wider">
                    Digital Protection
                  </div>
                </div>
              </div>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-1.5 rounded-md text-slate-400 hover:text-white hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Mobile Navigation Links */}
            <div className="flex-1 overflow-y-auto py-4 px-4 space-y-1">
              <div className="px-3 py-1.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Navigation
              </div>

              <button
                onClick={() => handleNavClick('home')}
                className={`w-full flex items-center justify-between px-3.5 py-3 rounded-lg text-sm font-medium transition-colors ${
                  activeView === 'home' ? 'bg-amber-500/10 text-amber-400 font-semibold border-l-2 border-amber-400' : 'text-slate-300 hover:bg-slate-800'
                }`}
              >
                <span>Home</span>
                <ChevronRight className="w-4 h-4 text-slate-600" />
              </button>

              <button
                onClick={() => handleNavClick('about')}
                className={`w-full flex items-center justify-between px-3.5 py-3 rounded-lg text-sm font-medium transition-colors ${
                  activeView === 'about' ? 'bg-amber-500/10 text-amber-400 font-semibold border-l-2 border-amber-400' : 'text-slate-300 hover:bg-slate-800'
                }`}
              >
                <span>About</span>
                <ChevronRight className="w-4 h-4 text-slate-600" />
              </button>

              <button
                onClick={() => handleNavClick('services')}
                className={`w-full flex items-center justify-between px-3.5 py-3 rounded-lg text-sm font-medium transition-colors ${
                  activeView === 'services' ? 'bg-amber-500/10 text-amber-400 font-semibold border-l-2 border-amber-400' : 'text-slate-300 hover:bg-slate-800'
                }`}
              >
                <span>Services</span>
                <ChevronRight className="w-4 h-4 text-slate-600" />
              </button>

              <button
                onClick={() => handleNavClick('faq')}
                className={`w-full flex items-center justify-between px-3.5 py-3 rounded-lg text-sm font-medium transition-colors ${
                  activeView === 'faq' ? 'bg-amber-500/10 text-amber-400 font-semibold border-l-2 border-amber-400' : 'text-slate-300 hover:bg-slate-800'
                }`}
              >
                <span>FAQ</span>
                <ChevronRight className="w-4 h-4 text-slate-600" />
              </button>

              <button
                onClick={() => handleNavClick('contact')}
                className={`w-full flex items-center justify-between px-3.5 py-3 rounded-lg text-sm font-medium transition-colors ${
                  activeView === 'contact' ? 'bg-amber-500/10 text-amber-400 font-semibold border-l-2 border-amber-400' : 'text-slate-300 hover:bg-slate-800'
                }`}
              >
                <span>Contact</span>
                <ChevronRight className="w-4 h-4 text-slate-600" />
              </button>

              <div className="pt-4 pb-1">
                <div className="px-3 py-1.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Portals & Membership
                </div>
              </div>

              {currentUser ? (
                <>
                  {currentRole === 'admin' ? (
                    <button
                      onClick={() => handleNavClick('admin-dashboard')}
                      className="w-full flex items-center justify-between px-3.5 py-3 rounded-lg text-sm font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/30"
                    >
                      <div className="flex items-center gap-2">
                        <ShieldAlert className="w-4 h-4 text-amber-400" />
                        <span>Admin Dashboard</span>
                      </div>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  ) : (
                    <button
                      onClick={() => handleNavClick('client-dashboard')}
                      className="w-full flex items-center justify-between px-3.5 py-3 rounded-lg text-sm font-semibold bg-slate-800 text-white border border-slate-700"
                    >
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-amber-400" />
                        <span>Client Dashboard</span>
                      </div>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  )}

                  <button
                    onClick={() => {
                      logout();
                      setMobileMenuOpen(false);
                    }}
                    className="w-full flex items-center gap-2 px-3.5 py-3 rounded-lg text-sm font-medium text-red-400 hover:bg-slate-800"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Sign Out</span>
                  </button>
                </>
              ) : (
                <div className="space-y-2 pt-1">
                  <button
                    onClick={() => handleNavClick('login')}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold bg-slate-800 text-slate-100 hover:bg-slate-700 border border-slate-700"
                  >
                    <LogIn className="w-4 h-4 text-amber-400" />
                    <span>Client Login</span>
                  </button>

                  <button
                    onClick={handleSignUpClick}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-bold bg-amber-500 text-slate-950 hover:bg-amber-400 shadow"
                  >
                    <UserPlus className="w-4 h-4" />
                    <span>Sign Up (Packages)</span>
                  </button>

                  <button
                    onClick={() => handleNavClick('admin-login')}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-xs font-semibold bg-slate-950 text-amber-300 border border-amber-500/30"
                  >
                    <ShieldAlert className="w-3.5 h-3.5" />
                    <span>Admin Login</span>
                  </button>
                </div>
              )}
            </div>

            {/* Mobile Footer */}
            <div className="p-4 border-t border-slate-800 bg-slate-950 text-center text-xs text-slate-500">
              © US Law Enforcement Department
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
