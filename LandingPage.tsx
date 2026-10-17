import React from 'react';
import { 
  Rocket, 
  Trophy, 
  Users,
  Sparkles, 
  Globe, 
  ArrowRight, 
  CheckCircle2, 
  Cpu, 
  Layers, 
  ShieldAlert, 
  Flame, 
  Clock, 
  Calendar, 
  MapPin, 
  Award,
  Zap,
  Code2,
  Workflow
} from 'lucide-react';
import { PageView } from '../types/hackathon';
import { SAMPLE_HACKATHONS, PLATFORM_STATS } from '../data/sampleHackathons';

interface LandingPageProps {
  onNavigate: (page: PageView) => void;
  onSelectHackathon?: (id: string) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onNavigate, onSelectHackathon }) => {
  const featuredHackathon = SAMPLE_HACKATHONS.find(h => h.id === 'neuro-orbit-2026') || SAMPLE_HACKATHONS[0];

  return (
    <div className="relative overflow-hidden">
      {/* Background radial glows and grid */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[650px] bg-gradient-to-b from-violet-600/15 via-indigo-600/5 to-transparent blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-40 right-[-10%] w-[500px] h-[500px] bg-violet-600/10 rounded-full blur-[120px] pointer-events-none -z-10" />
      <div className="absolute top-96 left-[-10%] w-[500px] h-[500px] bg-cyan-600/10 rounded-full blur-[120px] pointer-events-none -z-10" />

      {/* ========================================================= */}
      {/* 1. HERO SECTION */}
      {/* ========================================================= */}
      <section className="relative pt-12 pb-20 md:pt-20 md:pb-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto space-y-6">
          
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-violet-950/60 border border-violet-500/30 text-violet-300 text-xs font-semibold shadow-lg shadow-violet-900/20 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-violet-400 animate-ping"></span>
            <span className="flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-amber-300 fill-amber-300" />
              The Next-Gen Hackathon Operating System
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.1]">
            Where Builders Orbit,{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-purple-300 to-indigo-300">
              Innovate
            </span>{' '}
            & Launch.
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-xl text-slate-300 max-w-2xl font-normal leading-relaxed">
            HackOrbit AI powers high-velocity hackathons for universities, developer DAOs, and global enterprises. Coordinate challenges, form dream teams, and judge submissions with unmatched clarity.
          </p>

          {/* CTAs */}
          <div className="pt-2 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
            <button
              onClick={() => onNavigate('hackathons')}
              className="w-full sm:w-auto inline-flex items-center justify-center space-x-2.5 px-7 py-3.5 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-violet-600 via-indigo-600 to-purple-600 hover:from-violet-500 hover:to-indigo-500 shadow-xl shadow-violet-600/30 hover:shadow-violet-600/50 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
            >
              <Rocket className="w-4 h-4 text-violet-200" />
              <span>Explore Live Hackathons</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => onNavigate('organizer')}
              className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-7 py-3.5 rounded-xl font-semibold text-sm text-slate-200 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.12] hover:border-violet-500/40 backdrop-blur-md transition-all duration-200"
            >
              <span>Host as Organizer</span>
            </button>
          </div>

          {/* Trust badges */}
          <div className="pt-4 flex items-center space-x-6 text-xs text-slate-400">
            <div className="flex items-center space-x-1.5">
              <CheckCircle2 className="w-4 h-4 text-violet-400" />
              <span>Zero Platform Commission</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <CheckCircle2 className="w-4 h-4 text-violet-400" />
              <span>Automated Rubric Scoring</span>
            </div>
            <div className="flex items-center space-x-1.5 hidden sm:flex">
              <CheckCircle2 className="w-4 h-4 text-violet-400" />
              <span>Direct GitHub Integrations</span>
            </div>
          </div>

        </div>

        {/* Stats Strip */}
        <div className="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-4 p-4 sm:p-6 rounded-2xl glass-panel shadow-2xl">
          {PLATFORM_STATS.map((stat, idx) => (
            <div key={idx} className="flex flex-col items-center text-center p-3 sm:p-4 rounded-xl hover:bg-white/[0.02] transition-colors">
              <div className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center">
                {stat.value}
              </div>
              <span className="text-xs font-medium text-slate-400 mt-1 uppercase tracking-wider">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================= */}
      {/* 2. FEATURED SPOTLIGHT HACKATHON CARD */}
      {/* ========================================================= */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="flex items-center space-x-2">
              <Flame className="w-5 h-5 text-amber-400 animate-pulse" />
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">Premier Featured Event</h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
              The highest tier competition currently live on HackOrbit.
            </p>
          </div>
          <button
            onClick={() => onNavigate('hackathons')}
            className="hidden sm:inline-flex items-center space-x-1 text-xs font-semibold text-violet-400 hover:text-violet-300 transition-colors"
          >
            <span>View All ({SAMPLE_HACKATHONS.length})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="relative rounded-2xl border border-violet-500/30 bg-gradient-to-br from-violet-950/40 via-[#0E111C] to-[#0A0C14] p-6 sm:p-8 shadow-2xl shadow-violet-950/30 overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-violet-600/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
            
            {/* Left 2 Cols: Info */}
            <div className="lg:col-span-2 space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                  <span>LIVE NOW</span>
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-violet-500/15 text-violet-300 border border-violet-500/30">
                  {featuredHackathon.category}
                </span>
                <span className="text-xs text-slate-400 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-violet-400" />
                  {featuredHackathon.location}
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                {featuredHackathon.title}
              </h3>
              
              <p className="text-sm text-slate-300 leading-relaxed">
                {featuredHackathon.tagline}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 pt-1">
                {featuredHackathon.tags.map((tag, i) => (
                  <span key={i} className="text-xs px-2.5 py-1 rounded-md bg-white/[0.04] text-slate-300 border border-white/[0.06]">
                    #{tag}
                  </span>
                ))}
              </div>

              {/* Tracks breakdown */}
              <div className="pt-2">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-2">Award Tracks:</span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {featuredHackathon.tracks.map((track, i) => (
                    <div key={i} className="p-2.5 rounded-lg bg-white/[0.02] border border-white/[0.05] text-xs">
                      <div className="font-semibold text-slate-200 truncate">{track.name}</div>
                      <div className="text-violet-400 font-bold mt-0.5">{track.prize}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Col: Prize & CTA Box */}
            <div className="rounded-xl bg-white/[0.03] border border-white/[0.08] p-6 flex flex-col justify-between space-y-6 text-center lg:text-left">
              <div>
                <span className="text-xs text-slate-400 uppercase tracking-widest font-bold">Total Bounty Pool</span>
                <div className="text-3xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-violet-300 via-white to-indigo-300 mt-1">
                  {featuredHackathon.currency}{featuredHackathon.prizePool.toLocaleString()}
                </div>
                <div className="flex items-center justify-center lg:justify-start space-x-2 mt-2 text-xs text-slate-400">
                  <Users className="w-4 h-4 text-violet-400" />
                  <span>{featuredHackathon.participantsCount.toLocaleString()} hackers participating</span>
                </div>
              </div>

              <div className="space-y-2 border-t border-white/[0.08] pt-4 text-xs text-slate-400">
                <div className="flex justify-between items-center">
                  <span>Registration Ends:</span>
                  <span className="text-slate-200 font-medium">{featuredHackathon.deadline}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Team Size:</span>
                  <span className="text-slate-200 font-medium">{featuredHackathon.minTeamSize}-{featuredHackathon.maxTeamSize} Builders</span>
                </div>
              </div>

              <button
                onClick={() => {
                  if (onSelectHackathon) {
                    onSelectHackathon(featuredHackathon.id);
                  } else {
                    onNavigate('hackathons');
                  }
                }}
                className="w-full py-3 px-4 rounded-xl font-bold text-xs text-white bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 shadow-lg shadow-violet-600/30 transition-all flex items-center justify-center space-x-2"
              >
                <span>Join NeuroOrbit 2026</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 3. PLATFORM PILLARS & ARCHITECTURE */}
      {/* ========================================================= */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/[0.06]">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <h2 className="text-xs font-bold tracking-widest uppercase text-violet-400">
            Engineered For Scale
          </h2>
          <p className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Everything Required To Run High-Impact Hackathons
          </p>
          <p className="text-sm sm:text-base text-slate-400">
            Eliminate chaotic spreadsheets, lost submissions, and subjective bias with a consolidated operating platform.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Card 1 */}
          <div className="glass-panel glass-panel-hover rounded-2xl p-6 space-y-4">
            <div className="w-12 h-12 rounded-xl bg-violet-600/15 border border-violet-500/30 flex items-center justify-center text-violet-400">
              <Workflow className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">Automated Pipelines</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Custom registration questions, automatic Discord/Slack syncing, and real-time team formation lobbies.
            </p>
          </div>

          {/* Card 2 */}
          <div className="glass-panel glass-panel-hover rounded-2xl p-6 space-y-4">
            <div className="w-12 h-12 rounded-xl bg-indigo-600/15 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">Rubric Scoring Engine</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Standardized evaluation metrics, blind review modes, and automated normalization to eliminate judge bias.
            </p>
          </div>

          {/* Card 3 */}
          <div className="glass-panel glass-panel-hover rounded-2xl p-6 space-y-4">
            <div className="w-12 h-12 rounded-xl bg-cyan-600/15 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              <Code2 className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">Repository Attestation</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Verify commit timelines and fresh codebases directly with GitHub & GitLab integration checkpoints.
            </p>
          </div>

          {/* Card 4 */}
          <div className="glass-panel glass-panel-hover rounded-2xl p-6 space-y-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-600/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <Trophy className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">Instant Bounty Escrow</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Seamless payout distribution to winners across fiat bank transfers and crypto stablecoin protocols.
            </p>
          </div>

        </div>
      </section>

      {/* ========================================================= */}
      {/* 4. DUAL VALUE PROP: ORGANIZERS vs PARTICIPANTS */}
      {/* ========================================================= */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Organizer Box */}
          <div className="rounded-2xl border border-violet-500/20 bg-gradient-to-br from-[#121422] to-[#0A0C14] p-8 space-y-6 relative overflow-hidden">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-lg bg-violet-600/20 text-violet-400 border border-violet-500/30">
                <Rocket className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold tracking-wider text-violet-400 uppercase">For Event Organizers</span>
            </div>
            <h3 className="text-2xl font-bold text-white">
              Launch Your Hackathon In Minutes, Not Months
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Manage participant approvals, broadcast announcements, review submissions with custom scoring rubrics, and export audit-ready reports with one click.
            </p>
            <ul className="space-y-3 text-xs text-slate-300">
              <li className="flex items-center space-x-2.5">
                <CheckCircle2 className="w-4 h-4 text-violet-400 shrink-0" />
                <span>Custom branded microsites with custom domain support</span>
              </li>
              <li className="flex items-center space-x-2.5">
                <CheckCircle2 className="w-4 h-4 text-violet-400 shrink-0" />
                <span>Multi-stage judging rounds (Technical, Product, Sponsor)</span>
              </li>
              <li className="flex items-center space-x-2.5">
                <CheckCircle2 className="w-4 h-4 text-violet-400 shrink-0" />
                <span>Sponsor analytics & resume book access</span>
              </li>
            </ul>
            <button
              onClick={() => onNavigate('organizer')}
              className="inline-flex items-center space-x-2 text-xs font-bold text-violet-300 hover:text-white bg-violet-950/50 hover:bg-violet-900/50 border border-violet-500/30 px-5 py-2.5 rounded-xl transition-all"
            >
              <span>Explore Organizer Console</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Participant Box */}
          <div className="rounded-2xl border border-indigo-500/20 bg-gradient-to-br from-[#121422] to-[#0A0C14] p-8 space-y-6 relative overflow-hidden">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-lg bg-indigo-600/20 text-indigo-400 border border-indigo-500/30">
                <Users className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold tracking-wider text-indigo-400 uppercase">For Hackers & Builders</span>
            </div>
            <h3 className="text-2xl font-bold text-white">
              Assemble Your Dream Crew & Ship Something Epic
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Find teammates who match your missing skills, discover exclusive sponsor bounties, access free cloud credits, and get verified portfolio badges.
            </p>
            <ul className="space-y-3 text-xs text-slate-300">
              <li className="flex items-center space-x-2.5">
                <CheckCircle2 className="w-4 h-4 text-indigo-400 shrink-0" />
                <span>Skill-based teammate matchmaking lobby</span>
              </li>
              <li className="flex items-center space-x-2.5">
                <CheckCircle2 className="w-4 h-4 text-indigo-400 shrink-0" />
                <span>Live mentor booking & quick technical office hours</span>
              </li>
              <li className="flex items-center space-x-2.5">
                <CheckCircle2 className="w-4 h-4 text-indigo-400 shrink-0" />
                <span>Verified digital credential badges on your profile</span>
              </li>
            </ul>
            <button
              onClick={() => onNavigate('participant')}
              className="inline-flex items-center space-x-2 text-xs font-bold text-indigo-300 hover:text-white bg-indigo-950/50 hover:bg-indigo-900/50 border border-indigo-500/30 px-5 py-2.5 rounded-xl transition-all"
            >
              <span>View Participant Dashboard</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>
      </section>

      {/* ========================================================= */}
      {/* 5. PRE-FOOTER CALL TO ACTION */}
      {/* ========================================================= */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="relative rounded-3xl border border-violet-500/30 bg-gradient-to-r from-violet-900/50 via-purple-900/30 to-indigo-950/60 p-8 sm:p-14 text-center overflow-hidden shadow-2xl">
          <div className="max-w-2xl mx-auto space-y-6">
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              Ready to Launch Your Next Hackathon?
            </h2>
            <p className="text-sm sm:text-base text-violet-200">
              Join thousands of creators, engineers, and organizers building the future of software with HackOrbit AI.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
              <button
                onClick={() => onNavigate('hackathons')}
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl font-bold text-xs text-white bg-white/10 hover:bg-white/20 border border-white/20 transition-all"
              >
                Find A Competition
              </button>
              <button
                onClick={() => onNavigate('organizer')}
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl font-bold text-xs text-slate-950 bg-white hover:bg-slate-100 shadow-xl transition-all"
              >
                Create An Event
              </button>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};
