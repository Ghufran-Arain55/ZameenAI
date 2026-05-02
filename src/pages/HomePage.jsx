import React, { useState, useCallback } from 'react';
import { useTheme, getThemeTokens } from '../utils/theme';
import { TIPS, CFG } from '../utils/soilData';
import { analyzeAndBuild } from '../utils/soilAnalysis';
import Header from '../components/Header';
import FarmerTip from '../components/FarmerTip';
import InputForm from '../components/InputForm';
import ResultCard from '../components/ResultCard';
import CropAndFertilizer from '../components/CropAndFertilizer';
import ActionPlan from '../components/ActionPlan';
import EmptyState from '../components/EmptyState';

const [tipIdx] = [Math.floor(Math.random() * TIPS.length)];

export default function HomePage() {
  const { dark, toggleDark } = useTheme();
  const t = getThemeTokens(dark);

  const [form, setForm]       = useState({ n: '', p: '', k: '', ph: '' });
  const [result, setResult]   = useState(null);
  const [loading, setLoading] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const [activeDay, setActiveDay] = useState(null);
  const [apiError, setApiError]   = useState(null);

  const analyze = useCallback(async () => {
    const n  = parseFloat(form.n);
    const p  = parseFloat(form.p);
    const k  = parseFloat(form.k);
    const ph = parseFloat(form.ph);
    if ([n, p, k, ph].some(isNaN)) return;

    setLoading(true);
    setRevealed(false);
    setResult(null);
    setActiveDay(null);
    setApiError(null);
    if (window.speechSynthesis) window.speechSynthesis.cancel();
    setSpeaking(false);

    try {
      const res = await analyzeAndBuild(n, p, k, ph);
      setResult(res);
      setTimeout(() => setRevealed(true), 60);
    } catch (e) {
      setApiError('❌ ' + e.message);
    } finally {
      setLoading(false);
    }
  }, [form]);

  const speak = useCallback(() => {
    if (!result) return;
    if (speaking) {
      window.speechSynthesis.cancel();
      setSpeaking(false);
      return;
    }
    const label = CFG[result.cls]?.label ?? result.cls;
    const crops = result.crops.slice(0, 3).join(', ');
    const conf  = result.confidence ? ` Confidence: ${result.confidence} percent.` : '';
    const txt   = `ZameenAI natija. Zameen ki halat: ${label}. Recommended faslen: ${crops}.${conf}`;
    const u = new SpeechSynthesisUtterance(txt);
    u.lang  = 'en-US';
    u.rate  = 0.88;
    u.onend = () => setSpeaking(false);
    setSpeaking(true);
    window.speechSynthesis.speak(u);
  }, [result, speaking]);

  const resetAll = () => {
    setResult(null);
    setForm({ n: '', p: '', k: '', ph: '' });
    setRevealed(false);
    setApiError(null);
    if (window.speechSynthesis) window.speechSynthesis.cancel();
    setSpeaking(false);
  };

  const S = {
    wrap:      { minHeight: '100vh', background: t.bg, fontFamily: "'DM Sans',sans-serif", color: t.text, transition: 'background .3s,color .3s' },
    main:      { maxWidth: 820, margin: '0 auto', padding: '20px 14px' },
    errBanner: { background: '#fef3c7', border: '1px solid #f59e0b', borderRadius: 10, padding: '10px 14px', fontSize: 12, color: '#92400e', marginBottom: 14 },
  };

  return (
    <div style={S.wrap}>
      <style>{`
        .za-inp:focus{border-color:${t.accent}!important;box-shadow:0 0 0 3px ${t.accent}22}
        .za-btn:hover:not(:disabled){background:${dark ? '#0fa898' : '#065d5e'}!important;box-shadow:0 6px 18px ${t.accent}44}
        .za-btn:disabled{opacity:.45;cursor:not-allowed}
        .za-day-r:hover{box-shadow:0 3px 12px rgba(0,0,0,.1);transform:scale(1.005)}
        .bar-fill{animation:fillBar .9s ease forwards}
      `}</style>

      <Header dark={dark} onToggleDark={toggleDark} t={t} />

      <main style={S.main}>
        <FarmerTip tip={TIPS[tipIdx]} dark={dark} t={t} />
        <InputForm form={form} setForm={setForm} onAnalyze={analyze} loading={loading} t={t} />

        {apiError && <div style={S.errBanner}>{apiError}</div>}

        {loading && (
          <div style={{ display: 'flex', gap: 7, justifyContent: 'center', padding: '28px 0' }}>
            {[0, 1, 2].map(i => (
              <div
                key={i}
                style={{ width: 9, height: 9, borderRadius: '50%', background: t.accent, animation: `bounce .7s ${i * 0.15}s infinite alternate ease-in-out` }}
              />
            ))}
          </div>
        )}

        {result && (
          <div style={{ animation: 'popIn .4s ease' }}>
            <ResultCard result={result} revealed={revealed} dark={dark} speaking={speaking} onSpeak={speak} t={t} />
            <CropAndFertilizer result={result} revealed={revealed} dark={dark} t={t} />
            <ActionPlan plan={result.plan} activeDay={activeDay} setActiveDay={setActiveDay} revealed={revealed} t={t} />
            <div style={{ textAlign: 'center', paddingBottom: 28 }}>
              <button
                style={{ background: 'transparent', border: `1.5px solid ${t.border}`, borderRadius: 9, padding: '9px 22px', fontSize: 12, color: t.muted, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 7 }}
                onClick={resetAll}
              >
                🔄 Naya Tahleel Karein
              </button>
            </div>
          </div>
        )}

        {!result && !loading && <EmptyState t={t} />}
      </main>
    </div>
  );
}

