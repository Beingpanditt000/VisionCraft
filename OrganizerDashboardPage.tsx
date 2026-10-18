import React, { useState } from 'react';
import { 
 LayoutDashboard, 
  Plus, 
  FileDown, 
  Users, 
  Trophy, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  ChevronRight, 
  Search, 
  Settings, 
  Sliders, 
  Sparkles,
  BarChart3,
  Check,
  Eye 
} from 'lucide-react';
import { PageView } from '../types/hackathon';

interface OrganizerDashboardProps {
  onNavigate: (page: PageView) => void;
}

export const OrganizerDashboardPage: React.FC<OrganizerDashboardProps> = ({ onNavigate }) => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newHackathonTitle, setNewHackathonTitle] = useState('');
  const [createdEvents, setCreatedEvents] = useState([
    {
      id: 'neuro-orbit',
      name: 'NeuroOrbit AI Global Sprint',
      status: 'Live',
      applicants: 1420,
      submissions: 42,
      reviewProgress: 35,
      prizePool: '$65,000',
      deadline: 'Oct 28, 2026',
    },
    {
      id: 'chainmatrix-summit',
      name: 'ChainMatrix Global DeFi & ZK Hack',
      status: 'Registration Open',
      applicants: 960,
      submissions: 0,
      reviewProgress: 0,
      prizePool: '$80,000',
      deadline: 'Nov 06, 2026',
    },
    {
      id: 'visioncraft-internal',
      name: 'VisionCraft Campus Ideathon 2026',
      status: 'Draft',
      applicants: 180,
      submissions: 0,
      reviewProgress: 0,
      prizePool: '$15,000',
      deadline: 'Nov 20, 2026',
    }
  ]);

  const handleCreateEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newHackathonTitle.trim()) return;

    setCreatedEvents(prev => [
      {
        id: `custom-${Date.now()}`,
        name: newHackathonTitle,
        status: 'Draft',
        applicants: 1,
        submissions: 0,
        reviewProgress: 0,
        prizePool: '$25,000',
        deadline: 'Dec 01, 2026',
      },
      ...prev
    ]);
    setNewHackathonTitle('');
    setShowCreateModal(false);
  };

  return (
    <div className="py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      
      {/* Top Banner & Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/[0.08] pb-6">
        <div>
          <div className="flex items-center space-x-2 text-violet-400 text-xs font-bold uppercase tracking-wider mb-1">
            <LayoutDashboard className="w-4 h-4" />
            <span>Organizer Operations Console</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">
            Organizer Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Monitor real-time applicant volume, coordinate judging rubrics, and publish leaderboards.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <button 
            onClick={() => alert('Submissions CSV exported successfully (mock preview).')}
            className="px-3.5 py-2.5 rounded-xl text-xs font-semibold text-slate-300 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.1] flex items-center space-x-2 transition-all"
          >
            <FileDown className="w-4 h-4 text-slate-400" />
            <span>Export Submissions</span>
          </button>
          
          <button
            onClick={() => setShowCreateModal(true)}
            className="px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 shadow-lg shadow-violet-600/30 flex items-center space-x-2 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Create Hackathon</span>
          </button>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="glass-panel rounded-2xl p-5 space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold uppercase tracking-wider">Active Hackathons</span>
            <Sparkles className="w-4 h-4 text-violet-400" />
          </div>
          <div className="text-3xl font-black text-white">2</div>
          <div className="text-[11px] text-emerald-400 font-medium">1 Live Now • 1 Registration Open</div>
        </div>

        <div className="glass-panel rounded-2xl p-5 space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold uppercase tracking-wider">Total Registrations</span>
            <Users className="w-4 h-4 text-indigo-400" />
          </div>
          <div className="text-3xl font-black text-white">2,560</div>
          <div className="text-[11px] text-emerald-400 font-medium">+184 builders today</div>
        </div>

        <div className="glass-panel rounded-2xl p-5 space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold uppercase tracking-wider">Projects Submitted</span>
            <Trophy className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-3xl font-black text-white">42</div>
          <div className="text-[11px] text-violet-300 font-medium">35% scored by judges</div>
        </div>

        <div className="glass-panel rounded-2xl p-5 space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold uppercase tracking-wider">Escrow Balance</span>
            <BarChart3 className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-3xl font-black text-white">$145,000</div>
          <div className="text-[11px] text-slate-400 font-medium">Secured in smart escrow</div>
        </div>

      </div>

      {/* Main Managed Events Section */}
      <div className="glass-panel rounded-2xl border border-white/[0.08] p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-white">Your Managed Competitions</h2>
            <p className="text-xs text-slate-400">Overview of all events hosted under your organization profile.</p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-white/[0.08] text-slate-400 uppercase tracking-wider">
                <th className="pb-3 font-semibold">Hackathon Name</th>
                <th className="pb-3 font-semibold">Status</th>
                <th className="pb-3 font-semibold">Registered</th>
                <th className="pb-3 font-semibold">Submissions</th>
                <th className="pb-3 font-semibold">Judging Progress</th>
                <th className="pb-3 font-semibold">Bounty Pool</th>
                <th className="pb-3 font-semibold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.05]">
              {createdEvents.map((evt) => (
                <tr key={evt.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="py-4 font-semibold text-white max-w-[220px] truncate">
                    {evt.name}
                  </td>
                  <td className="py-4">
                    <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${
                      evt.status === 'Live'
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                        : evt.status === 'Registration Open'
                        ? 'bg-violet-500/20 text-violet-300 border border-violet-500/30'
                        : 'bg-slate-500/20 text-slate-400 border border-slate-500/30'
                    }`}>
                      {evt.status}
                    </span>
                  </td>
                  <td className="py-4 text-slate-300 font-medium">
                    {evt.applicants.toLocaleString()}
                  </td>
                  <td className="py-4 text-slate-300 font-medium">
                    {evt.submissions}
                  </td>
                  <td className="py-4">
                    <div className="w-32 space-y-1">
                      <div className="flex justify-between text-[10px] text-slate-400">
                        <span>{evt.reviewProgress}%</span>
                      </div>
                      <div className="w-full bg-white/[0.05] h-1.5 rounded-full overflow-hidden">
                        <div 
                          className="bg-violet-500 h-full rounded-full" 
                          style={{ width: `${evt.reviewProgress}%` }}
                        />
                      </div>
                    </div>
                  </td>
                  <td className="py-4 font-bold text-violet-400">
                    {evt.prizePool}
                  </td>
                  <td className="py-4 text-right">
                    <button 
                      onClick={() => onNavigate('hackathons')}
                      className="px-3 py-1 rounded-lg text-xs font-semibold text-violet-300 hover:text-white bg-violet-950/40 hover:bg-violet-900/50 border border-violet-500/30"
                    >
                      Manage
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Scoring Rubric & Judge Matrix Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Rubric Matrix */}
        <div className="lg:col-span-2 glass-panel rounded-2xl p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Sliders className="w-4 h-4 text-violet-400" />
              <span>Standard Evaluation Rubric</span>
            </h3>
            <span className="text-[11px] text-slate-400">Weighted 100-Point Matrix</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            
            <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.05] space-y-1">
              <div className="flex justify-between items-center text-xs">
                <span className="font-semibold text-white">Technical Architecture</span>
                <span className="font-bold text-violet-400">35%</span>
              </div>
              <p className="text-[11px] text-slate-400">
                Code modularity, repo freshness, API integration depth, test coverage.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.05] space-y-1">
              <div className="flex justify-between items-center text-xs">
                <span className="font-semibold text-white">Novelty & Innovation</span>
                <span className="font-bold text-violet-400">30%</span>
              </div>
              <p className="text-[11px] text-slate-400">
                Originality of approach, unique value proposition, domain challenge fit.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.05] space-y-1">
              <div className="flex justify-between items-center text-xs">
                <span className="font-semibold text-white">Execution & UX</span>
                <span className="font-bold text-violet-400">20%</span>
              </div>
              <p className="text-[11px] text-slate-400">
                Interactive live demo functionality, UI polish, edge-case resilience.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.05] space-y-1">
              <div className="flex justify-between items-center text-xs">
                <span className="font-semibold text-white">Presentation & Impact</span>
                <span className="font-bold text-violet-400">15%</span>
              </div>
              <p className="text-[11px] text-slate-400">
                Pitch clarity, demo video quality, future commercialization roadmap.
              </p>
            </div>

          </div>
        </div>

        {/* Assigned Judges Snapshot */}
        <div className="glass-panel rounded-2xl p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white">Active Judges</h3>
            <span className="text-xs text-violet-400 font-semibold cursor-pointer hover:underline">+ Invite</span>
          </div>

          <div className="space-y-3 pt-1">
            <div className="flex items-center justify-between text-xs p-2.5 rounded-xl bg-white/[0.02] border border-white/[0.05]">
              <div className="flex items-center space-x-2.5">
                <div className="w-8 h-8 rounded-full bg-violet-600/30 flex items-center justify-center font-bold text-violet-300">
                  DR
                </div>
                <div>
                  <div className="font-semibold text-white">Dr. Rachel Vance</div>
                  <div className="text-[11px] text-slate-400">AI Research Scientist</div>
                </div>
              </div>
              <span className="text-emerald-400 text-[10px] font-semibold">Assigned (18)</span>
            </div>

            <div className="flex items-center justify-between text-xs p-2.5 rounded-xl bg-white/[0.02] border border-white/[0.05]">
              <div className="flex items-center space-x-2.5">
                <div className="w-8 h-8 rounded-full bg-indigo-600/30 flex items-center justify-center font-bold text-indigo-300">
                  MS
                </div>
                <div>
                  <div className="font-semibold text-white">Marcus Sterling</div>
                  <div className="text-[11px] text-slate-400">VP of Engineering</div>
                </div>
              </div>
              <span className="text-emerald-400 text-[10px] font-semibold">Assigned (24)</span>
            </div>

            <div className="flex items-center justify-between text-xs p-2.5 rounded-xl bg-white/[0.02] border border-white/[0.05]">
              <div className="flex items-center space-x-2.5">
                <div className="w-8 h-8 rounded-full bg-purple-600/30 flex items-center justify-center font-bold text-purple-300">
                  AP
                </div>
                <div>
                  <div className="font-semibold text-white">Ananya Patel</div>
                  <div className="text-[11px] text-slate-400">Founder & Investor</div>
                </div>
              </div>
              <span className="text-amber-400 text-[10px] font-semibold">Pending (6)</span>
            </div>
          </div>
        </div>

      </div>

      {/* CREATE HACKATHON MODAL */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative w-full max-w-lg rounded-2xl bg-[#0F111D] border border-violet-500/40 p-6 space-y-5 text-slate-200">
            <h3 className="text-xl font-bold text-white">Create New Hackathon</h3>
            <p className="text-xs text-slate-400">
              Quickly draft a new competition shell. You can configure prize tracks, rubrics, and sponsor logos later.
            </p>

            <form onSubmit={handleCreateEvent} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Hackathon Title
                </label>
                <input
                  type="text"
                  required
                  value={newHackathonTitle}
                  onChange={(e) => setNewHackathonTitle(e.target.value)}
                  placeholder="e.g. NextGen Web3 Accelerator Sprint"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.1] text-white text-xs sm:text-sm focus:outline-none focus:border-violet-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Estimated Prize Pool</label>
                  <input
                    type="text"
                    defaultValue="$25,000"
                    className="w-full px-3.5 py-2 rounded-xl bg-white/[0.04] border border-white/[0.1] text-white text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Target Start Date</label>
                  <input
                    type="text"
                    defaultValue="Dec 01, 2026"
                    className="w-full px-3.5 py-2 rounded-xl bg-white/[0.04] border border-white/[0.1] text-white text-xs"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end space-x-3 pt-3 border-t border-white/[0.08]">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 shadow-md"
                >
                  Create Hackathon
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
