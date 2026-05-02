import React from 'react';
import { CFG, URDU } from '../utils/soilData';

const BARS = [
  { lbl: 'Nitrogen',   key: 'n',  max: 100, c: '#22c55e' },
  { lbl: 'Phosphorus', key: 'p',  max: 80,  c: '#a855f7' },
  { lbl: 'Potassium',  key: 'k',  max: 100, c: '#f59e0b' },
  { lbl: 'pH Level',   key: 'ph', max: 14,  c: '#0ea5e9' },
];

export default function ResultCard({ result, revealed, dark, speaking, onSpeak, t }) {
  const cfg        = CFG[result.cls];
  const isML       = result.source === 'ml';
  const confidence = result.confidence;

  const S = {
    wrap:      { background: dark ? cfg.bgD : cfg.bgL, border: `2px solid ${cfg.color}44`, borderRadius: 16, padding: '20px 22px', marginBottom: 18, opacity: revealed ? 1 : 0, transform: revealed ? 'translateY(0)' : 'translateY(20px)', transition: 'all .45s ease' },
    top:       { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 10, marginBottom: 12 },
    label:     { fontSize: 11, fontWeight: 600, color: t.muted, textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 6 },
    badge:     { background: cfg.color + '22', color: cfg.color, borderRadius: 99, padding: '5px 16px', fontSize: 13, fontWeight: 700, display: 'inline-flex', alignItems: 'center', border: `1px solid ${cfg.color}55` },
    mlBadge:   { display: 'inline-flex', alignItems: 'center', gap: 6, background: isML ? '#0eb89f18' : '#6b728018', border: `1px solid ${isML ? '#0eb89f55' : '#6b728044'}`, borderRadius: 99, padding: '3px 11px', fontSize: 11, fontWeight: 600, color: isML ? '#0eb89f' : t.muted, marginTop: 6 },
    confRow:   { marginBottom: 14 },
    confTrack: { height: 5, borderRadius: 99, background: dark ? '#1e3a28' : '#d4f0da', marginTop: 5, overflow: 'hidden' },
    speakBtn:  { background: speaking ? '#ef444420' : t.card, border: `1.5px solid ${speaking ? '#ef4444' : t.border}`, color: speaking ? '#ef4444' : t.accent, borderRadius: 10, padding: '9px 18px', fontSize: 12, fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, transition: 'all .2s' },
    barsGrid:  { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px 18px', marginBottom: 14 },
    barLabel:  { display: 'flex', justifyContent: 'space-between', fontSize: 11, color: t.muted },
    barTrack:  { height: 7, borderRadius: 99, background: dark ? '#1e3a28' : '#d4f0da', marginTop: 4, overflow: 'hidden' },
    urduBox:   { background: dark ? '#0d2416' : '#f0fdf4', border: `1px solid ${dark ? '#1e4a28' : '#bbf0cc'}`, borderRadius: 10, padding: '13px 15px', fontSize: 13, lineHeight: 1.75, color: t.text },
  };

  return (
    <div style={S.wrap}>
      <div style={S.top}>
        <div>
          <div style={S.label}>Zameen Ki Halat</div>
          <div style={S.badge}>{cfg.label}</div>
          {/* ML source + confidence badge */}
          <div style={S.mlBadge}>
            {isML ? '🤖 ML Model' : '📐 Rule-Based'}
            {isML && confidence != null && (
              <span style={{ opacity: 0.8 }}>• {confidence}% confident</span>
            )}
          </div>
        </div>
        <button style={S.speakBtn} onClick={onSpeak}>
          {speaking ? '🔇 Band Karein' : '🔊 Sunayen'}
        </button>
      </div>

      {/* Confidence bar (only when ML) */}
      {isML && confidence != null && (
        <div style={S.confRow}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, color: t.muted, marginBottom: 2 }}>
            <span>Model Confidence</span>
            <span style={{ fontWeight: 700, color: t.accent }}>{confidence}%</span>
          </div>
          <div style={S.confTrack}>
            <div
              className="bar-fill"
              style={{ '--w': `${confidence}%`, height: '100%', background: `linear-gradient(90deg, ${t.accent}, #0eb89f)`, borderRadius: 99 }}
            />
          </div>
        </div>
      )}

      <div style={S.barsGrid}>
        {BARS.map(({ lbl, key, max, c }) => (
          <div key={lbl}>
            <div style={S.barLabel}>
              <span>{lbl}</span>
              <span style={{ fontWeight: 600, color: t.text }}>{result[key]}</span>
            </div>
            <div style={S.barTrack}>
              <div
                className="bar-fill"
                style={{ '--w': `${Math.min(100, (result[key] / max) * 100).toFixed(1)}%`, height: '100%', background: c, borderRadius: 99 }}
              />
            </div>
          </div>
        ))}
      </div>

      <div style={S.urduBox}>
        <strong style={{ color: t.accent }}>📢 Wazahat: </strong>
        {URDU[result.cls]}
      </div>
    </div>
  );
}

