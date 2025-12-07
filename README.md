# Host Event Tennis

Tool buat para host tennis, especially saya sendiri lol

## Tech Stack

- ⚛️ React 19
- ⚡ Vite 7
- 📘 TypeScript 5
- 🎨 Tailwind CSS 4
- 🔥 Firebase

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Clone the repository
```bash
git clone https://github.com/sidikriders/host-event-tennis.git
cd host-event-tennis
```

2. Install dependencies
```bash
npm install
```

3. Create a `.env` file based on `.env.example` and add your Firebase configuration
```bash
cp .env.example .env
```

4. Update the `.env` file with your Firebase project credentials

### Development

Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173/`

### Build

Build the project for production:
```bash
npm run build
```

### Preview

Preview the production build:
```bash
npm run preview
```

### Lint

Run ESLint to check code quality:
```bash
npm run lint
```

## Firebase Setup

To use Firebase features, you need to:

1. Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
2. Get your Firebase configuration
3. Add the configuration values to your `.env` file
