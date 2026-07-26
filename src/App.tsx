import React, { useEffect } from 'react';
import { useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Hero } from './components/Hero';
import { AboutSection } from './components/AboutSection';
import { CopyrightLawSection } from './components/CopyrightLawSection';
import { TrademarkSection } from './components/TrademarkSection';
import { DigitalProtectionSection } from './components/DigitalProtectionSection';
import { ServiceCards } from './components/ServiceCards';
import { FaqSection } from './components/FaqSection';
import { ContactSection } from './components/ContactSection';
import { PackagesSelection } from './components/PackagesSelection';
import { SignupModal } from './components/SignupModal';
import { LoginModal } from './components/LoginModal';
import { ClientDashboardView } from './components/ClientDashboardView';
import { AdminDashboardView } from './components/AdminDashboardView';
import { PendingNoticeModal } from './components/PendingNoticeModal';
import { BannedModal } from './components/BannedModal';
import { ClientMessageWidget } from './components/ClientMessageWidget';

export const App: React.FC = () => {
  const { activeView, setActiveView, currentUser, currentRole } = useApp();

  // Scroll to top on view change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeView]);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans-body selection:bg-amber-500 selection:text-slate-950">
      
      {/* Top Navigation */}
      <Navbar />

      {/* Pending Account Notice Popup Modal & Floating Client Message Widget */}
      <PendingNoticeModal />
      <BannedModal />
      <ClientMessageWidget />

      {/* Main View Router */}
      <main className="flex-grow">
        {activeView === 'home' && (
          <>
            <Hero />
            <DigitalProtectionSection />
            <AboutSection />
            <CopyrightLawSection />
            <TrademarkSection />
            <ServiceCards />
            <FaqSection />
            <ContactSection />
          </>
        )}

        {activeView === 'about' && (
          <div className="pt-6">
            <AboutSection />
            <DigitalProtectionSection />
            <CopyrightLawSection />
            <TrademarkSection />
          </div>
        )}

        {activeView === 'services' && (
          <div className="pt-6">
            <ServiceCards />
            <TrademarkSection />
            <CopyrightLawSection />
          </div>
        )}

        {activeView === 'packages' && (
          <PackagesSelection />
        )}

        {activeView === 'faq' && (
          <div className="pt-6">
            <FaqSection />
          </div>
        )}

        {activeView === 'contact' && (
          <div className="pt-6">
            <ContactSection />
          </div>
        )}

        {activeView === 'login' && (
          <LoginModal initialMode="client" />
        )}

        {activeView === 'admin-login' && (
          <LoginModal initialMode="admin" />
        )}

        {activeView === 'signup' && (
          <SignupModal />
        )}

        {activeView === 'client-dashboard' && (
          <ClientDashboardView />
        )}

        {activeView === 'admin-dashboard' && (
          <AdminDashboardView />
        )}
      </main>

      {/* Footer */}
      <Footer />

    </div>
  );
};

export default App;
