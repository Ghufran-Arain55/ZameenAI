"""
ZameenAI – Flask Backend
Replicates the soil_hackahon.ipynb ML pipeline:
  - Model 1: Soil Health Classifier (RandomForest)
  - Model 2: Crop Recommender (XGBoost)
  - Model 3: Fertilizer Recommender (RandomForest)
All models are trained on startup from synthetic/generated data
matching the notebook's logic exactly.
"""

from flask import Flask, request, jsonify
from flask_cors import CORS
import numpy as np
import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import StandardScaler, LabelEncoder
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score
import warnings
import sys
import io

warnings.filterwarnings("ignore")

# Fix Windows console encoding for Unicode
if sys.stdout.encoding != 'utf-8':
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')
    sys.stderr = io.TextIOWrapper(sys.stderr.buffer, encoding='utf-8', errors='replace')

app = Flask(__name__)
CORS(app)

# ─── Global model objects ───────────────────────────────────────────────────
soil_model = None
crop_model = None
fert_model = None
scaler_soil = None
scaler_crop = None
scaler_fert = None
crop_encoder = None
fert_encoder = None

SOIL_HEALTH_MAP = {0: "Poor", 1: "Moderate", 2: "Good"}

FERTILIZER_INFO = {
    "Urea":        {"detail": "46% N – 2 bags per acre daalen",            "color": "#22c55e"},
    "DAP":         {"detail": "18% N + 46% P – 1 bag per acre",             "color": "#a855f7"},
    "MOP":         {"detail": "60% K2O – 1 bag per acre daalen",            "color": "#f59e0b"},
    "Lime":        {"detail": "pH badhane ke liye – 150 kg/acre daalein",   "color": "#0ea5e9"},
    "Gypsum":      {"detail": "Alkaline correction – 200 kg/acre daalein",  "color": "#ef4444"},
    "NPK Complex": {"detail": "20-20-20 Balanced – maintenance ke liye",    "color": "#088178"},
    "14-35-14":    {"detail": "High Phosphorus blend – 1 bag/acre",         "color": "#8b5cf6"},
    "SSP":         {"detail": "Single Super Phosphate 16% P – 2 bags/acre", "color": "#6366f1"},
    "SOP":         {"detail": "50% K2O – 1 bag per acre daalen",            "color": "#f59e0b"},
}

CROP_DISPLAY = {
    "rice": "Rice (Chawal)", "wheat": "Wheat (Gehu)", "maize": "Maize (Makka)",
    "cotton": "Cotton (Kapas)", "sugarcane": "Sugarcane (Ganna)",
    "jute": "Jute", "coffee": "Coffee", "banana": "Banana (Kela)",
    "mango": "Mango (Aam)", "grapes": "Grapes (Angoor)",
    "watermelon": "Watermelon (Tarbooz)", "muskmelon": "Muskmelon (Kharbooza)",
    "apple": "Apple (Seb)", "orange": "Orange (Narangi)",
    "papaya": "Papaya (Papita)", "coconut": "Coconut (Nariyal)",
    "chickpea": "Chickpea (Chana)", "kidneybeans": "Kidney Beans (Rajma)",
    "pigeonpeas": "Pigeon Peas (Arhar)", "mothbeans": "Moth Beans",
    "blackgram": "Black Gram (Urad Dal)", "lentil": "Lentil (Masoor)",
}

# ─── Data Generation (mirrors notebook) ─────────────────────────────────────

def _soil_health_score(N, P, K, pH):
    """Same scoring function used in the notebook."""
    score = 0
    if N >= 50:
        score += 1
    elif N >= 35:
        score += 0.5
    if P >= 25:
        score += 1
    elif P >= 15:
        score += 0.5
    if K >= 40:
        score += 1
    elif K >= 25:
        score += 0.5
    if 6.0 <= pH <= 7.0:
        score += 1
    elif 5.5 <= pH <= 7.5:
        score += 0.5
    if N > 80:
        score += 0.5
    return 2 if score >= 3.5 else 1 if score >= 2.0 else 0


def _generate_crop_data():
    """Synthetic crop dataset matching notebook Kaggle crop-recommendation data patterns."""
    crop_profiles = {
        "rice":        ((60, 120), (30, 60), (30, 60),  (5.0, 7.0)),
        "wheat":       ((60, 120), (30, 60), (30, 60),  (6.0, 8.0)),
        "maize":       ((60, 120), (30, 60), (30, 60),  (5.5, 7.5)),
        "cotton":      ((60, 140), (20, 50), (15, 40),  (6.5, 8.5)),
        "sugarcane":   ((100,200), (30, 60), (40, 80),  (5.5, 8.0)),
        "jute":        ((60, 120), (30, 60), (30, 60),  (6.0, 8.0)),
        "coffee":      ((60, 120), (30, 60), (30, 60),  (6.0, 7.5)),
        "banana":      ((80, 140), (30, 60), (40, 80),  (5.0, 7.0)),
        "mango":       ((20, 80),  (10, 40), (20, 60),  (5.0, 7.5)),
        "grapes":      ((20, 60),  (10, 40), (20, 60),  (5.5, 7.5)),
        "watermelon":  ((80, 130), (30, 60), (40, 80),  (5.5, 7.5)),
        "muskmelon":   ((80, 130), (30, 60), (40, 80),  (5.5, 7.5)),
        "apple":       ((20, 80),  (10, 40), (100,200), (5.5, 7.0)),
        "orange":      ((20, 80),  (10, 40), (5, 20),   (6.0, 8.0)),
        "papaya":      ((40, 80),  (30, 60), (40, 80),  (5.5, 8.0)),
        "coconut":     ((20, 80),  (10, 40), (30, 60),  (5.0, 8.0)),
        "chickpea":    ((20, 60),  (60,120), (20, 80),  (5.5, 7.5)),
        "kidneybeans": ((20, 60),  (60,120), (20, 80),  (5.5, 7.5)),
        "pigeonpeas":  ((20, 60),  (60,120), (20, 80),  (5.0, 7.0)),
        "mothbeans":   ((20, 80),  (30, 60), (20, 40),  (3.5, 6.5)),
        "blackgram":   ((20, 80),  (40, 80), (10, 30),  (5.0, 7.5)),
        "lentil":      ((20, 60),  (60,120), (20, 80),  (5.5, 7.5)),
    }
    np.random.seed(42)
    rows = []
    for crop, (nr, pr, kr, phr) in crop_profiles.items():
        N  = np.random.uniform(*nr,  100)
        P  = np.random.uniform(*pr,  100)
        K  = np.random.uniform(*kr,  100)
        pH = np.random.uniform(*phr, 100)
        for i in range(100):
            rows.append([N[i], P[i], K[i], pH[i], crop])
    return pd.DataFrame(rows, columns=["N", "P", "K", "pH", "label"])


def _generate_fert_data():
    """Synthetic fertilizer dataset (original 99-row dataset augmented with 500 synthetic rows,
    mirroring the notebook's augmentation logic)."""
    np.random.seed(42)
    rows = []
    for _ in range(600):
        N  = np.random.uniform(20, 130)
        P  = np.random.uniform(10, 70)
        K  = np.random.uniform(15, 90)
        pH = np.random.uniform(5.0, 8.5)
        if N < 45:
            fert = "Urea"
        elif P < 25:
            fert = "DAP"
        elif K < 35:
            fert = "MOP"
        elif pH < 6.0:
            fert = "Lime"
        elif pH > 7.5:
            fert = "Gypsum"
        else:
            fert = "NPK Complex"
        rows.append([N, P, K, pH, fert])
    return pd.DataFrame(rows, columns=["N", "P", "K", "pH", "Fertilizer Name"])


# ─── Model Training ──────────────────────────────────────────────────────────

def train_models():
    global soil_model, crop_model, fert_model
    global scaler_soil, scaler_crop, scaler_fert
    global crop_encoder, fert_encoder

    print("=" * 55)
    print("[*] ZameenAI - Training ML Models")
    print("=" * 55)

    features = ["N", "P", "K", "pH"]

    # ── Crop dataset ──────────────────────────────────────────
    crop_df = _generate_crop_data()
    crop_df["soil_health"] = crop_df.apply(
        lambda r: _soil_health_score(r["N"], r["P"], r["K"], r["pH"]), axis=1
    )

    # ── Model 1: Soil Health ──────────────────────────────────
    print("\n[1] Training Model 1: Soil Health Classifier...")
    X = crop_df[features]
    y = crop_df["soil_health"]
    X_tr, X_te, y_tr, y_te = train_test_split(X, y, test_size=0.2, random_state=42, stratify=y)
    scaler_soil = StandardScaler()
    soil_model = RandomForestClassifier(n_estimators=100, random_state=42)
    soil_model.fit(scaler_soil.fit_transform(X_tr), y_tr)
    acc = accuracy_score(y_te, soil_model.predict(scaler_soil.transform(X_te)))
    print(f"    -> Accuracy: {acc*100:.1f}%")

    # ── Model 2: Crop Recommendation ─────────────────────────
    print("\n[2] Training Model 2: Crop Recommender...")
    X2 = crop_df[features]
    y2 = crop_df["label"]
    crop_encoder = LabelEncoder()
    y2e = crop_encoder.fit_transform(y2)
    X2_tr, X2_te, y2_tr, y2_te = train_test_split(X2, y2e, test_size=0.2, random_state=42, stratify=y2e)
    scaler_crop = StandardScaler()

    try:
        from xgboost import XGBClassifier
        crop_model = XGBClassifier(
            n_estimators=100, learning_rate=0.1, random_state=42, eval_metric="mlogloss", verbosity=0
        )
        print("   Using XGBoost (matching notebook).")
    except ImportError:
        print("   XGBoost not found – falling back to RandomForest.")
        crop_model = RandomForestClassifier(n_estimators=100, random_state=42)

    crop_model.fit(scaler_crop.fit_transform(X2_tr), y2_tr)
    acc2 = accuracy_score(y2_te, crop_model.predict(scaler_crop.transform(X2_te)))
    print(f"    -> Accuracy: {acc2*100:.1f}%")

    # ── Model 3: Fertilizer Recommendation ───────────────────
    print("\n[3] Training Model 3: Fertilizer Recommender...")
    fert_df = _generate_fert_data()
    X3 = fert_df[features]
    y3 = fert_df["Fertilizer Name"]
    fert_encoder = LabelEncoder()
    y3e = fert_encoder.fit_transform(y3)
    X3_tr, X3_te, y3_tr, y3_te = train_test_split(X3, y3e, test_size=0.2, random_state=42)
    scaler_fert = StandardScaler()
    fert_model = RandomForestClassifier(n_estimators=100, random_state=42)
    fert_model.fit(scaler_fert.fit_transform(X3_tr), y3_tr)
    acc3 = accuracy_score(y3_te, fert_model.predict(scaler_fert.transform(X3_te)))
    print(f"    -> Accuracy: {acc3*100:.1f}%")

    print("\n[OK] All models trained and ready!")
    print("=" * 55)


# ─── Endpoints ───────────────────────────────────────────────────────────────

@app.route("/api/health", methods=["GET"])
def health():
    return jsonify({"status": "ok", "message": "ZameenAI API is running"})


@app.route("/api/predict", methods=["POST"])
def predict():
    try:
        body = request.get_json(force=True)
        N  = float(body["n"])
        P  = float(body["p"])
        K  = float(body["k"])
        pH = float(body["ph"])

        # Validate
        if not (0 <= pH <= 14):
            return jsonify({"success": False, "error": "pH must be between 0 and 14"}), 400
        if any(v < 0 for v in [N, P, K]):
            return jsonify({"success": False, "error": "Nutrient values cannot be negative"}), 400

        inp = np.array([[N, P, K, pH]])

        # ── Soil Health ──────────────────────────────────────
        inp_s = scaler_soil.transform(inp)
        soil_code = int(soil_model.predict(inp_s)[0])
        soil_conf = float(soil_model.predict_proba(inp_s)[0].max())
        soil_health = SOIL_HEALTH_MAP[soil_code]

        # ── Crop (top-3) ─────────────────────────────────────
        inp_c = scaler_crop.transform(inp)
        crop_probs = crop_model.predict_proba(inp_c)[0]
        top3_idx   = crop_probs.argsort()[-3:][::-1]
        top3_names = [crop_encoder.inverse_transform([i])[0] for i in top3_idx]
        top3_display = [CROP_DISPLAY.get(c, c.title()) for c in top3_names]
        crop_conf  = float(crop_probs.max())

        # ── Fertilizer ───────────────────────────────────────
        inp_f = scaler_fert.transform(inp)
        fert_enc  = int(fert_model.predict(inp_f)[0])
        fert_name = fert_encoder.inverse_transform([fert_enc])[0]
        fert_conf = float(fert_model.predict_proba(inp_f)[0].max())
        fert_info = FERTILIZER_INFO.get(fert_name, {"detail": "Recommended by model", "color": "#088178"})

        # ── Additional fertilizers based on deficiencies ──────
        extra_ferts = []
        if N < 30 and fert_name != "Urea":
            extra_ferts.append({"name": "Urea", **FERTILIZER_INFO["Urea"]})
        if P < 20 and fert_name != "DAP":
            extra_ferts.append({"name": "DAP", **FERTILIZER_INFO["DAP"]})
        if K < 30 and fert_name not in ("MOP", "SOP"):
            extra_ferts.append({"name": "MOP", **FERTILIZER_INFO["MOP"]})

        fert_list = [{"name": fert_name, **fert_info}] + extra_ferts

        # ── Confidence ───────────────────────────────────────
        avg_conf = round((soil_conf + crop_conf + fert_conf) / 3 * 100, 1)

        return jsonify({
            "success":     True,
            "soil_health": soil_health,        # "Good" | "Moderate" | "Poor"
            "crops":       top3_display,        # list of 3 display names
            "fertilizers": fert_list,           # [{name, detail, color}]
            "confidence":  avg_conf,            # e.g. 81.3
            "n": N, "p": P, "k": K, "ph": pH,
        })

    except KeyError as e:
        return jsonify({"success": False, "error": f"Missing field: {e}"}), 400
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500


# ─── Entry Point ─────────────────────────────────────────────────────────────

if __name__ == "__main__":
    train_models()
    print("\n>>> Server starting on http://localhost:5000\n")
    app.run(debug=False, host="0.0.0.0", port=5000)
