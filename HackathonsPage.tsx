import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Filter, 
  Calendar, 
  MapPin, 
  Users, 
  Trophy, 
  CheckCircle, 
  ExternalLink, 
  X, 
  Flame, 
  ArrowRight,
  ShieldCheck,
  Tag,
  Clock,
  Sparkles,
  Info
} from 'lucide-react';
import { Hackathon, HackathonStatus } from '../types/hackathon';
import { SAMPLE_HACKATHONS } from '../data/sampleHackathons';

interface HackathonsPageProps {
  initialSelectedId?: string | null;
  onSelectHackathon?: (id: string | null) => void;
}

export const HackathonsPage: React.FC<HackathonsPageProps> = ({ 
  initialSelectedId = null,
  onSelectHackathon
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'prizes' | 'participants' | 'soonest'>('prizes');
  const [activeModalHackathon, setActiveModalHackathon] = useState<Hackathon | null>(() => {
    if (initialSelectedId) {
      return SAMPLE_HACKATHONS.find(h => h.id === initialSelectedId) || null;
    }
    return null;
  });
  const [registeredIds, setRegisteredIds] = useState<Record<string, boolean>>({});

  const categories = [
    'All Categories',
    'AI & Machine Learning',
    'Web3 & Crypto',
    'HealthTech',
    'Climate & IoT',
    'CyberSecurity',
    'Open Innovation'
  ];

  const statusFilters = [
    { id: 'all', label: 'All Events' },
    { id: 'live', label: 'Live Now', badgeColor: 'bg-emerald-500/20 text-emerald-300' },
    { id: 'registration_open', label: 'Registration Open', badgeColor: 'bg-violet-500/20 text-violet-300' },
    { id: 'upcoming', label: 'Upcoming', badgeColor: 'bg-indigo-500/20 text-indigo-300' },
  ];

  // Filtered & Sorted Hackathons
  const filteredHackathons = useMemo(() => {
    return SAMPLE_HACKATHONS.filter(hackathon => {
      // Search matching
      const matchesSearch = 
        hackathon.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        hackathon.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
        hackathon.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));

      // Status matching
      const matchesStatus = selectedStatus === 'all' || hackathon.status === selectedStatus;

      // Category matching
      const matchesCategory = selectedCategory === 'all' || hackathon.category === selectedCategory;

      return matchesSearch && matchesStatus && matchesCategory;
    }).sort((a, b) => {
      if (sortBy === 'prizes') return b.prizePool - a.prizePool;
      if (sortBy === 'participants') return b.participantsCount - a.participantsCount;
      return a.startDate.localeCompare(b.startDate);
    });
  }, [searchQuery, selectedStatus, selectedCategory, sortBy]);

  const handleRegister = (id: string) => {
    setRegisteredIds(prev => ({ ...prev, [id]: true }));
  };

  const getStatusBadge = (status: HackathonStatus) => {
    switch (status) {
      case 'live':
        return (
          <span className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
            <span>Live Now</span>
          </span>
        );
      case 'registration_open':
        return (
          <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-violet-500/20 text-violet-300 border border-violet-500/40">
            <span>Registration Open</span>
          </span>
        );
      case 'upcoming':
        return (
          <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full text-xs font-medium bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
            <span>Upcoming</span>
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full text-xs font-medium bg-slate-500/20 text-slate-300">
            <span>Concluded</span>
          </span>
        );
    }
  };

  return (
    <div className="py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      
      {/* Header Bar */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/[0.08] pb-6">
        <div>
          <div className="flex items-center space-x-2 text-violet-400 text-xs font-bold uppercase tracking-wider mb-1">
            <Sparkles className="w-4 h-4" />
            <span>Discover Opportunities</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Explore Hackathons
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Compete in premier challenges hosted by global foundations, labs, and tech giants.
          </p>
        </div>

        <div className="flex items-center space-x-3 text-xs">
          <span className="text-slate-400 font-medium">Sort by:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="bg-[#121422] border border-white/[0.12] rounded-lg px-3 py-2 text-white focus:outline-none focus:border-violet-500"
          >
            <option value="prizes">Highest Prize Pool</option>
            <option value="participants">Most Participants</option>
            <option value="soonest">Earliest Start Date</option>
          </select>
        </div>
      </div>

      {/* Search and Filters Bar */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-3">
          
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by hackathon name, tech stack (e.g. AI, Rust, Python), or keywords..."
              className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-[#10121C] border border-white/[0.1] text-white placeholder-slate-500 text-xs sm:text-sm focus:outline-none focus:border-violet-500/80 focus:ring-1 focus:ring-violet-500"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Status Pills */}
          <div className="flex items-center overflow-x-auto space-x-2 pb-1 sm:pb-0">
            {statusFilters.map((st) => (
              <button
                key={st.id}
                onClick={() => setSelectedStatus(st.id)}
                className={`px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedStatus === st.id
                    ? 'bg-violet-600 text-white shadow-md shadow-violet-600/30'
                    : 'bg-[#121422] text-slate-400 hover:text-white border border-white/[0.08]'
                }`}
              >
                {st.label}
              </button>
            ))}
          </div>

        </div>

        {/* Category Filter Chips */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => {
            const isSelected = selectedCategory === (cat === 'All Categories' ? 'all' : cat);
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat === 'All Categories' ? 'all' : cat)}
                className={`text-xs px-3 py-1.5 rounded-lg whitespace-nowrap transition-all ${
                  isSelected
                    ? 'bg-white/[0.12] text-white border border-violet-400/50 font-semibold'
                    : 'bg-white/[0.02] text-slate-400 hover:text-slate-200 border border-white/[0.05]'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Events Results Count */}
      <div className="flex items-center justify-between text-xs text-slate-400">
        <span>Showing <strong className="text-white">{filteredHackathons.length}</strong> hackathons</span>
        {(searchQuery || selectedStatus !== 'all' || selectedCategory !== 'all') && (
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedStatus('all');
              setSelectedCategory('all');
            }}
            className="text-violet-400 hover:underline"
          >
            Clear all filters
          </button>
        )}
      </div>

      {/* Cards Grid */}
      {filteredHackathons.length === 0 ? (
        <div className="p-12 text-center rounded-2xl border border-white/[0.08] bg-[#10121C] space-y-3">
          <Info className="w-8 h-8 text-violet-400 mx-auto" />
          <h3 className="text-lg font-bold text-white">No Hackathons Match Your Filter</h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            Try adjusting your search query, status, or category filters to discover other active competitions.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedStatus('all');
              setSelectedCategory('all');
            }}
            className="px-4 py-2 bg-violet-600 rounded-lg text-xs font-semibold text-white mt-2"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredHackathons.map((hackathon) => {
            const isRegistered = registeredIds[hackathon.id];

            return (
              <div
                key={hackathon.id}
                className="group relative rounded-2xl border border-white/[0.08] hover:border-violet-500/50 bg-[#0F111C] hover:bg-[#131624] transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-xl hover:shadow-2xl hover:shadow-violet-950/20"
              >
                {/* Card Header Gradient Banner */}
                <div className={`h-24 bg-gradient-to-r ${hackathon.bannerGradient} relative p-4 flex items-start justify-between`}>
                  <div className="flex items-center space-x-2">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold tracking-wide uppercase bg-black/40 backdrop-blur-md text-white border border-white/10">
                      {hackathon.category}
                    </span>
                  </div>
                  <div>{getStatusBadge(hackathon.status)}</div>
                </div>

                {/* Organizer Avatar Float */}
                <div className="px-5 -mt-6 flex items-center justify-between">
                  <div className="flex items-center space-x-2.5">
                    <img
                      src={hackathon.organizer.avatar}
                      alt={hackathon.organizer.name}
                      className="w-12 h-12 rounded-xl object-cover border-2 border-[#0F111C] shadow-md bg-slate-800"
                    />
                    <div className="text-xs">
                      <div className="flex items-center space-x-1 font-semibold text-slate-200">
                        <span>{hackathon.organizer.name}</span>
                        {hackathon.organizer.verified && (
                          <ShieldCheck className="w-3.5 h-3.5 text-violet-400" />
                        )}
                      </div>
                      <span className="text-[11px] text-slate-400">{hackathon.location}</span>
                    </div>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="text-lg font-bold text-white group-hover:text-violet-300 transition-colors line-clamp-1">
                      {hackathon.title}
                    </h3>
                    <p className="text-xs text-slate-400 line-clamp-2 mt-1.5 leading-relaxed">
                      {hackathon.tagline}
                    </p>
                  </div>

                  {/* Prize & Hacker count strip */}
                  <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.05] flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">Bounty Pool</span>
                      <span className="text-lg font-black text-transparent bg-clip-text bg-gradient-to-r from-violet-300 to-indigo-200">
                        {hackathon.currency}{hackathon.prizePool.toLocaleString()}
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">Participants</span>
                      <span className="text-sm font-bold text-slate-200 flex items-center justify-end gap-1">
                        <Users className="w-3.5 h-3.5 text-violet-400" />
                        {hackathon.participantsCount}
                      </span>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5">
                    {hackathon.tags.slice(0, 3).map((tag, i) => (
                      <span key={i} className="text-[11px] px-2 py-0.5 rounded bg-white/[0.03] text-slate-300 border border-white/[0.05]">
                        {tag}
                      </span>
                    ))}
                    {hackathon.tags.length > 3 && (
                      <span className="text-[11px] px-1.5 py-0.5 rounded bg-white/[0.03] text-slate-400">
                        +{hackathon.tags.length - 3}
                      </span>
                    )}
                  </div>

                  {/* Dates & Team Size info */}
                  <div className="flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-white/[0.05]">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-slate-400" />
                      {hackathon.startDate}
                    </span>
                    <span>{hackathon.minTeamSize}-{hackathon.maxTeamSize} Members</span>
                  </div>
                </div>

                {/* Card Actions */}
                <div className="p-5 pt-0 flex items-center gap-2">
                  <button
                    onClick={() => setActiveModalHackathon(hackathon)}
                    className="flex-1 py-2.5 px-3 rounded-xl text-xs font-semibold text-slate-200 bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] hover:border-violet-500/30 transition-all text-center"
                  >
                    View Details
                  </button>

                  <button
                    onClick={() => handleRegister(hackathon.id)}
                    className={`py-2.5 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center space-x-1 ${
                      isRegistered
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 cursor-default'
                        : 'bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white shadow-md shadow-violet-600/30'
                    }`}
                  >
                    {isRegistered ? (
                      <>
                        <CheckCircle className="w-3.5 h-3.5" />
                        <span>Registered</span>
                      </>
                    ) : (
                      <>
                        <span>Join</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>
                </div>

              </div>
            );
          })}
        </div>
      )}

      {/* ========================================================= */}
      {/* HACKATHON DETAILS MODAL */}
      {/* ========================================================= */}
      {activeModalHackathon && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl bg-[#0F111D] border border-violet-500/40 shadow-2xl p-6 sm:p-8 space-y-6 text-slate-200">
            
            {/* Close Button */}
            <button
              onClick={() => setActiveModalHackathon(null)}
              className="absolute top-4 right-4 p-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-2">
                {getStatusBadge(activeModalHackathon.status)}
                <span className="px-2.5 py-1 rounded text-xs font-semibold bg-violet-500/20 text-violet-300 border border-violet-500/30">
                  {activeModalHackathon.category}
                </span>
                <span className="text-xs text-slate-400 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-violet-400" />
                  {activeModalHackathon.location}
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                {activeModalHackathon.title}
              </h2>
              
              <p className="text-sm text-slate-300">
                {activeModalHackathon.description}
              </p>
            </div>

            {/* Prize & Meta Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-xl bg-white/[0.03] border border-white/[0.08]">
              <div>
                <span className="text-[10px] text-slate-400 uppercase font-bold block">Prize Pool</span>
                <span className="text-xl font-black text-violet-400">
                  {activeModalHackathon.currency}{activeModalHackathon.prizePool.toLocaleString()}
                </span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 uppercase font-bold block">Registered</span>
                <span className="text-base font-bold text-white">
                  {activeModalHackathon.participantsCount} Builders
                </span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 uppercase font-bold block">Team Size</span>
                <span className="text-base font-bold text-white">
                  {activeModalHackathon.minTeamSize}-{activeModalHackathon.maxTeamSize} People
                </span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 uppercase font-bold block">Submission Closes</span>
                <span className="text-xs font-semibold text-slate-200 mt-0.5 block">
                  {activeModalHackathon.deadline}
                </span>
              </div>
            </div>

            {/* Prize Tracks */}
            <div>
              <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-3 flex items-center gap-2">
                <Trophy className="w-4 h-4 text-violet-400" />
                <span>Prize Tracks & Bounties</span>
              </h4>
              <div className="space-y-2.5">
                {activeModalHackathon.tracks.map((tr, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06] flex items-center justify-between">
                    <div>
                      <div className="text-sm font-semibold text-white">{tr.name}</div>
                      <div className="text-xs text-slate-400 mt-0.5">{tr.description}</div>
                    </div>
                    <div className="text-sm font-extrabold text-emerald-400 pl-4 shrink-0">
                      {tr.prize}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Tech Tags */}
            <div>
              <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Technologies & Topics</h4>
              <div className="flex flex-wrap gap-2">
                {activeModalHackathon.tags.map((tag, i) => (
                  <span key={i} className="text-xs px-3 py-1 rounded-lg bg-violet-950/40 border border-violet-500/30 text-violet-300">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Modal Actions */}
            <div className="pt-4 border-t border-white/[0.08] flex items-center justify-end space-x-3">
              <button
                onClick={() => setActiveModalHackathon(null)}
                className="px-5 py-2.5 rounded-xl text-xs font-semibold text-slate-400 hover:text-white"
              >
                Close
              </button>
              
              <button
                onClick={() => {
                  handleRegister(activeModalHackathon.id);
                  setActiveModalHackathon(null);
                }}
                className="px-6 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 shadow-lg shadow-violet-600/30 flex items-center space-x-2"
              >
                {registeredIds[activeModalHackathon.id] ? (
                  <>
                    <CheckCircle className="w-4 h-4" />
                    <span>You're Registered!</span>
                  </>
                ) : (
                  <>
                    <span>Confirm Registration</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
