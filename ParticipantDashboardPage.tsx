import React, { useState } from 'react';
import { 
  
} from 'lucide-react';
import { PageView } from '../types/hackathon';

interface ParticipantDashboardProps {
  onNavigate: (page: PageView) => void;
}

export const ParticipantDashboardPage: React.FC<ParticipantDashboardProps> = ({ onNavigate }) => {
  const [copiedInvite, setCopiedInvite] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState(false);

  const handleCopyInvite = () => {
    navigator.clipboard?.writeText('ORBIT-TEAM-789X');
    setCopiedInvite(true);
    setTimeout(() => setCopiedInvite(false), 2000);
  };

  return (
    <div className="py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      
      {/* Top Banner & Participant Profile */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-white/[0.08] pb-6">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-violet-600 via-indigo-600 to-purple-500 p-0.5 shadow-xl shadow-violet-600/30">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
                alt="Alex Chen"
                className="w-full h-full object-cover rounded-[14px]"
              />
            </div>
            <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-[#090A0F]" />
          </div>

          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Alex Chen
              </h1>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-violet-500/20 text-violet-300 border border-violet-500/30">
                PRO BUILDER
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Full-Stack AI Engineer • 4x Hackathon Finalist • Bengaluru, India
            </p>
            <div className="flex items-center space-x-3 mt-2 text-xs text-slate-400">
              <span className="text-violet-400 font-semibold">1,840 Builder XP</span>
              <span>•</span>
              <span>3 Active Badges</span>
              <span>•</span>
              <span className="text-emerald-400 flex items-center gap-1">
                <CheckCircle className="w-3.5 h-3.5" />
                GitHub Verified
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={() => onNavigate('hackathons')}
            className="px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 shadow-lg shadow-violet-600/30 transition-all flex items-center space-x-1.5"
          >
            <Sparkles className="w-4 h-4" />
            <span>Discover More Hackathons</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Active Sprint & Team Formation */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left 2 Cols: Active Hackathon & Project Draft */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Active Competition Card */}
          <div className="rounded-2xl border border-violet-500/40 bg-gradient-to-br from-violet-950/30 via-[#10121F] to-[#0A0C14] p-6 space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/[0.08] pb-4">
              <div>
                <span className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  <span>CURRENTLY COMPETING</span>
                </span>
                <h3 className="text-xl font-bold text-white mt-2">
                  NeuroOrbit AI Global Sprint
                </h3>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-slate-400 uppercase font-bold block">Submission Deadline</span>
                <span className="text-sm font-extrabold text-amber-300 flex items-center gap-1 justify-end">
                  <Clock className="w-4 h-4" />
                  38h : 14m : 02s
                </span>
              </div>
            </div>

            {/* Project Submission Checklist & Status */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-white">Project Draft: AegisAgent</h4>
                  <p className="text-xs text-slate-400">Target Track: Autonomous Enterprise Agents ($25,000 Bounty)</p>
                </div>
                <span className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-violet-950/50 border border-violet-500/30 text-violet-300">
                  75% Ready
                </span>
              </div>

              {/* Progress bar */}
              <div className="w-full bg-white/[0.06] h-2 rounded-full overflow-hidden">
                <div className="bg-gradient-to-r from-violet-500 to-indigo-400 h-full w-3/4 rounded-full" />
              </div>

              {/* Submission Requirements Checklist */}
              <div className="space-y-2.5 pt-2">
                <div className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] border border-white/[0.06] text-xs">
                  <div className="flex items-center space-x-2.5">
                    <CheckCircle className="w-4 h-4 text-emerald-400" />
                    <span className="text-slate-200">GitHub Repository Linked</span>
                  </div>
                  <span className="text-slate-400 font-mono text-[11px]">github.com/alexchen/aegis-agent</span>
                </div>

                <div className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] border border-white/[0.06] text-xs">
                  <div className="flex items-center space-x-2.5">
                    <CheckCircle className="w-4 h-4 text-emerald-400" />
                    <span className="text-slate-200">Architecture Diagram & README</span>
                  </div>
                  <span className="text-emerald-400 font-semibold text-[11px]">Verified</span>
                </div>

                <div className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] border border-white/[0.06] text-xs">
                  <div className="flex items-center space-x-2.5">
                    <CheckCircle className="w-4 h-4 text-emerald-400" />
                    <span className="text-slate-200">Live Web Preview / Sandbox URL</span>
                  </div>
                  <span className="text-violet-400 font-mono text-[11px]">https://aegis-demo.orbit.app</span>
                </div>

                <div className="flex items-center justify-between p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs">
                  <div className="flex items-center space-x-2.5">
                    <AlertCircle className="w-4 h-4 text-amber-400" />
                    <span className="text-amber-200">2-Minute Video Pitch Walkthrough</span>
                  </div>
                  <span className="text-amber-300 font-semibold text-[11px]">Pending Upload</span>
                </div>
              </div>

              {/* Submit CTA */}
              <div className="pt-2 flex items-center justify-between">
                <p className="text-[11px] text-slate-400">
                  You can edit submissions until the deadline strikes.
                </p>

                <button
                  onClick={() => setSubmissionSuccess(true)}
                  className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 shadow-md flex items-center space-x-2"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Submit Final Project</span>
                </button>
              </div>

              {submissionSuccess && (
                <div className="p-3.5 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs flex items-center justify-between animate-in fade-in">
                  <span>🎉 Your project draft has been submitted to the judging pipeline!</span>
                  <button 
                    onClick={() => setSubmissionSuccess(false)}
                    className="text-emerald-400 hover:underline font-bold"
                  >
                    Dismiss
                  </button>
                </div>
              )}

            </div>
          </div>

          {/* Registered History & Bookmarks */}
          <div className="glass-panel rounded-2xl p-6 space-y-4">
            <h3 className="text-base font-bold text-white">Your Registered Competitions</h3>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                <div>
                  <div className="font-semibold text-white text-sm">ChainMatrix Global DeFi & ZK Hack</div>
                  <div className="text-xs text-slate-400">Starts Nov 02, 2026 • Registered as Team Lead</div>
                </div>
                <span className="px-2.5 py-1 rounded text-[11px] font-semibold bg-violet-500/20 text-violet-300">
                  Confirmed
                </span>
              </div>

              <div className="flex items-center justify-between p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                <div>
                  <div className="font-semibold text-white text-sm">BioPulse Computational Health Sprint</div>
                  <div className="text-xs text-slate-400">Starts Nov 14, 2026 • Seeking Team Members</div>
                </div>
                <button
                  onClick={() => onNavigate('hackathons')}
                  className="text-xs text-violet-400 hover:underline font-semibold"
                >
                  Find Teammates
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* Right Col: Team Roster & Teammate Lobby */}
        <div className="space-y-6">
          
          {/* Team Box */}
          <div className="glass-panel rounded-2xl p-6 space-y-5">
            <div className="flex items-center justify-between border-b border-white/[0.08] pb-4">
              <div>
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Current Squad</span>
                <h4 className="text-base font-bold text-white">OrbitByte (3/4 Members)</h4>
              </div>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300">
                LOBBY OPEN
              </span>
            </div>

            {/* Invite code */}
            <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06] flex items-center justify-between">
              <div>
                <span className="text-[10px] text-slate-400 uppercase font-bold block">Team Invite Code</span>
                <span className="font-mono text-xs font-bold text-violet-400">ORBIT-TEAM-789X</span>
              </div>
              <button
                onClick={handleCopyInvite}
                className="p-2 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] text-slate-300 hover:text-white transition-colors"
                title="Copy Code"
              >
                {copiedInvite ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>

            {/* Member List */}
            <div className="space-y-3">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">Roster</span>

              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center space-x-2.5">
                  <div className="w-8 h-8 rounded-full bg-violet-600/30 flex items-center justify-center font-bold text-violet-300">
                    AC
                  </div>
                  <div>
                    <div className="font-semibold text-white">Alex Chen (You)</div>
                    <div className="text-[11px] text-slate-400">Full-Stack / Python & Next.js</div>
                  </div>
                </div>
                <span className="text-[10px] text-violet-400 font-bold">LEAD</span>
              </div>

              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center space-x-2.5">
                  <div className="w-8 h-8 rounded-full bg-indigo-600/30 flex items-center justify-center font-bold text-indigo-300">
                    SK
                  </div>
                  <div>
                    <div className="font-semibold text-white">Siddharth Kumar</div>
                    <div className="text-[11px] text-slate-400">ML Engineer / PyTorch & CUDA</div>
                  </div>
                </div>
                <span className="text-[10px] text-slate-400">MEMBER</span>
              </div>

              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center space-x-2.5">
                  <div className="w-8 h-8 rounded-full bg-purple-600/30 flex items-center justify-center font-bold text-purple-300">
                    EM
                  </div>
                  <div>
                    <div className="font-semibold text-white">Elena Morales</div>
                    <div className="text-[11px] text-slate-400">Product & UI/UX Designer</div>
                  </div>
                </div>
                <span className="text-[10px] text-slate-400">MEMBER</span>
              </div>

              {/* Slot 4 Empty */}
              <div className="p-3 rounded-xl border border-dashed border-white/[0.12] text-center space-y-1">
                <div className="text-xs font-semibold text-slate-400">+ 1 Slot Available</div>
                <p className="text-[11px] text-slate-500">Looking for Backend / DevOps engineer</p>
              </div>
            </div>
          </div>

          {/* Quick Mentorship Hours */}
          <div className="glass-panel rounded-2xl p-5 space-y-3">
            <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-violet-400" />
              <span>Live Mentor Office Hours</span>
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Book a 15-minute 1-on-1 session with sponsor engineers to debug API hurdles or refine your pitch rubric.
            </p>
            <button 
              onClick={() => alert('Mentor queue request logged! A mentor will ping your team channel in 10 minutes.')}
              className="w-full py-2 rounded-xl text-xs font-semibold text-violet-300 hover:text-white bg-violet-950/40 hover:bg-violet-900/50 border border-violet-500/30 transition-colors"
            >
              Request Mentor Assistance
            </button>
          </div>

        </div>

      </div>

    </div>
  );
};
