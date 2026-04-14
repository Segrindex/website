
export const calculateIES = (RTC: number, ICT: number, IAW: number, PIM: number, SCW: number, SB: number = 3.2): number => {
  // SEGRİ v2.7 Metodolojisi:
  // 1. Ağırlıklı Ham Puan
  const rawIES = (0.22 * RTC) + (0.24 * ICT) + (0.18 * IAW) + (0.18 * PIM) + (0.18 * SCW);
  
  // 2. Normalizasyon (Likert 1-7 -> 0-100)
  // Formül: (Avg - 1) * (100 / 6)
  const normIES = (rawIES - 1) * (100 / 6);
  
  // 3. Sosyal Beğenirlik (SB) Düzeltmesi
  // Formül: Puan_düz = Puan_norm - β × (SB - μ_SB)
  // β = 0.12, μ_SB = 3.2
  const adjustedIES = normIES - 0.12 * (SB - 3.2);
  
  return Math.min(100, Math.max(0, adjustedIES));
};

export const calculateEEF = (FA: number, RFQ: number, MD: number, KI: number, EN: number, Q: number = 3): number => {
  // 1. Eşit Ağırlıklı Ham Puan (%20 her biri)
  const rawEEF = (0.20 * FA) + (0.20 * RFQ) + (0.20 * MD) + (0.20 * KI) + (0.20 * EN);
  
  // 2. Q Faktörü (Veri Kalitesi) Düzeltmesi
  // Formül: Skor_Q = Skor × (1 + (Q - 3) / 10)
  const qAdjustedEEF = rawEEF * (1 + (Q - 3) / 10);
  
  // 3. Winsorized Normalizasyon (Örnek P5=30, P95=90)
  // Formül: Norm_w = (Skor_Q - 30) / (90 - 30) * 100
  const finalEEF = ((qAdjustedEEF - 30) / (90 - 30)) * 100;
  
  return Math.min(100, Math.max(0, finalEEF));
};

export const calculateSEGRI = (IES: number, EEF: number): number => {
  // Nihai Skor: %60 IES + %40 EEF
  return (0.60 * IES) + (0.40 * EEF);
};

export const determineQuadrant = (IES: number, EEF: number): string => {
  // SEGRİ v2.7 Eşik Değerleri: IES >= 65, EEF >= 60
  if (IES >= 65 && EEF >= 60) return "Iron Man";
  if (IES >= 65 && EEF < 60) return "Captain America";
  if (IES < 65 && EEF >= 60) return "Black Panther";
  return "Spider-Man";
};

export const determineTypology = (RTC: number, ICT: number, IAW: number, PIM: number, SCW: number): string => {
  const scores = { RTC, ICT, IAW, PIM, SCW };
  const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1]);
  const [first, second] = [sorted[0][0], sorted[1][0]];
  const firstVal = sorted[0][1];
  const secondVal = sorted[1][1];
  const minVal = Math.min(...Object.values(scores));
  
  // 1. Gandalf (Visionary-Innovator): ICT + PIM high (Top 2, diff < 8)
  if (((first === 'ICT' && second === 'PIM') || (first === 'PIM' && second === 'ICT')) && Math.abs(firstVal - secondVal) < 8) {
    return 'Gandalf Tipi';
  }
  
  // 2. Aragorn (Bold-Leader): RTC very high (RTC - max(others) >= 10)
  const others = Object.entries(scores).filter(([k]) => k !== 'RTC').map(([, v]) => v);
  const maxOthers = Math.max(...others);
  if (RTC - maxOthers >= 10) {
    return 'Aragorn Tipi';
  }
  
  // 3. Frodo (Social-Impact): SCW + PIM high (Top 2, diff < 8)
  if (((first === 'SCW' && second === 'PIM') || (first === 'PIM' && second === 'SCW')) && Math.abs(firstVal - secondVal) < 8) {
    return 'Frodo Tipi';
  }
  
  // 4. Legolas (Autonomous-Creative): IAW + ICT high (Top 2, diff < 8)
  if (((first === 'IAW' && second === 'ICT') || (first === 'ICT' && second === 'IAW')) && Math.abs(firstVal - secondVal) < 8) {
    return 'Legolas Tipi';
  }
  
  // 5. Han Solo (Rebel-Fast): RTC high, SCW low (RTC >= 65, SCW < 45, diff >= 20)
  if (RTC >= 65 && SCW < 45 && (RTC - SCW) >= 20) {
    return 'Han Solo Tipi';
  }

  // 6. Galadriel (Protective-Impact): SCW very high (SCW - max(others) >= 10)
  const othersNoSCW = Object.entries(scores).filter(([k]) => k !== 'SCW').map(([, v]) => v);
  if (SCW - Math.max(...othersNoSCW) >= 10) {
    return 'Galadriel Tipi';
  }

  // 7. Samwise (Balanced-Supporter): max - min < 8
  if (firstVal - minVal < 8) {
    return 'Samwise Tipi';
  }
  
  // 8. Gimli (Pragmatic-Opportunist): Mid RTC+ICT (40-70), PIM < 50
  if (RTC >= 40 && RTC <= 70 && ICT >= 40 && ICT <= 70 && PIM < 50) {
    return 'Gimli Tipi';
  }

  // Default fallback
  return 'Gimli Tipi';
};

export const calculateConfidenceInterval = (score: number, n: number = 100, sd: number = 15): { lower: number, upper: number } => {
  const marginOfError = 1.96 * (sd / Math.sqrt(n));
  return {
    lower: Math.max(0, score - marginOfError),
    upper: Math.min(100, score + marginOfError)
  };
};

export const predictSuccessProbability = (IES: number, EEF: number): number => {
  // Lojistik Regresyon Modeli (v2.7)
  // Logit = -4.2 + 0.05*IES + 0.03*EEF
  const logit = -4.2 + (0.05 * IES) + (0.03 * EEF);
  const probability = 1 / (1 + Math.exp(-logit));
  return probability * 100; // Percentage
};

export const determineMaturityTag = (EEF: number): string => {
  if (EEF >= 85) return "Global Leader";
  if (EEF >= 65) return "Mature";
  if (EEF >= 45) return "Emerging";
  return "Nascent";
};

export const calculateRiskScore = (inputs: any, weights: any) => {
    let score = 0;
    Object.keys(weights).forEach(key => {
        score += (inputs[key] || 0) * weights[key];
    });
    return score;
};

export const calculateGEE = (gsbe: number, yepe: number, lifestyle: number): number => {
  // GEE (Girişimcilik Ekosistem Etkisi) = (0.40 * G-SBE) + (0.35 * YEPE) + (0.25 * LHS)
  return (0.40 * gsbe) + (0.35 * yepe) + (0.25 * lifestyle);
};

// --- Yeni v2.7 Endeksleri ---

export const calculateFSI = (vcAvailability: number, angelInvestment: number, alternativeFunding: number): number => {
  // FSI (Financial Sophistication Index / Finansman Derinlik Endeksi)
  return (0.40 * vcAvailability) + (0.40 * angelInvestment) + (0.20 * alternativeFunding);
};

export const calculateCSB = (corporateVC: number, openInnovation: number, jointVentures: number): number => {
  // CSB (Corporate-Startup Bridge / Kurumsal İşbirliği Endeksi)
  return (0.35 * corporateVC) + (0.40 * openInnovation) + (0.25 * jointVentures);
};

export const calculateTCI = (stemGraduates: number, brainDrainReversal: number, techTalentAvailability: number): number => {
  // TCI (Talent Competitiveness Index / Yetenek Rekabetçilik Endeksi)
  return (0.30 * stemGraduates) + (0.30 * brainDrainReversal) + (0.40 * techTalentAvailability);
};

export const calculateVAS = (mentorshipQuality: number, networkAccess: number, strategicGuidance: number): number => {
  // VAS (Value Add Score / Yatırımcı Katma Değer Skoru)
  return (0.35 * mentorshipQuality) + (0.40 * networkAccess) + (0.25 * strategicGuidance);
};
