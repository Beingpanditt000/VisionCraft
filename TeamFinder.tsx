import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { CloseIcon, UsersIcon, SearchIcon, CheckCircleIcon, ZapIcon } from './Icons';
import type { TeamMember, ExperienceLevel } from '../types';

// ── Demo team members ─────────────────────────────────────────────────────────
const DEMO_MEMBERS: TeamMember[] = [
  { id: '1', name: 'Arjun Mehta', skills: ['React', 'TypeScript', 'Node.js'], experienceLevel: 'intermediate', lookingForTeam: true, hackathonInterests: ['AI & Automation', 'EdTech'] },
  { id: '2', name: 'Priya Sharma', skills: ['Python', 'AI / ML', 'Data Science'], experienceLevel: 'advanced', lookingForTeam: true, hackathonInterests: ['Healthcare Tech', 'AI & Automation'] },
  { id: '3', name: 'Lena Fischer', skills: ['UI / UX Design', 'Figma', 'React'], experienceLevel: 'intermediate', lookingForTeam: true, hackathonInterests: ['Social Impact', 'EdTech'] },
  { id: '4', name: 'Carlos Vega', skills: ['Blockchain / Web3', 'Smart Contracts', 'Go'], experienceLevel: 'advanced', lookingForTeam: true, hackathonInterests: ['FinTech'] },
  { id: '5', name: 'Yuki Tanaka', skills: ['Flutter', 'React Native', 'Swift'], experienceLevel: 'beginner', lookingForTeam: true, hackathonInterests: ['Smart Cities', 'AR / VR'] },
  { id: '6', name: 'Fatima Al-Rashid', skills: ['Cybersecurity', 'Python', 'Cloud (AWS/GCP/Azure)'], experienceLevel: 'expert', lookingForTeam: true, hackathonInterests: ['Open Source', 'Healthcare Tech'] },
  { id: '7', name: 'Dev Patel', skills: ['Deep Learning', 'Computer Vision', 'Python'], experienceLevel: 'advanced', lookingForTeam: true, hackathonInterests: ['AI & Automation', 'Robotics'] },
  { id: '8', name: 'Sofia Müller', skills: ['Vue', 'Node.js', 'SQL / Databases'], experienceLevel: 'intermediate', lookingForTeam: true, hackathonInterests: ['FinTech', 'Social Impact'] },
];

const LEVEL_COLORS: Record<ExperienceLevel, string> = {
  beginner: '#10b981',
  intermediate: '#06b6d4',
  advanced: '#8b5cf6',
  expert: '#f59e0b',
};

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function TeamFinder({ isOpen, onClose }: Props) {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterLevel, setFilterLevel] = useState<ExperienceLevel | 'all'>('all');
  const [filterInterest, setFilterInterest] = useState('all');
  const [requestSent, setRequestSent] = useState<Set<string>>(new Set());

  if (!isOpen) return null;

  const interests = ['all', ...Array.from(new Set(DEMO_MEMBERS.flatMap((m) => m.hackathonInterests)))];

  const filtered = DEMO_MEMBERS.filter((m) => {
    const q = searchQuery.toLowerCase();
    const matchQ = !q || m.name.toLowerCase().includes(q) || m.skills.some((s) => s.toLowerCase().includes(q));
    const matchLevel = filterLevel === 'all' || m.experienceLevel === filterLevel;
    const matchInterest = filterInterest === 'all' || m.hackathonInterests.includes(filterInterest);
    return matchQ && matchLevel && matchInterest;
  });

  const userSkills: string[] = (user && user.role === 'student') ? user.skills : [];

  function computeMatch(member: TeamMember): number {
    if (userSkills.length === 0) return 0;
    const userLower = userSkills.map((s: string) => s.toLowerCase());
    const memberLower = member.skills.map((s: string) => s.toLowerCase());
    // Reward skill diversity (fewer overlaps = better complement)
    const overlap = userLower.filter((s: string) => memberLower.includes(s)).length;
    const diverse = member.skills.length - overlap;
    return Math.round((diverse / Math.max(member.skills.length, 1)) * 100);
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-box"
        style={{ maxWidth: 680, maxHeight: '90vh', overflowY: 'auto' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <UsersIcon size={22} style={{ color: 'var(--violet-bright)' }} />
            <div>
              <h2 style={{ fontSize: '1.3rem' }}>Team Finder</h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>Connect with hackers looking for teams</p>
            </div>
          </div>
          <button className="icon-btn" onClick={onClose}><CloseIcon /></button>
        </div>

        {/* Your listing banner */}
        <div style={{ padding: '14px 18px', background: 'var(--violet-glow)', border: '1px solid var(--border-glow)', borderRadius: 'var(--radius-md)', marginBottom: 20, display: 'flex', alignItems: 'center', gap: 12 }}>
          <ZapIcon size={18} style={{ color: 'var(--violet-bright)', flexShrink: 0 }} />
          <div>
            <p style={{ fontWeight: 700, fontSize: '0.9rem', marginBottom: 2 }}>Your Profile is Visible</p>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>Other hackers can see your skills: {userSkills.slice(0, 3).join(', ') || 'None yet'}</p>
          </div>
        </div>

        {/* Search + filters */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 20 }}>
          <div style={{ position: 'relative' }}>
            <SearchIcon size={16} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input
              className="form-input"
              style={{ paddingLeft: 42 }}
              placeholder="Search by name or skill…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', alignSelf: 'center', fontWeight: 600 }}>Level:</label>
            {(['all', 'beginner', 'intermediate', 'advanced', 'expert'] as const).map((lvl) => (
              <button
                key={lvl}
                onClick={() => setFilterLevel(lvl)}
                style={{
                  padding: '5px 12px', borderRadius: 9999, fontSize: '0.78rem', fontWeight: 600, cursor: 'pointer',
                  border: `1px solid ${filterLevel === lvl ? 'var(--violet-primary)' : 'var(--border-subtle)'}`,
                  background: filterLevel === lvl ? 'var(--violet-glow)' : 'transparent',
                  color: filterLevel === lvl ? 'var(--violet-bright)' : 'var(--text-muted)',
                  textTransform: 'capitalize', transition: 'all 0.2s',
                }}
              >
                {lvl}
              </button>
            ))}
          </div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', alignSelf: 'center', fontWeight: 600 }}>Interest:</label>
            {interests.slice(0, 6).map((int) => (
              <button
                key={int}
                onClick={() => setFilterInterest(int)}
                style={{
                  padding: '5px 12px', borderRadius: 9999, fontSize: '0.78rem', fontWeight: 600, cursor: 'pointer',
                  border: `1px solid ${filterInterest === int ? 'var(--cyan-accent)' : 'var(--border-subtle)'}`,
                  background: filterInterest === int ? 'rgba(6,182,212,0.12)' : 'transparent',
                  color: filterInterest === int ? 'var(--cyan-accent)' : 'var(--text-muted)',
                  textTransform: 'capitalize', transition: 'all 0.2s',
                }}
              >
                {int}
              </button>
            ))}
          </div>
        </div>

        {/* Results */}
        <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: 12, fontWeight: 600 }}>
          {filtered.length} hacker{filtered.length !== 1 ? 's' : ''} found
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {filtered.map((member) => {
            const match = computeMatch(member);
            const sent = requestSent.has(member.id);
            return (
              <div key={member.id} className="glass-panel" style={{ padding: '16px 18px', display: 'flex', alignItems: 'flex-start', gap: 14 }}>
                {/* Avatar */}
                <div style={{
                  width: 46, height: 46, borderRadius: '50%', flexShrink: 0,
                  background: `linear-gradient(135deg, ${LEVEL_COLORS[member.experienceLevel]}55, ${LEVEL_COLORS[member.experienceLevel]}22)`,
                  border: `2px solid ${LEVEL_COLORS[member.experienceLevel]}66`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '1.2rem', fontWeight: 700, color: LEVEL_COLORS[member.experienceLevel],
                }}>
                  {member.name.split(' ').map((n) => n[0]).join('').toUpperCase()}
                </div>

                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6, flexWrap: 'wrap' }}>
                    <p style={{ fontWeight: 700, fontSize: '0.95rem' }}>{member.name}</p>
                    <span style={{
                      padding: '2px 8px', borderRadius: 9999, fontSize: '0.7rem', fontWeight: 700,
                      background: `${LEVEL_COLORS[member.experienceLevel]}22`,
                      color: LEVEL_COLORS[member.experienceLevel], textTransform: 'capitalize',
                    }}>
                      {member.experienceLevel}
                    </span>
                    {match > 0 && (
                      <span style={{ padding: '2px 8px', borderRadius: 9999, fontSize: '0.7rem', fontWeight: 700, background: 'rgba(16,185,129,0.15)', color: '#10b981' }}>
                        {match}% complement
                      </span>
                    )}
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 8 }}>
                    {member.skills.map((s) => (
                      <span key={s} style={{ padding: '3px 9px', borderRadius: 9999, background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', color: 'var(--text-secondary)', fontSize: '0.75rem', fontWeight: 600 }}>{s}</span>
                    ))}
                  </div>
                  <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                    Interested in: {member.hackathonInterests.join(', ')}
                  </p>
                </div>

                <button
                  style={{
                    padding: '8px 16px', borderRadius: 'var(--radius-sm)', fontSize: '0.8rem', fontWeight: 700,
                    border: `1px solid ${sent ? '#10b981' : 'var(--violet-primary)'}`,
                    background: sent ? 'rgba(16,185,129,0.12)' : 'var(--violet-glow)',
                    color: sent ? '#10b981' : 'var(--violet-bright)',
                    cursor: sent ? 'default' : 'pointer', transition: 'all 0.2s', flexShrink: 0,
                    display: 'flex', alignItems: 'center', gap: 6,
                  }}
                  onClick={() => !sent && setRequestSent((prev) => new Set([...prev, member.id]))}
                >
                  {sent ? <><CheckCircleIcon size={13} /> Sent!</> : 'Invite'}
                </button>
              </div>
            );
          })}
          {filtered.length === 0 && (
            <div style={{ textAlign: 'center', padding: '40px 0', color: 'var(--text-muted)' }}>
              <div style={{ fontSize: 40, marginBottom: 12 }}>🔍</div>
              <p>No hackers match your filters. Try adjusting the search.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
