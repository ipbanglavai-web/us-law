import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2, ShieldCheck, Clock } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'Copyright Infringement Inquiry',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="contact" className="py-20 bg-white text-slate-900 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-100 border border-slate-300 text-slate-800 text-xs font-bold uppercase tracking-wider">
            <Mail className="w-3.5 h-3.5 text-amber-600" />
            <span>Legal Intake Desk</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif-legal font-bold text-slate-900 tracking-tight">
            Contact US Law Enforcement Department
          </h2>
          <p className="text-base text-slate-600 leading-relaxed font-sans-body">
            Have urgent questions regarding digital asset protection, membership packages, or pending approval? Reach out directly to our legal enforcement team.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Contact Details */}
          <div className="space-y-6">
            <div className="bg-slate-900 text-white p-8 rounded-2xl border border-slate-800 space-y-6 shadow-xl">
              <h3 className="font-serif-legal font-bold text-xl text-slate-100 border-b border-slate-800 pb-4">
                Official Legal Desk
              </h3>

              <div className="space-y-4 text-xs">
                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-200 block">Designated DMCA Agent Email:</strong>
                    <a href="mailto:takedown@law-enforcement.us" className="text-amber-300 hover:underline font-semibold text-sm">
                      takedown@law-enforcement.us
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-200 block">Emergency Legal Hotline:</strong>
                    <span className="text-slate-300 font-mono">+1 (800) 555-USLAW</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-200 block">Corporate Headquarters:</strong>
                    <span className="text-slate-400 leading-relaxed">
                      US Law Enforcement Department<br />
                      Digital Rights Protection Division<br />
                      Washington, D.C. 20001, United States
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-200 block">Legal Desk Hours:</strong>
                    <span className="text-slate-400">24/7 Digital Intake & Response Desk</span>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-amber-500/30 text-xs text-amber-300 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 shrink-0 text-amber-400" />
                <span>Encrypted legal communications channel</span>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-2">
            {submitted ? (
              <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-8 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="font-serif-legal font-bold text-2xl text-slate-900">
                  Legal Inquiry Transmitted
                </h3>
                <p className="text-xs text-slate-600 max-w-md mx-auto">
                  Thank you for contacting US Law Enforcement Department. Our legal intake officer will review your inquiry and respond to <strong className="text-slate-800">{formData.email}</strong> within 2 hours.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-6 py-2.5 rounded-lg bg-slate-900 text-white font-bold text-xs hover:bg-slate-800"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-slate-50 p-8 rounded-2xl border border-slate-200 shadow-sm space-y-5">
                <h3 className="font-serif-legal font-bold text-xl text-slate-900 mb-2">
                  Transmit Legal Inquiry
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Full Legal Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Eleanor Vance"
                      className="w-full px-4 py-2.5 rounded-lg bg-white border border-slate-300 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. eleanor@brand.com"
                      className="w-full px-4 py-2.5 rounded-lg bg-white border border-slate-300 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={e => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+1 (555) 000-0000"
                      className="w-full px-4 py-2.5 rounded-lg bg-white border border-slate-300 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Inquiry Type
                    </label>
                    <select
                      value={formData.subject}
                      onChange={e => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-lg bg-white border border-slate-300 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
                    >
                      <option>Copyright Infringement Inquiry</option>
                      <option>Membership & Approval Status</option>
                      <option>Trademark & Brand Counterfeit</option>
                      <option>Urgent DMCA Escalation</option>
                      <option>Other Legal Matter</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Message / Case Information *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={e => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Provide details regarding your digital assets or inquiry..."
                    className="w-full px-4 py-2.5 rounded-lg bg-white border border-slate-300 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm shadow-md flex items-center justify-center gap-2 transition-all"
                >
                  <Send className="w-4 h-4" />
                  <span>Transmit Inquiry to Legal Desk</span>
                </button>
              </form>
            )}
          </div>

        </div>

      </div>
    </section>
  );
};
