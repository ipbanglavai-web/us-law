import React, { useState } from 'react';
import { Landmark, Lock, ChevronDown, ChevronUp } from 'lucide-react';

export const GovBanner: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-white text-slate-900 border-b border-slate-200 text-xs font-[Arial,sans-serif] relative z-50 shadow-2xs">
      {/* Top Banner Bar - Thin responsive layout */}
      <div className="max-w-7xl mx-auto px-3 sm:px-4 py-1.5 flex flex-row items-center justify-between gap-2 overflow-x-auto whitespace-nowrap">
        <div className="flex items-center gap-2 shrink-0">
          <span className="inline-flex items-center justify-center w-5 h-3.5 rounded overflow-hidden shadow-2xs border border-slate-200 bg-slate-100 text-[11px] leading-none" role="img" aria-label="US Flag">
            🇺🇸
          </span>
          <span className="text-slate-700 font-medium text-[11px] sm:text-xs">
            An official website of the United States government
          </span>
        </div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-1 text-slate-700 hover:text-slate-950 font-medium focus:outline-none transition-colors py-0.5 px-1.5 rounded hover:bg-slate-100 select-none cursor-pointer shrink-0"
          aria-expanded={isOpen}
        >
          <span className="underline decoration-slate-400/80 decoration-1 underline-offset-4 hover:decoration-blue-600 transition-all">
            Here's how you know
          </span>
          {isOpen ? (
            <ChevronUp className="w-3.5 h-3.5 text-slate-500 transition-transform duration-300" />
          ) : (
            <ChevronDown className="w-3.5 h-3.5 text-slate-500 transition-transform duration-300" />
          )}
        </button>
      </div>

      {/* Smooth Expandable Panel with Grid Transition */}
      <div
        className={`grid transition-all duration-300 ease-in-out ${
          isOpen ? 'grid-rows-[1fr] opacity-100 py-3 sm:py-4 border-t border-slate-200 bg-slate-50/90 backdrop-blur-xs' : 'grid-rows-[0fr] opacity-0 py-0 border-t-0 bg-transparent'
        } overflow-hidden`}
      >
        <div className="overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-6 text-slate-700">
            {/* Column 1: Official .us */}
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-blue-50 border border-blue-200 flex items-center justify-center shrink-0 shadow-2xs text-blue-600 mt-0.5">
                <Landmark className="w-4 h-4" />
              </div>
              <div className="space-y-0.5">
                <h3 className="font-semibold text-slate-900 text-xs sm:text-sm">
                  Official websites use .us
                </h3>
                <p className="text-[11px] sm:text-xs text-slate-600 leading-relaxed">
                  A <strong className="text-slate-900 font-semibold">.us</strong> website belongs to an official government organization in the United States.
                </p>
              </div>
            </div>

            {/* Column 2: Secure HTTPS */}
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center shrink-0 shadow-2xs text-emerald-600 mt-0.5">
                <Lock className="w-4 h-4" />
              </div>
              <div className="space-y-0.5">
                <h3 className="font-semibold text-slate-900 text-xs sm:text-sm">
                  Secure .us websites use HTTPS
                </h3>
                <p className="text-[11px] sm:text-xs text-slate-600 leading-relaxed">
                  A lock (<span className="text-emerald-600 font-bold">🔒</span>) or <code className="text-emerald-700 font-mono bg-emerald-100/60 px-1 py-0.5 rounded text-[11px]">https://</code> means you've safely connected to the .us website. Share sensitive information only on official, secure websites.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


