import React, { useState, useRef } from 'react';
import { useAuth } from '../contexts/AuthContext';
import type { RegisterFormData, ExperienceLevel } from '../types';
import { CloseIcon, CheckCircleIcon, SparklesIcon } from './Icons';

const SKILLS_OPTIONS = [
  'React', 'Vue', 'Angular', 'Next.js', 'Node.js', 'Python', 'Go', 'Rust',
  'TypeScript', 'Java', 'Kotlin', 'Swift', 'Flutter', 'React Native',
  'AI / ML', 'Deep Learning', 'NLP', 'Computer Vision',
  'Blockchain / Web3', 'Smart Contracts',
  'UI / UX Design', 'Figma', 'Cybersecurity', 'DevOps', 'Cloud (AWS/GCP/Azure)',
  'Data Science', 'SQL / Databases', 'Embedded Systems',
];

const INTERESTS_OPTIONS = [
  'Healthcare Tech', 'EdTech', 'FinTech', 'Climate & Sustainability',
  'AI & Automation', 'AR / VR', 'Smart Cities', 'Robotics',
  'Open Source', 'Social Impact', 'Gaming', 'Space Tech',
];

const GRADUATION_YEARS = Array.from({ length: 8 }, (_, i) => String(new Date().getFullYear() + i - 1));

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSwitchToSignIn: () => void;
}

interface ModalStudentFormData extends RegisterFormData {
  role: 'student';
  college: string;
  course: string;
  graduationYear: string;
  skills: string[];
  interests: string[];
  experienceLevel: import('../types').ExperienceLevel;
}

const INITIAL_FORM: ModalStudentFormData = {
  role: 'student',
  fullName: '',
  email: '',
  password: '',
  confirmPassword: '',
  college: '',
  course: '',
  graduationYear: String(new Date().getFullYear()),
  skills: [],
  interests: [],
  experienceLevel: 'beginner',
  photoFile: null,
};

export default function RegisterModal({ isOpen, onClose, onSwitchToSignIn }: Props) {
  const { register } = useAuth();
  const [form, setForm] = useState<ModalStudentFormData>(INITIAL_FORM);
  const [errors, setErrors] = useState<Partial<Record<keyof RegisterFormData, string>>>({});
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [serverError, setServerError] = useState('');
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  function set(field: keyof RegisterFormData, value: unknown) {
    setForm((f) => ({ ...f, [field]: value }));
    setErrors((e) => ({ ...e, [field]: undefined }));
  }

  function toggleSkill(skill: string) {
    const next = form.skills.includes(skill)
      ? form.skills.filter((s) => s !== skill)
      : [...form.skills, skill];
    set('skills', next);
  }

  function toggleInterest(interest: string) {
    const next = form.interests.includes(interest)
      ? form.interests.filter((i) => i !== interest)
      : [...form.interests, interest];
    set('interests', next);
  }

  function handlePhoto(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      setErrors((er) => ({ ...er, photoFile: 'Photo must be under 5 MB' }));
      return;
    }
    set('photoFile', file);
    setPhotoPreview(URL.createObjectURL(file));
  }

  function validateStep1(): boolean {
    const errs: typeof errors = {};
    if (!form.fullName.trim()) errs.fullName = 'Full name is required';
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) errs.email = 'Enter a valid email';
    if (form.password.length < 8) errs.password = 'At least 8 characters';
    if (form.password !== form.confirmPassword) errs.confirmPassword = 'Passwords do not match';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  function validateStep2(): boolean {
    const errs: typeof errors = {};
    if (!form.college.trim()) errs.college = 'College / university is required';
    if (!form.course.trim()) errs.course = 'Course / degree is required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  async function handleSubmit() {
    if (form.skills.length === 0) {
      setErrors((e) => ({ ...e, skills: 'Select at least one skill' }));
      return;
    }
    setLoading(true);
    setServerError('');
    const result = await register(form);
    setLoading(false);
    if (result.success) {
      setSuccess(true);
    } else {
      setServerError(result.error ?? 'Registration failed');
    }
  }

  if (success) {
    return (
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal-box" style={{ maxWidth: 440, textAlign: 'center' }} onClick={(e) => e.stopPropagation()}>
          <div style={{ fontSize: 64, marginBottom: 16 }}>🎉</div>
          <h2 className="text-gradient" style={{ fontSize: '1.8rem', marginBottom: 8 }}>
            Welcome aboard!
          </h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: 24 }}>
            Your HackOrbit account for <strong style={{ color: 'var(--text-primary)' }}>{form.email}</strong> is ready.
          </p>
          <button className="btn-primary" style={{ width: '100%' }} onClick={onClose}>
            Go to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-box"
        style={{ maxWidth: 560, maxHeight: '90vh', overflowY: 'auto' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 }}>
          <div>
            <h2 style={{ fontSize: '1.5rem', marginBottom: 4 }}>Create Account</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
              Step {step} of 3 — {step === 1 ? 'Your Details' : step === 2 ? 'Academic Info' : 'Skills & Interests'}
            </p>
          </div>
          <button className="icon-btn" onClick={onClose}><CloseIcon /></button>
        </div>

        {/* Demo notice */}
        <div className="demo-banner" style={{ marginBottom: 20 }}>
          <SparklesIcon size={14} />
          <span>Demo Mode – your data stays in this browser only. No password is stored.</span>
        </div>

        {/* Step progress */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 28 }}>
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              style={{
                flex: 1,
                height: 4,
                borderRadius: 2,
                background: s <= step ? 'var(--violet-primary)' : 'var(--border-subtle)',
                transition: 'background 0.3s',
              }}
            />
          ))}
        </div>

        {/* ── Step 1: Personal ──────────────────────────────────────── */}
        {step === 1 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {/* Photo upload */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 8 }}>
              <div
                onClick={() => fileRef.current?.click()}
                style={{
                  width: 72,
                  height: 72,
                  borderRadius: '50%',
                  background: photoPreview ? 'none' : 'var(--bg-surface-elevated)',
                  border: '2px dashed var(--border-glow)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  overflow: 'hidden',
                  flexShrink: 0,
                }}
              >
                {photoPreview ? (
                  <img src={photoPreview} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  <span style={{ fontSize: 28 }}>📷</span>
                )}
              </div>
              <div>
                <p style={{ fontSize: '0.875rem', fontWeight: 600, marginBottom: 4 }}>Profile Photo <span style={{ color: 'var(--text-muted)', fontWeight: 400 }}>(optional)</span></p>
                <button type="button" className="btn-secondary" style={{ padding: '6px 14px', fontSize: '0.8rem' }} onClick={() => fileRef.current?.click()}>
                  Choose Photo
                </button>
                {errors.photoFile && <p className="field-error">{errors.photoFile}</p>}
              </div>
              <input ref={fileRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={handlePhoto} />
            </div>

            <FormField label="Full Name" required error={errors.fullName}>
              <input className="form-input" placeholder="Ada Lovelace" value={form.fullName} onChange={(e) => set('fullName', e.target.value)} />
            </FormField>
            <FormField label="Email Address" required error={errors.email}>
              <input className="form-input" type="email" placeholder="ada@university.edu" value={form.email} onChange={(e) => set('email', e.target.value)} />
            </FormField>
            <FormField label="Password" required error={errors.password}>
              <input className="form-input" type="password" placeholder="Min. 8 characters" value={form.password} onChange={(e) => set('password', e.target.value)} />
            </FormField>
            <FormField label="Confirm Password" required error={errors.confirmPassword}>
              <input className="form-input" type="password" placeholder="Repeat password" value={form.confirmPassword} onChange={(e) => set('confirmPassword', e.target.value)} />
            </FormField>

            <button className="btn-primary" style={{ marginTop: 8 }} onClick={() => validateStep1() && setStep(2)}>
              Continue →
            </button>
          </div>
        )}

        {/* ── Step 2: Academic ─────────────────────────────────────── */}
        {step === 2 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <FormField label="College / University" required error={errors.college}>
              <input className="form-input" placeholder="e.g. IIT Bombay" value={form.college} onChange={(e) => set('college', e.target.value)} />
            </FormField>
            <FormField label="Course / Degree" required error={errors.course}>
              <input className="form-input" placeholder="e.g. B.Tech Computer Science" value={form.course} onChange={(e) => set('course', e.target.value)} />
            </FormField>
            <FormField label="Graduation Year" required>
              <select className="form-input" value={form.graduationYear} onChange={(e) => set('graduationYear', e.target.value)}>
                {GRADUATION_YEARS.map((y) => <option key={y} value={y}>{y}</option>)}
              </select>
            </FormField>
            <FormField label="Experience Level" required>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                {(['beginner', 'intermediate', 'advanced', 'expert'] as ExperienceLevel[]).map((lvl) => (
                  <button
                    key={lvl}
                    type="button"
                    onClick={() => set('experienceLevel', lvl)}
                    style={{
                      padding: '10px 12px',
                      borderRadius: 'var(--radius-sm)',
                      border: `1px solid ${form.experienceLevel === lvl ? 'var(--violet-primary)' : 'var(--border-subtle)'}`,
                      background: form.experienceLevel === lvl ? 'var(--violet-glow)' : 'transparent',
                      color: form.experienceLevel === lvl ? 'var(--violet-bright)' : 'var(--text-secondary)',
                      cursor: 'pointer',
                      textTransform: 'capitalize',
                      fontWeight: 600,
                      fontSize: '0.875rem',
                      transition: 'all 0.2s',
                    }}
                  >
                    {lvl}
                  </button>
                ))}
              </div>
            </FormField>

            <div style={{ display: 'flex', gap: 12, marginTop: 8 }}>
              <button className="btn-secondary" style={{ flex: 1 }} onClick={() => setStep(1)}>← Back</button>
              <button className="btn-primary" style={{ flex: 2 }} onClick={() => validateStep2() && setStep(3)}>Continue →</button>
            </div>
          </div>
        )}

        {/* ── Step 3: Skills & Interests ──────────────────────────── */}
        {step === 3 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <FormField label="Your Skills" required error={errors.skills as string}>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: 10 }}>Select all that apply</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {SKILLS_OPTIONS.map((skill) => (
                  <Chip key={skill} label={skill} active={form.skills.includes(skill)} onClick={() => toggleSkill(skill)} />
                ))}
              </div>
            </FormField>

            <FormField label="Interests">
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: 10 }}>What domains excite you?</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {INTERESTS_OPTIONS.map((interest) => (
                  <Chip key={interest} label={interest} active={form.interests.includes(interest)} onClick={() => toggleInterest(interest)} color="cyan" />
                ))}
              </div>
            </FormField>

            {serverError && <p className="field-error" style={{ textAlign: 'center' }}>{serverError}</p>}

            <div style={{ display: 'flex', gap: 12 }}>
              <button className="btn-secondary" style={{ flex: 1 }} onClick={() => setStep(2)}>← Back</button>
              <button className="btn-primary" style={{ flex: 2 }} disabled={loading} onClick={handleSubmit}>
                {loading ? 'Creating account…' : '🚀 Create Account'}
              </button>
            </div>
          </div>
        )}

        <p style={{ textAlign: 'center', marginTop: 20, color: 'var(--text-muted)', fontSize: '0.875rem' }}>
          Already have an account?{' '}
          <button style={{ background: 'none', border: 'none', color: 'var(--violet-bright)', cursor: 'pointer', fontWeight: 600 }} onClick={onSwitchToSignIn}>
            Sign In
          </button>
        </p>
      </div>
    </div>
  );
}

// ── Small reusable sub-components ─────────────────────────────────────────────

function FormField({
  label, required, error, children,
}: {
  label: string; required?: boolean; error?: string; children: React.ReactNode;
}) {
  return (
    <div>
      <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, marginBottom: 6, color: 'var(--text-secondary)' }}>
        {label} {required && <span style={{ color: '#f43f5e' }}>*</span>}
      </label>
      {children}
      {error && <p className="field-error">{error}</p>}
    </div>
  );
}

function Chip({ label, active, onClick, color = 'violet' }: { label: string; active: boolean; onClick: () => void; color?: 'violet' | 'cyan' }) {
  const activeColor = color === 'cyan' ? 'var(--cyan-accent)' : 'var(--violet-primary)';
  const activeBg = color === 'cyan' ? 'rgba(6,182,212,0.15)' : 'var(--violet-glow)';
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        padding: '5px 12px',
        borderRadius: 9999,
        border: `1px solid ${active ? activeColor : 'var(--border-subtle)'}`,
        background: active ? activeBg : 'transparent',
        color: active ? activeColor : 'var(--text-muted)',
        fontSize: '0.8rem',
        fontWeight: 600,
        cursor: 'pointer',
        transition: 'all 0.2s',
        display: 'inline-flex',
        alignItems: 'center',
        gap: 4,
      }}
    >
      {active && <CheckCircleIcon size={12} />}
      {label}
    </button>
  );
}
