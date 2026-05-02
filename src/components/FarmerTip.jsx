import React from 'react';

export default function FarmerTip({ tip, dark, t }) {
  const S = {
    tip: { background: dark ? '#0f2a1a' : '#e4f7eb', border: `1px solid ${dark ? '#1e4a2a' : '#9dcfaa'}`, borderRadius: 12, padding: '14px 18px', marginBottom: 20, display: 'flex', gap: 10, alignItems: 'flex-start' },
    label: { fontSize: 11, fontWeight: 600, color: t.accent, textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 4 },
    text: { fontSize: 13, color: t.text, lineHeight: 1.65 },
  };

  return (
    <div style={S.tip}>
      <span style={{ fontSize: 20, flexShrink: 0, marginTop: 2 }}>💡</span>
      <div>
        <div style={S.label}>Aaj Ka Zarori Mashwara</div>
        <div style={S.text}>{tip}</div>
      </div>
    </div>
  );
}
