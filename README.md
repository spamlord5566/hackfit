# HackFit Dashboard 🚀

A futuristic, neon-dark hackathon team dashboard built with **React**, **React Router**, and **Framer Motion**.

## Features

- 🔐 Team Login (Gmail + 4-digit phone PIN)
- 🎯 Problem Statement selector with lock/unlock
- 👥 Team member management (Name, Gmail, Institution, Role)
- ✨ Smooth pixel-dissolve page transitions
- 💡 Neon glow hover/focus effects throughout
- 📊 Read-only team dashboard view
- 🌌 Glassmorphic dark UI

## Prerequisites

Make sure you have the following installed:
- [Node.js](https://nodejs.org/) (v16 or higher recommended)
- npm (comes with Node.js)

## Getting Started

```bash
# 1. Clone the repository
git clone https://github.com/YOUR_USERNAME/hackfit.git

# 2. Navigate into the project folder
cd hackfit

# 3. Install dependencies
npm install

# 4. Start the development server
npm start
```

The app will automatically open in your browser at `http://localhost:8080` (or the next available port).

## Project Structure

```
hackfit/
├── public/
│   └── index.html
├── src/
│   ├── pages/
│   │   ├── Understand.jsx   # Front/landing page
│   │   ├── TeamLogin.jsx    # Login page
│   │   └── Dashboard.jsx    # Team dashboard
│   ├── App.jsx              # Router + page transitions
│   ├── index.jsx            # Entry point
│   └── styles.css           # Global styles + neon effects
├── .babelrc
├── webpack.config.js
└── package.json
```

## Build for Production

```bash
npm run build
```

Output will be in the `dist/` folder.

## Tech Stack

- React 18
- React Router DOM v6
- Framer Motion
- Webpack 5 + Babel
