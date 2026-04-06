# SEGRİ Dashboard

A data visualization and analysis platform focused on entrepreneurship and startup ecosystems, implementing the SEGRI methodology developed by Selçuk Ergin.

## Tech Stack

- **Framework:** React 19 + TypeScript
- **Build Tool:** Vite 6
- **Package Manager:** npm
- **Styling:** Tailwind CSS (via CDN)
- **Charts:** Recharts
- **Icons:** Lucide React
- **Data Fetching:** TanStack React Query v5
- **AI Integration:** Google Gemini API (`@google/genai`)

## Project Structure

```
/
├── App.tsx              # Main app component with tab-based routing
├── index.tsx            # Entry point
├── index.html           # HTML entry
├── api.ts               # Simulated API / live data updates
├── constants.ts         # Static data (COUNTRY_DATA, SECTOR_WEIGHTS)
├── utils.ts             # Core SEGRI methodology calculations
├── types.ts             # TypeScript interfaces
├── vite.config.ts       # Vite configuration (port 5000)
└── components/          # Dashboard UI modules
    ├── Overview.tsx
    ├── Calculator.tsx
    ├── DeepAnalysis.tsx
    ├── QuadrantAnalysis.tsx
    ├── TypologyAnalysis.tsx
    ├── CountryDetail.tsx
    ├── Comparison.tsx
    ├── StartupMetrics.tsx
    ├── SmeMetrics.tsx
    ├── RiskAnalysis.tsx
    ├── UnicornAnalysis.tsx
    ├── ExtendedAnalysis.tsx
    ├── HowToCalculate.tsx
    ├── DataResources.tsx
    ├── ErrorBoundary.tsx
    └── Common.tsx
```

## Running the App

```bash
npm install
npm run dev
```

Runs on port 5000 (configured in `vite.config.ts`).

## Environment Variables

- `GEMINI_API_KEY` — Google Gemini API key for AI analysis features

## Deployment

Configured as a **static** deployment:
- Build: `npm run build`
- Public dir: `dist`
