import React from 'react';
import { OrbitLogoIcon, SparklesIcon } from './Icons';
import type { DashboardModalType } from '../types';

interface FooterProps {
  onNavigateHome: () => void;
  onNavigateExplore: () => void;
  onOpenDashboard: (type: DashboardModalType) => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigateHome,
  onNavigateExplore,
  onOpenDashboard,
}) => {
  return (
    <footer
      style={{
        borderTop: '1px solid rgba(139, 92, 246, 0.2)',
        background: 'linear-gradient(180deg, rgba(8, 11, 23, 0.95) 0%, #05070f 100%)',
        padding: '60px 0 36px',
        position: 'relative',
        marginTop: 'auto',
      }}
    >
      <div className="container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '40px',
            marginBottom: '48px',
          }}
        >
          {/* Brand Info */}
          <div>
            <div
              onClick={onNavigateHome}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                cursor: 'pointer',
                marginBottom: '16px',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '36px',
                  height: '36px',
                  borderRadius: '10px',
                  background: 'rgba(139, 92, 246, 0.2)',
                  border: '1px solid rgba(168, 85, 247, 0.4)',
                }}
              >
                <OrbitLogoIcon size={24} />
              </div>
              <span
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.3rem',
                  fontWeight: 700,
                  color: '#ffffff',
                }}
              >
                HackOrbit
              </span>
            </div>

            <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '20px' }}>
              The premier AI hackathon platform connecting visionaries and developers with automated event planning, skill-based team formation, and transparent evaluations.
            </p>

            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '0.78rem',
                color: 'var(--violet-bright)',
                background: 'rgba(139, 92, 246, 0.1)',
                padding: '4px 10px',
                borderRadius: '6px',
                border: '1px solid rgba(139, 92, 246, 0.25)',
              }}
            >
              <SparklesIcon size={14} />
              <span>Next-Gen Hackathon Operating System</span>
            </div>
          </div>

          {/* Platform Navigation */}
          <div>
            <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#ffffff', marginBottom: '16px' }}>
              Navigation
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <button
                onClick={onNavigateHome}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: 'var(--text-secondary)',
                  textAlign: 'left',
                  cursor: 'pointer',
                  fontSize: '0.88rem',
                  padding: 0,
                  transition: 'color 0.2s',
                }}
              >
                Home
              </button>
              <button
                onClick={onNavigateExplore}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: 'var(--text-secondary)',
                  textAlign: 'left',
                  cursor: 'pointer',
                  fontSize: '0.88rem',
                  padding: 0,
                  transition: 'color 0.2s',
                }}
              >
                Explore Hackathons
              </button>
              <button
                onClick={() => onOpenDashboard('organizer')}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: 'var(--text-secondary)',
                  textAlign: 'left',
                  cursor: 'pointer',
                  fontSize: '0.88rem',
                  padding: 0,
                  transition: 'color 0.2s',
                }}
              >
                Organizer Dashboard
              </button>
              <button
                onClick={() => onOpenDashboard('participant')}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: 'var(--text-secondary)',
                  textAlign: 'left',
                  cursor: 'pointer',
                  fontSize: '0.88rem',
                  padding: 0,
                  transition: 'color 0.2s',
                }}
              >
                Participant Dashboard
              </button>
            </div>
          </div>

          {/* Popular Categories */}
          <div>
            <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#ffffff', marginBottom: '16px' }}>
              Hackathon Domains
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
              <li>Autonomous AI & Agent Swarms</li>
              <li>Distributed Cloud & Edge Mesh</li>
              <li>FinTech & Predictive Markets</li>
              <li>Generative Biology & Health</li>
              <li>Climate Intelligence & Energy</li>
            </ul>
          </div>

          {/* Pillars */}
          <div>
            <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#ffffff', marginBottom: '16px' }}>
              Platform Standards
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.84rem', color: 'var(--text-muted)' }}>
              <div>✓ AI-Powered Operational Scheduling</div>
              <div>✓ Multi-Dimensional Team Matching</div>
              <div>✓ Blinded Multi-Tiered Rubric Evaluation</div>
              <div>✓ Git Cadence & Proof of Authorship</div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          style={{
            paddingTop: '28px',
            borderTop: '1px solid rgba(255, 255, 255, 0.06)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '16px',
            fontSize: '0.82rem',
            color: 'var(--text-muted)',
          }}
        >
          <div>
            © 2026 HackOrbit. All rights reserved. Built for builders, innovators, and organizers.
          </div>
          <div style={{ display: 'flex', gap: '20px' }}>
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
            <span>Security & Integrity</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
