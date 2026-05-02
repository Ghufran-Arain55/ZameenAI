import React from 'react';

const FIELDS = [
  { k: 'n', lbl: 'Nitrogen (N)', ph: 'e.g. 45', ico: '🍃' },
  { k: 'p', lbl: 'Phosphorus (P)', ph: 'e.g. 30', ico: '⚗️' },
  { k: 'k', lbl: 'Potassium (K)', ph: 'e.g. 40', ico: '⚡' },
  { k: 'ph', lbl: 'pH Level (0–14)', ph: 'e.g. 6.5', ico: '💧' },
];

export default function InputForm({ form, setForm, onAnalyze, loading, t }) {
  const isValid = form.n && form.p && form.k && form.ph && [form.n, form.p, form.k, form.ph].every(v => !isNaN(+v));

  const S = {
    card: { background: t.card, border: `1px solid ${t.border}`, borderRadius: 16, padding: '22px 22px', marginBottom: 20, boxShadow: '0 4px 20px rgba(8,129,120,.05)' },
    secTit: { fontFamily: "'Playfair Display',serif", fontSize: 18, fontWeight: 700, color: t.text, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 },
    grid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 },
    fieldWrap: { display: 'flex', flexDirection: 'column', gap: 5 },
    label: { fontSize: 11, fontWeight: 600, color: t.muted, textTransform: 'uppercase', letterSpacing: 0.7, display: 'flex', alignItems: 'center', gap: 5 },
    inp: { background: t.input, border: `1.5px solid ${t.border}`, borderRadius: 9, padding: '11px 13px', fontSize: 14, color: t.text, width: '100%', transition: 'border .2s', outline: 'none' },
    btn: { background: t.accent, color: '#fff', border: 'none', borderRadius: 11, padding: '13px 24px', fontSize: 15, fontWeight: 600, cursor: 'pointer', width: '100%', marginTop: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, transition: 'all .2s' },
    spinner: { width: 16, height: 16, border: '2px solid #fff4', borderTop: '2px solid #fff', borderRadius: '50%', animation: 'spin .7s linear infinite' },
  };

  return (
    <div style={S.card}>
      <div style={S.secTit}>
        <span style={{ fontSize: 20 }}>🧪</span>
        Zameen Ki Jaanch Karein
      </div>

      <div style={S.grid}>
        {FIELDS.map(({ k, lbl, ph, ico }) => (
          <div key={k} style={S.fieldWrap}>
            <label style={S.label}>
              <span style={{ fontSize: 14 }}>{ico}</span>
              {lbl}
            </label>
            <input
              className="za-inp"
              style={S.inp}
              type="number"
              placeholder={ph}
              value={form[k]}
              onChange={e => setForm(f => ({ ...f, [k]: e.target.value }))}
              step={k === 'ph' ? 0.1 : 1}
              min={0}
              max={k === 'ph' ? 14 : 200}
            />
          </div>
        ))}
      </div>

      <button className="za-btn" style={S.btn} disabled={!isValid || loading} onClick={onAnalyze}>
        {loading ? [<div key="sp" style={S.spinner} />, 'Tahleel ho rahi hai...'] : ['🌱 ', 'Zameen Ka Tahleel Karein']}
      </button>
    </div>
  );
}
