import React, { useState } from 'react';
import { Landmark, Lock, ChevronDown, ChevronUp, X } from 'lucide-react';

export const GovBanner: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-white text-slate-900 border-b border-slate-200 text-xs font-[Arial,sans-serif] relative z-50 shadow-xs">
      {/* Top Banner Bar - Stable non-shifting mobile/desktop layout */}
      <div className="max-w-7xl mx-auto px-3 sm:px-4 py-1.5 flex items-center justify-between gap-2 relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex-1 flex items-center justify-start gap-2 text-left focus:outline-none group cursor-pointer select-none py-0.5 min-w-0 pr-6"
          aria-expanded={isOpen}
        >
          <div className="flex items-center gap-2 min-w-0">
            <span className="inline-flex items-center justify-center w-5 h-3.5 rounded overflow-hidden shadow-2xs border border-slate-200 bg-slate-100 text-[11px] leading-none shrink-0" role="img" aria-label="US Flag">
              🇺🇸
            </span>
            <span className="text-slate-800 font-normal text-[11px] sm:text-xs inline-flex items-center gap-1.5 min-w-0 truncate">
              <span className="truncate">An official website of the United States government</span>
              {isOpen ? (
                <ChevronUp className="w-3.5 h-3.5 text-slate-600 shrink-0 transition-transform duration-300" />
              ) : (
                <ChevronDown className="w-3.5 h-3.5 text-slate-600 shrink-0 transition-transform duration-300" />
              )}
            </span>
          </div>
        </button>

        {isOpen && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsOpen(false);
            }}
            className="flex sm:hidden absolute right-3 top-1/2 -translate-y-1/2 w-6 h-6 items-center justify-center bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-950 rounded-full transition-all duration-200 cursor-pointer shadow-2xs z-10"
            aria-label="Close banner details"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}

        {isOpen && (
          <button
            onClick={() => setIsOpen(false)}
            className="hidden sm:flex absolute right-4 top-1/2 -translate-y-1/2 w-7 h-7 items-center justify-center bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-950 rounded-full transition-all duration-200 cursor-pointer shadow-2xs z-10"
            aria-label="Close banner details"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Smooth Expandable Panel with Grid Transition */}
      <div
        className={`grid transition-all duration-300 ease-in-out ${
          isOpen ? 'grid-rows-[1fr] opacity-100 py-4 sm:py-5 border-t border-slate-200 bg-slate-50' : 'grid-rows-[0fr] opacity-0 py-0 border-t-0 bg-transparent'
        } overflow-hidden`}
      >
        <div className="overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 flex flex-col sm:grid sm:grid-cols-2 gap-5 sm:gap-8 text-slate-800">
            {/* Column 1: Official .us */}
            <div className="flex items-start gap-3.5">
              <div className="w-9 h-9 rounded-full bg-blue-50 border border-blue-200 flex items-center justify-center shrink-0 shadow-2xs text-blue-600 mt-0.5">
                <Landmark className="w-4 h-4" />
              </div>
              <div className="space-y-1">
                <h3 className="font-bold text-slate-900 text-xs sm:text-sm">
                  Official websites use .us
                </h3>
                <p className="text-[11px] sm:text-xs text-slate-700 leading-relaxed font-[Arial,sans-serif]">
                  A <strong className="text-slate-900 font-bold">.us</strong> website belongs to an official government organization in the United States.
                </p>
              </div>
            </div>

            {/* Column 2: Secure HTTPS */}
            <div className="flex items-start gap-3.5">
              <div className="w-9 h-9 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center shrink-0 shadow-2xs text-emerald-600 mt-0.5">
                <Lock className="w-4 h-4" />
              </div>
              <div className="space-y-1 flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-slate-900 text-xs sm:text-sm">
                    The site is secure.
                  </h3>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="hidden sm:inline-flex p-1 text-slate-500 hover:text-slate-900 hover:bg-slate-200/60 rounded transition-colors cursor-pointer"
                    aria-label="Close"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <p className="text-[11px] sm:text-xs text-slate-700 leading-relaxed font-[Arial,sans-serif]">
                  A lock (<Lock className="w-3.5 h-3.5 inline-block text-slate-900 mx-0.5 -mt-0.5" />) or <code className="text-emerald-800 font-mono bg-emerald-100 px-1 py-0.5 rounded text-[11px]">https://</code> means you've safely connected to the .us website. Share sensitive information only on official, secure websites.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};



