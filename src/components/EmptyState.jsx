import React from 'react';

export default function EmptyState({ t }) {
  return (
    <div style={{ textAlign: 'center', color: t.muted, fontSize: 12, padding: '28px 0', borderTop: `1px solid ${t.border}`, marginTop: 8 }}>
      <div style={{ fontSize: 26, marginBottom: 6 }}>🌾</div>
      <div style={{ fontWeight: 600, marginBottom: 4, color: t.text }}>ZameenAI – Kisaan Ka Digital Saathi</div>
      <div>Soil values darj karein aur apni zameen ka mukammal tahleel haasil karein</div>
    </div>
  );
}
