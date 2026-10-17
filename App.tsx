import React, { useState } from 'react'
import { PageView } from './types/hackathon'
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { LandingPage } from './pages/LandingPage';
import { HackathonsPage } from './pages/HackathonsPage';
import { OrganizerDashboardPage } from './pages/OrganizerDashboardPage';
import { ParticipantDashboardPage } from './pages/ParticipantDashboardPage';

export const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<PageView>('home');
  const [selectedHackathonId, setSelectedHackathonId] = useState<string | null>(null);

  const handleNavigate = (page: PageView) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectHackathonFromLanding = (id: string) => {
    setSelectedHackathonId(id);
    setCurrentPage('hackathons');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#08090E] text-slate-100 flex flex-col font-sans selection:bg-violet-600 selection:text-white antialiased">
      {/* Global Navigation Bar */}
      <Navbar currentPage={currentPage} onNavigate={handleNavigate} />

      {/* Main Page Content */}
      <main className="flex-1">
        {currentPage === 'home' && (
          <LandingPage 
            onNavigate={handleNavigate} 
            onSelectHackathon={handleSelectHackathonFromLanding}
          />
        )}

        {currentPage === 'hackathons' && (
          <HackathonsPage 
            initialSelectedId={selectedHackathonId}
            onSelectHackathon={setSelectedHackathonId}
          />
        )}

        {currentPage === 'organizer' && (
          <OrganizerDashboardPage onNavigate={handleNavigate} />
        )}

        {currentPage === 'participant' && (
          <ParticipantDashboardPage onNavigate={handleNavigate} />
        )}
      </main>

      {/* Global Footer */}
      <Footer onNavigate={handleNavigate} />
    </div>
  );
};

export default App;
