import React from 'react';
import ThemeToggle from './ThemeToggle';

export default function Header({ dark, onToggleDark, t }) {
  const S = {
    hdr: { background: t.hdr, borderBottom: `1px solid ${t.border}`, padding: '14px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 50 },
    logo: { fontFamily: "'Playfair Display',serif", fontSize: 22, fontWeight: 700, color: t.accent },
    sub: { fontSize: 11, color: t.sub, marginTop: 2 },
  };

  return (
    <header style={S.hdr}>
      <div>
        <div style={S.logo}>🌿 ZameenAI</div>
        <div style={S.sub}>Smart Soil Advisor for Farmers</div>
      </div>
      <ThemeToggle dark={dark} onToggleDark={onToggleDark} t={t} />
    </header>
  );
}
