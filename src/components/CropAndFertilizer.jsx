import React from 'react';

export default function CropAndFertilizer({ result, revealed, dark, t }) {
  const S = {
    grid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 18 },
    card: (delay) => ({ background: t.card, border: `1px solid ${t.border}`, borderRadius: 16, padding: '22px 22px', margin: 0, boxShadow: dark ? '0 4px 20px rgba(0,0,0,.3)' : '0 4px 20px rgba(8,129,120,.05)', opacity: revealed ? 1 : 0, transform: revealed ? 'translateY(0)' : 'translateY(18px)', transition: `all .5s ${delay}s ease` }),
    secTit: { fontFamily: "'Playfair Display',serif", fontSize: 18, fontWeight: 700, color: t.text, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 },
    cropTag: { background: dark ? '#1a3a22' : '#dcfce7', color: dark ? '#86efac' : '#166534', border: `1px solid ${dark ? '#22543a' : '#86efac'}`, borderRadius: 16, padding: '5px 13px', fontSize: 12, fontWeight: 500 },
    fertRow: (color) => ({ background: color + (dark ? '22' : '11'), border: `1px solid ${color}44`, borderRadius: 10, padding: '11px 13px', display: 'flex', gap: 10, alignItems: 'flex-start' }),
    dot: (color) => ({ width: 9, height: 9, borderRadius: '50%', background: color, marginTop: 4, flexShrink: 0 }),
    fertName: { fontSize: 13, fontWeight: 600, color: t.text },
    fertDetail: { fontSize: 11, color: t.muted, marginTop: 2 },
  };

  return (
    <div style={S.grid}>
      <div style={S.card(0.15)}>
        <div style={S.secTit}>🌾 Recommended Faslen</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {result.crops.map(c => <div key={c} style={S.cropTag}>{c}</div>)}
        </div>
      </div>

      <div style={S.card(0.25)}>
        <div style={S.secTit}>🧪 Khad Ki Salah</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {result.fert.map(f => (
            <div key={f.name} style={S.fertRow(f.color)}>
              <div style={S.dot(f.color)} />
              <div>
                <div style={S.fertName}>{f.name}</div>
                <div style={S.fertDetail}>{f.detail}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
