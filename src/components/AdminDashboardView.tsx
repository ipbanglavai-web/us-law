import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { CaseItem, CaseStatus, ClientUser, PlatformType } from '../types';
import {
  ShieldAlert,
  Users,
  FileCheck,
  CheckCircle2,
  XCircle,
  Search,
  Filter,
  Eye,
  Edit3,
  Database,
  Lock,
  Clock,
  RefreshCw,
  ExternalLink,
  ShieldCheck,
  Zap,
  Phone,
  Mail,
  UserCheck,
  UserX,
  FileText,
  AlertCircle,
  X,
  Globe
} from 'lucide-react';

export const AdminDashboardView: React.FC = () => {
  const {
    currentUser,
    currentRole,
    clients,
    cases,
    caseHistory,
    loginHistory,
    inquiries,
    approveClient,
    rejectClient,
    updateCaseStatus,
    markInquiryRead,
    deleteInquiry,
    resetDemoData
  } = useApp();

  const [activeTab, setActiveTab] = useState<'pending' | 'cases' | 'clients' | 'database' | 'logins' | 'inquiries'>('pending');

  // Case management filters
  const [caseSearch, setCaseSearch] = useState('');
  const [casePlatformFilter, setCasePlatformFilter] = useState('ALL');
  const [caseStatusFilter, setCaseStatusFilter] = useState('ALL');
  const [caseSortBy, setCaseSortBy] = useState<'date' | 'platform'>('date');

  // Modal states for cases
  const [editingCase, setEditingCase] = useState<CaseItem | null>(null);
  const [viewingCaseDetail, setViewingCaseDetail] = useState<CaseItem | null>(null);

  const [newStatusChoice, setNewStatusChoice] = useState<CaseStatus>('In Review');
  const [adminNotesInput, setAdminNotesInput] = useState('');

  if (!currentUser || currentRole !== 'admin') {
    return (
      <div className="py-20 text-center text-slate-400 bg-slate-900 min-h-[70vh]">
        Access Denied. Please log in using official Admin Credentials.
      </div>
    );
  }

  const pendingClients = clients.filter(c => c.status === 'pending');
  const approvedClients = clients.filter(c => c.status === 'approved');

  // Filter cases for Admin
  const filteredCases = cases.filter(c => {
    const matchSearch =
      c.id.toLowerCase().includes(caseSearch.toLowerCase()) ||
      c.clientName.toLowerCase().includes(caseSearch.toLowerCase()) ||
      c.clientEmail.toLowerCase().includes(caseSearch.toLowerCase()) ||
      c.infringingUrl.toLowerCase().includes(caseSearch.toLowerCase());

    const matchPlatform = casePlatformFilter === 'ALL' || c.platform === casePlatformFilter;
    const matchStatus = caseStatusFilter === 'ALL' || c.status === caseStatusFilter;

    return matchSearch && matchPlatform && matchStatus;
  }).sort((a, b) => {
    if (caseSortBy === 'date') {
      return new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime();
    }
    return a.platform.localeCompare(b.platform);
  });

  const handleOpenEditCase = (cs: CaseItem) => {
    setEditingCase(cs);
    setNewStatusChoice(cs.status);
    setAdminNotesInput(cs.adminNotes || '');
  };

  const handleSaveCaseStatus = () => {
    if (editingCase) {
      updateCaseStatus(editingCase.id, newStatusChoice, adminNotesInput);
      setEditingCase(null);
    }
  };

  return (
    <div className="bg-slate-950 text-white min-h-[90vh] py-10 px-4 sm:px-6 lg:px-8 border-b border-slate-800">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Admin Header Bar */}
        <div className="bg-slate-900 p-6 sm:p-8 rounded-2xl border border-amber-500/30 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 shadow-2xl">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded bg-amber-500/20 text-amber-300 text-[10px] font-extrabold uppercase border border-amber-500/40">
                SUPER ADMIN SECURITY CONSOLE
              </span>
              <span className="text-xs text-slate-400 font-mono">28 U.S.C. § 1746 Authorized</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-serif-legal font-bold text-slate-100 flex items-center gap-2">
              <ShieldAlert className="w-7 h-7 text-amber-400" />
              <span>US Law Enforcement Department Admin Portal</span>
            </h1>
            <p className="text-xs text-slate-400">
              Authenticated Admin User: <strong className="text-amber-300">{currentUser.email || 'admin@law-enforcement.us'}</strong>
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={resetDemoData}
              className="px-3.5 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs border border-slate-700 flex items-center gap-1.5"
              title="Reset sample data"
            >
              <RefreshCw className="w-3.5 h-3.5 text-amber-400" />
              <span>Reset State</span>
            </button>
          </div>
        </div>

        {/* Quick System Metrics Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-slate-900 p-5 rounded-xl border border-slate-800 space-y-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
              Pending Signup Requests
            </span>
            <div className="text-3xl font-extrabold text-amber-400 font-mono">
              {pendingClients.length}
            </div>
            <span className="text-[10px] text-slate-500">Requires Admin Approval</span>
          </div>

          <div className="bg-slate-900 p-5 rounded-xl border border-slate-800 space-y-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
              Active Approved Clients
            </span>
            <div className="text-3xl font-extrabold text-emerald-400 font-mono">
              {approvedClients.length}
            </div>
            <span className="text-[10px] text-slate-500">Authorized Client Portal Users</span>
          </div>

          <div className="bg-slate-900 p-5 rounded-xl border border-slate-800 space-y-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
              Total Filed Cases
            </span>
            <div className="text-3xl font-extrabold text-blue-400 font-mono">
              {cases.length}
            </div>
            <span className="text-[10px] text-slate-500">IP Takedown Reports</span>
          </div>

          <div className="bg-slate-900 p-5 rounded-xl border border-slate-800 space-y-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
              Content Removed
            </span>
            <div className="text-3xl font-extrabold text-emerald-300 font-mono">
              {cases.filter(c => c.status === 'Content Removed').length}
            </div>
            <span className="text-[10px] text-slate-500">Executed DMCA Takedowns</span>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-slate-800 overflow-x-auto text-xs font-semibold gap-2">
          <button
            onClick={() => setActiveTab('pending')}
            className={`pb-3 px-4 border-b-2 transition-colors flex items-center gap-2 shrink-0 ${
              activeTab === 'pending'
                ? 'border-amber-400 text-amber-400 font-bold'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Clock className="w-4 h-4" />
            <span>Pending Signups ({pendingClients.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('cases')}
            className={`pb-3 px-4 border-b-2 transition-colors flex items-center gap-2 shrink-0 ${
              activeTab === 'cases'
                ? 'border-amber-400 text-amber-400 font-bold'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <FileCheck className="w-4 h-4" />
            <span>All Cases ({cases.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('clients')}
            className={`pb-3 px-4 border-b-2 transition-colors flex items-center gap-2 shrink-0 ${
              activeTab === 'clients'
                ? 'border-amber-400 text-amber-400 font-bold'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Client Accounts ({clients.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('database')}
            className={`pb-3 px-4 border-b-2 transition-colors flex items-center gap-2 shrink-0 ${
              activeTab === 'database'
                ? 'border-amber-400 text-amber-400 font-bold'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Database className="w-4 h-4" />
            <span>Normalized Database Tables</span>
          </button>

          <button
            onClick={() => setActiveTab('logins')}
            className={`pb-3 px-4 border-b-2 transition-colors flex items-center gap-2 shrink-0 ${
              activeTab === 'logins'
                ? 'border-amber-400 text-amber-400 font-bold'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Lock className="w-4 h-4" />
            <span>Security Login History</span>
          </button>

          <button
            onClick={() => setActiveTab('inquiries')}
            className={`pb-3 px-4 border-b-2 transition-colors flex items-center gap-2 shrink-0 ${
              activeTab === 'inquiries'
                ? 'border-amber-400 text-amber-400 font-bold'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Mail className="w-4 h-4" />
            <span>Legal Inquiries ({inquiries.filter(i => !i.isRead).length})</span>
          </button>
        </div>

        {/* TAB 1: Pending Signup Requests strictly required by prompt */}
        {activeTab === 'pending' && (
          <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6 space-y-4 shadow-xl">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <div>
                <h2 className="font-serif-legal font-bold text-lg text-slate-100">
                  Pending Signup Requests Queue
                </h2>
                <p className="text-xs text-slate-400">
                  Review applicant details and select Approve or Reject. Only approved users can log in!
                </p>
              </div>
              <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold border border-amber-500/30">
                {pendingClients.length} Pending Approval
              </span>
            </div>

            {pendingClients.length === 0 ? (
              <div className="text-center py-12 text-slate-400 text-xs space-y-2">
                <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
                <div className="font-bold text-slate-200">No pending client signup requests.</div>
                <p className="text-slate-500">All registered clients have been reviewed.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-300">
                  <thead className="bg-slate-950 text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-800">
                    <tr>
                      <th className="p-3.5">Client Information</th>
                      <th className="p-3.5">Email & Phone</th>
                      <th className="p-3.5">Selected Package</th>
                      <th className="p-3.5">Signup Date</th>
                      <th className="p-3.5">Status</th>
                      <th className="p-3.5 text-right">Admin Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 font-sans">
                    {pendingClients.map(client => (
                      <tr key={client.id} className="hover:bg-slate-850/50">
                        <td className="p-3.5">
                          <strong className="text-slate-100 block text-sm">{client.fullName}</strong>
                          <span className="text-[10px] text-slate-500 font-mono">ID: {client.id}</span>
                        </td>
                        <td className="p-3.5 space-y-0.5 font-mono text-[11px]">
                          <div className="flex items-center gap-1.5 text-slate-200">
                            <Mail className="w-3.5 h-3.5 text-amber-400" />
                            <span>{client.email}</span>
                          </div>
                          <div className="flex items-center gap-1.5 text-slate-400">
                            <Phone className="w-3.5 h-3.5 text-slate-500" />
                            <span>{client.phone}</span>
                          </div>
                        </td>
                        <td className="p-3.5">
                          <span className="px-2.5 py-1 rounded bg-amber-500/10 border border-amber-500/30 text-amber-300 font-bold font-mono">
                            {client.selectedPackage?.name} ({client.selectedPackage?.price})
                          </span>
                        </td>
                        <td className="p-3.5 font-mono text-[11px] text-slate-400">
                          {client.signupDate}
                        </td>
                        <td className="p-3.5">
                          <span className="px-2.5 py-1 rounded-full bg-amber-500/20 text-amber-300 text-[10px] font-extrabold uppercase border border-amber-500/40">
                            Pending Approval
                          </span>
                        </td>
                        <td className="p-3.5 text-right space-x-2">
                          <button
                            onClick={() => approveClient(client.id)}
                            className="px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs inline-flex items-center gap-1 shadow"
                          >
                            <UserCheck className="w-3.5 h-3.5" />
                            <span>Approve</span>
                          </button>

                          <button
                            onClick={() => rejectClient(client.id)}
                            className="px-3 py-1.5 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-red-300 border border-red-500/40 font-semibold text-xs inline-flex items-center gap-1"
                          >
                            <UserX className="w-3.5 h-3.5" />
                            <span>Reject</span>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: Admin Case Management */}
        {activeTab === 'cases' && (
          <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6 space-y-4 shadow-xl">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-800 pb-4">
              <div>
                <h2 className="font-serif-legal font-bold text-lg text-slate-100">
                  Admin Master Case Management
                </h2>
                <p className="text-xs text-slate-400">
                  Search, filter, and update status for all client takedown reports
                </p>
              </div>

              {/* Controls */}
              <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
                <div className="relative flex-1 sm:w-48">
                  <Search className="w-3.5 h-3.5 text-slate-500 absolute left-2.5 top-2.5" />
                  <input
                    type="text"
                    value={caseSearch}
                    onChange={e => setCaseSearch(e.target.value)}
                    placeholder="Search Client, ID, or URL..."
                    className="w-full pl-8 pr-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-amber-500"
                  />
                </div>

                <select
                  value={casePlatformFilter}
                  onChange={e => setCasePlatformFilter(e.target.value)}
                  className="px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-200 focus:outline-none"
                >
                  <option value="ALL">All Platforms</option>
                  <option value="YouTube">YouTube</option>
                  <option value="Instagram">Instagram</option>
                  <option value="TikTok">TikTok</option>
                  <option value="Facebook">Facebook</option>
                  <option value="X (Twitter)">X (Twitter)</option>
                  <option value="Telegram">Telegram</option>
                  <option value="Website">Website</option>
                </select>

                <select
                  value={caseStatusFilter}
                  onChange={e => setCaseStatusFilter(e.target.value)}
                  className="px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-200 focus:outline-none"
                >
                  <option value="ALL">All Statuses</option>
                  <option value="Submitted">Submitted</option>
                  <option value="In Review">In Review</option>
                  <option value="Content Removed">Content Removed</option>
                  <option value="Rejected">Rejected</option>
                </select>

                <select
                  value={caseSortBy}
                  onChange={e => setCaseSortBy(e.target.value as any)}
                  className="px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-200 focus:outline-none"
                >
                  <option value="date">Sort by Date</option>
                  <option value="platform">Sort by Platform</option>
                </select>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-slate-950 text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-800">
                  <tr>
                    <th className="p-3.5">Case ID</th>
                    <th className="p-3.5">Client Contact</th>
                    <th className="p-3.5">Platform</th>
                    <th className="p-3.5">Infringing & Original URLs</th>
                    <th className="p-3.5">Violation Claim Basis</th>
                    <th className="p-3.5">Status</th>
                    <th className="p-3.5 text-right">Admin Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 font-sans">
                  {filteredCases.map(cs => (
                    <tr key={cs.id} className="hover:bg-slate-850/50">
                      <td className="p-3.5 font-mono font-bold">
                        <button
                          onClick={() => setViewingCaseDetail(cs)}
                          className="text-amber-300 hover:text-amber-200 hover:underline flex items-center gap-1 text-left"
                          title="Click to view complete case dossier"
                        >
                          <span>{cs.id}</span>
                          <Eye className="w-3 h-3 text-amber-400/80" />
                        </button>
                        <span className="text-[10px] text-slate-500 font-mono block mt-0.5">{cs.submittedAt}</span>
                      </td>
                      <td className="p-3.5 space-y-0.5">
                        <strong className="text-slate-100 block">{cs.clientName}</strong>
                        <div className="flex items-center gap-1 text-[10px] text-slate-400 font-mono">
                          <Mail className="w-3 h-3 text-slate-500 shrink-0" />
                          <span className="truncate max-w-[130px]">{cs.clientEmail}</span>
                        </div>
                        {cs.clientPhone && (
                          <div className="flex items-center gap-1 text-[10px] text-slate-400 font-mono">
                            <Phone className="w-3 h-3 text-slate-500 shrink-0" />
                            <span>{cs.clientPhone}</span>
                          </div>
                        )}
                      </td>
                      <td className="p-3.5 font-bold text-slate-200">{cs.platform}</td>
                      <td className="p-3.5 space-y-1 max-w-[210px]">
                        <div>
                          <span className="text-[9px] font-bold uppercase text-red-400 block tracking-wider">Infringing:</span>
                          <a href={cs.infringingUrl} target="_blank" rel="noreferrer" className="text-red-300 hover:underline font-mono text-[10px] flex items-center gap-1 truncate" title={cs.infringingUrl}>
                            <span className="truncate">{cs.infringingUrl}</span>
                            <ExternalLink className="w-2.5 h-2.5 shrink-0" />
                          </a>
                        </div>
                        <div>
                          <span className="text-[9px] font-bold uppercase text-emerald-400 block tracking-wider">Original Work:</span>
                          <a href={cs.originalUrl} target="_blank" rel="noreferrer" className="text-emerald-300 hover:underline font-mono text-[10px] flex items-center gap-1 truncate" title={cs.originalUrl}>
                            <span className="truncate">{cs.originalUrl}</span>
                            <ExternalLink className="w-2.5 h-2.5 shrink-0" />
                          </a>
                        </div>
                      </td>
                      <td className="p-3.5 max-w-[180px]">
                        <div className="p-2 rounded bg-slate-950 border border-slate-800/80 text-[11px] text-slate-300 line-clamp-2" title={cs.violationReason}>
                          {cs.violationReason}
                        </div>
                      </td>
                      <td className="p-3.5">
                        <span
                          className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase ${
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
                      <td className="p-3.5 text-right whitespace-nowrap space-x-1.5">
                        <button
                          onClick={() => setViewingCaseDetail(cs)}
                          className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs inline-flex items-center gap-1 border border-slate-700 shadow-xs"
                          title="View Full Case Dossier"
                        >
                          <Eye className="w-3.5 h-3.5 text-amber-400" />
                          <span>Full Info</span>
                        </button>
                        <button
                          onClick={() => handleOpenEditCase(cs)}
                          className="px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs inline-flex items-center gap-1 shadow"
                          title="Update Status"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                          <span>Update</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: Client Accounts Directory */}
        {activeTab === 'clients' && (
          <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6 space-y-4 shadow-xl">
            <h2 className="font-serif-legal font-bold text-lg text-slate-100 border-b border-slate-800 pb-3">
              Registered Client Directory
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-slate-950 text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-800">
                  <tr>
                    <th className="p-3.5">Client Name</th>
                    <th className="p-3.5">Contact</th>
                    <th className="p-3.5">Selected Package</th>
                    <th className="p-3.5">Account Status</th>
                    <th className="p-3.5">Cases Filed</th>
                    <th className="p-3.5">Content Removed</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 font-sans">
                  {clients.map(c => (
                    <tr key={c.id} className="hover:bg-slate-850/50">
                      <td className="p-3.5">
                        <strong className="text-slate-100 block">{c.fullName}</strong>
                        <span className="text-[10px] text-slate-500 font-mono">ID: {c.id}</span>
                      </td>
                      <td className="p-3.5 font-mono text-[11px]">
                        <div>{c.email}</div>
                        <div className="text-slate-500">{c.phone}</div>
                      </td>
                      <td className="p-3.5 font-mono text-[11px] text-amber-300 font-bold">
                        {c.selectedPackage?.name} ({c.selectedPackage?.price})
                      </td>
                      <td className="p-3.5">
                        <span
                          className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${
                            c.status === 'approved'
                              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                              : c.status === 'pending'
                              ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                              : 'bg-red-500/20 text-red-300 border border-red-500/40'
                          }`}
                        >
                          {c.status}
                        </span>
                      </td>
                      <td className="p-3.5 font-mono font-bold text-slate-200">{c.totalSubmitted}</td>
                      <td className="p-3.5 font-mono font-bold text-emerald-400">{c.totalRemoved}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 4: Normalized Database Tables Inspection strictly required by prompt */}
        {activeTab === 'database' && (
          <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6 space-y-6 shadow-xl">
            <div className="border-b border-slate-800 pb-3">
              <h2 className="font-serif-legal font-bold text-lg text-slate-100 flex items-center gap-2">
                <Database className="w-5 h-5 text-amber-400" />
                <span>Normalized Database Tables Inspector</span>
              </h2>
              <p className="text-xs text-slate-400">
                Firestore Schema normalized representation matching backend relational structures
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                <span className="text-[10px] font-bold text-amber-400 uppercase font-mono">Table: Admins</span>
                <div className="text-xl font-bold font-mono">1 Record</div>
                <span className="text-[10px] text-slate-500">Super Admin User</span>
              </div>
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                <span className="text-[10px] font-bold text-amber-400 uppercase font-mono">Table: Clients</span>
                <div className="text-xl font-bold font-mono">{clients.length} Records</div>
                <span className="text-[10px] text-slate-500">Normalized User Entities</span>
              </div>
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                <span className="text-[10px] font-bold text-amber-400 uppercase font-mono">Table: Packages</span>
                <div className="text-xl font-bold font-mono">2 Plans</div>
                <span className="text-[10px] text-slate-500">Monthly ($200) & Yearly ($1000)</span>
              </div>
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                <span className="text-[10px] font-bold text-amber-400 uppercase font-mono">Table: Cases</span>
                <div className="text-xl font-bold font-mono">{cases.length} Records</div>
                <span className="text-[10px] text-slate-500">Takedown Reports</span>
              </div>
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                <span className="text-[10px] font-bold text-amber-400 uppercase font-mono">Table: CaseStatusHistory</span>
                <div className="text-xl font-bold font-mono">{caseHistory.length} Audit Entries</div>
                <span className="text-[10px] text-slate-500">Status Change Timeline</span>
              </div>
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                <span className="text-[10px] font-bold text-amber-400 uppercase font-mono">Table: LoginHistory</span>
                <div className="text-xl font-bold font-mono">{loginHistory.length} Security Logs</div>
                <span className="text-[10px] text-slate-500">Auth Sessions Log</span>
              </div>
            </div>

            {/* Schema Code view */}
            <div className="space-y-2">
              <strong className="text-xs text-slate-300 font-serif-legal block">Normalized Schema Entity Blueprint (JSON):</strong>
              <pre className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-[11px] font-mono text-amber-300/90 overflow-x-auto">
{JSON.stringify(
  {
    tables: [
      "Admins (id, email, passwordHash, role, createdAt)",
      "Clients (id, fullName, email, phone, status, packageId, signupDate)",
      "Packages (id, name, price, maxTakedowns, duration, coverage)",
      "ClientSubscriptions (id, clientId, packageId, startDate, remainingTakedowns)",
      "Cases (id, clientId, platform, infringingUrl, originalUrl, status, violationReason)",
      "CaseStatusHistory (id, caseId, oldStatus, newStatus, updatedBy, notes, timestamp)",
      "LoginHistory (id, userId, userEmail, role, ipAddress, timestamp)",
      "Notifications (id, userId, title, message, isRead, createdAt)"
    ]
  },
  null,
  2
)}
              </pre>
            </div>
          </div>
        )}

        {/* TAB 5: Security Login History */}
        {activeTab === 'logins' && (
          <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6 space-y-4 shadow-xl">
            <h2 className="font-serif-legal font-bold text-lg text-slate-100 border-b border-slate-800 pb-3">
              Authentication & Security Audit Logs
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-slate-950 text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-800">
                  <tr>
                    <th className="p-3.5">Log ID</th>
                    <th className="p-3.5">User Email</th>
                    <th className="p-3.5">Role</th>
                    <th className="p-3.5">IP Address</th>
                    <th className="p-3.5">Timestamp</th>
                    <th className="p-3.5">User Agent</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 font-mono text-[11px]">
                  {loginHistory.map(log => (
                    <tr key={log.id} className="hover:bg-slate-850/50">
                      <td className="p-3.5 text-amber-400">{log.id}</td>
                      <td className="p-3.5 text-slate-100 font-bold">{log.userEmail}</td>
                      <td className="p-3.5 uppercase">{log.role}</td>
                      <td className="p-3.5 text-slate-400">{log.ipAddress}</td>
                      <td className="p-3.5 text-slate-400">{log.timestamp}</td>
                      <td className="p-3.5 text-slate-500 font-sans text-[10px]">{log.userAgent}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 6: Legal Inquiries */}
        {activeTab === 'inquiries' && (
          <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6 space-y-4 shadow-xl">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <div>
                <h2 className="font-serif-legal font-bold text-lg text-slate-100">
                  Client & Visitor Legal Inquiries ({inquiries.length})
                </h2>
                <p className="text-xs text-slate-400">
                  Inquiries transmitted via the Contact Legal Intake Desk form.
                </p>
              </div>
              <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold border border-amber-500/30">
                {inquiries.filter(i => !i.isRead).length} Unread
              </span>
            </div>

            {inquiries.length === 0 ? (
              <div className="text-center py-12 text-slate-500 space-y-2">
                <Mail className="w-10 h-10 mx-auto text-slate-600" />
                <p className="text-sm">No legal inquiries received yet.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {inquiries.map(inq => (
                  <div
                    key={inq.id}
                    className={`p-5 rounded-xl border transition-all space-y-3 ${
                      !inq.isRead
                        ? 'bg-slate-950 border-amber-500/50 shadow-lg ring-1 ring-amber-500/20'
                        : 'bg-slate-950/60 border-slate-800'
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-slate-800 pb-3">
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-amber-400 font-mono">{inq.id}</span>
                          {!inq.isRead && (
                            <span className="px-2 py-0.5 rounded-full bg-amber-500 text-slate-950 font-bold text-[10px] uppercase">
                              New
                            </span>
                          )}
                          <span className="text-xs font-bold text-slate-200">{inq.subject}</span>
                        </div>
                        <p className="text-xs text-slate-400">
                          From: <strong className="text-slate-200">{inq.name}</strong> ({inq.email} {inq.phone ? `• ${inq.phone}` : ''})
                        </p>
                      </div>
                      <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
                        <span>{inq.submittedAt}</span>
                        {!inq.isRead && (
                          <button
                            onClick={() => markInquiryRead(inq.id)}
                            className="px-3 py-1 rounded bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 font-bold text-xs border border-amber-500/40"
                          >
                            Mark Read
                          </button>
                        )}
                        <button
                          onClick={() => deleteInquiry(inq.id)}
                          className="px-2.5 py-1 rounded bg-red-950/40 hover:bg-red-900/50 text-red-400 font-bold text-xs border border-red-900/50"
                          title="Delete inquiry"
                        >
                          Delete
                        </button>
                      </div>
                    </div>

                    <div className="p-3.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-200 text-xs leading-relaxed font-sans">
                      {inq.message}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

      </div>

      {/* Modal for Admin Updating Case Status */}
      {editingCase && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-2xl w-full p-6 sm:p-8 text-white shadow-2xl space-y-5 relative my-8">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <div>
                <span className="text-[10px] font-bold text-amber-400 uppercase tracking-widest font-mono">Updating Case Status:</span>
                <h3 className="font-serif-legal font-bold text-xl sm:text-2xl text-slate-100">{editingCase.id}</h3>
              </div>
              <button
                onClick={() => setEditingCase(null)}
                className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              {/* Comprehensive Client & Submission Summary */}
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                <div className="flex justify-between items-center border-b border-slate-800/80 pb-2">
                  <span className="text-[10px] font-bold text-amber-400 uppercase font-mono">
                    Client & Submission Details
                  </span>
                  <span className="text-[11px] font-bold text-slate-300">
                    Platform: <span className="text-amber-300">{editingCase.platform}</span>
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-slate-300">
                  <div>
                    <span className="text-slate-500 block text-[10px] font-bold uppercase">Client Name</span>
                    <strong className="text-slate-100">{editingCase.clientName}</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[10px] font-bold uppercase">Email</span>
                    <span className="font-mono text-slate-200">{editingCase.clientEmail}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[10px] font-bold uppercase">Phone</span>
                    <span className="font-mono text-slate-200">{editingCase.clientPhone || 'N/A'}</span>
                  </div>
                </div>

                {/* Infringing & Original URLs */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                  <div className="p-2.5 rounded bg-red-950/20 border border-red-900/40 space-y-0.5">
                    <span className="text-[10px] font-bold text-red-400 uppercase block">Infringing URL:</span>
                    <a href={editingCase.infringingUrl} target="_blank" rel="noreferrer" className="text-red-300 hover:underline font-mono text-[11px] break-all block">
                      {editingCase.infringingUrl}
                    </a>
                  </div>
                  <div className="p-2.5 rounded bg-emerald-950/20 border border-emerald-900/40 space-y-0.5">
                    <span className="text-[10px] font-bold text-emerald-400 uppercase block">Original Work URL:</span>
                    <a href={editingCase.originalUrl} target="_blank" rel="noreferrer" className="text-emerald-300 hover:underline font-mono text-[11px] break-all block">
                      {editingCase.originalUrl}
                    </a>
                  </div>
                </div>

                {/* Violation Claim Reason */}
                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-amber-400 uppercase block">Client IP Violation Statement:</span>
                  <p className="p-2.5 rounded bg-slate-900 text-slate-200 border border-slate-800 leading-relaxed text-[11px]">
                    {editingCase.violationReason}
                  </p>
                </div>

                {/* Additional Description */}
                {editingCase.additionalDescription && (
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-slate-400 uppercase block">Additional Description / Evidence:</span>
                    <p className="p-2.5 rounded bg-slate-900 text-slate-300 border border-slate-800 leading-relaxed text-[11px]">
                      {editingCase.additionalDescription}
                    </p>
                  </div>
                )}
              </div>

              {/* Status Selector */}
              <div>
                <label className="block font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                  Select New Case Status *
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {(['Submitted', 'In Review', 'Content Removed', 'Rejected'] as CaseStatus[]).map(st => (
                    <button
                      key={st}
                      type="button"
                      onClick={() => setNewStatusChoice(st)}
                      className={`p-2.5 rounded-xl font-bold border text-xs transition-all ${
                        newStatusChoice === st
                          ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-md scale-[1.02]'
                          : 'bg-slate-950 text-slate-300 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>

              {/* Admin Notes Input */}
              <div>
                <label className="block font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                  Admin Legal Enforcement Remarks / Legal Action Notes
                </label>
                <textarea
                  rows={3}
                  value={adminNotesInput}
                  onChange={e => setAdminNotesInput(e.target.value)}
                  placeholder="e.g. Official DMCA Section 512(c) Notice transmitted to host platform legal counsel. Content disabled."
                  className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 focus:outline-none focus:border-amber-500 text-xs"
                ></textarea>
              </div>

              <div className="pt-2 flex gap-3">
                <button
                  type="button"
                  onClick={() => setEditingCase(null)}
                  className="flex-1 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSaveCaseStatus}
                  className="flex-1 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold shadow"
                >
                  Save Status & Notify Client
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal for Admin Viewing Complete Case Dossier / Full Info */}
      {viewingCaseDetail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-2xl w-full p-6 sm:p-8 text-white shadow-2xl relative my-8 space-y-5">
            <div className="flex justify-between items-start border-b border-slate-800 pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold text-amber-400 uppercase tracking-widest font-mono">
                    FULL CASE DOSSIER REPORT
                  </span>
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase ${
                    viewingCaseDetail.status === 'Content Removed' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' :
                    viewingCaseDetail.status === 'In Review' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' :
                    viewingCaseDetail.status === 'Rejected' ? 'bg-red-500/20 text-red-300 border border-red-500/40' :
                    'bg-blue-500/20 text-blue-300 border border-blue-500/40'
                  }`}>
                    {viewingCaseDetail.status}
                  </span>
                </div>
                <h3 className="font-serif-legal font-bold text-2xl text-slate-100 mt-1">
                  {viewingCaseDetail.id}
                </h3>
                <p className="text-xs text-slate-400 font-mono">
                  Platform: <span className="text-slate-200 font-bold">{viewingCaseDetail.platform}</span> • Submitted: {viewingCaseDetail.submittedAt}
                </p>
              </div>
              <button
                onClick={() => setViewingCaseDetail(null)}
                className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              {/* Client Profile */}
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider block">
                  Client Contact Profile
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <span className="text-slate-500 block text-[10px] font-bold uppercase">Client Name</span>
                    <strong className="text-slate-100 text-sm">{viewingCaseDetail.clientName}</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[10px] font-bold uppercase">Email Address</span>
                    <span className="text-slate-200 font-mono">{viewingCaseDetail.clientEmail}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[10px] font-bold uppercase">Phone Number</span>
                    <span className="text-slate-200 font-mono">{viewingCaseDetail.clientPhone || 'N/A'}</span>
                  </div>
                </div>
              </div>

              {/* URLs Comparison */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3.5 rounded-xl bg-red-950/20 border border-red-900/40 space-y-1">
                  <span className="text-[10px] font-bold text-red-400 uppercase tracking-wider block flex items-center gap-1">
                    <ExternalLink className="w-3 h-3" />
                    <span>Infringing Content URL</span>
                  </span>
                  <a
                    href={viewingCaseDetail.infringingUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-red-300 hover:underline font-mono text-[11px] break-all block"
                  >
                    {viewingCaseDetail.infringingUrl}
                  </a>
                </div>

                <div className="p-3.5 rounded-xl bg-emerald-950/20 border border-emerald-900/40 space-y-1">
                  <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider block flex items-center gap-1">
                    <ExternalLink className="w-3 h-3" />
                    <span>Original Work / Asset URL</span>
                  </span>
                  <a
                    href={viewingCaseDetail.originalUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-emerald-300 hover:underline font-mono text-[11px] break-all block"
                  >
                    {viewingCaseDetail.originalUrl}
                  </a>
                </div>
              </div>

              {/* IP Violation Basis */}
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
                <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider block flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>IP Infringement Grounds / Why Content Violates Rights</span>
                </span>
                <p className="text-slate-200 leading-relaxed text-xs bg-slate-900/80 p-3 rounded-lg border border-slate-800 font-sans">
                  {viewingCaseDetail.violationReason}
                </p>
              </div>

              {/* Additional Description */}
              {viewingCaseDetail.additionalDescription && (
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block flex items-center gap-1">
                    <FileText className="w-3.5 h-3.5 text-amber-400" />
                    <span>Additional Evidence & Description</span>
                  </span>
                  <p className="text-slate-300 leading-relaxed text-xs bg-slate-900/80 p-3 rounded-lg border border-slate-800 font-sans">
                    {viewingCaseDetail.additionalDescription}
                  </p>
                </div>
              )}

              {/* Admin Enforcement Notes */}
              {viewingCaseDetail.adminNotes && (
                <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 space-y-1">
                  <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider block">
                    Admin Legal Enforcement Notes
                  </span>
                  <p className="text-amber-200 text-xs font-sans">
                    {viewingCaseDetail.adminNotes}
                  </p>
                </div>
              )}

              {/* Audit Trail Timeline */}
              <div className="pt-2 border-t border-slate-800 space-y-2">
                <strong className="text-xs font-bold text-slate-300 uppercase tracking-wider block font-serif-legal">
                  Case Status Audit Trail Log
                </strong>
                <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
                  {caseHistory
                    .filter(h => h.caseId === viewingCaseDetail.id)
                    .map(h => (
                      <div key={h.id} className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-[11px] space-y-0.5">
                        <div className="flex justify-between text-slate-400 font-mono text-[10px]">
                          <span>Updated By: <strong className="text-slate-200">{h.updatedBy}</strong></span>
                          <span>{h.timestamp}</span>
                        </div>
                        <div className="text-slate-200 font-medium">
                          Status: <span className="text-amber-400">{h.oldStatus}</span> &rarr; <span className="text-emerald-400">{h.newStatus}</span>
                        </div>
                        {h.notes && <p className="text-slate-400 italic text-[10px]">{h.notes}</p>}
                      </div>
                    ))}
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800 flex justify-between items-center gap-3">
              <button
                onClick={() => setViewingCaseDetail(null)}
                className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs"
              >
                Close Dossier
              </button>
              <button
                onClick={() => {
                  const c = viewingCaseDetail;
                  setViewingCaseDetail(null);
                  handleOpenEditCase(c);
                }}
                className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs flex items-center gap-1.5 shadow"
              >
                <Edit3 className="w-4 h-4" />
                <span>Update Case Status</span>
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
