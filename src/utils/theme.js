import { useState, useEffect } from 'react';

export function useTheme() {
  const [dark, setDark] = useState(() => {
    try {
      return localStorage.getItem('z-theme') === 'dark';
    } catch {
      return false;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('z-theme', dark ? 'dark' : 'light');
    } catch {}
  }, [dark]);

  return { dark, toggleDark: () => setDark(d => !d) };
}

export function getThemeTokens(dark) {
  return dark
    ? { bg: '#0a1a10', card: '#122018', border: '#1e3a28', text: '#e2f5ea', muted: '#5a9a6e', input: '#0d2416', accent: '#0eb89f', hdr: '#0d2016', sub: '#6dac80' }
    : { bg: '#f0f7f1', card: '#ffffff', border: '#cce8d4', text: '#1a2e1e', muted: '#5a8062', input: '#ffffff', accent: '#088178', hdr: '#e3f5e8', sub: '#4a7558' };
}
