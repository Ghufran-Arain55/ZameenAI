export default function ThemeToggle({ dark, onToggleDark, t }) {
  return (
    <button
      onClick={onToggleDark}
      style={{
        background: dark ? '#1a3230' : '#e6f4f1',
        border: `1px solid ${t.border}`,
        borderRadius: 20,
        padding: '6px 12px',
        cursor: 'pointer'
      }}
    >
      {dark ? '🌙 Dark' : '☀️ Light'}
    </button>
  );
}
