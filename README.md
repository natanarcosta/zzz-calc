# ZZZ Resource Calculator

A web-based resource calculator for Zenless Zone Zero that helps players track their progress toward maximizing characters and W-Engines.

## Features

- **Resource Tracking**: Input and track all game resources including Dennies, Investigator Logs, Certification Seals, Element Chips, and more
- **Character Selection**: Select multiple characters to track their individual progress
- **Progress Visualization**: Color-coded progress bars showing completion percentage for each resource type
- **Missing Resources**: See exactly what resources you need to complete each character
- **Persistent Storage**: All data is saved to localStorage, so your progress is never lost
- **Dark Theme**: Gamer-friendly dark aesthetic with neon accents
- **Responsive Design**: Works on desktop and mobile devices

## Tech Stack

- **React 19** with TypeScript
- **Vite** for fast development and building
- **TailwindCSS** for styling
- **Lucide React** for icons
- **LocalStorage** for data persistence

## Getting Started

### Prerequisites

- Node.js 20.12.1 or higher
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser to `http://localhost:5173`

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## How to Use

1. **Input Resources**: Enter your current resource amounts in the Resource Input section
   - Dennies: Total currency you have
   - Investigator Logs: Trainee (100 EXP), Official (600 EXP), Senior (3,000 EXP)
   - Certification Seals: Basic, Advanced, and Top-Tier seals for each class
   - Element Chips: Basic, Advanced, and Specialized chips for each element
   - Expert Challenge Materials: Materials for passive skills
   - Boss Materials: Materials for passive skills

2. **Select Characters**: Click on character cards to select which characters you want to track

3. **View Progress**: The Progress Dashboard shows your progress for each selected character
   - Green: 100% complete
   - Yellow: 50-99% complete
   - Red: 0-49% complete
   - Missing resources are listed below each character card

4. **Reset**: Use the "Reset All" button in the header to clear all data

## Resource Requirements

Per character (Level 1-60):
- **EXP**: 900,000 total
- **Dennies**: 3,700,000
- **Certification Seals**: 4 Basic + 32 Advanced + 30 Top-Tier (class-specific)
- **Element Chips**: 25 Basic + 75 Advanced + 250 Specialized (element-specific)
- **Expert Challenge Materials**: 60
- **Boss Materials**: 9

## Project Structure

```
src/
├── components/
│   ├── layout/
│   │   ├── Header.tsx
│   │   └── Layout.tsx
│   ├── resource-input/
│   │   └── ResourceInput.tsx
│   ├── character-selector/
│   │   └── CharacterSelector.tsx
│   └── progress-dashboard/
│       ├── ProgressDashboard.tsx
│       └── CharacterProgressCard.tsx
├── hooks/
│   ├── useResources.ts
│   └── useCharacters.ts
├── lib/
│   ├── localStorage.ts
│   └── resourceCalculator.ts
├── types/
│   └── index.ts
├── data/
│   └── game-data.json
├── App.tsx
└── main.tsx
```

## License

This project is open source and available for personal use.

## Acknowledgments

- Game data based on Zenless Zone Zero by HoYoverse
- Built with React, Vite, and TailwindCSS
