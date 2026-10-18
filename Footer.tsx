import {
import { Rocket, ShieldCheck, Heart, MessageSquare, Share2, Globe } from 'lucide-react';
import { PageView } from '../types/hackathon';

interface FooterProps {
  onNavigate: (page: PageView) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="border-t border-white/[0.08] bg-[#06070B] text-slate-400 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-white/[0.06]">
          
          {/* Brand Info */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center space-x-2.5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center p-1.5 shadow-md shadow-violet-600/30">
                <Rocket className="w-4 h-4 text-white" />
              </div>
              <span className="text-lg font-extrabold text-white tracking-tight">HackOrbit <span className="text-violet-400">AI</span></span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              The next-generation hackathon management platform empowering universities, developer DAOs, and global enterprises to launch world-class builder competitions.
            </p>
            <div className="flex items-center space-x-3 pt-2">
              <a href="#" className="w-8 h-8 rounded-lg bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-slate-400 hover:text-white hover:border-violet-500/50 transition-colors" title="GitHub">
                <Globe className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 rounded-lg bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-slate-400 hover:text-white hover:border-violet-500/50 transition-colors" title="Community">
                <MessageSquare className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 rounded-lg bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-slate-400 hover:text-white hover:border-violet-500/50 transition-colors" title="Share">
                <Share2 className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-bold tracking-wider text-white uppercase mb-4">Platform</h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button onClick={() => onNavigate('home')} className="hover:text-violet-400 transition-colors">
                  Overview & Vision
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('hackathons')} className="hover:text-violet-400 transition-colors">
                  Live Competitions
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('hackathons')} className="hover:text-violet-400 transition-colors">
                  Prize Pools & Tracks
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('participant')} className="hover:text-violet-400 transition-colors">
                  Builder Leaderboard
                </button>
              </li>
            </ul>
          </div>

          {/* For Organizers */}
          <div>
            <h4 className="text-xs font-bold tracking-wider text-white uppercase mb-4">Organizers</h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button onClick={() => onNavigate('organizer')} className="hover:text-violet-400 transition-colors">
                  Host an Event
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('organizer')} className="hover:text-violet-400 transition-colors">
                  Rubric Scoring System
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('organizer')} className="hover:text-violet-400 transition-colors">
                  Judge Management
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('organizer')} className="hover:text-violet-400 transition-colors">
                  Enterprise Sponsorships
                </button>
              </li>
            </ul>
          </div>

          {/* Platform Status & Security */}
          <div>
            <h4 className="text-xs font-bold tracking-wider text-white uppercase mb-4">Network Status</h4>
            <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-2">
              <div className="flex items-center space-x-2 text-xs text-emerald-400 font-medium">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>All Systems Operational</span>
              </div>
              <p className="text-[11px] text-slate-400">
                99.98% uptime across worldwide judging compute clusters and submission gateways.
              </p>
              <div className="flex items-center space-x-1.5 text-[11px] text-slate-400 pt-1 border-t border-white/[0.05]">
                <ShieldCheck className="w-3.5 h-3.5 text-violet-400" />
                <span>Enterprise Grade Security</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 space-y-4 sm:space-y-0">
          <p>© 2026 HackOrbit AI Inc. All rights reserved.</p>
          <div className="flex items-center space-x-6">
            <span className="hover:text-slate-300 cursor-pointer">Terms of Service</span>
            <span className="hover:text-slate-300 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-slate-300 cursor-pointer">Code of Conduct</span>
          </div>
          <div className="flex items-center space-x-1 text-slate-400 text-xs">
            <span>Crafted for high-velocity builders</span>
            <Heart className="w-3.5 h-3.5 text-violet-500 fill-violet-500/40 inline mx-0.5" />
          </div>
        </div>
      </div>
    </footer>
  );
};
