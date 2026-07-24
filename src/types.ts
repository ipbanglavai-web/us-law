export type UserRole = 'admin' | 'client' | 'pending';

export type ClientStatus = 'pending' | 'approved' | 'rejected';

export interface PackagePlan {
  id: 'monthly' | 'yearly';
  name: string;
  price: string;
  priceValue: number;
  features: string[];
  takedowns: string; // '30 Takedowns' or 'Unlimited Takedowns'
  maxTakedowns: number; // 30 or -1 for unlimited
  duration: string; // '1 Month' or '1 Year'
  coverage: string; // 'All Platforms'
}

export interface ClientUser {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  status: ClientStatus;
  selectedPackage: PackagePlan;
  signupDate: string;
  approvedAt?: string;
  rejectedAt?: string;
  remainingTakedowns: number; // -1 for unlimited
  totalSubmitted: number;
  totalRemoved: number;
  role: 'client';
}

export type PlatformType =
  | 'Facebook'
  | 'Instagram'
  | 'YouTube'
  | 'TikTok'
  | 'X (Twitter)'
  | 'Threads'
  | 'Pinterest'
  | 'LinkedIn'
  | 'Telegram'
  | 'Snapchat'
  | 'Reddit'
  | 'Website'
  | 'Other';

export type CaseStatus = 'Submitted' | 'In Review' | 'Content Removed' | 'Rejected';

export interface CaseItem {
  id: string; // e.g. USL-2026-8841
  clientId: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  platform: PlatformType;
  infringingUrl: string;
  originalUrl: string;
  additionalDescription: string;
  violationReason: string;
  status: CaseStatus;
  submittedAt: string;
  updatedAt: string;
  adminNotes?: string;
}

export interface CaseStatusHistoryItem {
  id: string;
  caseId: string;
  oldStatus: CaseStatus;
  newStatus: CaseStatus;
  updatedBy: string;
  notes: string;
  timestamp: string;
}

export interface LoginHistoryItem {
  id: string;
  userId: string;
  userEmail: string;
  role: UserRole;
  ipAddress: string;
  timestamp: string;
  userAgent: string;
}

export interface NotificationItem {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'alert';
  isRead: boolean;
  createdAt: string;
}

export interface InquiryItem {
  id: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  submittedAt: string;
  isRead: boolean;
  status: 'New' | 'In Review' | 'Resolved';
}

export interface DatabaseTablesOverview {
  admins: number;
  clients: number;
  packages: number;
  clientSubscriptions: number;
  cases: number;
  caseStatusHistory: number;
  loginHistory: number;
  notifications: number;
}
