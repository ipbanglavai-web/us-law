import React, { useState } from 'react';
import { ChevronDown, HelpCircle, ShieldCheck } from 'lucide-react';

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: 'What is US Law Enforcement Department and how does it protect my content?',
      answer: 'US Law Enforcement Department is a licensed digital intellectual property enforcement agency. We act as an authorized agent for creators, publishers, and brand owners. We monitor digital platforms for unauthorized uploads of videos, images, audio, music, e-books, and software, and issue legally binding DMCA takedown notices and cease-and-desist orders.'
    },
    {
      question: 'How quickly is infringing content removed after I file a case?',
      answer: 'Once a case is filed in your client dashboard, our intake system verifies ownership credentials and dispatches formal legal notices to the hosting platform or social network within 1 to 24 hours. Most major platforms (YouTube, Instagram, TikTok, Facebook, X) disable infringing content within 24–48 hours of receiving our statutory filing.'
    },
    {
      question: 'What is the difference between Monthly Protection and Annual Unlimited Protection?',
      answer: 'The Monthly Protection package ($200/month) grants you up to 30 legal takedown executions per month across all platforms. The Annual Unlimited Protection package ($1,000/year) provides UNLIMITED takedowns for a full 12 months, priority legal notice escalation, automated continuous scanning, and a dedicated IP enforcement attorney.'
    },
    {
      question: 'Why does my client account require Admin Approval after signup?',
      answer: 'To maintain the integrity of our legal filings and ensure compliance with 17 U.S.C. § 512(f) federal perjury laws, every new client registration is reviewed by an Administrator to verify identity and legitimate ownership rights before full portal access is granted.'
    },
    {
      question: 'What platforms and websites are covered under US Law Enforcement Department protection?',
      answer: 'Our legal notices cover ALL major social media and media platforms including YouTube, Facebook, Instagram, TikTok, X (Twitter), Threads, Pinterest, LinkedIn, Telegram, Snapchat, Reddit, Discord, Mega, Google Drive, as well as standalone web hosts, domain registrars, and torrent networks.'
    },
    {
      question: 'What information do I need to submit when filing a new takedown case?',
      answer: 'You need to provide the Infringing URL (where your stolen content is currently hosted), your Original Content URL (proof of your prior publication), the targeted platform, and a brief explanation of why the content violates your intellectual property rights.'
    },
    {
      question: 'What happens if an infringer submits a DMCA counter-notification?',
      answer: 'If a targeted user submits a formal counter-notice claiming fair use or authorization, our legal team reviews the counter-notice with you and prepares for formal court action or federal injunction filing to prevent the content from being restored.'
    }
  ];

  const toggleFaq = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-20 bg-slate-50 text-slate-900 border-b border-slate-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center space-y-3 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-200 border border-slate-300 text-slate-800 text-xs font-bold uppercase tracking-wider">
            <HelpCircle className="w-3.5 h-3.5 text-amber-600" />
            <span>Legal Knowledge Base</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif-legal font-bold text-slate-900 tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-base text-slate-600 leading-relaxed font-sans-body">
            Official answers regarding copyright law, trademark defense, client membership, and DMCA takedown procedures.
          </p>
        </div>

        {/* Accordions */}
        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm transition-all"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full text-left p-5 flex items-center justify-between gap-4 hover:bg-slate-50 transition-colors"
                >
                  <span className="font-serif-legal font-bold text-base text-slate-900">
                    {faq.question}
                  </span>
                  <div className={`p-1.5 rounded-full bg-slate-100 text-slate-700 transition-transform ${isOpen ? 'rotate-180 bg-amber-500 text-slate-950' : ''}`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="p-5 pt-0 text-xs text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50/50">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
