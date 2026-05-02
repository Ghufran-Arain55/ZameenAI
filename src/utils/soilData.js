export const TIPS = [
  'Apni mitti ko har 2 hafton mein check karein taake fasal ko sahi khad aur paani diya ja sake.',
  'Mitti ka pH 6-7.5 ke beech majood ho to ziyada faslon ke liye behtar hota hai.',
  'Fasal ki diversity barhane se mitti mein nutrients ka balance behtar rehta hai.',
  'Sahi fertilizer dose ka istemal molekular analysis ke mutabiq karen, zyada istemal na karen.',
];

export const CFG = {
  good: { label: 'Achhi', color: '#16a34a', bgL: '#ecfdf5', bgD: '#0b2d17' },
  moderate: { label: 'Madhyam', color: '#f59e0b', bgL: '#fff7cd', bgD: '#3d2f10' },
  poor: { label: 'Kharab', color: '#ef4444', bgL: '#fee2e2', bgD: '#391a1c' },
};

export const URDU = {
  good: 'Aapki zemn ki halat achhi hai. Yeh munsifana warayati aur fertilization ki wajah se mumkin hai.',
  moderate: 'Mitti theek hai lekin behtari ki gunjaish hai. Sahi fertilizer aur pH adjustment se behter fasal mil sakti hai.',
  poor: 'Zameen ki halat kharab hai. Khad, pH correction aur soil amendment zaroori hain.',
};

export const CROPS = {
  good: ['Gehu', 'Chana', 'Sugarcane', 'Sabziyan'],
  moderate: ['Jawar', 'Mustard', 'Hara Dhan', 'Moong'],
  poor: ['Bajara', 'Sesame', 'Methi', 'Sarson'],
};

export const ACTION_PLANS = {
  good: [
    { day: 1, icon: '🧪', task: 'Soil Sampling', detail: 'Mitti ka mukammal pattern note karen aur lab se detailed report haasil karen.', color: '#16a34a' },
    { day: 2, icon: '🌱', task: 'Sahi Faslon Ka Intikhab', detail: 'Achhi mitti may gehu, chana ya sabziyaan boi ja sakti hain.', color: '#22c55e' },
    { day: 3, icon: '💧', task: 'Irrigation Schedule', detail: 'Pani ka schedule muntazim karen aur overwatering se parhez karen.', color: '#0ea5e9' },
    { day: 4, icon: '🧴', task: 'Fertilizer Istamal', detail: 'Balanced NPK ya maintenance khad ka istemal karen.', color: '#a855f7' },
    { day: 5, icon: '🌿', task: 'Crop Protection', detail: 'Khadmat aur pesticide istamal mein ihtiyat baratien.', color: '#f59e0b' },
    { day: 6, icon: '🛠️', task: 'Soil Amendment', detail: 'Zaroori miqdar mein compost ya organic matter add karen.', color: '#0a8d00' },
    { day: 7, icon: '🔍', task: 'Monitoring', detail: 'Fasal ki rohaniat aur mitti ke halat ko nazar mein rakhen.', color: '#14b8a6' },
  ],
  moderate: [
    { day: 1, icon: '🧪', task: 'Soil Testing', detail: 'Nitrogen, phosphorus, potassium aur pH values ko dubara check karen.', color: '#f59e0b' },
    { day: 2, icon: '🌱', task: 'Fasal Ka Intikhab', detail: 'Moong ya jawar jaise faslon ko tarjeeh den.', color: '#fde047' },
    { day: 3, icon: '💧', task: 'Pani Ka Nazam', detail: 'Mitti ko zyada geela ya sukha na hone den.', color: '#0ea5e9' },
    { day: 4, icon: '🧴', task: 'Khadd Ki Salah', detail: 'DAP ya SOP ki zaroorat ke mutabiq istemal karen.', color: '#a855f7' },
    { day: 5, icon: '🌿', task: 'Organic Matter', detail: 'Compost aur green manure daalkar soil health behtar karen.', color: '#22c55e' },
    { day: 6, icon: '🛠️', task: 'pH Adjustment', detail: 'Lime ya sulfur se pH ko ideal range mein layein.', color: '#0a8d00' },
    { day: 7, icon: '🔍', task: 'Progress Check', detail: 'Fasal ka jawab dekh kar agle qadam ka faisla karen.', color: '#14b8a6' },
  ],
  poor: [
    { day: 1, icon: '🧪', task: 'Detailed Soil Analysis', detail: 'Mitti ke nutrients aur acidity ka mukammal jayza lain.', color: '#ef4444' },
    { day: 2, icon: '🌱', task: 'Sabr aur Tahammul', detail: 'Fasal ke liye sabr aur planning zaroori hai.', color: '#f87171' },
    { day: 3, icon: '💧', task: 'Irrigation Control', detail: 'Pani ko correct balance mein istemal karen.', color: '#0ea5e9' },
    { day: 4, icon: '🧴', task: 'Correct Fertilizers', detail: 'Urea, DAP ya SOP ka munsifana istemal karen.', color: '#a855f7' },
    { day: 5, icon: '🌿', task: 'Organic Healing', detail: 'Compost aur organic matter se mitti ko mazboot banayen.', color: '#22c55e' },
    { day: 6, icon: '🛠️', task: 'Acidity Repair', detail: 'Lime ya sulfur ki madad se pH ko correct karen.', color: '#0a8d00' },
    { day: 7, icon: '🔍', task: 'Fallow Period', detail: 'Zameen ko aram dena bhi kabhi kabhi faida mand hota hai.', color: '#14b8a6' },
  ],
};
