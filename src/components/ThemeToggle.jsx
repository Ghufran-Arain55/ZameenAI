import React from 'react';

export default function ThemeToggle({ dark, onToggleDark, t }) {
  return (
    <button
      onClick={onToggleDark}
      style={{
        background: dark ? '#1a3224' : '#d1f0e0',
        border: 'none',
        borderRadius: 20,
        padding: '7px 14px',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: 6,
        color: t.accent,
        fontWeight: 600,
        fontSize: 12,
        transition: 'all .2s'
      }}
    >
      {dark ? '☀️ Roshni' : '🌙 Raat'}
    </button>
  );
}
