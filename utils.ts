
export const calculateIES = (RTC: number, ICT: number, IAW: number, PIM: number, SCW: number): number => {
  // SEGRİ Metodolojisi %100 Uyum:
  // ICT (Yenilikçilik): %24
  // RTC (Risk): %22
  // IAW (Bağımsızlık): %18
  // PIM (Motivasyon): %18
  // SCW (Sosyal): %18
  return (0.22 * RTC) + (0.24 * ICT) + (0.18 * IAW) + (0.18 * PIM) + (0.18 * SCW);
};

export const calculateEEF = (FA: number, RFQ: number, MD: number, KI: number, EN: number): number => {
  // EEF Bileşenleri eşit ağırlıktadır (%20)
  return (0.20 * FA) + (0.20 * RFQ) + (0.20 * MD) + (0.20 * KI) + (0.20 * EN);
};

export const calculateSEGRI = (IES: number, EEF: number): number => {
  // Nihai Skor: %60 IES + %40 EEF
  return (0.60 * IES) + (0.40 * EEF);
};

export const determineQuadrant = (IES: number, EEF: number): string => {
  if (IES >= 75 && EEF >= 70) return "Iron Man";
  if (IES >= 75 && EEF < 70) return "Captain America";
  if (IES < 75 && EEF >= 70) return "Black Panther";
  return "Spider-Man";
};

export const determineTypology = (RTC: number, ICT: number, IAW: number, PIM: number, SCW: number): string => {
  const scores = { RTC, ICT, IAW, PIM, SCW };
  const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1]);
  const [first, second] = [sorted[0][0], sorted[1][0]];
  const firstVal = sorted[0][1];
  
  // 1. Gandalf Tipi (High ICT and PIM)
  if ((first === 'ICT' && second === 'PIM') || (first === 'PIM' && second === 'ICT')) {
    return 'Gandalf Tipi';
  }
  // 2. Aragorn Tipi (Very High RTC)
  if (first === 'RTC' && firstVal >= 80) {
    return 'Aragorn Tipi';
  }
  // 3. Frodo Tipi (High SCW and PIM)
  if ((first === 'SCW' && second === 'PIM') || (first === 'PIM' && second === 'SCW')) {
    return 'Frodo Tipi';
  }
  // 4. Legolas Tipi (High IAW and ICT)
  if ((first === 'IAW' && second === 'ICT') || (first === 'ICT' && second === 'IAW')) {
    return 'Legolas Tipi';
  }
  // 5. Galadriel Tipi (Very High SCW)
  if (first === 'SCW' && firstVal >= 80) {
    return 'Galadriel Tipi';
  }
  // 6. Han Solo Tipi (High RTC, Low SCW)
  if (first === 'RTC' && SCW < 60) {
    return 'Han Solo Tipi';
  }
  // 7. Gimli Tipi (Medium RTC and ICT, low PIM)
  return 'Gimli Tipi';
};

export const calculateRiskScore = (inputs: any, weights: any) => {
    let score = 0;
    Object.keys(weights).forEach(key => {
        score += (inputs[key] || 0) * weights[key];
    });
    return score;
};
