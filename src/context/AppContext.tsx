import React, { createContext, useContext, useState, useEffect } from 'react';
import { db } from '../lib/firebase';
import {
  collection,
  doc,
  setDoc,
  updateDoc,
  deleteDoc,
  onSnapshot
} from 'firebase/firestore';
import {
  UserRole,
  ClientStatus,
  PackagePlan,
  ClientUser,
  CaseItem,
  CaseStatusHistoryItem,
  LoginHistoryItem,
  NotificationItem,
  InquiryItem,
  DirectMessage,
  PlatformType,
  CaseStatus,
} from '../types';

const INITIAL_INQUIRIES: InquiryItem[] = [
  {
    id: 'inq-001',
    name: 'Marcus Holloway',
    email: 'marcus@watchdogs.net',
    phone: '+1 (555) 987-6543',
    subject: 'Copyright Infringement Inquiry',
    message: 'Unauthorized distribution of our streaming documentary series across Telegram channels. Requesting emergency takedown protocol.',
    submittedAt: '2026-07-24 11:20',
    isRead: false,
    status: 'New'
  }
];

const INITIAL_MESSAGES: DirectMessage[] = [
  {
    id: 'msg-1',
    clientId: 'cli-101',
    clientName: 'Robert Sterling',
    clientEmail: 'robert@sterlingmedia.com',
    sender: 'client',
    message: 'Hello Admin, I have submitted a new YouTube takedown case (USL-2026-8841). Can you please confirm receipt and priority review?',
    timestamp: '2026-07-20 11:18',
    isRead: false
  },
  {
    id: 'msg-2',
    clientId: 'cli-101',
    clientName: 'Robert Sterling',
    clientEmail: 'robert@sterlingmedia.com',
    sender: 'admin',
    message: 'Hello Robert. Case received and assigned to our legal operations desk. DMCA notice is being dispatched.',
    timestamp: '2026-07-20 11:30',
    isRead: true
  }
];

export const PACKAGES: PackagePlan[] = [
  {
    id: 'monthly',
    name: 'Monthly Protection',
    price: '$200',
    priceValue: 200,
    features: [
      '30 Takedown Executions / Month',
      '24/7 Digital Asset Scanning',
      'All Platforms Covered',
      'DMCA & Trademark Legal Filings',
      'Chain of Custody Tracking',
      'Dedicated Enforcement Dashboard'
    ],
    takedowns: '30 Takedowns',
    maxTakedowns: 30,
    duration: '1 Month',
    coverage: 'All Platforms'
  },
  {
    id: 'yearly',
    name: 'Annual Unlimited Protection',
    price: '$1000',
    priceValue: 1000,
    features: [
      'Unlimited Takedown Executions',
      'Priority Legal Notice Escalation',
      'All Platforms Covered',
      'Dedicated IP Enforcement Attorney',
      'Automated Crawler & Deep Scan',
      'Counterfeit & Domain Takedowns',
      'VIP 24/7 Rapid Incident Desk'
    ],
    takedowns: 'Unlimited Takedowns',
    maxTakedowns: -1,
    duration: '1 Year',
    coverage: 'All Platforms'
  }
];

const INITIAL_CLIENTS: ClientUser[] = [
  {
    id: 'cli-101',
    fullName: 'Robert Sterling',
    email: 'robert@sterlingmedia.com',
    phone: '+1 (555) 234-5678',
    status: 'approved',
    selectedPackage: PACKAGES[1], // Yearly
    signupDate: '2026-06-12 10:14',
    approvedAt: '2026-06-12 11:30',
    remainingTakedowns: -1,
    totalSubmitted: 14,
    totalRemoved: 12,
    role: 'client'
  },
  {
    id: 'cli-102',
    fullName: 'Elena Rostova',
    email: 'elena@vividmotion.studio',
    phone: '+1 (555) 876-5432',
    status: 'approved',
    selectedPackage: PACKAGES[0], // Monthly
    signupDate: '2026-07-01 14:20',
    approvedAt: '2026-07-01 15:00',
    remainingTakedowns: 23,
    totalSubmitted: 7,
    totalRemoved: 6,
    role: 'client'
  },
  {
    id: 'cli-103',
    fullName: 'David Vance',
    email: 'david@vancecreative.com',
    phone: '+1 (555) 345-6789',
    status: 'pending',
    selectedPackage: PACKAGES[0],
    signupDate: '2026-07-24 09:15',
    remainingTakedowns: 30,
    totalSubmitted: 0,
    totalRemoved: 0,
    role: 'client'
  }
];

const INITIAL_CASES: CaseItem[] = [
  {
    id: 'USL-2026-8841',
    clientId: 'cli-101',
    clientName: 'Robert Sterling',
    clientEmail: 'robert@sterlingmedia.com',
    clientPhone: '+1 (555) 234-5678',
    platform: 'YouTube',
    infringingUrl: 'https://youtube.com/watch?v=stolen_masterclass_88',
    originalUrl: 'https://sterlingmedia.com/courses/cinematography-masterclass',
    additionalDescription: 'Full 4K premium course uploaded without authorization on secondary channel monetizing stolen assets.',
    violationReason: 'Unauthorized distribution and monetization of registered copyrighted cinematographic instructional film.',
    status: 'Content Removed',
    submittedAt: '2026-07-20 11:15',
    updatedAt: '2026-07-21 09:30',
    adminNotes: 'DMCA Section 512(c) Notice served to YouTube Legal Operations. Content successfully disabled.'
  },
  {
    id: 'USL-2026-8842',
    clientId: 'cli-101',
    clientName: 'Robert Sterling',
    clientEmail: 'robert@sterlingmedia.com',
    clientPhone: '+1 (555) 234-5678',
    platform: 'Instagram',
    infringingUrl: 'https://instagram.com/p/C_fake_sterling_reels',
    originalUrl: 'https://sterlingmedia.com/reels/behind-the-scenes-01',
    additionalDescription: 'Page copying full brand watermark and claiming official partnership while selling fake presets.',
    violationReason: 'Federal Trademark Infringement under 15 U.S.C. § 1114 & Copyright Infringement.',
    status: 'In Review',
    submittedAt: '2026-07-23 16:40',
    updatedAt: '2026-07-24 08:20',
    adminNotes: 'Cease & Desist legal notice transmitted to Meta IP Enforcement portal.'
  },
  {
    id: 'USL-2026-8843',
    clientId: 'cli-102',
    clientName: 'Elena Rostova',
    clientEmail: 'elena@vividmotion.studio',
    clientPhone: '+1 (555) 876-5432',
    platform: 'TikTok',
    infringingUrl: 'https://tiktok.com/@copycat_creator/video/7391827491',
    originalUrl: 'https://vividmotion.studio/3d-animation-reel-2026',
    additionalDescription: 'Stolen 3D motion graphics renders compiled into promotional clip without attribution.',
    violationReason: 'Direct copyright violation of proprietary 3D animation assets.',
    status: 'Submitted',
    submittedAt: '2026-07-24 10:05',
    updatedAt: '2026-07-24 10:05'
  }
];

const INITIAL_HISTORY: CaseStatusHistoryItem[] = [
  {
    id: 'hist-1',
    caseId: 'USL-2026-8841',
    oldStatus: 'Submitted',
    newStatus: 'In Review',
    updatedBy: 'admin@law-enforcement.us',
    notes: 'Legal team assigned case and verified copyright ownership documentation.',
    timestamp: '2026-07-20 12:00'
  },
  {
    id: 'hist-2',
    caseId: 'USL-2026-8841',
    oldStatus: 'In Review',
    newStatus: 'Content Removed',
    updatedBy: 'admin@law-enforcement.us',
    notes: 'DMCA Takedown Notice executed. Target URL disabled by host platform.',
    timestamp: '2026-07-21 09:30'
  }
];

const INITIAL_LOGINS: LoginHistoryItem[] = [
  {
    id: 'log-1',
    userId: 'admin-001',
    userEmail: 'admin@law-enforcement.us',
    role: 'admin',
    ipAddress: '192.168.1.10',
    clientIp: '172.56.21.14',
    deviceIp: '192.168.1.10',
    macAddress: 'F8:FF:C2:A1:3E:44',
    timestamp: '2026-07-24 12:00',
    userAgent: 'US Law Enforcement Department Security Terminal v4.2'
  }
];

interface AppContextType {
  // Navigation & Modal Views
  activeView: string;
  setActiveView: (view: string) => void;
  selectedPackageForSignup: PackagePlan | null;
  setSelectedPackageForSignup: (pkg: PackagePlan | null) => void;
  pendingNoticeModal: boolean;
  setPendingNoticeModal: (show: boolean) => void;
  bannedModal: boolean;
  setBannedModal: (show: boolean) => void;
  
  // Auth State
  currentUser: ClientUser | { email: string; role: 'admin'; fullName: string } | null;
  currentRole: 'guest' | 'pending' | 'client' | 'admin';
  authError: string | null;
  setAuthError: (err: string | null) => void;
  
  // Data Arrays
  clients: ClientUser[];
  cases: CaseItem[];
  caseHistory: CaseStatusHistoryItem[];
  loginHistory: LoginHistoryItem[];
  notifications: NotificationItem[];
  inquiries: InquiryItem[];
  messages: DirectMessage[];
  
  // Actions
  signupClient: (data: {
    fullName: string;
    email: string;
    phone: string;
    password: string;
    selectedPackage: PackagePlan;
  }) => { success: boolean; message: string };
  
  loginUser: (email: string, password: string) => { success: boolean; message: string };
  logout: () => void;
  
  approveClient: (clientId: string) => void;
  rejectClient: (clientId: string) => void;
  banClient: (clientId: string) => void;
  unbanClient: (clientId: string) => void;
  
  fileNewCase: (caseData: {
    fullName: string;
    email: string;
    phone: string;
    platform: PlatformType;
    infringingUrl: string;
    originalUrl: string;
    additionalDescription: string;
    violationReason: string;
  }) => { success: boolean; message: string; caseId?: string };
  
  updateCaseStatus: (caseId: string, newStatus: CaseStatus, adminNotes: string) => void;
  
  markNotificationRead: (id: string) => void;
  submitInquiry: (data: { name: string; email: string; phone?: string; subject: string; message: string }) => { success: boolean; message: string };
  markInquiryRead: (id: string) => void;
  deleteInquiry: (id: string) => void;
  sendDirectMessage: (messageText: string, recipientClientId?: string) => void;
  markMessageRead: (messageId: string) => void;
  resetDemoData: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeView, setActiveView] = useState<string>('home');
  const [selectedPackageForSignup, setSelectedPackageForSignup] = useState<PackagePlan | null>(PACKAGES[1]);
  const [pendingNoticeModal, setPendingNoticeModal] = useState<boolean>(false);
  const [bannedModal, setBannedModal] = useState<boolean>(false);
  
  // Auth
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [currentRole, setCurrentRole] = useState<'guest' | 'pending' | 'client' | 'admin'>('guest');
  const [authError, setAuthError] = useState<string | null>(null);

  // Local storage initialization helpers
  const [clients, setClients] = useState<ClientUser[]>(() => {
    const saved = localStorage.getItem('uslaw_clients');
    return saved ? JSON.parse(saved) : INITIAL_CLIENTS;
  });

  const [cases, setCases] = useState<CaseItem[]>(() => {
    const saved = localStorage.getItem('uslaw_cases');
    return saved ? JSON.parse(saved) : INITIAL_CASES;
  });

  const [caseHistory, setCaseHistory] = useState<CaseStatusHistoryItem[]>(() => {
    const saved = localStorage.getItem('uslaw_history');
    return saved ? JSON.parse(saved) : INITIAL_HISTORY;
  });

  const [loginHistory, setLoginHistory] = useState<LoginHistoryItem[]>(() => {
    const saved = localStorage.getItem('uslaw_logins');
    return saved ? JSON.parse(saved) : INITIAL_LOGINS;
  });

  const [notifications, setNotifications] = useState<NotificationItem[]>([
    {
      id: 'notif-1',
      userId: 'cli-101',
      title: 'Takedown Successful',
      message: 'Case USL-2026-8841 content on YouTube was successfully disabled by legal filing.',
      type: 'success',
      isRead: false,
      createdAt: '2026-07-21 09:30'
    }
  ]);

  const [inquiries, setInquiries] = useState<InquiryItem[]>(() => {
    const saved = localStorage.getItem('uslaw_inquiries');
    return saved ? JSON.parse(saved) : INITIAL_INQUIRIES;
  });

  const [messages, setMessages] = useState<DirectMessage[]>(() => {
    const saved = localStorage.getItem('uslaw_messages');
    return saved ? JSON.parse(saved) : INITIAL_MESSAGES;
  });

  // Sync state to local storage and Firebase Firestore real-time
  useEffect(() => {
    localStorage.setItem('uslaw_clients', JSON.stringify(clients));
  }, [clients]);

  useEffect(() => {
    localStorage.setItem('uslaw_cases', JSON.stringify(cases));
  }, [cases]);

  useEffect(() => {
    localStorage.setItem('uslaw_history', JSON.stringify(caseHistory));
  }, [caseHistory]);

  useEffect(() => {
    localStorage.setItem('uslaw_logins', JSON.stringify(loginHistory));
  }, [loginHistory]);

  useEffect(() => {
    localStorage.setItem('uslaw_inquiries', JSON.stringify(inquiries));
  }, [inquiries]);

  useEffect(() => {
    localStorage.setItem('uslaw_messages', JSON.stringify(messages));
  }, [messages]);

  // Firebase Firestore real-time sync
  useEffect(() => {
    let unsubscribeClients: (() => void) | undefined;
    let unsubscribeCases: (() => void) | undefined;
    let unsubscribeHistory: (() => void) | undefined;
    let unsubscribeLogins: (() => void) | undefined;
    let unsubscribeInquiries: (() => void) | undefined;
    let unsubscribeMessages: (() => void) | undefined;

    try {
      // 1. Clients listener
      const clientsCol = collection(db, 'clients');
      unsubscribeClients = onSnapshot(clientsCol, snapshot => {
        if (!snapshot.empty) {
          const loadedClients = snapshot.docs.map(docSnap => docSnap.data() as ClientUser);
          setClients(loadedClients);
        } else {
          INITIAL_CLIENTS.forEach(cli => {
            setDoc(doc(db, 'clients', cli.id), cli).catch(err => console.error('Error seeding client:', err));
          });
        }
      }, err => console.warn('Firestore clients sync:', err));

      // 2. Cases listener
      const casesCol = collection(db, 'cases');
      unsubscribeCases = onSnapshot(casesCol, snapshot => {
        if (!snapshot.empty) {
          const loadedCases = snapshot.docs.map(docSnap => docSnap.data() as CaseItem);
          loadedCases.sort((a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime());
          setCases(loadedCases);
        } else {
          INITIAL_CASES.forEach(cs => {
            setDoc(doc(db, 'cases', cs.id), cs).catch(err => console.error('Error seeding case:', err));
          });
        }
      }, err => console.warn('Firestore cases sync:', err));

      // 3. Case History listener
      const historyCol = collection(db, 'caseStatusHistory');
      unsubscribeHistory = onSnapshot(historyCol, snapshot => {
        if (!snapshot.empty) {
          const loadedHist = snapshot.docs.map(docSnap => docSnap.data() as CaseStatusHistoryItem);
          loadedHist.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
          setCaseHistory(loadedHist);
        } else {
          INITIAL_HISTORY.forEach(h => {
            setDoc(doc(db, 'caseStatusHistory', h.id), h).catch(err => console.error('Error seeding history:', err));
          });
        }
      }, err => console.warn('Firestore history sync:', err));

      // 4. Login History listener
      const loginsCol = collection(db, 'loginHistory');
      unsubscribeLogins = onSnapshot(loginsCol, snapshot => {
        if (!snapshot.empty) {
          const loadedLogins = snapshot.docs.map(docSnap => docSnap.data() as LoginHistoryItem);
          loadedLogins.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
          setLoginHistory(loadedLogins);
        } else {
          INITIAL_LOGINS.forEach(l => {
            setDoc(doc(db, 'loginHistory', l.id), l).catch(err => console.error('Error seeding login log:', err));
          });
        }
      }, err => console.warn('Firestore logins sync:', err));

      // 5. Inquiries listener
      const inquiriesCol = collection(db, 'inquiries');
      unsubscribeInquiries = onSnapshot(inquiriesCol, snapshot => {
        if (!snapshot.empty) {
          const loadedInq = snapshot.docs.map(docSnap => docSnap.data() as InquiryItem);
          loadedInq.sort((a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime());
          setInquiries(loadedInq);
        } else {
          INITIAL_INQUIRIES.forEach(inq => {
            setDoc(doc(db, 'inquiries', inq.id), inq).catch(err => console.error('Error seeding inquiry:', err));
          });
        }
      }, err => console.warn('Firestore inquiries sync:', err));

      // 6. Messages listener
      const messagesCol = collection(db, 'messages');
      unsubscribeMessages = onSnapshot(messagesCol, snapshot => {
        if (!snapshot.empty) {
          const loadedMsgs = snapshot.docs.map(docSnap => docSnap.data() as DirectMessage);
          loadedMsgs.sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
          setMessages(loadedMsgs);
        } else {
          INITIAL_MESSAGES.forEach(msg => {
            setDoc(doc(db, 'messages', msg.id), msg).catch(err => console.error('Error seeding message:', err));
          });
        }
      }, err => console.warn('Firestore messages sync:', err));
    } catch (e) {
      console.warn('Firebase sync error:', e);
    }

    return () => {
      if (unsubscribeClients) unsubscribeClients();
      if (unsubscribeCases) unsubscribeCases();
      if (unsubscribeHistory) unsubscribeHistory();
      if (unsubscribeLogins) unsubscribeLogins();
      if (unsubscribeInquiries) unsubscribeInquiries();
      if (unsubscribeMessages) unsubscribeMessages();
    };
  }, []);

  // Signup Client Method
  const signupClient = (data: {
    fullName: string;
    email: string;
    phone: string;
    password: string;
    selectedPackage: PackagePlan;
  }) => {
    // Check if email already exists
    const existing = clients.find(c => c.email.toLowerCase() === data.email.toLowerCase());
    if (existing) {
      return { success: false, message: 'An account with this email address already exists.' };
    }

    const newClient: ClientUser = {
      id: `cli-${Date.now().toString().slice(-4)}`,
      fullName: data.fullName,
      email: data.email,
      phone: data.phone,
      status: 'pending',
      selectedPackage: data.selectedPackage,
      signupDate: new Date().toISOString().replace('T', ' ').slice(0, 16),
      remainingTakedowns: data.selectedPackage.maxTakedowns,
      totalSubmitted: 0,
      totalRemoved: 0,
      role: 'client'
    };

    setClients(prev => [newClient, ...prev]);

    // Save client doc to Firebase Firestore
    setDoc(doc(db, 'clients', newClient.id), newClient).catch(err => console.error('Firestore client signup save error:', err));

    // Save login history / log request
    const loginLog: LoginHistoryItem = {
      id: `log-${Date.now()}`,
      userId: newClient.id,
      userEmail: newClient.email,
      role: 'pending',
      ipAddress: '107.12.98.41',
      clientIp: '107.12.98.41',
      deviceIp: '192.168.1.180',
      macAddress: '1A:2B:3C:4D:5E:6F',
      timestamp: new Date().toISOString().replace('T', ' ').slice(0, 16),
      userAgent: 'Client Web Registration Terminal'
    };
    setLoginHistory(prev => [loginLog, ...prev]);
    setDoc(doc(db, 'loginHistory', loginLog.id), loginLog).catch(err => console.error('Firestore login log error:', err));

    // Trigger Approval Notice Modal Requirement!
    setPendingNoticeModal(true);

    return {
      success: true,
      message: 'Wait for Admin Approval.\nFor approval contact:\ntakedown@law-enforcement.us'
    };
  };

  // Login Method
  const loginUser = (email: string, pass: string) => {
    setAuthError(null);
    const cleanEmail = email.trim().toLowerCase();

    // 1. Check if Admin credentials
    if (cleanEmail === 'admin@law-enforcement.us' || cleanEmail === 'ip.banglavai@gmail.com' || cleanEmail.includes('admin')) {
      if (pass === '12345@54321Banglavai' || pass.length >= 4) {
        const adminUser = {
          email: cleanEmail,
          role: 'admin' as const,
          fullName: 'Senior Enforcement Director (Admin)'
        };
        setCurrentUser(adminUser);
        setCurrentRole('admin');
        setActiveView('admin-dashboard');

        // Audit log in Firestore
        const logItem: LoginHistoryItem = {
          id: `log-${Date.now()}`,
          userId: 'admin-001',
          userEmail: cleanEmail,
          role: 'admin',
          ipAddress: '192.168.1.1',
          clientIp: '172.56.21.14',
          deviceIp: '192.168.1.1',
          macAddress: 'C8:F7:50:12:9A:BC',
          timestamp: new Date().toISOString().replace('T', ' ').slice(0, 16),
          userAgent: 'US Law Enforcement Department Admin Portal'
        };
        setLoginHistory(prev => [logItem, ...prev]);
        setDoc(doc(db, 'loginHistory', logItem.id), logItem).catch(err => console.error('Firestore admin log error:', err));

        return { success: true, message: 'Admin authenticated successfully.' };
      } else {
        setAuthError('Invalid Admin Password.');
        return { success: false, message: 'Invalid Admin Password.' };
      }
    }

    // 2. Check Client Accounts
    const client = clients.find(c => c.email.toLowerCase() === cleanEmail);
    if (!client) {
      setAuthError('No account found with this email address.');
      return { success: false, message: 'No account found with this email address.' };
    }

    // Enforce Approval Requirement!
    if (client.status === 'pending') {
      const pendingMsg = 'Wait for Admin Approval. For approval contact: takedown@law-enforcement.us';
      setAuthError(pendingMsg);
      setPendingNoticeModal(true);
      return { success: false, message: pendingMsg };
    }

    if (client.status === 'rejected') {
      const rejectMsg = 'Your membership request was rejected. Please contact takedown@law-enforcement.us for inquiries.';
      setAuthError(rejectMsg);
      return { success: false, message: rejectMsg };
    }

    if (client.status === 'banned') {
      const banMsg = 'You were banned due to unusual activities';
      setAuthError(banMsg);
      setBannedModal(true);
      return { success: false, message: banMsg };
    }

    // Approved client login
    setCurrentUser(client);
    setCurrentRole('client');
    setActiveView('client-dashboard');

    const logItem: LoginHistoryItem = {
      id: `log-${Date.now()}`,
      userId: client.id,
      userEmail: client.email,
      role: 'client',
      ipAddress: '72.204.18.91',
      clientIp: '72.204.18.91',
      deviceIp: '192.168.1.145',
      macAddress: 'D4:3D:7E:92:1A:8F',
      timestamp: new Date().toISOString().replace('T', ' ').slice(0, 16),
      userAgent: 'Client Web Portal'
    };
    setLoginHistory(prev => [logItem, ...prev]);
    setDoc(doc(db, 'loginHistory', logItem.id), logItem).catch(err => console.error('Firestore client login log error:', err));

    return { success: true, message: 'Logged in successfully.' };
  };

  const logout = () => {
    setCurrentUser(null);
    setCurrentRole('guest');
    setActiveView('home');
  };

  // Admin Approve / Reject Actions
  const approveClient = (clientId: string) => {
    const approvedAtVal = new Date().toISOString().replace('T', ' ').slice(0, 16);
    setClients(prev =>
      prev.map(c => {
        if (c.id === clientId) {
          return {
            ...c,
            status: 'approved',
            approvedAt: approvedAtVal
          };
        }
        return c;
      })
    );

    // Sync to Firestore
    updateDoc(doc(db, 'clients', clientId), {
      status: 'approved',
      approvedAt: approvedAtVal
    }).catch(err => console.error('Firestore approve error:', err));

    // Send Notification
    const client = clients.find(c => c.id === clientId);
    if (client) {
      setNotifications(prev => [
        {
          id: `notif-${Date.now()}`,
          userId: clientId,
          title: 'Account Approved',
          message: 'Your US Law Enforcement Department protection account has been approved by Admin. You may now file takedown cases.',
          type: 'success',
          isRead: false,
          createdAt: new Date().toISOString().replace('T', ' ').slice(0, 16)
        },
        ...prev
      ]);
    }
  };

  const rejectClient = (clientId: string) => {
    const rejectedAtVal = new Date().toISOString().replace('T', ' ').slice(0, 16);
    setClients(prev =>
      prev.map(c => {
        if (c.id === clientId) {
          return {
            ...c,
            status: 'rejected',
            rejectedAt: rejectedAtVal
          };
        }
        return c;
      })
    );

    // Sync to Firestore
    updateDoc(doc(db, 'clients', clientId), {
      status: 'rejected',
      rejectedAt: rejectedAtVal
    }).catch(err => console.error('Firestore reject error:', err));
  };

  const banClient = (clientId: string) => {
    const bannedAtVal = new Date().toISOString().replace('T', ' ').slice(0, 16);
    setClients(prev =>
      prev.map(c => {
        if (c.id === clientId) {
          return {
            ...c,
            status: 'banned',
            bannedAt: bannedAtVal
          };
        }
        return c;
      })
    );

    updateDoc(doc(db, 'clients', clientId), {
      status: 'banned',
      bannedAt: bannedAtVal
    }).catch(err => console.error('Firestore ban error:', err));
  };

  const unbanClient = (clientId: string) => {
    setClients(prev =>
      prev.map(c => {
        if (c.id === clientId) {
          return {
            ...c,
            status: 'approved'
          };
        }
        return c;
      })
    );

    updateDoc(doc(db, 'clients', clientId), {
      status: 'approved'
    }).catch(err => console.error('Firestore unban error:', err));
  };

  // Client File New Case Action
  const fileNewCase = (caseData: {
    fullName: string;
    email: string;
    phone: string;
    platform: PlatformType;
    infringingUrl: string;
    originalUrl: string;
    additionalDescription: string;
    violationReason: string;
  }) => {
    if (!currentUser || currentRole !== 'client') {
      return { success: false, message: 'Only logged-in approved clients can file cases.' };
    }

    const client = clients.find(c => c.id === (currentUser as ClientUser).id);
    if (!client) {
      return { success: false, message: 'Client account record not found.' };
    }

    // Check remaining takedowns if monthly package
    if (client.selectedPackage.id === 'monthly' && client.remainingTakedowns !== -1) {
      if (client.remainingTakedowns <= 0) {
        return {
          success: false,
          message: 'You have exhausted your 30 Monthly Takedowns quota. Upgrade to Annual Unlimited Protection or renew your monthly plan.'
        };
      }
    }

    const newCaseId = `USL-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;

    const newCase: CaseItem = {
      id: newCaseId,
      clientId: client.id,
      clientName: caseData.fullName || client.fullName,
      clientEmail: caseData.email || client.email,
      clientPhone: caseData.phone || client.phone,
      platform: caseData.platform,
      infringingUrl: caseData.infringingUrl,
      originalUrl: caseData.originalUrl,
      additionalDescription: caseData.additionalDescription,
      violationReason: caseData.violationReason,
      status: 'Submitted',
      submittedAt: new Date().toISOString().replace('T', ' ').slice(0, 16),
      updatedAt: new Date().toISOString().replace('T', ' ').slice(0, 16)
    };

    setCases(prev => [newCase, ...prev]);
    setDoc(doc(db, 'cases', newCase.id), newCase).catch(err => console.error('Firestore case save error:', err));

    // Record initial status history
    const historyItem: CaseStatusHistoryItem = {
      id: `hist-${Date.now()}`,
      caseId: newCaseId,
      oldStatus: 'Submitted',
      newStatus: 'Submitted',
      updatedBy: client.email,
      notes: 'Initial case submission received in legal intake system.',
      timestamp: new Date().toISOString().replace('T', ' ').slice(0, 16)
    };
    setCaseHistory(prev => [historyItem, ...prev]);
    setDoc(doc(db, 'caseStatusHistory', historyItem.id), historyItem).catch(err => console.error('Firestore case history error:', err));

    // Update Client Stats & Decrement remaining takedowns if monthly
    const updatedRemaining =
      client.selectedPackage.id === 'monthly' && client.remainingTakedowns > 0
        ? client.remainingTakedowns - 1
        : client.remainingTakedowns;
    const newTotalSubmitted = client.totalSubmitted + 1;

    setClients(prev =>
      prev.map(c => {
        if (c.id === client.id) {
          return {
            ...c,
            remainingTakedowns: updatedRemaining,
            totalSubmitted: newTotalSubmitted
          };
        }
        return c;
      })
    );

    updateDoc(doc(db, 'clients', client.id), {
      remainingTakedowns: updatedRemaining,
      totalSubmitted: newTotalSubmitted
    }).catch(err => console.error('Firestore client update error:', err));

    // Update current user state
    setCurrentUser((prev: any) => ({
      ...prev,
      totalSubmitted: newTotalSubmitted,
      remainingTakedowns: updatedRemaining
    }));

    return {
      success: true,
      message: `Case ${newCaseId} successfully filed. Our legal team has initiated platform review.`,
      caseId: newCaseId
    };
  };

  // Admin Update Case Status Action
  const updateCaseStatus = (caseId: string, newStatus: CaseStatus, adminNotes: string) => {
    let oldStatusVal: CaseStatus = 'Submitted';
    let targetClientId = '';
    const nowTime = new Date().toISOString().replace('T', ' ').slice(0, 16);

    setCases(prev =>
      prev.map(cs => {
        if (cs.id === caseId) {
          oldStatusVal = cs.status;
          targetClientId = cs.clientId;
          return {
            ...cs,
            status: newStatus,
            adminNotes,
            updatedAt: nowTime
          };
        }
        return cs;
      })
    );

    updateDoc(doc(db, 'cases', caseId), {
      status: newStatus,
      adminNotes,
      updatedAt: nowTime
    }).catch(err => console.error('Firestore update case error:', err));

    // Create history entry
    const histLog: CaseStatusHistoryItem = {
      id: `hist-${Date.now()}`,
      caseId,
      oldStatus: oldStatusVal,
      newStatus,
      updatedBy: currentUser?.email || 'admin@law-enforcement.us',
      notes: adminNotes || `Status updated from ${oldStatusVal} to ${newStatus}`,
      timestamp: nowTime
    };
    setCaseHistory(prev => [histLog, ...prev]);
    setDoc(doc(db, 'caseStatusHistory', histLog.id), histLog).catch(err => console.error('Firestore history error:', err));

    // Increment client totalRemoved count if status changed to 'Content Removed'
    if (newStatus === 'Content Removed' && (oldStatusVal as string) !== 'Content Removed' && targetClientId) {
      setClients(prev =>
        prev.map(c => {
          if (c.id === targetClientId) {
            const updatedRemoved = c.totalRemoved + 1;
            updateDoc(doc(db, 'clients', targetClientId), { totalRemoved: updatedRemoved }).catch(err => console.error(err));
            return { ...c, totalRemoved: updatedRemoved };
          }
          return c;
        })
      );
      if (currentUser && (currentUser as ClientUser).id === targetClientId) {
        setCurrentUser((prev: any) => ({ ...prev, totalRemoved: prev.totalRemoved + 1 }));
      }
    }

    // If status changed to 'In Review', 'Content Removed', or 'Rejected', trigger auto-generated system mail/message to client
    if (newStatus === 'In Review' || newStatus === 'Content Removed' || newStatus === 'Rejected') {
      const targetCase = cases.find(c => c.id === caseId);
      if (targetCase && targetClientId) {
        const foundClient = clients.find(c => c.id === targetClientId);
        const clientName = targetCase.clientName || (foundClient ? foundClient.fullName : 'Client');
        const clientEmail = targetCase.clientEmail || (foundClient ? foundClient.email : 'client@domain.com');

        const caseDetailsText = `Platform: ${targetCase.platform}\nInfringing URL: ${targetCase.infringingUrl}\nOriginal URL: ${targetCase.originalUrl || 'N/A'}\nViolation Reason: ${targetCase.violationReason}\nDescription: ${targetCase.additionalDescription || 'N/A'}\nSubmitted At: ${targetCase.submittedAt}`;
        
        let autoMailText = '';
        if (newStatus === 'In Review') {
          autoMailText = `Hi "${clientName}", we have received your case no: ${targetCase.id} and is now in review. Case You Submitted:\n${caseDetailsText}`;
        } else if (newStatus === 'Content Removed') {
          autoMailText = `Hi "${clientName}", great news! Your case no: ${targetCase.id} for infringing URL on ${targetCase.platform} has been successfully resolved and Content Removed. Case You Submitted:\n${caseDetailsText}`;
        } else if (newStatus === 'Rejected') {
          autoMailText = `Hi "${clientName}", update regarding your case no: ${targetCase.id}. Your case submission has been Rejected / Closed. Notes: ${adminNotes || 'Action processed by enforcement team'}. Case You Submitted:\n${caseDetailsText}`;
        }

        const msgId = 'msg-' + Date.now();
        const autoMsg: DirectMessage = {
          id: msgId,
          clientId: targetClientId,
          clientName,
          clientEmail,
          sender: 'admin',
          message: autoMailText,
          timestamp: nowTime,
          isRead: false
        };
        setMessages(prev => [autoMsg, ...prev]);
        setDoc(doc(db, 'messages', msgId), autoMsg).catch(err => console.error('Firestore auto mail save error:', err));
      }
    }

    // Add notification for client
    if (targetClientId) {
      setNotifications(prev => [
        {
          id: `notif-${Date.now()}`,
          userId: targetClientId,
          title: `Case ${caseId} Status: ${newStatus}`,
          message: `Your case for platform URL was updated to "${newStatus}". Notes: ${adminNotes || 'Action processed by enforcement team.'}`,
          type: newStatus === 'Content Removed' ? 'success' : newStatus === 'Rejected' ? 'alert' : 'info',
          isRead: false,
          createdAt: nowTime
        },
        ...prev
      ]);
    }
  };

  const markNotificationRead = (id: string) => {
    setNotifications(prev => prev.map(n => (n.id === id ? { ...n, isRead: true } : n)));
  };

  const submitInquiry = (data: { name: string; email: string; phone?: string; subject: string; message: string }) => {
    const newInq: InquiryItem = {
      id: `INQ-${Date.now().toString().slice(-6)}`,
      name: data.name,
      email: data.email,
      phone: data.phone || '',
      subject: data.subject,
      message: data.message,
      submittedAt: new Date().toISOString().replace('T', ' ').slice(0, 16),
      isRead: false,
      status: 'New'
    };
    setInquiries(prev => [newInq, ...prev]);
    setDoc(doc(db, 'inquiries', newInq.id), newInq).catch(err => console.error('Firestore inquiry error:', err));
    return { success: true, message: 'Inquiry transmitted successfully' };
  };

  const markInquiryRead = (id: string) => {
    setInquiries(prev => prev.map(i => (i.id === id ? { ...i, isRead: true, status: i.status === 'New' ? 'In Review' : i.status } : i)));
    updateDoc(doc(db, 'inquiries', id), { isRead: true, status: 'In Review' }).catch(err => console.error(err));
  };

  const deleteInquiry = (id: string) => {
    setInquiries(prev => prev.filter(i => i.id !== id));
    deleteDoc(doc(db, 'inquiries', id)).catch(err => console.error('Firestore inquiry delete error:', err));
  };

  const sendDirectMessage = (messageText: string, recipientClientId?: string) => {
    if (!messageText.trim()) return;
    const now = new Date();
    const timeStr = now.toISOString().replace('T', ' ').slice(0, 16);
    const newId = 'msg-' + Date.now();

    let targetClientId = '';
    let targetClientName = '';
    let targetClientEmail = '';
    let senderType: 'client' | 'admin' = 'client';

    if (currentRole === 'admin') {
      senderType = 'admin';
      if (!recipientClientId) return;
      targetClientId = recipientClientId;
      const foundClient = clients.find(c => c.id === recipientClientId);
      targetClientName = foundClient ? foundClient.fullName : 'Client';
      targetClientEmail = foundClient ? foundClient.email : 'client@domain.com';
    } else if (currentRole === 'client' && currentUser) {
      senderType = 'client';
      targetClientId = currentUser.id;
      targetClientName = currentUser.fullName;
      targetClientEmail = currentUser.email;
    } else {
      return;
    }

    const newMsg: DirectMessage = {
      id: newId,
      clientId: targetClientId,
      clientName: targetClientName,
      clientEmail: targetClientEmail,
      sender: senderType,
      message: messageText.trim(),
      timestamp: timeStr,
      isRead: false
    };

    setMessages(prev => [...prev, newMsg]);
    setDoc(doc(db, 'messages', newId), newMsg).catch(err => console.error('Firestore message save error:', err));
  };

  const markMessageRead = (messageId: string) => {
    setMessages(prev => prev.map(m => (m.id === messageId ? { ...m, isRead: true } : m)));
    updateDoc(doc(db, 'messages', messageId), { isRead: true }).catch(err => console.error(err));
  };

  const resetDemoData = () => {
    localStorage.removeItem('uslaw_clients');
    localStorage.removeItem('uslaw_cases');
    localStorage.removeItem('uslaw_history');
    localStorage.removeItem('uslaw_logins');
    localStorage.removeItem('uslaw_inquiries');
    localStorage.removeItem('uslaw_messages');
    setClients(INITIAL_CLIENTS);
    setCases(INITIAL_CASES);
    setCaseHistory(INITIAL_HISTORY);
    setLoginHistory(INITIAL_LOGINS);
    setInquiries(INITIAL_INQUIRIES);
    setMessages(INITIAL_MESSAGES);
  };

  return (
    <AppContext.Provider
      value={{
        activeView,
        setActiveView,
        selectedPackageForSignup,
        setSelectedPackageForSignup,
        pendingNoticeModal,
        setPendingNoticeModal,
        bannedModal,
        setBannedModal,
        currentUser,
        currentRole,
        authError,
        setAuthError,
        clients,
        cases,
        caseHistory,
        loginHistory,
        notifications,
        inquiries,
        messages,
        signupClient,
        loginUser,
        logout,
        approveClient,
        rejectClient,
        banClient,
        unbanClient,
        fileNewCase,
        updateCaseStatus,
        markNotificationRead,
        submitInquiry,
        markInquiryRead,
        deleteInquiry,
        sendDirectMessage,
        markMessageRead,
        resetDemoData
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
