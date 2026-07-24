import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ClientUser, CaseItem } from '../types';
import { FileCaseModal } from './FileCaseModal';
import {
  FileText,
  CheckCircle2,
  Clock,
  Zap,
  PlusCircle,
  ExternalLink,
  ShieldCheck,
  Search,
  Filter,
  Info,
  AlertCircle,
  XCircle,
  ChevronRight,
  Eye
} from 'lucide-react';

export const ClientDashboardView: React.FC = () => {
  const { currentUser, cases, caseHistory, markNotificationRead, notifications } = useApp();
  const [fileModalOpen, setFileModalOpen] = useState(false);
  const [selectedCaseForDetail, setSelectedCaseForDetail] = useState<CaseItem | null>(null);

  const [filterPlatform, setFilterPlatform] = useState<string>('ALL');
  const [filterStatus, setFilterStatus] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');

  if (!currentUser || (currentUser as any).role === 'admin') {
    return (
      <div className="py-20 text-center text-slate-400 bg-slate-900 min-h-[70vh]">
        Please log in as an approved client to view your protection dashboard.
      </div>
    );
  }

  const client = currentUser as ClientUser;

  // Filter cases for this logged-in client
  const myCases = cases.filter(c => c.clientId === client.id || c.clientEmail.toLowerCase() === client.email.toLowerCase());

  const filteredCases = myCases.filter(c => {
    const matchesPlatform = filterPlatform === 'ALL' || c.platform === filterPlatform;
    const matchesStatus = filterStatus === 'ALL' || c.status === filterStatus;
    const matchesSearch =
      c.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.infringingUrl.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.platform.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesPlatform && matchesStatus && matchesSearch;
  });

  const clientNotifs = notifications.filter(n => n.userId === client.id);

  return (
    <div className="bg-slate-950 text-white min-h-[90vh] py-10 px-4 sm:px-6 lg:px-8 border-b border-slate-800">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Welcome Header Bar */}
        <div className="bg-slate-900 p-6 sm:p-8 rounded-2xl border border-slate-800 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 shadow-xl">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[10px] font-extrabold uppercase border border-emerald-500/30">
                VERIFIED ACTIVE CLIENT
              </span>
              <span className="text-xs text-amber-400 font-mono">ID: {client.id}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-serif-legal font-bold text-slate-100">
              Welcome, {client.fullName}
            </h1>
            <p className="text-xs text-slate-400">
              Coverage Plan: <strong className="text-amber-300">{client.selectedPackage?.name}</strong> ({client.selectedPackage?.price}) • Status: Active Protection
            </p>
          </div>

          <button
            onClick={() => setFileModalOpen(true)}
            className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-extrabold text-sm shadow-xl flex items-center gap-2 transition-all shrink-0"
          >
            <PlusCircle className="w-5 h-5 fill-slate-950 text-amber-400" />
            <span>File a New Case</span>
          </button>
        </div>

        {/* Notifications Alert Bar if any */}
        {clientNotifs.length > 0 && clientNotifs.some(n => !n.isRead) && (
          <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/40 text-xs text-amber-200 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Info className="w-5 h-5 text-amber-400 shrink-0" />
              <div>
                <strong>Legal Action Alert:</strong> {clientNotifs.find(n => !n.isRead)?.message}
              </div>
            </div>
            <button
              onClick={() => markNotificationRead(clientNotifs.find(n => !n.isRead)!.id)}
              className="text-xs underline text-amber-400 font-bold shrink-0"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* 3 Metric Cards required strictly by prompt */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card 1: Total Submitted Reports */}
          <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-xl space-y-3">
            <div className="flex justify-between items-center text-slate-400 text-xs">
              <span className="font-bold uppercase tracking-wider">Total Submitted Reports</span>
              <div className="p-2 rounded-lg bg-slate-800 text-amber-400">
                <FileText className="w-5 h-5" />
              </div>
            </div>
            <div className="text-4xl font-extrabold text-slate-100 font-mono">
              {client.totalSubmitted || myCases.length}
            </div>
            <p className="text-[11px] text-slate-400">
              Total infringement cases submitted to US Law Enforcement Department intake.
            </p>
          </div>

          {/* Card 2: Total Removed Content */}
          <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-xl space-y-3">
            <div className="flex justify-between items-center text-slate-400 text-xs">
              <span className="font-bold uppercase tracking-wider">Total Removed Content</span>
              <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
                <CheckCircle2 className="w-5 h-5" />
              </div>
            </div>
            <div className="text-4xl font-extrabold text-emerald-400 font-mono">
              {client.totalRemoved || myCases.filter(c => c.status === 'Content Removed').length}
            </div>
            <p className="text-[11px] text-slate-400">
              Successfully taken down content by legal notice execution.
            </p>
          </div>

          {/* Card 3: Remaining Takedowns / Unlimited status */}
          <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-xl space-y-3">
            <div className="flex justify-between items-center text-slate-400 text-xs">
              <span className="font-bold uppercase tracking-wider">Takedowns Quota Status</span>
              <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400">
                <Zap className="w-5 h-5" />
              </div>
            </div>

            {client.selectedPackage?.id === 'yearly' || client.remainingTakedowns === -1 ? (
              <div className="flex items-center gap-2">
                <span className="text-3xl font-extrabold text-amber-400 font-mono">UNLIMITED</span>
                <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 text-[10px] font-bold uppercase">
                  1 Year Unlimited Plan
                </span>
              </div>
            ) : (
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-extrabold text-amber-400 font-mono">
                  {client.remainingTakedowns}
                </span>
                <span className="text-xs text-slate-400">/ 30 Takedowns Remaining</span>
              </div>
            )}

            <p className="text-[11px] text-slate-400">
              {client.selectedPackage?.id === 'yearly'
                ? 'Your annual membership grants unlimited takedowns across all platforms.'
                : 'Monthly plan grants 30 takedowns every billing cycle.'}
            </p>
          </div>

        </div>

        {/* Ongoing Cases Table Section */}
        <div className="bg-slate-900 rounded-2xl border border-slate-800 shadow-xl overflow-hidden space-y-4 p-6">
          
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-slate-800">
            <div>
              <h2 className="font-serif-legal font-bold text-xl text-slate-100">
                Ongoing Cases & Enforcement Status
              </h2>
              <p className="text-xs text-slate-400">
                Real-time legal tracking of all submitted IP infringement takedowns
              </p>
            </div>

            {/* Controls */}
            <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
              {/* Search */}
              <div className="relative flex-1 sm:w-48">
                <Search className="w-3.5 h-3.5 text-slate-500 absolute left-2.5 top-2.5" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder="Search Case ID or URL..."
                  className="w-full pl-8 pr-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-amber-500"
                />
              </div>

              {/* Status Filter */}
              <select
                value={filterStatus}
                onChange={e => setFilterStatus(e.target.value)}
                className="px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-amber-500"
              >
                <option value="ALL">All Statuses</option>
                <option value="Submitted">Submitted</option>
                <option value="In Review">In Review</option>
                <option value="Content Removed">Content Removed</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>
          </div>

          {/* Table */}
          {filteredCases.length === 0 ? (
            <div className="text-center py-12 text-slate-400 text-xs space-y-3">
              <FileText className="w-10 h-10 text-slate-600 mx-auto" />
              <div>No cases match your filter or search criteria.</div>
              <button
                onClick={() => setFileModalOpen(true)}
                className="px-4 py-2 rounded-lg bg-amber-500 text-slate-950 font-bold text-xs"
              >
                File Your First Case
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-slate-950 text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-800">
                  <tr>
                    <th className="p-3.5">Case ID</th>
                    <th className="p-3.5">Platform</th>
                    <th className="p-3.5">Infringing URL</th>
                    <th className="p-3.5">Original URL</th>
                    <th className="p-3.5">Submission Date</th>
                    <th className="p-3.5">Current Status</th>
                    <th className="p-3.5 text-right">Details</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 font-mono text-[11px]">
                  {filteredCases.map(cs => {
                    return (
                      <tr key={cs.id} className="hover:bg-slate-850/50 transition-colors">
                        <td className="p-3.5 font-bold text-amber-300">{cs.id}</td>
                        <td className="p-3.5">
                          <span className="px-2 py-0.5 rounded bg-slate-800 border border-slate-700 text-slate-200 font-semibold font-sans">
                            {cs.platform}
                          </span>
                        </td>
                        <td className="p-3.5 max-w-[200px] truncate">
                          <a
                            href={cs.infringingUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="text-red-400 hover:underline flex items-center gap-1 font-sans"
                          >
                            <span className="truncate">{cs.infringingUrl}</span>
                            <ExternalLink className="w-3 h-3 shrink-0" />
                          </a>
                        </td>
                        <td className="p-3.5 max-w-[180px] truncate">
                          <a
                            href={cs.originalUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="text-emerald-400 hover:underline flex items-center gap-1 font-sans"
                          >
                            <span className="truncate">{cs.originalUrl}</span>
                            <ExternalLink className="w-3 h-3 shrink-0" />
                          </a>
                        </td>
                        <td className="p-3.5 text-slate-400 font-sans">{cs.submittedAt}</td>
                        <td className="p-3.5">
                          <span
                            className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase font-sans inline-flex items-center gap-1 ${
                              cs.status === 'Content Removed'
                                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                                : cs.status === 'In Review'
                                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                                : cs.status === 'Rejected'
                                ? 'bg-red-500/20 text-red-300 border border-red-500/40'
                                : 'bg-blue-500/20 text-blue-300 border border-blue-500/40'
                            }`}
                          >
                            {cs.status}
                          </span>
                        </td>
                        <td className="p-3.5 text-right font-sans">
                          <button
                            onClick={() => setSelectedCaseForDetail(cs)}
                            className="p-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-200"
                            title="View Audit Log"
                          >
                            <Eye className="w-4 h-4 text-amber-400" />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}

        </div>

      </div>

      {/* File Case Modal */}
      <FileCaseModal isOpen={fileModalOpen} onClose={() => setFileModalOpen(false)} />

      {/* Case Details Drawer / Modal */}
      {selectedCaseForDetail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-xl w-full p-6 text-white shadow-2xl space-y-4">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <div>
                <span className="text-[10px] text-amber-400 font-bold uppercase font-mono">Case ID:</span>
                <h3 className="font-serif-legal font-bold text-xl text-slate-100">{selectedCaseForDetail.id}</h3>
              </div>
              <button
                onClick={() => setSelectedCaseForDetail(null)}
                className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300"
              >
                Close
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-2 bg-slate-950 p-3 rounded-lg border border-slate-800 font-sans">
                <div>
                  <span className="text-[10px] text-slate-500 uppercase block font-bold">Platform</span>
                  <span className="font-bold text-slate-200">{selectedCaseForDetail.platform}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 uppercase block font-bold">Current Status</span>
                  <span className="font-bold text-amber-400">{selectedCaseForDetail.status}</span>
                </div>
              </div>

              <div>
                <strong className="text-slate-300 block mb-0.5">Infringing URL:</strong>
                <a href={selectedCaseForDetail.infringingUrl} target="_blank" rel="noreferrer" className="text-red-400 hover:underline break-all font-mono text-[11px]">
                  {selectedCaseForDetail.infringingUrl}
                </a>
              </div>

              <div>
                <strong className="text-slate-300 block mb-0.5">Original Work URL:</strong>
                <a href={selectedCaseForDetail.originalUrl} target="_blank" rel="noreferrer" className="text-emerald-400 hover:underline break-all font-mono text-[11px]">
                  {selectedCaseForDetail.originalUrl}
                </a>
              </div>

              <div>
                <strong className="text-slate-300 block mb-0.5">Violation Claim Basis:</strong>
                <p className="p-3 rounded bg-slate-950 text-slate-300 leading-relaxed font-sans">
                  {selectedCaseForDetail.violationReason}
                </p>
              </div>

              {selectedCaseForDetail.adminNotes && (
                <div>
                  <strong className="text-amber-400 block mb-0.5">Admin Enforcement Notes:</strong>
                  <p className="p-3 rounded bg-amber-500/10 border border-amber-500/30 text-amber-200 font-sans">
                    {selectedCaseForDetail.adminNotes}
                  </p>
                </div>
              )}

              {/* Status History Timeline */}
              <div className="pt-2 border-t border-slate-800">
                <strong className="text-slate-300 block mb-2 font-serif-legal">Status Audit History Log:</strong>
                <div className="space-y-2">
                  {caseHistory
                    .filter(h => h.caseId === selectedCaseForDetail.id)
                    .map(h => (
                      <div key={h.id} className="p-2.5 rounded bg-slate-950 border border-slate-800 text-[11px] font-sans flex justify-between items-center">
                        <div>
                          <span className="font-bold text-slate-200">{h.newStatus}</span>
                          <span className="text-slate-400 block">{h.notes}</span>
                        </div>
                        <span className="text-[10px] text-slate-500 font-mono">{h.timestamp}</span>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
