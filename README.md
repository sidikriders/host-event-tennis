# Host Event Tennis

Tool buat para host tennis, especially saya sendiri lol

## To Do
- [ ] Add more for event
  - [ ] `event_config_match_type`: Single | Double
  - [ ] `event_config_min_set`: 1
  - [ ] `event_config_max_set`: 1, must odd number
  - [ ] `event_config_min_game`: 4
  - [ ] `event_config_max_game`: 5, must odd number
- [ ] Create Manual Match
  - `created_by_id`
  - `event_id`
  - player of the match must use player from the player event list
  - `team_1_player_1`
  - `team_1_player_2`, mandatory if match type is double
  - `team_2_player_1`
  - `team_2_player_2`, mandatory if match type is double
- [ ] Match Set of the Match
  - `created_by_id`
  - `match_id`
  - `team_1_score`: normal order number
  - `team_2_score`: normal order number
- [ ] Game of the Set
  - `created_by_id`
  - `match_set_id`
  - `team_1_score`: 0, 15, 30, 40, Adv, Win/Lose
  - `team_2_score`: 0, 15, 30, 40, Adv, Win/Lose
- [ ] Match Detail Page
  - [ ] Interactive Score Board per Game
  - [ ] Score per Set
  - [ ] Score per Match
- [ ] List of Match on Event
  - [ ] Score of the Match
    - [ ] Set Score
      - [ ] Game Score
- [ ] Auto Generate Match
  - [ ] Only Select Present Player
  - [ ] Select Based on Least Played Player
  - [ ] Maybe can also based the team based on Player point
- [ ] Table Point for Players per Event
  - [ ] Points Calculation

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
