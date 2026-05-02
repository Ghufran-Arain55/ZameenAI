import React from 'react';

export default function ActionPlan({ plan, activeDay, setActiveDay, revealed, t }) {
  const S = {
    card: { background: t.card, border: `1px solid ${t.border}`, borderRadius: 16, padding: '22px 22px', marginBottom: 20, boxShadow: '0 4px 20px rgba(8,129,120,.05)', opacity: revealed ? 1 : 0, transform: revealed ? 'translateY(0)' : 'translateY(18px)', transition: 'all .5s .35s ease' },
    secTit: { fontFamily: "'Playfair Display',serif", fontSize: 18, fontWeight: 700, color: t.text, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 },
    hint: { fontSize: 12, color: t.muted, marginBottom: 14, marginTop: -8 },
    dayRow: (day, isActive) => ({ background: isActive ? day.color + '18' : t.card, border: `1.5px solid ${isActive ? day.color + '88' : t.border}`, borderRadius: 12, padding: '13px 15px', cursor: 'pointer', transition: 'all .2s', display: 'flex', gap: 12, alignItems: 'flex-start', marginBottom: 8 }),
    dayBadge: (color) => ({ background: color + '22', color, borderRadius: 8, width: 38, height: 38, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 13, flexShrink: 0, border: `1px solid ${color}44` }),
    taskRow: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 6 },
    taskTitle: { fontSize: 13, fontWeight: 600, color: t.text },
    arrow: (isActive) => ({ color: t.muted, fontSize: 16, transition: 'transform .2s', transform: isActive ? 'rotate(90deg)' : 'rotate(0)' }),
    detail: (color) => ({ marginTop: 8, paddingTop: 8, borderTop: `1px solid ${color}44`, fontSize: 12, color: t.text, lineHeight: 1.7, animation: 'fadeSlide .22s ease' }),
  };

  return (
    <div style={S.card}>
      <div style={S.secTit}>📅 7-Din Ka Amal Ka Khaka</div>
      <p style={S.hint}>Kisi bhi din par click karein zyada detail ke liye</p>
      <div>
        {plan.map(day => {
          const isActive = activeDay === day.day;
          return (
            <div
              key={day.day}
              className="za-day-r"
              style={S.dayRow(day, isActive)}
              onClick={() => setActiveDay(d => (d === day.day ? null : day.day))}
            >
              <div style={S.dayBadge(day.color)}>{`D${day.day}`}</div>
              <div style={{ flex: 1 }}>
                <div style={S.taskRow}>
                  <div style={S.taskTitle}>{`${day.icon} ${day.task}`}</div>
                  <span style={S.arrow(isActive)}>›</span>
                </div>
                {isActive && <div style={S.detail(day.color)}>{day.detail}</div>}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
