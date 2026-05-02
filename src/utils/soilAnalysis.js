import { ACTION_PLANS } from './soilData';

// ─── Health mapping: Python API → frontend key ────────────────────────────
const HEALTH_KEY = { Good: 'good', Moderate: 'moderate', Poor: 'poor' };

// ─── Main async function – PURELY ML-driven ───────────────────────────────
// All results come from the trained model via the Flask API.
// No hardcoded rules – if the API is down, the user sees an error.
export async function analyzeAndBuild(n, p, k, ph) {
  const res = await fetch('https://ghufran-arain55-zameenai-backend.hf.space/api/predict', {
    method:  'POST',
    headers: { 'Content-Type': 'application/json' },
    body:    JSON.stringify({ n, p, k, ph }),
  });

  if (!res.ok) {
    throw new Error('ML server se connection nahi ho saka. Pehle "python api/app.py" run karein.');
  }

  const data = await res.json();

  if (!data.success) {
    throw new Error(data.error || 'ML model se error aaya.');
  }

  const cls = HEALTH_KEY[data.soil_health] || 'moderate';

  return {
    cls,
    n, p, k, ph,
    source:     'ml',
    confidence: data.confidence,
    crops:      data.crops,
    fert:       data.fertilizers,
    plan:       ACTION_PLANS[cls],
  };
}

