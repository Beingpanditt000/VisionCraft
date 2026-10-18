{ SAMPLE_HACKATHONS } from '../data/hackathons';

type Status = 'idle' | 'recording' | 'processing' | 'playing' | 'error';

interface MessageChoice {
  id: string;
  name: string;
  category?: string;
}

interface Message {
  role: 'user' | 'assistant';
  text: string;
  audioUrl?: string;
  choices?: MessageChoice[];
  hackathonName?: string;
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  initialHackathonId?: string | null;
}

const API_BASE = 'http://localhost:3000';

export default function VoiceAI({ isOpen, onClose, initialHackathonId }: Props) {
  const [status, setStatus] = useState<Status>('idle');
  const [messages, setMessages] = useState<Message[]>([]);
  const [errorMsg, setErrorMsg] = useState('');
  const [backendOnline, setBackendOnline] = useState<boolean | null>(null);
  const [activeHackathonId, setActiveHackathonId] = useState<string | null>(initialHackathonId || null);
  const [textInput, setTextInput] = useState('');
  
  const mediaRecorder = useRef<MediaRecorder | null>(null);
  const audioChunks = useRef<Blob[]>([]);
  const currentAudio = useRef<HTMLAudioElement | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Sync active hackathon with initial prop when modal opens
  useEffect(() => {
    if (isOpen) {
      setActiveHackathonId(initialHackathonId || null);
      setErrorMsg('');
      setStatus('idle');
    }
  }, [isOpen, initialHackathonId]);

  // Check if the Express backend is reachable
  useEffect(() => {
    if (!isOpen) return;
    fetch(`${API_BASE}/api/health`, { signal: AbortSignal.timeout(3000) })
      .then((r) => setBackendOnline(r.ok))
      .catch(() => setBackendOnline(false));
  }, [isOpen]);

  // Auto-scroll messages
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, status]);

  if (!isOpen) return null;

  const currentEvent = SAMPLE_HACKATHONS.find((h) => h.id === activeHackathonId);

  // ── Select / Change Event Helper ──────────────────────────────────────────
  function handleSelectEvent(id: string | null) {
    setActiveHackathonId(id);
    const chosen = SAMPLE_HACKATHONS.find((h) => h.id === id);
    if (chosen) {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          text: `Switched context to ${chosen.title}. What would you like to know about it? (Deadlines, team size, venue, prizes, eligibility, schedule, or judging criteria)`,
          hackathonName: chosen.title,
        },
      ]);
    } else {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          text: 'Hackathon filter cleared. You can ask about any hackathon or ask general questions.',
          choices: SAMPLE_HACKATHONS.map((h) => ({ id: h.id, name: h.title, category: h.category })),
        },
      ]);
    }
  }

  // ── Recording ─────────────────────────────────────────────────────────────
  async function startRecording() {
    setErrorMsg('');
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mime = MediaRecorder.isTypeSupported('audio/webm;codecs=opus')
        ? 'audio/webm;codecs=opus'
        : MediaRecorder.isTypeSupported('audio/ogg;codecs=opus')
        ? 'audio/ogg;codecs=opus'
        : 'audio/webm';

      const recorder = new MediaRecorder(stream, { mimeType: mime });
      audioChunks.current = [];
      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) audioChunks.current.push(e.data);
      };
      recorder.onstop = () => {
        stream.getTracks().forEach((t) => t.stop());
        const blob = new Blob(audioChunks.current, { type: mime });
        sendAudio(blob, mime);
      };
      recorder.start();
      mediaRecorder.current = recorder;
      setStatus('recording');
    } catch {
      setErrorMsg('Microphone access denied. Please allow microphone permission or type your question below.');
      setStatus('error');
    }
  }

  function stopRecording() {
    mediaRecorder.current?.stop();
    setStatus('processing');
  }

  // ── Send Voice to Backend ─────────────────────────────────────────────────
  async function sendAudio(blob: Blob, mime: string) {
    setStatus('processing');
    const ext = mime.includes('ogg') ? 'ogg' : 'webm';
    const formData = new FormData();
    formData.append('audio', blob, `recording.${ext}`);
    if (activeHackathonId) {
      formData.append('hackathonId', activeHackathonId);
    }

    try {
      const res = await fetch(`${API_BASE}/api/voice/ask`, { method: 'POST', body: formData });
      const json = await res.json();

      if (!res.ok) {
        throw new Error(json.error ?? `Server error ${res.status}`);
      }

      const { transcript, answer, audio: audioBase64, hackathonId, choices } = json;

      if (hackathonId) {
        setActiveHackathonId(hackathonId);
      }

      const matchedEvent = SAMPLE_HACKATHONS.find((h) => h.id === (hackathonId || activeHackathonId));

      // Add user transcript message
      const userMsg: Message = { role: 'user', text: transcript || '(voice input)' };
      // Build assistant message
      const assistantMsg: Message = {
        role: 'assistant',
        text: answer,
        ...(audioBase64 && { audioUrl: `data:audio/wav;base64,${audioBase64}` }),
        choices: choices || undefined,
        hackathonName: matchedEvent?.title,
      };

      setMessages((prev) => [...prev, userMsg, assistantMsg]);

      // Auto-play response audio if returned
      if (audioBase64) {
        const audio = new Audio(`data:audio/wav;base64,${audioBase64}`);
        currentAudio.current = audio;
        setStatus('playing');
        audio.onended = () => setStatus('idle');
        audio.onerror = () => setStatus('idle');
        audio.play().catch(() => setStatus('idle'));
      } else {
        setStatus('idle');
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Voice processing failed';
      setErrorMsg(msg);
      setStatus('error');
    }
  }

  // ── Send Typed Question (Fallback & Direct Input) ─────────────────────────
  async function sendTextQuestion(overrideQuestion?: string) {
    const q = (overrideQuestion || textInput).trim();
    if (!q) return;

    setTextInput('');
    setErrorMsg('');
    setStatus('processing');

    const userMsg: Message = { role: 'user', text: q };
    setMessages((prev) => [...prev, userMsg]);

    try {
      const res = await fetch(`${API_BASE}/api/ask`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: q,
          hackathonId: activeHackathonId || null,
        }),
      });

      const json = await res.json();
      if (!res.ok) {
        throw new Error(json.error ?? `Server error ${res.status}`);
      }

      const { answer, hackathonId, choices } = json;

      if (hackathonId) {
        setActiveHackathonId(hackathonId);
      }

      const matchedEvent = SAMPLE_HACKATHONS.find((h) => h.id === (hackathonId || activeHackathonId));

      const assistantMsg: Message = {
        role: 'assistant',
        text: answer,
        choices: choices || undefined,
        hackathonName: matchedEvent?.title,
      };

      setMessages((prev) => [...prev, assistantMsg]);
      setStatus('idle');
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to retrieve answer';
      setErrorMsg(msg);
      setStatus('error');
    }
  }

  function stopPlayback() {
    currentAudio.current?.pause();
    currentAudio.current = null;
    setStatus('idle');
  }

  function handleMicButton() {
    if (status === 'idle' || status === 'error') startRecording();
    else if (status === 'recording') stopRecording();
    else if (status === 'playing') stopPlayback();
  }

  const micLabel: Record<Status, string> = {
    idle: 'Tap to speak',
    recording: 'Recording… tap to stop',
    processing: 'Processing with Sarvam AI…',
    playing: 'Playing… tap to pause',
    error: 'Tap to retry voice',
  };

  const micEmoji: Record<Status, string> = {
    idle: '🎙️',
    recording: '⏹️',
    processing: '⏳',
    playing: '🔊',
    error: '⚠️',
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-box"
        style={{
          maxWidth: 620,
          display: 'flex',
          flexDirection: 'column',
          height: '85vh',
          maxHeight: 720,
          padding: '24px',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12, flexShrink: 0 }}>
          <div>
            <h2 style={{ fontSize: '1.25rem', display: 'flex', alignItems: 'center', gap: 8, color: '#f8fafc' }}>
              🎙️ HackOrbit Voice AI
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginTop: 2 }}>
              Sarvam AI (saaras:v4 STT & bulbul:v3 TTS) · Context-Aware Hackathon Assistant
            </p>
          </div>
          <button className="icon-btn" onClick={onClose} aria-label="Close modal">
            <CloseIcon />
          </button>
        </div>

        {/* Active Context Bar / Event Selector */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 10,
            padding: '8px 12px',
            borderRadius: '10px',
            background: 'rgba(15, 23, 42, 0.75)',
            border: '1px solid rgba(139, 92, 246, 0.25)',
            marginBottom: 12,
            flexShrink: 0,
            fontSize: '0.82rem',
            flexWrap: 'wrap',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, minWidth: 0, flex: 1 }}>
            <span style={{ color: 'var(--violet-bright)', fontWeight: 700 }}>Scope:</span>
            {currentEvent ? (
              <span
                style={{
                  padding: '2px 8px',
                  borderRadius: '6px',
                  background: 'rgba(139, 92, 246, 0.2)',
                  color: '#e2e8f0',
                  fontWeight: 600,
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                🎯 {currentEvent.title}
              </span>
            ) : (
              <span style={{ color: 'var(--text-muted)' }}>🌐 All Hackathons (Unfiltered)</span>
            )}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <select
              value={activeHackathonId || ''}
              onChange={(e) => handleSelectEvent(e.target.value || null)}
              style={{
                background: 'rgba(30, 41, 59, 0.8)',
                color: 'var(--text-primary)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                borderRadius: '6px',
                padding: '4px 8px',
                fontSize: '0.78rem',
                outline: 'none',
                cursor: 'pointer',
                maxWidth: '180px',
              }}
            >
              <option value="">-- All Hackathons --</option>
              {SAMPLE_HACKATHONS.map((h) => (
                <option key={h.id} value={h.id}>
                  {h.title}
                </option>
              ))}
            </select>

            {activeHackathonId && (
              <button
                type="button"
                onClick={() => handleSelectEvent(null)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--violet-bright)',
                  cursor: 'pointer',
                  fontSize: '0.76rem',
                  textDecoration: 'underline',
                }}
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Backend status indicator */}
        {backendOnline === false && (
          <div
            style={{
              padding: '8px 12px',
              borderRadius: '8px',
              background: 'rgba(244,63,94,0.12)',
              border: '1px solid rgba(244,63,94,0.3)',
              marginBottom: 10,
              fontSize: '0.78rem',
              color: '#f87171',
              flexShrink: 0,
            }}
          >
            ⚠️ Backend server offline — Ensure <code style={{ background: 'rgba(0,0,0,0.3)', padding: '1px 5px', borderRadius: 4 }}>server</code> is running on port 3000.
          </div>
        )}

        {/* Messages Scroll Area */}
        <div
          ref={scrollRef}
          style={{
            flex: 1,
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: 12,
            paddingRight: 6,
            marginBottom: 14,
          }}
        >
          {messages.length === 0 && (
            <div
              style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--text-muted)',
                textAlign: 'center',
                gap: 10,
                padding: '20px',
              }}
            >
              <div style={{ fontSize: 44 }}>🎙️</div>
              <p style={{ fontWeight: 600, fontSize: '0.98rem', color: 'var(--text-primary)' }}>
                {currentEvent ? `Ask about ${currentEvent.title}` : 'Ask Voice AI about HackOrbit'}
              </p>
              <p style={{ fontSize: '0.84rem', maxWidth: 440, lineHeight: 1.5 }}>
                Try asking: "When is the registration deadline?", "What is the team size limit?", "What are the prizes?", or "What are the judging criteria?"
              </p>
            </div>
          )}

          {messages.map((msg, i) => (
            <div
              key={i}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: msg.role === 'user' ? 'flex-end' : 'flex-start',
              }}
            >
              <div
                style={{
                  maxWidth: '85%',
                  padding: '10px 14px',
                  borderRadius: msg.role === 'user' ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
                  background: msg.role === 'user' ? 'var(--violet-primary)' : 'rgba(20, 27, 58, 0.85)',
                  border: msg.role === 'assistant' ? '1px solid rgba(139, 92, 246, 0.2)' : 'none',
                  color: 'var(--text-primary)',
                  fontSize: '0.88rem',
                  lineHeight: 1.5,
                  boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                }}
              >
                {msg.hackathonName && (
                  <div
                    style={{
                      fontSize: '0.72rem',
                      color: 'var(--violet-bright)',
                      fontWeight: 700,
                      marginBottom: 4,
                      textTransform: 'uppercase',
                      letterSpacing: '0.04em',
                    }}
                  >
                    🎯 {msg.hackathonName}
                  </div>
                )}
                <p style={{ margin: 0, whiteSpace: 'pre-wrap' }}>{msg.text}</p>

                {msg.audioUrl && (
                  <button
                    type="button"
                    onClick={() => {
                      const audio = new Audio(msg.audioUrl);
                      audio.play();
                    }}
                    style={{
                      marginTop: 8,
                      padding: '4px 10px',
                      fontSize: '0.74rem',
                      fontWeight: 600,
                      background: 'rgba(255,255,255,0.1)',
                      border: '1px solid rgba(255,255,255,0.15)',
                      borderRadius: 9999,
                      color: 'var(--text-secondary)',
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 4,
                    }}
                  >
                    <span>🔊</span> Replay Voice
                  </button>
                )}

                {/* Clickable choices when disambiguation or event selection is needed */}
                {msg.choices && msg.choices.length > 0 && (
                  <div style={{ marginTop: 12, display: 'flex', flexDirection: 'column', gap: 6 }}>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>
                      Select a hackathon:
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                      {msg.choices.map((c) => (
                        <button
                          key={c.id}
                          type="button"
                          onClick={() => {
                            handleSelectEvent(c.id);
                          }}
                          style={{
                            padding: '6px 12px',
                            borderRadius: '8px',
                            background: 'rgba(139, 92, 246, 0.2)',
                            border: '1px solid rgba(139, 92, 246, 0.4)',
                            color: '#ffffff',
                            fontSize: '0.8rem',
                            fontWeight: 600,
                            cursor: 'pointer',
                            transition: 'all 0.2s',
                            textAlign: 'left',
                          }}
                        >
                          👉 {c.name}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}

          {status === 'processing' && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--violet-bright)', fontSize: '0.82rem' }}>
              <span className="spinner" style={{ width: 14, height: 14, border: '2px solid rgba(139,92,246,0.3)', borderTopColor: 'var(--violet-bright)', borderRadius: '50%', display: 'inline-block', animation: 'spin 0.8s linear infinite' }} />
              <span>Sarvam AI analyzing question…</span>
            </div>
          )}
        </div>

        {/* Error message */}
        {errorMsg && (
          <div style={{ color: '#f87171', fontSize: '0.8rem', textAlign: 'center', marginBottom: 8 }}>
            {errorMsg}
          </div>
        )}

        {/* Input & Mic Controls */}
        <div style={{ flexShrink: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
          {/* Text Question Input (Requirement 5 Fallback) */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              sendTextQuestion();
            }}
            style={{ display: 'flex', gap: 8 }}
          >
            <input
              type="text"
              className="form-input"
              placeholder={currentEvent ? `Ask anything about ${currentEvent.title}…` : 'Type a question or hackathon name…'}
              value={textInput}
              onChange={(e) => setTextInput(e.target.value)}
              disabled={status === 'processing' || status === 'recording'}
              style={{ padding: '9px 12px', fontSize: '0.86rem' }}
            />
            <button
              type="submit"
              className="btn-primary"
              disabled={!textInput.trim() || status === 'processing' || status === 'recording'}
              style={{ padding: '0 16px', display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.86rem' }}
            >
              <span>Ask</span>
              <ArrowRightIcon size={14} />
            </button>
          </form>

          {/* Voice Microphone Control */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, paddingTop: 4 }}>
            <button
              type="button"
              onClick={handleMicButton}
              disabled={status === 'processing' || backendOnline === false}
              style={{
                width: 62,
                height: 62,
                borderRadius: '50%',
                border: 'none',
                background:
                  status === 'recording'
                    ? 'linear-gradient(135deg, #f43f5e, #e11d48)'
                    : status === 'playing'
                    ? 'linear-gradient(135deg, #10b981, #059669)'
                    : status === 'processing'
                    ? 'var(--bg-surface-elevated)'
                    : 'var(--gradient-brand)',
                cursor: status === 'processing' || backendOnline === false ? 'not-allowed' : 'pointer',
                fontSize: 24,
                boxShadow:
                  status === 'recording'
                    ? '0 0 0 6px rgba(244,63,94,0.25), 0 0 0 14px rgba(244,63,94,0.1)'
                    : '0 0 25px rgba(139,92,246,0.35)',
                transition: 'all 0.25s',
                animation: status === 'recording' ? 'pulseGlow 1s infinite' : 'none',
                opacity: backendOnline === false ? 0.4 : 1,
              }}
            >
              {micEmoji[status]}
            </button>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>
              {micLabel[status]}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
