import React, { useState } from 'react';
import { 
  Rocket, 
  Menu, 
  X, 
  Compass, 
  LayoutDashboard, 
  UserCheck, 
  ChevronRight,
  Flame
} from 'lucide-react';
import { PageView } from '../types/hackathon';

interface NavbarProps {
  currentPage: PageView;
  onNavigate: (page: PageView) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPage, onNavigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks: { id: PageView; label: string; icon: React.ReactNode; badge?: string }[] = [
    { id: 'home', label: 'Home', icon: <Rocket className="w-4 h-4" /> },
    { id: 'hackathons', label: 'Hackathons', icon: <Compass className="w-4 h-4" />, badge: '6 Live' },
    { id: 'organizer', label: 'Organizer Dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
    { id: 'participant', label: 'Participant Dashboard', icon: <UserCheck className="w-4 h-4" /> },
  ];

  const handleLinkClick = (page: PageView) => {
    onNavigate(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/[0.08] bg-[#08090E]/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Brand */}
          <button 
            onClick={() => handleLinkClick('home')}
            className="flex items-center space-x-3 text-left group focus:outline-none"
          >
            <div className="relative flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-br from-violet-600 via-indigo-600 to-purple-800 p-0.5 shadow-lg shadow-violet-600/30 group-hover:shadow-violet-600/50 transition-all duration-300">
              <div className="w-full h-full bg-[#0E1017] rounded-[10px] flex items-center justify-center">
                <Rocket className="w-5 h-5 text-violet-400 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300" />
              </div>
              <span className="absolute -top-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-violet-500"></span>
              </span>
            </div>
            
            <div className="flex flex-col">
              <div className="flex items-center space-x-1.5">
                <span className="text-xl font-extrabold tracking-tight text-white group-hover:text-violet-200 transition-colors">
                  HackOrbit
                </span>
                <span className="px-1.5 py-0.5 text-[10px] font-bold tracking-wider uppercase rounded bg-violet-500/20 text-violet-300 border border-violet-500/30">
                  AI
                </span>
              </div>
              <span className="text-[11px] font-medium text-slate-400 -mt-0.5 tracking-wide">
                Hackathon Operating System
              </span>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => {
              const isActive = currentPage === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleLinkClick(link.id)}
                  className={`relative flex items-center space-x-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'text-white bg-violet-950/40 border border-violet-500/30 shadow-inner shadow-violet-500/10'
                      : 'text-slate-300 hover:text-white hover:bg-white/[0.04]'
                  }`}
                >
                  <span className={`${isActive ? 'text-violet-400' : 'text-slate-400 group-hover:text-slate-200'}`}>
                    {link.icon}
                  </span>
                  <span>{link.label}</span>
                  {link.badge && (
                    <span className="ml-1 px-1.5 py-0.5 text-[10px] font-semibold rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                      {link.badge}
                    </span>
                  )}
                  {isActive && (
                    <span className="absolute bottom-0 left-2 right-2 h-0.5 bg-gradient-to-r from-violet-500 to-indigo-400 rounded-full shadow-[0_0_8px_#8b5cf6]"></span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action CTA */}
          <div className="hidden lg:flex items-center space-x-3">
            <button
              onClick={() => handleLinkClick('organizer')}
              className="px-3.5 py-2 text-xs font-semibold text-slate-300 hover:text-white transition-colors"
            >
              Host a Hackathon
            </button>
            <button
              onClick={() => handleLinkClick('hackathons')}
              className="relative inline-flex items-center space-x-2 px-4 py-2 text-xs font-bold text-white bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 rounded-lg shadow-md shadow-violet-600/30 hover:shadow-violet-600/50 transition-all duration-200 active:scale-95"
            >
              <Flame className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
              <span>Explore Events</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Mobile menu toggle button */}
          <div className="flex md:hidden items-center">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/[0.05] focus:outline-none border border-white/[0.08]"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-white/[0.08] bg-[#0A0C14]/95 backdrop-blur-2xl px-4 pt-3 pb-6 space-y-2 animate-in slide-in-from-top-4 duration-200">
          {navLinks.map((link) => {
            const isActive = currentPage === link.id;
            return (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.id)}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-violet-900/30 text-white border border-violet-500/40'
                    : 'text-slate-300 hover:text-white hover:bg-white/[0.04]'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <span className={isActive ? 'text-violet-400' : 'text-slate-400'}>
                    {link.icon}
                  </span>
                  <span>{link.label}</span>
                </div>
                {link.badge && (
                  <span className="px-2 py-0.5 text-xs font-semibold rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    {link.badge}
                  </span>
                )}
              </button>
            );
          })}
          
          <div className="pt-3 border-t border-white/[0.08] flex flex-col space-y-2">
            <button
              onClick={() => handleLinkClick('organizer')}
              className="w-full py-2.5 px-4 text-center text-xs font-semibold text-slate-300 hover:text-white border border-white/[0.1] rounded-lg bg-white/[0.02]"
            >
              Host a Hackathon
            </button>
            <button
              onClick={() => handleLinkClick('hackathons')}
              className="w-full py-2.5 px-4 text-center text-xs font-bold text-white bg-gradient-to-r from-violet-600 to-indigo-600 rounded-lg shadow-md shadow-violet-600/30"
            >
              Explore All Hackathons
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
